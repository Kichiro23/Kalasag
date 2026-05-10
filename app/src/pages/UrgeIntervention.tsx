import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Gamepad2, BookOpen, CheckCircle, X, Heart, Timer } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const steps = [
  {
    id: 'breathe',
    title: 'Take a Breath',
    description: 'Follow the breathing guide. Inhale for 4, hold for 7, exhale for 8.',
    icon: Wind,
    color: 'text-[var(--accent-teal)]',
    duration: 30,
  },
  {
    id: 'distraction',
    title: 'Quick Distraction',
    description: 'Choose a quick activity to redirect your mind.',
    icon: Gamepad2,
    color: 'text-amber-400',
    duration: 0,
  },
  {
    id: 'resist',
    title: 'I Resisted!',
    description: 'You did it! Every resisted urge makes you stronger.',
    icon: CheckCircle,
    color: 'text-emerald-400',
    duration: 0,
  },
]

export default function UrgeIntervention() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [timer, setTimer] = useState(30)
  const [showSuccess, setShowSuccess] = useState(false)
  const [pointsEarned] = useState(50)

  useEffect(() => {
    if (currentStep === 0 && timer > 0) {
      const t = setTimeout(() => setTimer(t => t - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer, currentStep])

  useEffect(() => {
    if (currentStep === 0) {
      const cycle = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)
      return () => clearInterval(cycle)
    }
  }, [currentStep])

  const handleResist = () => {
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/dashboard')
    }, 3000)
  }

  return (
    <DashboardLayout showNav={false}>
      <div className="flex flex-col h-[calc(100vh-48px)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <X size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-8 bg-[var(--accent-teal)]' : i < currentStep ? 'w-4 bg-[var(--accent-teal)]/60' : 'w-4 bg-[var(--border-subtle)]'
                }`}
              />
            ))}
          </div>
          <div className="w-10" />
        </div>

        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              {currentStep === 0 && (
                <>
                  {/* Breathing Animation */}
                  <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                    {/* Outer rings */}
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.5 : breathPhase === 'hold' ? 1.5 : 1,
                        opacity: breathPhase === 'inhale' ? 0.3 : breathPhase === 'hold' ? 0.3 : 0.1,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full border-2 border-[var(--accent-teal)]/30"
                    />
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : 1,
                        opacity: breathPhase === 'inhale' ? 0.5 : breathPhase === 'hold' ? 0.5 : 0.2,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="absolute inset-4 rounded-full border-2 border-[var(--accent-teal)]/40"
                    />
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.1 : breathPhase === 'hold' ? 1.1 : 1,
                        opacity: breathPhase === 'inhale' ? 0.7 : breathPhase === 'hold' ? 0.7 : 0.4,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="absolute inset-8 rounded-full bg-[var(--accent-teal)]/20"
                    />
                    {/* Center */}
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.05 : breathPhase === 'hold' ? 1.05 : 1,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="w-32 h-32 rounded-full dash-card flex items-center justify-center"
                    >
                      <Wind size={36} className="text-[var(--accent-teal)]" />
                    </motion.div>
                  </div>

                  <h2 className="text-[28px] font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>
                    {breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                  </h2>
                  <p className="text-[15px] text-center mb-6" style={{ color: 'var(--text-muted)' }}>
                    Follow the rhythm. Let the urge pass.
                  </p>

                  <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <Timer size={14} />
                    <span>{timer}s remaining</span>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mt-6 dash-card rounded-full px-8 py-3 font-medium dash-interactive"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Skip to Next
                  </button>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="w-24 h-24 rounded-full dash-card flex items-center justify-center mb-6">
                    <Gamepad2 size={40} className="text-amber-400" />
                  </div>
                  <h2 className="text-[28px] font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Quick Distraction</h2>
                  <p className="text-[15px] text-center mb-8" style={{ color: 'var(--text-muted)' }}>
                    Redirect your mind with a quick activity.
                  </p>

                  <div className="w-full space-y-3">
                    <button
                      onClick={() => navigate('/dashboard/breathe')}
                      className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
                    >
                      <Wind size={22} className="text-[var(--accent-teal)]" />
                      <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>Deep Breathing</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/games')}
                      className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
                    >
                      <Gamepad2 size={22} className="text-amber-400" />
                      <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>Urge Arcade</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/recovery')}
                      className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
                    >
                      <BookOpen size={22} className="text-emerald-400" />
                      <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>Read Recovery Content</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 dash-card-success rounded-full px-8 py-3 font-medium dash-interactive"
                  >
                    <span className="text-emerald-400">I did a distraction</span>
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-32 h-32 rounded-full dash-card-success flex items-center justify-center mb-6"
                  >
                    <CheckCircle size={48} className="text-emerald-400" />
                  </motion.div>
                  <h2 className="text-[28px] font-bold mb-2 text-center" style={{ color: 'var(--text-primary)' }}>Did You Resist?</h2>
                  <p className="text-[15px] text-center mb-8" style={{ color: 'var(--text-muted)' }}>
                    Every resisted urge is a victory. Be honest with yourself.
                  </p>

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={handleResist}
                      className="flex-1 dash-card-success rounded-2xl py-4 dash-interactive"
                    >
                      <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
                      <span className="text-[15px] font-semibold text-emerald-400">I Resisted!</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/sos')}
                      className="flex-1 dash-card-danger rounded-2xl py-4 dash-interactive"
                    >
                      <Heart size={28} className="text-red-400 mx-auto mb-2" />
                      <span className="text-[15px] font-semibold text-red-400">Need Help</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="w-28 h-28 rounded-full dash-card-success flex items-center justify-center mb-6"
              >
                <CheckCircle size={52} className="text-emerald-400" />
              </motion.div>
              <h2 className="text-[32px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Amazing!</h2>
              <p className="text-[17px] text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                You resisted another urge.
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="dash-card rounded-2xl px-6 py-3"
              >
                <span className="text-[22px] font-bold text-amber-400">+{pointsEarned} pts</span>
              </motion.div>
              <p className="text-[13px] mt-6" style={{ color: 'var(--text-muted)' }}>Redirecting to dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
