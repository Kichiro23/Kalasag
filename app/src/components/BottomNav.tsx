import { useLocation, useNavigate } from 'react-router'
import { Home, MessageCircle, Shield, User } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/dashboard/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/dashboard', icon: Shield, label: 'Shield', action: 'shield' },
  { path: '/dashboard/profile', icon: User, label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4">
        <div className="dash-nav rounded-[28px] flex items-center justify-around py-3 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.action === 'shield') {
                  navigate('/dashboard')
                } else {
                  navigate(tab.path)
                }
              }}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1"
            >
              {isActive(tab.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[var(--accent-teal)] rounded-2xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={22}
                className={`relative z-10 ${
                  isActive(tab.path) ? 'text-white' : 'text-[var(--text-muted)]'
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${
                  isActive(tab.path) ? 'text-white' : 'text-[var(--text-muted)]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
