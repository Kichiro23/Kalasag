import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Heart, Users, Wind, ChevronRight, Sparkles } from 'lucide-react'

const slides = [
  {
    icon: Shield,
    title: 'Welcome to Kalasag',
    subtitle: 'Your Digital Shield',
    description: 'Kalasag means "shield" in Filipino. We are here to protect you from gambling addiction and help you build a stronger future.',
    color: 'text-[var(--accent-teal)]',
    bg: 'from-[var(--accent-teal)]/20 to-transparent',
  },
  {
    icon: Heart,
    title: 'Crisis Support',
    subtitle: 'When You Need It Most',
    description: 'One tap connects you to crisis hotlines, breathing exercises, and emergency interventions. You are never alone.',
    color: 'text-red-400',
    bg: 'from-red-500/20 to-transparent',
  },
  {
    icon: Wind,
    title: 'CBT Techniques',
    subtitle: 'Science-Backed Tools',
    description: 'Shield Bot guides you through Cognitive Behavioral Therapy exercises proven to reduce gambling urges.',
    color: 'text-blue-400',
    bg: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Users,
    title: 'Bayanihan',
    subtitle: 'Community Support',
    description: 'Join anonymous peer support groups. In Filipino culture, bayanihan means helping each other through difficult times.',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/20 to-transparent',
  },
  {
    icon: Sparkles,
    title: 'Ready?',
    subtitle: 'Start Your Journey',
    description: 'Every recovery journey starts with a single step. Take that step today with Kalasag by your side.',
    color: 'text-amber-400',
    bg: 'from-amber-500/20 to-transparent',
  },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)

  const current = slides[slide]
  const isLast = slide === slides.length - 1

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bg} opacity-50`} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/40 via-transparent to-[var(--bg-primary)]" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-2 h-2 rounded-full bg-[var(--accent-teal)]/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <div className="relative z-10 flex-1 flex flex-col px-8">
        {/* Skip */}
        <div className="flex justify-end pt-12">
          <button onClick={() => navigate('/login')} className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 rounded-3xl dash-card flex items-center justify-center mx-auto mb-8"
              >
                <current.icon size={40} className={current.color} />
              </motion.div>

              {/* Shield Logo for first slide */}
              {slide === 0 && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  src="/assets/shield-logo.png"
                  alt="Kalasag"
                  className="w-20 h-20 mx-auto mb-6 object-contain"
                />
              )}

              <h2 className="text-[15px] font-medium mb-2" style={{ color: 'var(--accent-teal)' }}>{current.subtitle}</h2>
              <h1 className="text-[32px] font-bold mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>{current.title}</h1>
              <p className="text-[17px] leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="pb-12">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? 'w-8 bg-[var(--accent-teal)]' : 'w-2 bg-[var(--border-subtle)]'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => isLast ? navigate('/login') : setSlide(s => s + 1)}
            className="w-full dash-card rounded-2xl py-4 dash-interactive flex items-center justify-center gap-2"
          >
            <span className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              {isLast ? 'Get Started' : 'Continue'}
            </span>
            <ChevronRight size={20} style={{ color: 'var(--text-primary)' }} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
