import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Sun, Moon, CheckCircle, Smile, Frown, Meh } from 'lucide-react'
import { trpc } from '@/providers/trpc'

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
      // Submit
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
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 via-[#020617] to-[#020617]" />

      <div className="relative z-10 flex flex-col h-screen">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Daily Check</h1>
        </div>

        {/* Type Toggle */}
        {!completed && (
          <div className="px-5 mb-6 flex gap-2">
            <button
              onClick={() => setType('morning')}
              className={`flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 ${
                type === 'morning' ? 'bg-[#4338CA]' : 'glass-base'
              }`}
            >
              <Sun size={18} className={type === 'morning' ? 'text-white' : 'text-[#64748B]'} />
              <span className={type === 'morning' ? 'text-white font-medium' : 'text-[#64748B]'}>Morning</span>
            </button>
            <button
              onClick={() => setType('evening')}
              className={`flex-1 rounded-2xl py-3 flex items-center justify-center gap-2 ${
                type === 'evening' ? 'bg-[#4338CA]' : 'glass-base'
              }`}
            >
              <Moon size={18} className={type === 'evening' ? 'text-white' : 'text-[#64748B]'} />
              <span className={type === 'evening' ? 'text-white font-medium' : 'text-[#64748B]'}>Evening</span>
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center px-8">
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
                        i <= step ? 'bg-[#4338CA]' : 'bg-[#1E293B]'
                      }`}
                    />
                  ))}
                </div>

                <h2 className="text-[24px] font-bold text-white text-center mb-8">{currentQ.text}</h2>

                {currentQ.type === 'mood' && (
                  <div className="flex justify-center gap-6">
                    {[
                      { icon: Frown, value: 3, label: 'Low', color: 'text-red-400' },
                      { icon: Meh, value: 6, label: 'Okay', color: 'text-yellow-400' },
                      { icon: Smile, value: 9, label: 'Good', color: 'text-green-400' },
                    ].map(item => (
                      <motion.button
                        key={item.value}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswer(item.value)}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 rounded-full glass-base flex items-center justify-center specular-highlight glass-interactive">
                          <item.icon size={28} className={item.color} />
                        </div>
                        <span className="text-[13px] text-[#64748B]">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQ.type === 'urge' && (
                  <div className="space-y-3">
                    {[
                      { label: 'No urges at all', value: 0, color: 'glass-green' },
                      { label: 'A little tempted', value: 3, color: 'glass-base' },
                      { label: 'Moderate urge', value: 6, color: 'glass-base' },
                      { label: 'Strong urge', value: 9, color: 'glass-red' },
                    ].map(item => (
                      <motion.button
                        key={item.value}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(item.value)}
                        className={`w-full ${item.color} rounded-2xl p-4 specular-highlight glass-interactive text-left`}
                      >
                        <span className="text-[15px] text-white font-medium">{item.label}</span>
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
                      className="w-full glass-base rounded-2xl p-4 text-white placeholder-[#64748B] outline-none specular-highlight h-32 resize-none text-[15px]"
                    />
                    <button
                      onClick={handleTextSubmit}
                      className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white"
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
                  className="w-24 h-24 rounded-full glass-green flex items-center justify-center specular-highlight mx-auto mb-6"
                >
                  <CheckCircle size={48} className="text-green-400" />
                </motion.div>
                <h2 className="text-[28px] font-bold text-white mb-2">Check Complete!</h2>
                <p className="text-[15px] text-[#CBD5E1] mb-2">Great job keeping track.</p>
                <p className="text-[22px] font-bold text-yellow-400">+25 pts</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-6 glass-base rounded-full px-8 py-3 text-white font-medium specular-highlight glass-interactive"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
