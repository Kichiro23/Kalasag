import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Star, Circle, CheckCircle } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

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
      <DashboardLayout>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Your Values</h1>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dash-card rounded-3xl p-6">
          <CheckCircle size={36} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="text-[20px] font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>What Matters Most</h2>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {veryImportant.map(v => (
              <span key={v.id} className="dash-card-success rounded-full px-4 py-2 text-[13px] text-emerald-400">{v.emoji} {v.text}</span>
            ))}
          </div>
          <p className="text-[13px] text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
            These are the values gambling threatens. Protect them.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full dash-card rounded-2xl py-3 dash-interactive text-[15px] font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Done
          </button>
        </motion.div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>What Matters</h1>
      </div>

      <div className="mb-4">
        <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Sort these values by importance to you. Tap a value to assign it.</p>
      </div>

      {/* Category buttons */}
      <div className="mb-4 flex gap-2 sticky top-0 z-20">
        {[
          { key: 'very' as const, label: 'Very Important', icon: Star, color: 'dash-card-success text-emerald-400' },
          { key: 'important' as const, label: 'Important', icon: Heart, color: 'dash-card-info text-blue-400' },
          { key: 'not' as const, label: 'Less Important', icon: Circle, color: 'dash-card' },
        ].map(cat => (
          <button
            key={cat.key}
            className={`flex-1 ${cat.color.split(' ')[0]} rounded-xl py-2 flex items-center justify-center gap-1`}
          >
            <cat.icon size={12} className={cat.color.split(' ')[1]} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-primary)' }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-2 gap-2">
        {values.map((value, i) => {
          const assigned = sorted[value.id]
          const bgClass = assigned === 'very' ? 'dash-card-success' : assigned === 'important' ? 'dash-card-info' : 'dash-card'
          return (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`${bgClass} rounded-2xl p-3`}
            >
              <div className="text-[20px] mb-1">{value.emoji}</div>
              <div className="text-[13px] font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{value.text}</div>
              <div className="flex gap-1">
                {(['very', 'important', 'not'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => assign(value.id, cat)}
                    className={`flex-1 rounded-lg py-1 text-[10px] font-medium ${
                      assigned === cat
                        ? cat === 'very' ? 'bg-emerald-500/30 text-emerald-400' :
                          cat === 'important' ? 'bg-blue-500/30 text-blue-400' :
                          'bg-white/10'
                        : 'bg-transparent'
                    }`}
                    style={assigned !== cat ? { color: 'var(--text-muted)' } : undefined}
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
      <div className="mt-6">
        <button
          onClick={() => setShowResult(true)}
          className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          See Results
        </button>
      </div>
    </DashboardLayout>
  )
}
