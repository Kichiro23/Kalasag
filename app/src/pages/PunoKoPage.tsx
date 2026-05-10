import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, TreePine, Trophy, Droplets, Sun, Sparkles } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const TREE_TYPES = [
  { id: 'oak', name: 'Oak', emoji: '', growth: 0 },
  { id: 'pine', name: 'Pine', emoji: '', growth: 25 },
  { id: 'balete', name: 'Balete', emoji: '', growth: 50 },
  { id: 'narra', name: 'Narra', emoji: '', growth: 75 },
]

export default function PunoKoPage() {
  const navigate = useNavigate()
  const [treeGrowth, setTreeGrowth] = useState(35)
  const [shieldPoints] = useState(2500)
  const [streakDays] = useState(12)
  const [showMilestone, setShowMilestone] = useState(false)

  const handleWater = () => {
    if (treeGrowth < 100) {
      setTreeGrowth(g => Math.min(100, g + 5))
      if (treeGrowth + 5 >= 50 && treeGrowth < 50) {
        setShowMilestone(true)
        setTimeout(() => setShowMilestone(false), 3000)
      }
    }
  }

  const treeScale = 0.5 + (treeGrowth / 100) * 0.5
  const leafOpacity = treeGrowth / 100

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Puno Ko</h1>
        </div>
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-400" />
          <span className="text-[14px] text-amber-400 font-semibold">{shieldPoints} pts</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 flex gap-3">
        <div className="dash-card rounded-2xl px-4 py-2 flex items-center gap-2">
          <Sun size={14} className="text-orange-400" />
          <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{streakDays} day streak</span>
        </div>
        <div className="dash-card rounded-2xl px-4 py-2 flex items-center gap-2">
          <TreePine size={14} className="text-emerald-400" />
          <span className="text-[13px]" style={{ color: 'var(--text-primary)' }}>{treeGrowth}% grown</span>
        </div>
      </div>

      {/* Tree Display */}
      <div className="flex flex-col items-center justify-center py-8">
        <motion.div
          animate={{ scale: treeScale }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="relative"
        >
          {/* Tree SVG */}
          <svg width="200" height="240" viewBox="0 0 200 240" fill="none" className="drop-shadow-2xl">
            {/* Trunk */}
            <motion.path
              d="M90 240 L95 180 L85 140 L90 100 L100 80 L110 100 L105 140 L115 180 L110 240Z"
              fill="#5D4037"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            {/* Canopy layers */}
            <motion.circle
              cx="100" cy="70" r="50"
              fill={`rgba(13, 148, 136, ${leafOpacity})`}
              animate={{ opacity: leafOpacity }}
            />
            <motion.circle
              cx="70" cy="90" r="35"
              fill={`rgba(20, 184, 166, ${leafOpacity * 0.8})`}
              animate={{ opacity: leafOpacity }}
            />
            <motion.circle
              cx="130" cy="90" r="35"
              fill={`rgba(45, 212, 191, ${leafOpacity * 0.8})`}
              animate={{ opacity: leafOpacity }}
            />
            <motion.circle
              cx="85" cy="50" r="30"
              fill={`rgba(16, 185, 129, ${leafOpacity * 0.6})`}
              animate={{ opacity: leafOpacity }}
            />
            <motion.circle
              cx="115" cy="50" r="30"
              fill={`rgba(52, 211, 153, ${leafOpacity * 0.6})`}
              animate={{ opacity: leafOpacity }}
            />
          </svg>

          {/* Glow effect */}
          {treeGrowth > 50 && (
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[var(--accent-teal)]/20 blur-3xl -z-10"
            />
          )}
        </motion.div>
      </div>

      {/* Growth Bar */}
      <div className="mb-6">
        <div className="dash-card rounded-full h-3 overflow-hidden">
          <motion.div
            animate={{ width: `${treeGrowth}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="h-full bg-gradient-to-r from-[var(--accent-teal)] via-purple-500 to-[var(--accent-teal)] rounded-full"
          />
        </div>
        <p className="text-center text-[13px] mt-2" style={{ color: 'var(--text-muted)' }}>{treeGrowth}% grown - Level {Math.floor(treeGrowth / 25) + 1}</p>
      </div>

      {/* Actions */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={handleWater}
          className="flex-1 dash-card-info rounded-2xl py-4 dash-interactive flex items-center justify-center gap-2"
        >
          <Droplets size={20} className="text-blue-400" />
          <span className="text-[15px] font-semibold text-blue-400">Water Tree</span>
        </button>
        <button
          onClick={() => setTreeGrowth(g => Math.min(100, g + 10))}
          className="flex-1 dash-card-success rounded-2xl py-4 dash-interactive flex items-center justify-center gap-2"
        >
          <Sparkles size={20} className="text-emerald-400" />
          <span className="text-[15px] font-semibold text-emerald-400">Fertilize</span>
        </button>
      </div>

      {/* Milestone celebration */}
      {showMilestone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="dash-card rounded-3xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <Trophy size={48} className="text-amber-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-[24px] font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Milestone!</h3>
            <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Your tree reached Level 3!</p>
          </div>
        </motion.div>
      )}

      {/* Tree Collection */}
      <div>
        <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Tree Collection</h3>
        <div className="grid grid-cols-4 gap-2">
          {TREE_TYPES.map(tree => (
            <div
              key={tree.id}
              className={`dash-card rounded-2xl p-3 text-center ${
                treeGrowth >= tree.growth ? '' : 'opacity-40'
              }`}
            >
              <TreePine size={24} className={`mx-auto mb-1 ${treeGrowth >= tree.growth ? 'text-emerald-400' : ''}`} style={treeGrowth < tree.growth ? { color: 'var(--text-muted)' } : undefined} />
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{tree.name}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
