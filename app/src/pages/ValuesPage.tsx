import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Star, Circle, CheckCircle } from 'lucide-react'

const values = [
  { id: 'v1', text: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { id: 'v2', text: 'Integrity', emoji: '🤝' },
  { id: 'v3', text: 'Health', emoji: '💪' },
  { id: 'v4', text: 'Financial Security', emoji: '💰' },
  { id: 'v5', text: 'Respect', emoji: '🙏' },
  { id: 'v6', text: 'Education', emoji: '📚' },
  { id: 'v7', text: 'Honesty', emoji: '💎' },
  { id: 'v8', text: 'Peace of Mind', emoji: '🧘' },
  { id: 'v9', text: 'Hard Work', emoji: '⚒️' },
  { id: 'v10', text: 'Community', emoji: '🏘️' },
  { id: 'v11', text: 'Faith', emoji: '✝️' },
  { id: 'v12', text: 'Love', emoji: '❤️' },
  { id: 'v13', text: 'Growth', emoji: '🌱' },
  { id: 'v14', text: 'Responsibility', emoji: '🛡️' },
  { id: 'v15', text: 'Joy', emoji: '😊' },
]

type Category = 'very' | 'important' | 'not'

export default function ValuesPage() {
  const navigate = useNavigate()
  const [sorted, setSorted] = useState<Record<string, Category | null>>({})
  const [showResult, setShowResult] = useState(false)

  const assign = (id: string, category: Category) => {
    setSorted(s => ({ ...s, [id]: category }))
  }

  const veryImportant = values.filter(v => sorted[v.id] === 'very')
  const important = values.filter(v => sorted[v.id] === 'important')

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#020617] pb-8">
        <div className="relative z-10 px-5 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-[22px] font-bold text-white">Your Values</h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-thick rounded-3xl p-6 specular-highlight">
            <CheckCircle size={36} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-[20px] font-bold text-white text-center mb-4">What Matters Most</h2>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {veryImportant.map(v => (
                <span key={v.id} className="glass-green rounded-full px-4 py-2 text-[13px] text-green-400">{v.emoji} {v.text}</span>
              ))}
            </div>
            <p className="text-[13px] text-[#CBD5E1] text-center mb-4">
              These are the values gambling threatens. Protect them.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full glass-base rounded-2xl py-3 specular-highlight glass-interactive text-[15px] font-semibold text-white"
            >
              Done
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">What Matters</h1>
        </div>

        <div className="px-5 mb-4">
          <p className="text-[15px] text-[#CBD5E1]">Sort these values by importance to you. Tap a value to assign it.</p>
        </div>

        {/* Category buttons */}
        <div className="px-5 mb-4 flex gap-2 sticky top-0 z-20">
          {[
            { key: 'very' as const, label: 'Very Important', icon: Star, color: 'glass-green text-green-400' },
            { key: 'important' as const, label: 'Important', icon: Heart, color: 'glass-blue text-blue-400' },
            { key: 'not' as const, label: 'Less Important', icon: Circle, color: 'glass-base text-[#64748B]' },
          ].map(cat => (
            <button
              key={cat.key}
              className={`flex-1 ${cat.color.split(' ')[0]} rounded-xl py-2 flex items-center justify-center gap-1 specular-highlight`}
            >
              <cat.icon size={12} />
              <span className="text-[11px] font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Values Grid */}
        <div className="px-5 grid grid-cols-2 gap-2">
          {values.map((value, i) => {
            const assigned = sorted[value.id]
            const bgClass = assigned === 'very' ? 'glass-green' : assigned === 'important' ? 'glass-blue' : 'glass-base'
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`${bgClass} rounded-2xl p-3 specular-highlight`}
              >
                <div className="text-[20px] mb-1">{value.emoji}</div>
                <div className="text-[13px] text-white font-medium mb-2">{value.text}</div>
                <div className="flex gap-1">
                  {(['very', 'important', 'not'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => assign(value.id, cat)}
                      className={`flex-1 rounded-lg py-1 text-[10px] font-medium ${
                        assigned === cat
                          ? cat === 'very' ? 'bg-green-500/30 text-green-400' :
                            cat === 'important' ? 'bg-blue-500/30 text-blue-400' :
                            'bg-white/10 text-[#64748B]'
                          : 'bg-transparent text-[#64748B]'
                      }`}
                    >
                      {cat === 'very' ? '★' : cat === 'important' ? '♥' : '○'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Done Button */}
        <div className="px-5 mt-6">
          <button
            onClick={() => setShowResult(true)}
            className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white"
          >
            See Results
          </button>
        </div>
      </div>
    </div>
  )
}
