import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, CheckCircle } from 'lucide-react'

const gamblingPros = [
  { id: 'g1', text: 'Quick money', weight: 0 },
  { id: 'g2', text: 'Excitement', weight: 0 },
  { id: 'g3', text: 'Social bonding', weight: 0 },
  { id: 'g4', text: 'Escape from stress', weight: 0 },
]

const futurePros = [
  { id: 'f1', text: "Family's trust", weight: 0 },
  { id: 'f2', text: 'Financial freedom', weight: 0 },
  { id: 'f3', text: 'Peace of mind', weight: 0 },
  { id: 'f4', text: 'Better health', weight: 0 },
]

export default function TimbanginPage() {
  const navigate = useNavigate()
  const [gamblingWeights, setGamblingWeights] = useState<Record<string, number>>({})
  const [futureWeights, setFutureWeights] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)

  const gamblingTotal = Object.values(gamblingWeights).reduce((s, w) => s + (w || 0), 0)
  const futureTotal = Object.values(futureWeights).reduce((s, w) => s + (w || 0), 0)

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Timbangin</h1>
        </div>

        {!showResult ? (
          <div className="px-5">
            <p className="text-[15px] text-[#CBD5E1] mb-6 text-center">
              Rate the importance of each item. What matters more to you?
            </p>

            {/* Scale Visual */}
            <div className="glass-base rounded-2xl p-5 specular-highlight mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Scale size={28} className="text-indigo-400" />
                <span className="text-[17px] font-semibold text-white">Decisional Balance</span>
              </div>
              <div className="flex items-end justify-between h-16 gap-4">
                <div className="flex-1 flex flex-col items-center">
                  <motion.div
                    animate={{ height: `${Math.min(100, gamblingTotal * 10)}%` }}
                    className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg"
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-[11px] text-red-400 mt-1">Gambling</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <motion.div
                    animate={{ height: `${Math.min(100, futureTotal * 10)}%` }}
                    className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg"
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-[11px] text-green-400 mt-1">Future</span>
                </div>
              </div>
            </div>

            {/* Gambling Side */}
            <h3 className="text-[17px] font-semibold text-red-400 mb-3">Why I Gamble</h3>
            <div className="space-y-3 mb-6">
              {gamblingPros.map(item => (
                <div key={item.id} className="glass-red rounded-2xl p-4 specular-highlight">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] text-white">{item.text}</span>
                    <span className="text-[13px] text-red-400">{gamblingWeights[item.id] || 0}/10</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={gamblingWeights[item.id] || 0}
                    onChange={e => setGamblingWeights(w => ({ ...w, [item.id]: Number(e.target.value) }))}
                    className="w-full accent-red-500"
                  />
                </div>
              ))}
            </div>

            {/* Future Side */}
            <h3 className="text-[17px] font-semibold text-green-400 mb-3">Why I Want to Stop</h3>
            <div className="space-y-3 mb-6">
              {futurePros.map(item => (
                <div key={item.id} className="glass-green rounded-2xl p-4 specular-highlight">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] text-white">{item.text}</span>
                    <span className="text-[13px] text-green-400">{futureWeights[item.id] || 0}/10</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={futureWeights[item.id] || 0}
                    onChange={e => setFutureWeights(w => ({ ...w, [item.id]: Number(e.target.value) }))}
                    className="w-full accent-green-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white mb-6"
            >
              See Result
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 flex flex-col items-center justify-center min-h-[60vh]"
          >
            <div className="glass-thick rounded-3xl p-8 specular-highlight text-center max-w-sm">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-[24px] font-bold text-white mb-2">
                {futureTotal > gamblingTotal ? 'Future Wins!' : 'Keep Reflecting'}
              </h2>
              <p className="text-[15px] text-[#CBD5E1] mb-4">
                {futureTotal > gamblingTotal
                  ? "Your future values outweigh gambling. This is your strength!"
                  : "Gambling still feels important to you. That's okay - awareness is the first step."}
              </p>
              <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="text-[28px] font-bold text-red-400">{gamblingTotal}</div>
                  <div className="text-[12px] text-[#64748B]">Gambling</div>
                </div>
                <div className="text-center">
                  <div className="text-[28px] font-bold text-green-400">{futureTotal}</div>
                  <div className="text-[12px] text-[#64748B]">Future</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="glass-base rounded-full px-8 py-3 text-white font-medium specular-highlight glass-interactive"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
