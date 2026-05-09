import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Quote } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: content } = trpc.content.getBySlug.useQuery({ slug: slug! }, { enabled: !!slug })

  if (!content) return null

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 glass-thick px-5 pt-12 pb-4 specular-highlight">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard/stories')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-semibold text-white truncate">{content.title}</h1>
            </div>
          </div>
        </div>

        <div className="px-5 py-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-[28px] font-bold text-white mb-4">{content.title}</h2>

            {/* Quote */}
            <div className="glass-base rounded-2xl p-5 specular-highlight mb-6 border-l-4 border-indigo-400">
              <Quote size={20} className="text-indigo-400 mb-2" />
              <p className="text-[15px] text-[#CBD5E1] italic leading-relaxed">{content.summary}</p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              {content.content.split('\n').map((para, i) => {
                if (para.startsWith('###')) return <h3 key={i} className="text-[20px] font-bold text-white mt-6 mb-3">{para.replace('###', '').trim()}</h3>
                if (para.startsWith('##')) return <h2 key={i} className="text-[24px] font-bold text-white mt-8 mb-4">{para.replace('##', '').trim()}</h2>
                if (para.trim().startsWith('-') || /^\d+\./.test(para.trim())) {
                  return <li key={i} className="text-[15px] text-[#CBD5E1] ml-4 mb-2">{para.replace(/^[-\d.\s]+/, '')}</li>
                }
                if (!para.trim()) return null
                return <p key={i} className="text-[15px] text-[#CBD5E1] leading-relaxed mb-4">{para}</p>
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button className="flex-1 glass-base rounded-2xl py-3 specular-highlight glass-interactive flex items-center justify-center gap-2">
              <Heart size={18} className="text-red-400" />
              <span className="text-[14px] text-white">Support</span>
            </button>
            <button className="flex-1 glass-base rounded-2xl py-3 specular-highlight glass-interactive flex items-center justify-center gap-2">
              <Share2 size={18} className="text-indigo-400" />
              <span className="text-[14px] text-white">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
