import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, ThumbsUp, Share2 } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function RecoveryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: content } = trpc.content.getBySlug.useQuery({ slug: slug! }, { enabled: !!slug })
  const { data: progress } = trpc.content.progress.useQuery()
  const markComplete = trpc.content.markComplete.useMutation()

  const isCompleted = progress?.some(p => p.contentId === content?.id && p.completed)

  const handleComplete = () => {
    if (content) {
      markComplete.mutate({ contentId: content.id })
    }
  }

  if (!content) return null

  const paragraphs = content.content.split('\n').filter(p => p.trim())

  return (
    <DashboardLayout showNav={false}>
      {/* Header */}
      <div className="sticky top-0 z-20 dash-card px-5 py-4 -mx-5 mb-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/recovery')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{content.title}</h1>
            <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{content.category.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {paragraphs.map((para, i) => {
          if (para.startsWith('###')) {
            return (
              <h3 key={i} className="text-[20px] font-bold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>
                {para.replace('###', '').trim()}
              </h3>
            )
          }
          if (para.startsWith('##')) {
            return (
              <h2 key={i} className="text-[24px] font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
                {para.replace('##', '').trim()}
              </h2>
            )
          }
          if (para.startsWith('- ') || para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.')) {
            return (
              <li key={i} className="text-[15px] leading-relaxed ml-4 mb-2" style={{ color: 'var(--text-secondary)' }}>
                {para.replace(/^[-1234567890. ]+/, '')}
              </li>
            )
          }
          if (para.includes('*') && para.split('*').length > 2) {
            const parts = para.split('*')
            return (
              <p key={i} className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? (
                    <span key={j} className="font-semibold" style={{ color: 'var(--text-primary)' }}>{part}</span>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </p>
            )
          }
          return (
            <p key={i} className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {para}
            </p>
          )
        })}
      </motion.div>

      {/* Actions */}
      <div className="mt-8 mb-8 flex gap-3">
        <button
          onClick={handleComplete}
          className={`flex-1 rounded-2xl py-4 dash-interactive flex items-center justify-center gap-2 ${
            isCompleted ? 'dash-card-success' : 'dash-card'
          }`}
        >
          <CheckCircle size={20} className={isCompleted ? 'text-emerald-400' : 'text-[var(--accent-teal)]'} />
          <span className={`text-[15px] font-semibold ${isCompleted ? 'text-emerald-400' : ''}`} style={!isCompleted ? { color: 'var(--text-primary)' } : undefined}>
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </span>
        </button>
        <button className="w-14 rounded-2xl dash-card flex items-center justify-center dash-interactive">
          <ThumbsUp size={20} style={{ color: 'var(--text-muted)' }} />
        </button>
        <button className="w-14 rounded-2xl dash-card flex items-center justify-center dash-interactive">
          <Share2 size={20} style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>
    </DashboardLayout>
  )
}
