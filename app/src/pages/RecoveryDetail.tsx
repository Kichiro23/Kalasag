import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, ThumbsUp, Share2 } from 'lucide-react'
import { trpc } from '@/providers/trpc'

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
    <div className="min-h-screen bg-[#0F172A]">
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 glass-thick px-5 pt-12 pb-4 specular-highlight">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard/recovery')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-semibold text-white truncate">{content.title}</h1>
              <p className="text-[12px] text-[#64748B]">{content.category.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {paragraphs.map((para, i) => {
              if (para.startsWith('###')) {
                return (
                  <h3 key={i} className="text-[20px] font-bold text-white mt-8 mb-3">
                    {para.replace('###', '').trim()}
                  </h3>
                )
              }
              if (para.startsWith('##')) {
                return (
                  <h2 key={i} className="text-[24px] font-bold text-white mt-8 mb-4">
                    {para.replace('##', '').trim()}
                  </h2>
                )
              }
              if (para.startsWith('- ') || para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.')) {
                return (
                  <li key={i} className="text-[15px] text-[#CBD5E1] leading-relaxed ml-4 mb-2">
                    {para.replace(/^[-1234567890. ]+/, '')}
                  </li>
                )
              }
              if (para.includes('*') && para.split('*').length > 2) {
                const parts = para.split('*')
                return (
                  <p key={i} className="text-[15px] text-[#CBD5E1] leading-relaxed mb-4">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <span key={j} className="text-white font-semibold">{part}</span>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </p>
                )
              }
              return (
                <p key={i} className="text-[15px] text-[#CBD5E1] leading-relaxed mb-4">
                  {para}
                </p>
              )
            })}
          </motion.div>

          {/* Actions */}
          <div className="mt-8 mb-8 flex gap-3">
            <button
              onClick={handleComplete}
              className={`flex-1 rounded-2xl py-4 specular-highlight glass-interactive flex items-center justify-center gap-2 ${
                isCompleted ? 'glass-green' : 'glass-base'
              }`}
            >
              <CheckCircle size={20} className={isCompleted ? 'text-green-400' : 'text-indigo-400'} />
              <span className={`text-[15px] font-semibold ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </span>
            </button>
            <button className="w-14 rounded-2xl glass-base flex items-center justify-center specular-highlight glass-interactive">
              <ThumbsUp size={20} className="text-[#64748B]" />
            </button>
            <button className="w-14 rounded-2xl glass-base flex items-center justify-center specular-highlight glass-interactive">
              <Share2 size={20} className="text-[#64748B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
