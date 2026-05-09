import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  Shield, Zap, BookOpen, TreePine, AlertTriangle,
  BarChart3, Wallet, Ban, MessageCircle,
  Heart, ChevronRight, Flame, Trophy,
  Wind, Brain, MapPin, Target, Sparkles
} from 'lucide-react'
import BottomNav from '@/components/BottomNav'

const quickActions = [
  { icon: AlertTriangle, label: 'Emergency', path: '/dashboard/sos', color: 'glass-red', iconColor: 'text-red-400' },
  { icon: Brain, label: 'CBT Chat', path: '/dashboard/shield-bot', color: 'glass-blue', iconColor: 'text-blue-400' },
  { icon: BookOpen, label: 'Recovery', path: '/dashboard/recovery', color: 'glass-base', iconColor: 'text-indigo-400' },
  { icon: Zap, label: 'Urge Log', path: '/dashboard/trigger-map', color: 'glass-yellow', iconColor: 'text-yellow-400' },
  { icon: TreePine, label: 'Puno Ko', path: '/dashboard/puno-ko', color: 'glass-green', iconColor: 'text-green-400' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics', color: 'glass-base', iconColor: 'text-purple-400' },
  { icon: Wallet, label: 'Finance', path: '/dashboard/finance', color: 'glass-base', iconColor: 'text-emerald-400' },
  { icon: Ban, label: 'Blocker', path: '/dashboard/blocker', color: 'glass-base', iconColor: 'text-orange-400' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#020617] pb-32 overflow-x-hidden">
      {/* Aurora Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/assets/bg-aurora.jpg)' }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#020617]/60 via-transparent to-[#020617]" />

      {/* Content */}
      <div className="relative z-10 px-5 pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight">
                Kumusta? <span className="text-[#64748B]">Stay strong.</span>
              </h1>
              <p className="text-[13px] text-[#64748B] mt-1">Your shield is active today.</p>
            </div>
            <div className="w-12 h-12 rounded-full glass-base flex items-center justify-center specular-highlight">
              <Shield size={22} className="text-indigo-400" />
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
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <Flame size={20} className="text-orange-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">12</div>
            <div className="text-[11px] text-[#64748B]">Day Streak</div>
          </div>
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <Trophy size={20} className="text-yellow-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">2.5k</div>
            <div className="text-[11px] text-[#64748B]">Points</div>
          </div>
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <Wallet size={20} className="text-emerald-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">8.2k</div>
            <div className="text-[11px] text-[#64748B]">Saved</div>
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
            className="w-full glass-red rounded-[28px] p-6 specular-highlight glass-interactive animate-pulse-slow relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                <Heart size={32} className="text-red-400" />
              </div>
              <h2 className="text-[22px] font-bold text-white mb-1">I FEEL AN URGE</h2>
              <p className="text-[13px] text-red-300/80">Tap here for immediate help</p>
            </div>
          </button>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-[17px] font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                onClick={() => navigate(action.path)}
                className={`${action.color} rounded-2xl p-4 specular-highlight glass-interactive text-left`}
              >
                <action.icon size={22} className={`${action.iconColor} mb-2`} />
                <div className="text-[15px] font-semibold text-white">{action.label}</div>
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
            className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Wind size={22} className="text-indigo-400" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[15px] font-semibold text-white">Breathing Exercise</div>
              <div className="text-[13px] text-[#64748B]">4-7-8 technique to calm your mind</div>
            </div>
            <ChevronRight size={18} className="text-[#64748B]" />
          </button>
        </motion.div>

        {/* Daily Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-6"
        >
          <h3 className="text-[17px] font-semibold text-white mb-3">Daily Tip</h3>
          <div className="glass-base rounded-2xl p-5 specular-highlight">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[15px] text-[#CBD5E1] leading-relaxed">
                  When an urge hits, use the <span className="text-white font-semibold">5-minute rule</span>. 
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
            <h3 className="text-[17px] font-semibold text-white">This Week</h3>
            <button onClick={() => navigate('/dashboard/analytics')} className="text-[13px] text-indigo-400">
              See All
            </button>
          </div>
          <div className="glass-base rounded-2xl p-5 specular-highlight">
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
                        className="w-full max-w-[24px] rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400"
                      />
                    </div>
                    <span className="text-[10px] text-[#64748B]">{day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  )
}
