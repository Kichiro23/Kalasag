import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Shield, LogIn } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    // Use Kimi OAuth
    const authUrl = new URL('/api/oauth/authorize', window.location.origin)
    window.location.href = authUrl.toString()
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/assets/bg-aurora.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)] to-[var(--bg-primary)]" />

      <div className="relative z-10 flex-1 flex flex-col px-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              src="/assets/shield-logo.png"
              alt="Kalasag"
              className="w-28 h-28 mx-auto mb-6 object-contain"
            />
            <h1 className="text-[36px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Kalasag</h1>
            <p className="text-[15px] mb-2" style={{ color: 'var(--text-muted)' }}>Your Digital Shield</p>
            <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Laban sa sugal. Lakas ng pamilya.</p>
          </motion.div>
        </div>

        <div className="pb-12 space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            className="w-full dash-card rounded-2xl py-4 dash-interactive flex items-center justify-center gap-3"
          >
            <Shield size={20} className="text-[var(--accent-teal)]" />
            <span className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>Login with Kalasag</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/dashboard')}
            className="w-full dash-card rounded-2xl py-4 dash-interactive flex items-center justify-center gap-3"
          >
            <LogIn size={18} style={{ color: 'var(--text-muted)' }} />
            <span className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Continue as Guest</span>
          </motion.button>

          <p className="text-center text-[12px] pt-2" style={{ color: 'var(--text-muted)' }}>
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
