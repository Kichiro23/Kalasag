import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Quote, Loader2, AlertTriangle } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: content, isLoading, error } = trpc.content.getBySlug.useQuery({ slug: slug! }, { enabled: !!slug })

  if (isLoading) {
    return (
      <DashboardLayout showNav={false}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[var(--accent-teal)] animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (error || !content) {
    return (
      <DashboardLayout showNav={false}>
        <div className="sticky top-0 z-20 dash-card px-5 py-4 -mx-5 mb-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard/stories')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
              <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>Story Not Found</h1>
            </div>
          </div>
        </div>
        <div className="text-center py-20">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
          <p className="text-[15px] text-[var(--text-secondary)]">Could not load this story.</p>
          <button
            onClick={() => navigate('/dashboard/stories')}
            className="mt-4 px-4 py-2 rounded-full bg-[var(--accent-teal)] text-white text-sm font-medium hover:brightness-110 transition-all"
          >
            Back to Stories
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout showNav={false}>
      {/* Header */}
      <div className="sticky top-0 z-20 dash-card px-5 py-4 -mx-5 mb-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/stories')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{content.title}</h1>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-[28px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{content.title}</h2>

        {/* Quote */}
        <div className="dash-card rounded-2xl p-5 mb-6 border-l-4 border-[var(--accent-teal)]">
          <Quote size={20} className="text-[var(--accent-teal)] mb-2" />
          <p className="text-[15px] italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{content.summary}</p>
        </div>

        {/* Content */}
        <div className="max-w-none">
          {content.content.split('\n').map((para, i) => {
            if (para.startsWith('###')) return <h3 key={i} className="text-[20px] font-bold mt-6 mb-3" style={{ color: 'var(--text-primary)' }}>{para.replace('###', '').trim()}</h3>
            if (para.startsWith('##')) return <h2 key={i} className="text-[24px] font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>{para.replace('##', '').trim()}</h2>
            if (para.trim().startsWith('-') || /^\d+\./.test(para.trim())) {
              return <li key={i} className="text-[15px] ml-4 mb-2" style={{ color: 'var(--text-secondary)' }}>{para.replace(/^[-\d.\s]+/, '')}</li>
            }
            if (!para.trim()) return null
            return <p key={i} className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{para}</p>
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button className="flex-1 dash-card rounded-2xl py-3 dash-interactive flex items-center justify-center gap-2">
          <Heart size={18} className="text-red-400" />
          <span className="text-[14px]" style={{ color: 'var(--text-primary)' }}>Support</span>
        </button>
        <button className="flex-1 dash-card rounded-2xl py-3 dash-interactive flex items-center justify-center gap-2">
          <Share2 size={18} className="text-[var(--accent-teal)]" />
          <span className="text-[14px]" style={{ color: 'var(--text-primary)' }}>Share</span>
        </button>
      </div>
    </DashboardLayout>
  )
}
