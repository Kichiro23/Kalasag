import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Shield, AlertTriangle, Heart, Activity, ChevronRight } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const familyMembers = [
  { name: 'Mang Juan', status: 'stable', risk: 35, lastCheck: '2h ago' },
  { name: 'Maria', status: 'warning', risk: 72, lastCheck: '5h ago' },
]

export default function FamilyDashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Family Dashboard</h1>
      </div>

      {/* Family Members */}
      <div className="mb-6">
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Your Family</h3>
        <div className="space-y-3">
          {familyMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="dash-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  member.status === 'stable' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                }`}>
                  <Users size={20} className={member.status === 'stable' ? 'text-emerald-400' : 'text-amber-400'} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>{member.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Activity size={12} className={member.risk > 60 ? 'text-red-400' : 'text-emerald-400'} />
                    <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Risk: {member.risk}% • {member.lastCheck}</span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>

              {/* Risk Bar */}
              <div className="mt-3 w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${member.risk}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${
                    member.risk > 60 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                    member.risk > 40 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                    'bg-gradient-to-r from-emerald-600 to-emerald-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Heart, label: 'Send Support', color: 'dash-card-danger', iconColor: 'text-red-400' },
            { icon: AlertTriangle, label: 'Check In', color: 'dash-card-warning', iconColor: 'text-amber-400' },
            { icon: Shield, label: 'View Activity', color: 'dash-card', iconColor: 'text-[var(--accent-teal)]' },
            { icon: Users, label: 'Manage Access', color: 'dash-card', iconColor: 'text-emerald-400' },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`${action.color} rounded-2xl p-4 dash-interactive flex flex-col items-center gap-2`}
            >
              <action.icon size={22} className={action.iconColor} />
              <span className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Recent Alerts</h3>
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
              className="dash-card rounded-2xl p-4 flex items-center gap-3"
            >
              <div className={`w-2 h-2 rounded-full ${alert.type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <div className="flex-1">
                <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{alert.text}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{alert.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
