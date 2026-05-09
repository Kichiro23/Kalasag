import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Shield, AlertTriangle, Heart, Activity, ChevronRight } from 'lucide-react'

const familyMembers = [
  { name: 'Mang Juan', status: 'stable', risk: 35, lastCheck: '2h ago' },
  { name: 'Maria', status: 'warning', risk: 72, lastCheck: '5h ago' },
]

export default function FamilyDashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-green-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Family Dashboard</h1>
        </div>

        {/* Family Members */}
        <div className="px-5 mb-6">
          <h3 className="text-[17px] font-semibold text-white mb-3">Your Family</h3>
          <div className="space-y-3">
            {familyMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-base rounded-2xl p-5 specular-highlight"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    member.status === 'stable' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  }`}>
                    <Users size={20} className={member.status === 'stable' ? 'text-green-400' : 'text-yellow-400'} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[17px] font-semibold text-white">{member.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Activity size={12} className={member.risk > 60 ? 'text-red-400' : 'text-green-400'} />
                      <span className="text-[12px] text-[#64748B]">Risk: {member.risk}% • {member.lastCheck}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#64748B]" />
                </div>

                {/* Risk Bar */}
                <div className="mt-3 w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${member.risk}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${
                      member.risk > 60 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                      member.risk > 40 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                      'bg-gradient-to-r from-green-600 to-green-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 mb-6">
          <h3 className="text-[17px] font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Heart, label: 'Send Support', color: 'glass-red', iconColor: 'text-red-400' },
              { icon: AlertTriangle, label: 'Check In', color: 'glass-yellow', iconColor: 'text-yellow-400' },
              { icon: Shield, label: 'View Activity', color: 'glass-base', iconColor: 'text-indigo-400' },
              { icon: Users, label: 'Manage Access', color: 'glass-base', iconColor: 'text-green-400' },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`${action.color} rounded-2xl p-4 specular-highlight glass-interactive flex flex-col items-center gap-2`}
              >
                <action.icon size={22} className={action.iconColor} />
                <span className="text-[13px] font-medium text-white">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="px-5">
          <h3 className="text-[17px] font-semibold text-white mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {[
              { text: 'Maria had a strong urge at 8PM', time: 'Yesterday', type: 'warning' },
              { text: 'Mang Juan completed daily check', time: '2h ago', type: 'success' },
              { text: 'Maria resisted an urge!', time: '5h ago', type: 'success' },
            ].map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="glass-base rounded-2xl p-4 specular-highlight flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                <div className="flex-1">
                  <p className="text-[14px] text-[#CBD5E1]">{alert.text}</p>
                  <p className="text-[11px] text-[#64748B]">{alert.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
