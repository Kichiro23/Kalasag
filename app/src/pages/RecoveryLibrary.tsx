import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Brain, Waves, Wallet, Users, Globe, Award, AlertTriangle, Lightbulb } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const categoryIcons: Record<string, typeof Brain> = {
  cbt_technique: Brain,
  urge_surfing: Waves,
  financial_recovery: Wallet,
  family_support: Users,
  cultural_context: Globe,
  success_story: Award,
  emergency_help: AlertTriangle,
  daily_tip: Lightbulb,
}

const categoryLabels: Record<string, string> = {
  cbt_technique: 'CBT Techniques',
  urge_surfing: 'Urge Surfing',
  financial_recovery: 'Financial Recovery',
  family_support: 'Family Support',
  cultural_context: 'Cultural Context',
  success_story: 'Success Stories',
  emergency_help: 'Emergency Help',
  daily_tip: 'Daily Tips',
}

export default function RecoveryLibrary() {
  const navigate = useNavigate()
  const { data: contents } = trpc.content.list.useQuery()
  const { data: progress } = trpc.content.progress.useQuery()

  const completedIds = new Set(progress?.filter(p => p.completed).map(p => p.contentId) ?? [])

  const grouped = contents?.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof contents>) ?? {}

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Recovery Library</h1>
      </div>

      <div>
        {Object.entries(grouped).map(([category, items], gi) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              {(() => {
                const Icon = categoryIcons[category] || BookOpen
                return <Icon size={18} className="text-[var(--accent-teal)]" />
              })()}
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {categoryLabels[category] || category}
              </h3>
              <span className="text-[12px] ml-auto" style={{ color: 'var(--text-muted)' }}>{items.length}</span>
            </div>

            <div className="space-y-2">
              {items.map((item, i) => {
                const isCompleted = completedIds.has(item.id)
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: gi * 0.1 + i * 0.05 }}
                    onClick={() => navigate(`/dashboard/recovery/${item.slug}`)}
                    className="w-full dash-card rounded-2xl p-4 dash-interactive flex items-center gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-teal)]/20 flex items-center justify-center shrink-0">
                      <BookOpen size={18} className="text-[var(--accent-teal)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                        {isCompleted && <CheckCircle size={14} className="text-emerald-400 shrink-0" />}
                      </div>
                      <p className="text-[12px] line-clamp-1" style={{ color: 'var(--text-muted)' }}>{item.summary}</p>
                    </div>
                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  )
}
