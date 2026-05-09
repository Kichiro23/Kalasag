import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Brain, Waves, Wallet, Users, Globe, Award, AlertTriangle, Lightbulb } from 'lucide-react'
import { trpc } from '@/providers/trpc'

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
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Recovery Library</h1>
        </div>

        <div className="px-5">
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
                  return <Icon size={18} className="text-indigo-400" />
                })()}
                <h3 className="text-[15px] font-semibold text-[#CBD5E1]">
                  {categoryLabels[category] || category}
                </h3>
                <span className="text-[12px] text-[#64748B] ml-auto">{items.length}</span>
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
                      className="w-full glass-base rounded-2xl p-4 specular-highlight glass-interactive flex items-center gap-4 text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#4338CA]/20 flex items-center justify-center shrink-0">
                        <BookOpen size={18} className="text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-semibold text-white truncate">{item.title}</h4>
                          {isCompleted && <CheckCircle size={14} className="text-green-400 shrink-0" />}
                        </div>
                        <p className="text-[12px] text-[#64748B] line-clamp-1">{item.summary}</p>
                      </div>
                      <ChevronRight size={16} className="text-[#64748B] shrink-0" />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
