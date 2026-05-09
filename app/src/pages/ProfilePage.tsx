import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, LogOut, Shield, User, Phone, Settings, ChevronRight, Heart, Flame, Trophy } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

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
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Profile</h1>
          <button onClick={logout} className="w-10 h-10 rounded-full glass-red flex items-center justify-center specular-highlight">
            <LogOut size={18} className="text-red-400" />
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 mb-6"
        >
          <div className="glass-thick rounded-3xl p-6 specular-highlight text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={36} className="text-white" />
              )}
            </div>
            <h2 className="text-[20px] font-bold text-white">{user?.name ?? 'Kalasag User'}</h2>
            <p className="text-[13px] text-[#64748B]">{user?.email ?? ''}</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Flame size={14} className="text-orange-400" />
                <span className="text-[13px] text-white">12 days</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-[13px] text-white">2.5k pts</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-green-400" />
                <span className="text-[13px] text-white">Protected</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="px-5 space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => item.path && navigate(item.path)}
              className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
            >
              <item.icon size={20} className="text-indigo-400" />
              <span className="flex-1 text-left text-[15px] text-white">{item.label}</span>
              <ChevronRight size={16} className="text-[#64748B]" />
            </motion.button>
          ))}
        </div>

        {/* App Info */}
        <div className="px-5 mt-8 text-center">
          <p className="text-[12px] text-[#64748B]">Kalasag v1.0.0</p>
          <p className="text-[11px] text-[#64748B] mt-1">Made with care for Filipinos</p>
        </div>
      </div>
    </div>
  )
}
