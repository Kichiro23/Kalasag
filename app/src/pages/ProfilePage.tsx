import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, LogOut, Shield, User, Phone, Settings, ChevronRight, Heart, Flame, Trophy } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: Heart, label: 'Emergency Contacts', path: '' },
    { icon: Shield, label: 'Privacy & Security', path: '' },
    { icon: Settings, label: 'Settings', path: '' },
    { icon: Phone, label: 'Crisis Hotlines', path: '/dashboard/sos' },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Profile</h1>
        <button onClick={logout} className="w-10 h-10 rounded-full dash-card-danger flex items-center justify-center dash-interactive">
          <LogOut size={18} className="text-red-400" />
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="dash-card rounded-3xl p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-teal)] to-purple-500 flex items-center justify-center mx-auto mb-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={36} className="text-white" />
            )}
          </div>
          <h2 className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>{user?.name ?? 'Kalasag User'}</h2>
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{user?.email ?? ''}</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <Flame size={14} className="text-orange-400" />
              <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>12 days</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={14} className="text-amber-400" />
              <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>2.5k pts</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>Protected</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => item.path && navigate(item.path)}
            className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4"
          >
            <item.icon size={20} className="text-[var(--accent-teal)]" />
            <span className="flex-1 text-left text-[15px]" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
            <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
          </motion.button>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Kalasag v1.0.0</p>
        <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>Made with care for Filipinos</p>
      </div>
    </DashboardLayout>
  )
}
