import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Gamepad2, BookOpen, CheckCircle, X, Heart, Timer } from 'lucide-react'

const steps = [
  {
    id: 'breathe',
    title: 'Take a Breath',
    description: 'Follow the breathing guide. Inhale for 4, hold for 7, exhale for 8.',
    icon: Wind,
    color: 'text-indigo-400',
    duration: 30,
  },
  {
    id: 'distraction',
    title: 'Quick Distraction',
    description: 'Choose a quick activity to redirect your mind.',
    icon: Gamepad2,
    color: 'text-yellow-400',
    duration: 0,
  },
  {
    id: 'resist',
    title: 'I Resisted!',
    description: 'You did it! Every resisted urge makes you stronger.',
    icon: CheckCircle,
    color: 'text-green-400',
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
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/50 via-[#020617] to-[#020617]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <X size={20} className="text-white" />
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-8 bg-indigo-400' : i < currentStep ? 'w-4 bg-indigo-600' : 'w-4 bg-[#1E293B]'
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
                      className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                    />
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : 1,
                        opacity: breathPhase === 'inhale' ? 0.5 : breathPhase === 'hold' ? 0.5 : 0.2,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="absolute inset-4 rounded-full border-2 border-indigo-400/40"
                    />
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.1 : breathPhase === 'hold' ? 1.1 : 1,
                        opacity: breathPhase === 'inhale' ? 0.7 : breathPhase === 'hold' ? 0.7 : 0.4,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="absolute inset-8 rounded-full bg-indigo-500/20"
                    />
                    {/* Center */}
                    <motion.div
                      animate={{
                        scale: breathPhase === 'inhale' ? 1.05 : breathPhase === 'hold' ? 1.05 : 1,
                      }}
                      transition={{ duration: breathPhase === 'hold' ? 7 : 8, ease: 'easeInOut' }}
                      className="w-32 h-32 rounded-full glass-thick flex items-center justify-center specular-highlight"
                    >
                      <Wind size={36} className="text-indigo-400" />
                    </motion.div>
                  </div>

                  <h2 className="text-[28px] font-bold text-white mb-2 text-center">
                    {breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                  </h2>
                  <p className="text-[15px] text-[#64748B] text-center mb-6">
                    Follow the rhythm. Let the urge pass.
                  </p>

                  <div className="flex items-center gap-2 text-[13px] text-[#64748B]">
                    <Timer size={14} />
                    <span>{timer}s remaining</span>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mt-6 glass-base rounded-full px-8 py-3 text-white font-medium specular-highlight glass-interactive"
                  >
                    Skip to Next
                  </button>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="w-24 h-24 rounded-full glass-thick flex items-center justify-center specular-highlight mb-6">
                    <Gamepad2 size={40} className="text-yellow-400" />
                  </div>
                  <h2 className="text-[28px] font-bold text-white mb-2 text-center">Quick Distraction</h2>
                  <p className="text-[15px] text-[#64748B] text-center mb-8">
                    Redirect your mind with a quick activity.
                  </p>

                  <div className="w-full space-y-3">
                    <button
                      onClick={() => navigate('/dashboard/breathe')}
                      className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
                    >
                      <Wind size={22} className="text-indigo-400" />
                      <span className="text-[15px] text-white font-medium">Deep Breathing</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/games')}
                      className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
                    >
                      <Gamepad2 size={22} className="text-yellow-400" />
                      <span className="text-[15px] text-white font-medium">Urge Arcade</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/recovery')}
                      className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
                    >
                      <BookOpen size={22} className="text-green-400" />
                      <span className="text-[15px] text-white font-medium">Read Recovery Content</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="mt-6 glass-green rounded-full px-8 py-3 text-green-400 font-medium specular-highlight glass-interactive"
                  >
                    I did a distraction
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-32 h-32 rounded-full glass-green flex items-center justify-center specular-highlight mb-6"
                  >
                    <CheckCircle size={48} className="text-green-400" />
                  </motion.div>
                  <h2 className="text-[28px] font-bold text-white mb-2 text-center">Did You Resist?</h2>
                  <p className="text-[15px] text-[#64748B] text-center mb-8">
                    Every resisted urge is a victory. Be honest with yourself.
                  </p>

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={handleResist}
                      className="flex-1 glass-green rounded-2xl py-4 specular-highlight glass-interactive"
                    >
                      <CheckCircle size={28} className="text-green-400 mx-auto mb-2" />
                      <span className="text-[15px] font-semibold text-green-400">I Resisted!</span>
                    </button>
                    <button
                      onClick={() => navigate('/dashboard/sos')}
                      className="flex-1 glass-red rounded-2xl py-4 specular-highlight glass-interactive"
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
                className="w-28 h-28 rounded-full glass-green flex items-center justify-center specular-highlight mb-6"
              >
                <CheckCircle size={52} className="text-green-400" />
              </motion.div>
              <h2 className="text-[32px] font-bold text-white mb-2">Amazing!</h2>
              <p className="text-[17px] text-[#CBD5E1] text-center mb-4">
                You resisted another urge.
              </p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-base rounded-2xl px-6 py-3 specular-highlight"
              >
                <span className="text-[22px] font-bold text-yellow-400">+{pointsEarned} pts</span>
              </motion.div>
              <p className="text-[13px] text-[#64748B] mt-6">Redirecting to dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
