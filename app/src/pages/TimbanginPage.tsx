import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Scale, CheckCircle } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

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
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Timbangin</h1>
      </div>

      {!showResult ? (
        <div>
          <p className="text-[15px] mb-6 text-center" style={{ color: 'var(--text-secondary)' }}>
            Rate the importance of each item. What matters more to you?
          </p>

          {/* Scale Visual */}
          <div className="dash-card rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Scale size={28} className="text-[var(--accent-teal)]" />
              <span className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>Decisional Balance</span>
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
                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg"
                  style={{ minHeight: 8 }}
                />
                <span className="text-[11px] text-emerald-400 mt-1">Future</span>
              </div>
            </div>
          </div>

          {/* Gambling Side */}
          <h3 className="text-[17px] font-semibold text-red-400 mb-3">Why I Gamble</h3>
          <div className="space-y-3 mb-6">
            {gamblingPros.map(item => (
              <div key={item.id} className="dash-card-danger rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px]" style={{ color: 'var(--text-primary)' }}>{item.text}</span>
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
          <h3 className="text-[17px] font-semibold text-emerald-400 mb-3">Why I Want to Stop</h3>
          <div className="space-y-3 mb-6">
            {futurePros.map(item => (
              <div key={item.id} className="dash-card-success rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[15px]" style={{ color: 'var(--text-primary)' }}>{item.text}</span>
                  <span className="text-[13px] text-emerald-400">{futureWeights[item.id] || 0}/10</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={futureWeights[item.id] || 0}
                  onChange={e => setFutureWeights(w => ({ ...w, [item.id]: Number(e.target.value) }))}
                  className="w-full accent-emerald-500"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResult(true)}
            className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            See Result
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh]"
        >
          <div className="dash-card rounded-3xl p-8 text-center max-w-sm">
            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="text-[24px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {futureTotal > gamblingTotal ? 'Future Wins!' : 'Keep Reflecting'}
            </h2>
            <p className="text-[15px] mb-4" style={{ color: 'var(--text-secondary)' }}>
              {futureTotal > gamblingTotal
                ? "Your future values outweigh gambling. This is your strength!"
                : "Gambling still feels important to you. That's okay - awareness is the first step."}
            </p>
            <div className="flex justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-[28px] font-bold text-red-400">{gamblingTotal}</div>
                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Gambling</div>
              </div>
              <div className="text-center">
                <div className="text-[28px] font-bold text-emerald-400">{futureTotal}</div>
                <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Future</div>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="dash-card rounded-full px-8 py-3 font-medium dash-interactive"
              style={{ color: 'var(--text-primary)' }}
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
