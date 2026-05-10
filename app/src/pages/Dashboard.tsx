import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  Shield, Zap, BookOpen, TreePine, AlertTriangle,
  BarChart3, Wallet, Ban, MessageCircle,
  Heart, ChevronRight, Flame, Trophy,
  Wind, Brain, Sparkles
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import GamblingCalculator from '@/components/dashboard/GamblingCalculator'

const quickActions = [
  { icon: AlertTriangle, label: 'Emergency', path: '/dashboard/sos', color: 'dash-card-danger', iconColor: 'text-red-400' },
  { icon: Brain, label: 'CBT Chat', path: '/dashboard/shield-bot', color: 'dash-card-info', iconColor: 'text-blue-400' },
  { icon: BookOpen, label: 'Recovery', path: '/dashboard/recovery', color: 'dash-card', iconColor: 'text-[var(--accent-teal)]' },
  { icon: Zap, label: 'Urge Log', path: '/dashboard/trigger-map', color: 'dash-card-warning', iconColor: 'text-amber-400' },
  { icon: TreePine, label: 'Puno Ko', path: '/dashboard/puno-ko', color: 'dash-card-success', iconColor: 'text-emerald-400' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', color: 'dash-card', iconColor: 'text-purple-400' },
  { icon: Wallet, label: 'Finance', path: '/dashboard/finance', color: 'dash-card', iconColor: 'text-emerald-400' },
  { icon: Ban, label: 'Blocker', path: '/dashboard/blocker', color: 'dash-card', iconColor: 'text-orange-400' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Kumusta? <span style={{ color: 'var(--text-muted)' }}>Stay strong.</span>
            </h1>
            <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>Your shield is active today.</p>
          </div>
          <div className="w-12 h-12 rounded-full dash-card flex items-center justify-center">
            <Shield size={22} className="text-[var(--accent-teal)]" />
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="dash-card rounded-2xl p-4 text-center min-h-[100px] flex flex-col justify-center">
          <Flame size={20} className="text-orange-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>12</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Day Streak</div>
        </div>
        <div className="dash-card rounded-2xl p-4 text-center min-h-[100px] flex flex-col justify-center">
          <Trophy size={20} className="text-amber-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>2.5k</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Points</div>
        </div>
        <div className="dash-card rounded-2xl p-4 text-center min-h-[100px] flex flex-col justify-center">
          <Wallet size={20} className="text-emerald-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>₱8.2k</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Saved</div>
        </div>
      </motion.div>

      {/* THE URGE BUTTON */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/intervention')}
          className="w-full dash-card-danger rounded-[28px] p-6 dash-interactive animate-pulse-slow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
              <Heart size={32} className="text-red-400" />
            </div>
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>I FEEL AN URGE</h2>
            <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Tap here for immediate help</p>
          </div>
        </button>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-[17px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
              onClick={() => navigate(action.path)}
              className={`${action.color} rounded-2xl p-4 dash-interactive text-left`}
            >
              <action.icon size={22} className={`${action.iconColor} mb-2`} />
              <div className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{action.label}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Breathing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 mb-6"
      >
        <button
          onClick={() => navigate('/dashboard/breathe')}
          className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center">
            <Wind size={22} className="text-[var(--accent-teal)]" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>Breathing Exercise</div>
            <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>4-7-8 technique to calm your mind</div>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
        </button>
      </motion.div>

      {/* Daily Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mb-6"
      >
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Daily Tip</h3>
        <div className="dash-card rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Sparkles size={18} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                When an urge hits, use the <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>5-minute rule</span>.
                Wait just 5 minutes before acting. Most urges fade within that time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>This Week</h3>
          <button onClick={() => navigate('/dashboard/analytics')} className="text-[13px] text-[var(--accent-teal)]">
            See All
          </button>
        </div>
        <div className="dash-card rounded-2xl p-5">
          <div className="flex items-end justify-between h-24 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [60, 80, 40, 90, 70, 50, 85]
              return (
                <div key={day} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heights[i]}%` }}
                      transition={{ duration: 0.8, delay: 0.9 + i * 0.1 }}
                      className="w-full max-w-[24px] rounded-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-teal-hover)]"
                    />
                  </div>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{day}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <GamblingCalculator />
    </DashboardLayout>
  )
}
