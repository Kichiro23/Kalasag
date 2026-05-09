import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react'

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

  const maxMood = Math.max(...weekData.map(d => d.mood))

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Analytics</h1>
        </div>

        {/* Summary Cards */}
        <div className="px-5 mb-6 grid grid-cols-3 gap-3">
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <TrendingUp size={18} className="text-green-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">87%</div>
            <div className="text-[11px] text-[#64748B]">Resist Rate</div>
          </div>
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <Calendar size={18} className="text-indigo-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">12</div>
            <div className="text-[11px] text-[#64748B]">Day Streak</div>
          </div>
          <div className="glass-base rounded-2xl p-4 specular-highlight text-center">
            <Activity size={18} className="text-orange-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">24</div>
            <div className="text-[11px] text-[#64748B]">Urges Logged</div>
          </div>
        </div>

        {/* Mood Chart */}
        <div className="px-5 mb-6">
          <div className="glass-base rounded-2xl p-5 specular-highlight">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-semibold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-indigo-400" />
                Mood This Week
              </h3>
              <span className="text-[12px] text-[#64748B]">Avg: 6.9</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-3">
              {weekData.map((d, i) => (
                <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.mood / 10) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-full max-w-[28px] rounded-full ${
                      d.mood >= 7 ? 'bg-gradient-to-t from-green-600 to-green-400' :
                      d.mood >= 5 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' :
                      'bg-gradient-to-t from-red-600 to-red-400'
                    }`}
                  />
                  <span className="text-[10px] text-[#64748B]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Urge Frequency */}
        <div className="px-5 mb-6">
          <div className="glass-base rounded-2xl p-5 specular-highlight">
            <h3 className="text-[17px] font-semibold text-white mb-4">Urges Per Day</h3>
            <div className="flex items-end justify-between h-24 gap-3">
              {weekData.map((d, i) => (
                <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.min(100, (d.urges / 5) * 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className={`w-full max-w-[28px] rounded-full ${
                      d.urges === 0 ? 'bg-green-500' :
                      d.urges <= 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  />
                  <span className="text-[10px] text-[#64748B]">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="px-5">
          <h3 className="text-[17px] font-semibold text-white mb-3">Insights</h3>
          <div className="space-y-2">
            {[
              { text: 'Your best day was Thursday with mood 8/10', color: 'text-green-400' },
              { text: 'Weekend urges are lower than weekdays', color: 'text-indigo-400' },
              { text: 'You resisted 87% of all urges this week', color: 'text-yellow-400' },
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass-base rounded-2xl p-4 specular-highlight flex items-center gap-3"
              >
                <Activity size={16} className={insight.color} />
                <span className="text-[14px] text-[#CBD5E1]">{insight.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
