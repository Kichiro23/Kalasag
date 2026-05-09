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
    <div className="min-h-screen bg-[#020617] flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/assets/bg-aurora.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617] to-[#020617]" />

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
            <h1 className="text-[36px] font-bold text-white mb-2">Kalasag</h1>
            <p className="text-[15px] text-[#64748B] mb-2">Your Digital Shield</p>
            <p className="text-[13px] text-[#64748B]">Laban sa sugal. Lakas ng pamilya.</p>
          </motion.div>
        </div>

        <div className="pb-12 space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogin}
            className="w-full glass-thick rounded-2xl py-4 specular-highlight glass-interactive flex items-center justify-center gap-3"
          >
            <Shield size={20} className="text-indigo-400" />
            <span className="text-[17px] font-semibold text-white">Login with Kalasag</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/dashboard')}
            className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive flex items-center justify-center gap-3"
          >
            <LogIn size={18} className="text-[#64748B]" />
            <span className="text-[15px] text-[#CBD5E1]">Continue as Guest</span>
          </motion.button>

          <p className="text-center text-[12px] text-[#64748B] pt-2">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
