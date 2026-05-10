import { useNavigate, Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Shield, Zap, BookOpen, TreePine, AlertTriangle,
  BarChart3, Wallet, Ban, Heart,
  ChevronRight, Flame, Trophy,
  Wind, Brain, Sparkles, LayoutDashboard,
  ArrowLeft,
} from 'lucide-react'
import Layout from '@/components/layout/Layout'
import GamblingCalculator from '@/components/dashboard/GamblingCalculator'

const quickActions = [
  { icon: AlertTriangle, label: 'Emergency', path: '/dashboard/sos', color: 'border-red-500/20 bg-red-500/5', iconColor: 'text-red-400' },
  { icon: Brain, label: 'CBT Chat', path: '/dashboard/shield-bot', color: 'border-blue-500/20 bg-blue-500/5', iconColor: 'text-blue-400' },
  { icon: BookOpen, label: 'Recovery', path: '/dashboard/recovery', color: 'border-[var(--accent-teal)]/20 bg-[var(--accent-teal)]/5', iconColor: 'text-[var(--accent-teal)]' },
  { icon: Zap, label: 'Urge Log', path: '/dashboard/trigger-map', color: 'border-amber-500/20 bg-amber-500/5', iconColor: 'text-amber-400' },
  { icon: TreePine, label: 'Puno Ko', path: '/dashboard/puno-ko', color: 'border-emerald-500/20 bg-emerald-500/5', iconColor: 'text-emerald-400' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', color: 'border-purple-500/20 bg-purple-500/5', iconColor: 'text-purple-400' },
  { icon: Wallet, label: 'Finance', path: '/dashboard/finance', color: 'border-emerald-500/20 bg-emerald-500/5', iconColor: 'text-emerald-400' },
  { icon: Ban, label: 'Blocker', path: '/dashboard/blocker', color: 'border-orange-500/20 bg-orange-500/5', iconColor: 'text-orange-400' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-eyebrow block mb-4"
          >
            Your Recovery Space
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            Your Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            Track your progress, manage urges, and access all your recovery tools in one place. Completely anonymous — no account required.
          </motion.p>
        </div>
      </section>

      {/* Back Button */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Stats Row */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="glass-card rounded-2xl p-5 text-center">
              <Flame size={20} className="text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">12</div>
              <div className="text-[11px] text-[var(--text-muted)]">Day Streak</div>
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <Trophy size={20} className="text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">2.5k</div>
              <div className="text-[11px] text-[var(--text-muted)]">Points</div>
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <Wallet size={20} className="text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[var(--text-primary)]">₱8.2k</div>
              <div className="text-[11px] text-[var(--text-muted)]">Saved</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urge CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            onClick={() => navigate('/intervention')}
            className="w-full glass-card border-red-500/30 bg-red-500/5 rounded-3xl p-6 dash-interactive relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                <Heart size={28} className="text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">I FEEL AN URGE</h2>
              <p className="text-sm text-[var(--text-secondary)]">Tap here for immediate help</p>
            </div>
          </motion.button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                onClick={() => navigate(action.path)}
                className={`glass-card border ${action.color} rounded-2xl p-4 dash-interactive text-left`}
              >
                <action.icon size={20} className={`${action.iconColor} mb-2`} />
                <div className="text-sm font-semibold text-[var(--text-primary)]">{action.label}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => navigate('/dashboard/breathe')}
            className="w-full glass-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center">
              <Wind size={18} className="text-[var(--accent-teal)]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Breathing Exercise</div>
              <div className="text-xs text-[var(--text-muted)]">4-7-8 technique to calm your mind</div>
            </div>
            <ChevronRight size={16} className="text-[var(--text-muted)]" />
          </motion.button>
        </div>
      </section>

      {/* Daily Tip */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <Sparkles size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Daily Tip</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  When an urge hits, use the <span className="font-semibold text-[var(--text-primary)]">5-minute rule</span>. Wait just 5 minutes before acting. Most urges fade within that time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly Progress */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">This Week</h3>
              <button onClick={() => navigate('/dashboard/analytics')} className="text-xs text-[var(--accent-teal)] hover:underline">
                See All
              </button>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-end justify-between h-24 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [60, 80, 40, 90, 70, 50, 85]
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heights[i]}%` }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                          className="w-full max-w-[24px] rounded-full bg-gradient-to-t from-[var(--accent-teal)] to-[var(--accent-teal-hover)]"
                        />
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">{day}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <GamblingCalculator />
        </div>
      </section>
    </Layout>
  )
}
