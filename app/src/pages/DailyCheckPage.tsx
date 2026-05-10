import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sun, Moon, CheckCircle, Smile, Frown, Meh } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const questions = [
  { id: 'mood', text: 'How are you feeling right now?', type: 'mood' as const },
  { id: 'urge', text: 'Any gambling urges today?', type: 'urge' as const },
  { id: 'gratitude', text: 'What are you grateful for today?', type: 'text' as const },
  { id: 'goal', text: 'What is your goal for today?', type: 'text' as const },
]

export default function DailyCheckPage() {
  const navigate = useNavigate()
  const logCheck = trpc.dailyCheck.log.useMutation()
  const [step, setStep] = useState(0)
  const [type, setType] = useState<'morning' | 'evening'>('morning')
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [completed, setCompleted] = useState(false)

  const currentQ = questions[step]

  const handleAnswer = (value: string | number) => {
    setAnswers(a => ({ ...a, [currentQ.id]: value }))
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      logCheck.mutate({
        type,
        moodRating: Number(answers.mood ?? 5),
        urgeIntensity: Number(answers.urge ?? 0),
        gratitude: String(answers.gratitude ?? ''),
        goalForToday: String(answers.goal ?? ''),
      })
      setCompleted(true)
    }
  }

  const handleTextSubmit = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      logCheck.mutate({
        type,
        moodRating: Number(answers.mood ?? 5),
        urgeIntensity: Number(answers.urge ?? 0),
        gratitude: String(answers.gratitude ?? ''),
        goalForToday: String(answers.goal ?? ''),
      })
      setCompleted(true)
    }
  }

  return (
    <DashboardLayout showNav={false}>
      <div className="flex flex-col h-[calc(100vh-48px)]">
        <div className="flex items-center gap-3 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Daily Check</h1>
        </div>

        {/* Type Toggle */}
        {!completed && (
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setType('morning')}
              className={`flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 ${
                type === 'morning' ? 'bg-[var(--accent-teal)]' : 'dash-card'
              }`}
            >
              <Sun size={18} className={type === 'morning' ? 'text-white' : ''} style={type !== 'morning' ? { color: 'var(--text-muted)' } : undefined} />
              <span className={type === 'morning' ? 'text-white font-medium' : ''} style={type !== 'morning' ? { color: 'var(--text-muted)' } : undefined}>Morning</span>
            </button>
            <button
              onClick={() => setType('evening')}
              className={`flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 ${
                type === 'evening' ? 'bg-[var(--accent-teal)]' : 'dash-card'
              }`}
            >
              <Moon size={18} className={type === 'evening' ? 'text-white' : ''} style={type !== 'evening' ? { color: 'var(--text-muted)' } : undefined} />
              <span className={type === 'evening' ? 'text-white font-medium' : ''} style={type !== 'evening' ? { color: 'var(--text-muted)' } : undefined}>Evening</span>
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center px-3">
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                {/* Progress */}
                <div className="flex gap-1 mb-8">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full flex-1 transition-all ${
                        i <= step ? 'bg-[var(--accent-teal)]' : 'bg-[var(--border-subtle)]'
                      }`}
                    />
                  ))}
                </div>

                <h2 className="text-[24px] font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>{currentQ.text}</h2>

                {currentQ.type === 'mood' && (
                  <div className="flex justify-center gap-6">
                    {[
                      { icon: Frown, value: 3, label: 'Low', color: 'text-red-400' },
                      { icon: Meh, value: 6, label: 'Okay', color: 'text-amber-400' },
                      { icon: Smile, value: 9, label: 'Good', color: 'text-emerald-400' },
                    ].map(item => (
                      <motion.button
                        key={item.value}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswer(item.value)}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 rounded-full dash-card flex items-center justify-center dash-interactive">
                          <item.icon size={28} className={item.color} />
                        </div>
                        <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQ.type === 'urge' && (
                  <div className="space-y-3">
                    {[
                      { label: 'No urges at all', value: 0, color: 'dash-card-success' },
                      { label: 'A little tempted', value: 3, color: 'dash-card' },
                      { label: 'Moderate urge', value: 6, color: 'dash-card' },
                      { label: 'Strong urge', value: 9, color: 'dash-card-danger' },
                    ].map(item => (
                      <motion.button
                        key={item.value}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(item.value)}
                        className={`w-full ${item.color} rounded-2xl p-4 dash-interactive text-left`}
                      >
                        <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQ.type === 'text' && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Type your answer..."
                      value={String(answers[currentQ.id] ?? '')}
                      onChange={e => setAnswers(a => ({ ...a, [currentQ.id]: e.target.value }))}
                      className="w-full dash-card rounded-2xl p-4 outline-none h-32 resize-none text-[15px] placeholder:text-[var(--text-muted)]"
                      style={{ color: 'var(--text-primary)' }}
                    />
                    <button
                      onClick={handleTextSubmit}
                      className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Continue
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="w-24 h-24 rounded-full dash-card-success flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle size={48} className="text-emerald-400" />
                </motion.div>
                <h2 className="text-[28px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Check Complete!</h2>
                <p className="text-[15px] mb-2" style={{ color: 'var(--text-secondary)' }}>Great job keeping track.</p>
                <p className="text-[22px] font-bold text-amber-400">+25 pts</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 dash-card rounded-full px-8 py-3 font-medium dash-interactive"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  )
}
