import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Wind, Pause, Play } from 'lucide-react'

type Phase = 'inhale' | 'hold' | 'exhale' | 'idle'

export default function BreathingPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const [count, setCount] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const runCycle = async () => {
      setPhase('inhale')
      setCount(4)
      for (let i = 4; i > 0; i--) {
        setCount(i)
        await new Promise(r => setTimeout(r, 1000))
      }

      setPhase('hold')
      setCount(7)
      for (let i = 7; i > 0; i--) {
        setCount(i)
        await new Promise(r => setTimeout(r, 1000))
      }

      setPhase('exhale')
      setCount(8)
      for (let i = 8; i > 0; i--) {
        setCount(i)
        await new Promise(r => setTimeout(r, 1000))
      }

      setCycles(c => c + 1)
      if (isActive) runCycle()
    }

    runCycle()
  }, [isActive])

  const scale = phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : phase === 'exhale' ? 1 : 1
  const opacity = phase === 'idle' ? 0.5 : phase === 'exhale' ? 0.6 : 1

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <div className="fixed inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/assets/bg-breathe.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617] to-[#020617]" />

      <div className="relative z-10 flex flex-col h-screen">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Breathing</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Breathing Circles */}
          <div className="relative w-72 h-72 flex items-center justify-center mb-10">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: scale * (1 - i * 0.15), opacity: opacity * (1 - i * 0.2) }}
                transition={{ duration: phase === 'hold' ? 7 : phase === 'inhale' ? 4 : 8, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border-2 border-indigo-400/30"
                style={{ margin: `${i * 24}px` }}
              />
            ))}
            <motion.div
              animate={{ scale, opacity }}
              transition={{ duration: phase === 'hold' ? 7 : phase === 'inhale' ? 4 : 8, ease: 'easeInOut' }}
              className="w-40 h-40 rounded-full glass-thick flex items-center justify-center specular-highlight"
            >
              <Wind size={40} className="text-indigo-400" />
            </motion.div>
          </div>

          {/* Phase Text */}
          <motion.div
            key={phase + count}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-[28px] font-bold text-white mb-1">
              {phase === 'idle' ? 'Ready?' : phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
            </h2>
            {isActive && (
              <p className="text-[40px] font-bold text-indigo-400">{count}</p>
            )}
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => { setIsActive(!isActive); if (phase === 'idle') setPhase('inhale') }}
              className="w-20 h-20 rounded-full glass-thick flex items-center justify-center specular-highlight glass-interactive"
            >
              {isActive ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
            </button>
          </div>

          {cycles > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-[15px] text-[#64748B]"
            >
              {cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
