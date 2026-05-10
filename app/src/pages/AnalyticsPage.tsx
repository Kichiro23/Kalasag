import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function AnalyticsPage() {
  const navigate = useNavigate()

  const weekData = [
    { day: 'Mon', mood: 6, urges: 2 },
    { day: 'Tue', mood: 7, urges: 1 },
    { day: 'Wed', mood: 5, urges: 3 },
    { day: 'Thu', mood: 8, urges: 0 },
    { day: 'Fri', mood: 7, urges: 1 },
    { day: 'Sat', mood: 6, urges: 2 },
    { day: 'Sun', mood: 9, urges: 0 },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="dash-card rounded-2xl p-4 text-center">
          <TrendingUp size={18} className="text-emerald-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>87%</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Resist Rate</div>
        </div>
        <div className="dash-card rounded-2xl p-4 text-center">
          <Calendar size={18} className="text-[var(--accent-teal)] mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>12</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Day Streak</div>
        </div>
        <div className="dash-card rounded-2xl p-4 text-center">
          <Activity size={18} className="text-orange-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>24</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Urges Logged</div>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="mb-6">
        <div className="dash-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <BarChart3 size={18} className="text-[var(--accent-teal)]" />
              Mood This Week
            </h3>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Avg: 6.9</span>
          </div>
          <div className="flex items-end justify-between h-32 gap-3">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.mood / 10) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`w-full max-w-[28px] rounded-full ${
                    d.mood >= 7 ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' :
                    d.mood >= 5 ? 'bg-gradient-to-t from-amber-600 to-amber-400' :
                    'bg-gradient-to-t from-red-600 to-red-400'
                  }`}
                />
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urge Frequency */}
      <div className="mb-6">
        <div className="dash-card rounded-2xl p-5">
          <h3 className="text-[17px] font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Urges Per Day</h3>
          <div className="flex items-end justify-between h-24 gap-3">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min(100, (d.urges / 5) * 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className={`w-full max-w-[28px] rounded-full ${
                    d.urges === 0 ? 'bg-emerald-500' :
                    d.urges <= 2 ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                />
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div>
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Insights</h3>
        <div className="space-y-2">
          {[
            { text: 'Your best day was Thursday with mood 8/10', color: 'text-emerald-400' },
            { text: 'Weekend urges are lower than weekdays', color: 'text-[var(--accent-teal)]' },
            { text: 'You resisted 87% of all urges this week', color: 'text-amber-400' },
          ].map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="dash-card rounded-2xl p-4 flex items-center gap-3"
            >
              <Activity size={16} className={insight.color} />
              <span className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{insight.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
