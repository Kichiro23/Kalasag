import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, Users, TrendingUp } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function StoriesPage() {
  const navigate = useNavigate()
  const { data: contents } = trpc.content.list.useQuery({ category: 'success_story' })

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-red-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Real Stories</h1>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 mb-6 grid grid-cols-3 gap-3"
        >
          <div className="glass-red rounded-2xl p-4 specular-highlight text-center">
            <Award size={20} className="text-red-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">2,400+</div>
            <div className="text-[11px] text-[#64748B]">Recoveries</div>
          </div>
          <div className="glass-red rounded-2xl p-4 specular-highlight text-center">
            <Users size={20} className="text-red-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">15k+</div>
            <div className="text-[11px] text-[#64748B]">Community</div>
          </div>
          <div className="glass-red rounded-2xl p-4 specular-highlight text-center">
            <TrendingUp size={20} className="text-red-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-white">89%</div>
            <div className="text-[11px] text-[#64748B]">Success Rate</div>
          </div>
        </motion.div>

        {/* Stories */}
        <div className="px-5 space-y-4">
          {contents?.map((story, i) => (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/dashboard/stories/${story.slug}`)}
              className="w-full glass-base rounded-2xl p-5 specular-highlight glass-interactive text-left"
            >
              <h3 className="text-[18px] font-bold text-white mb-2">{story.title}</h3>
              <p className="text-[14px] text-[#CBD5E1] leading-relaxed line-clamp-3 mb-3">{story.summary}</p>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#64748B] bg-white/5 px-3 py-1 rounded-full">Success Story</span>
                <span className="text-[12px] text-[#64748B]">3 min read</span>
              </div>
            </motion.button>
          ))}

          {/* Hardcoded additional stories */}
          {[
            {
              title: "Carlos: The OFW Who Came Back Stronger",
              summary: "Carlos lost almost everything to online sabong during the pandemic. With the help of his family and Kalasag, he rebuilt his life piece by piece.",
              tag: "OFW Story"
            },
            {
              title: "The Santos Family: Healing Together",
              summary: "When papa's gambling addiction surfaced, the Santos family chose to face it together. Their story of bayanihan and recovery inspires many.",
              tag: "Family Story"
            }
          ].map((story, i) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (contents?.length ?? 0) * 0.1 + i * 0.1 }}
              className="glass-base rounded-2xl p-5 specular-highlight"
            >
              <h3 className="text-[18px] font-bold text-white mb-2">{story.title}</h3>
              <p className="text-[14px] text-[#CBD5E1] leading-relaxed mb-3">{story.summary}</p>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#64748B] bg-white/5 px-3 py-1 rounded-full">{story.tag}</span>
                <span className="text-[12px] text-[#64748B]">4 min read</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
