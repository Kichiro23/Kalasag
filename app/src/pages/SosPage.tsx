import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, MapPin, Shield, Wind, ArrowLeft, AlertTriangle, Clock } from 'lucide-react'

const hotlines = [
  { name: 'NCMH Crisis Line', number: '0966-351-4518', available: '24/7', icon: Phone },
  { name: 'GA Pilipinas', number: '0915-938-2808', available: 'Mon-Sat', icon: Phone },
  { name: 'PAGCOR RG', number: '(02) 8538-9090', available: '24/7', icon: Phone },
  { name: 'In Touch', number: '+63 917-800-1123', available: '24/7', icon: Phone },
  { name: 'HOPELINE', number: '2919', available: '24/7', icon: MessageSquare },
  { name: 'Tawag Paglaum', number: '0939-937-5433', available: '24/7', icon: Phone },
]

const quickActions = [
  { icon: Phone, label: 'Call Crisis', color: 'glass-red', path: '' },
  { icon: MessageSquare, label: 'Message Family', color: 'glass-blue', path: '' },
  { icon: MapPin, label: 'Share Location', color: 'glass-green', path: '' },
  { icon: Shield, label: 'Block Apps', color: 'glass-base', path: '/dashboard/blocker' },
  { icon: Wind, label: 'Breathe Now', color: 'glass-base', path: '/dashboard/breathe' },
  { icon: MessageSquare, label: 'Open Chat', color: 'glass-base', path: '/dashboard/chat' },
]

export default function SosPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(3)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (countdown > 0 && !active) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !active) {
      setActive(true)
    }
  }, [countdown, active])

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      {/* Red SOS Background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/assets/bg-sos.jpg)' }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-red-950/80 via-[#020617]/90 to-[#020617]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white flex items-center gap-2">
            <AlertTriangle size={22} className="text-red-400" />
            Emergency SOS
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex-1 flex flex-col items-center justify-center px-8"
            >
              <div className="glass-thick rounded-full w-48 h-48 flex items-center justify-center specular-highlight mb-8">
                <motion.span
                  key={countdown}
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-[80px] font-bold text-white"
                >
                  {countdown}
                </motion.span>
              </div>
              <p className="text-[17px] text-[#CBD5E1] text-center mb-6">
                Activating emergency mode...
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="glass-base rounded-full px-8 py-3 text-white font-medium specular-highlight glass-interactive"
              >
                Cancel
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 px-5 pb-8 overflow-y-auto"
            >
              {/* Status */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="glass-red rounded-3xl p-6 specular-highlight mb-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/30 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle size={32} className="text-red-400" />
                </div>
                <h2 className="text-[22px] font-bold text-white mb-1">SOS Active</h2>
                <p className="text-[15px] text-red-300/80">Help is on the way</p>
                <div className="flex items-center justify-center gap-2 mt-3 text-[13px] text-red-400">
                  <Clock size={14} />
                  <span>Emergency contacts notified</span>
                </div>
              </motion.div>

              {/* Quick Actions Grid */}
              <h3 className="text-[17px] font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => action.path && navigate(action.path)}
                    className={`${action.color} rounded-2xl p-4 specular-highlight glass-interactive flex flex-col items-center gap-2`}
                  >
                    <action.icon size={24} className="text-white" />
                    <span className="text-[13px] font-medium text-white">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Hotlines */}
              <h3 className="text-[17px] font-semibold text-white mb-3">Crisis Hotlines</h3>
              <div className="space-y-2">
                {hotlines.map((hotline, i) => (
                  <motion.a
                    key={hotline.name}
                    href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <hotline.icon size={18} className="text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold text-white">{hotline.name}</div>
                      <div className="text-[13px] text-[#64748B]">{hotline.number}</div>
                    </div>
                    <div className="text-[11px] text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      {hotline.available}
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Deactivate */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => navigate('/dashboard')}
                className="w-full mt-6 glass-green rounded-2xl p-4 specular-highlight glass-interactive text-center"
              >
                <span className="text-[17px] font-semibold text-green-400">I am safe now</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
