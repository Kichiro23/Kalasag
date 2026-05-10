import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Award, Users, TrendingUp } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function StoriesPage() {
  const navigate = useNavigate()
  const { data: contents } = trpc.content.list.useQuery({ category: 'success_story' })

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Real Stories</h1>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid grid-cols-3 gap-3"
      >
        <div className="dash-card-danger rounded-2xl p-4 text-center">
          <Award size={20} className="text-red-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>2,400+</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Recoveries</div>
        </div>
        <div className="dash-card-danger rounded-2xl p-4 text-center">
          <Users size={20} className="text-red-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>15k+</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Community</div>
        </div>
        <div className="dash-card-danger rounded-2xl p-4 text-center">
          <TrendingUp size={20} className="text-red-400 mx-auto mb-1" />
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>89%</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Success Rate</div>
        </div>
      </motion.div>

      {/* Stories */}
      <div className="space-y-4">
        {contents?.map((story, i) => (
          <motion.button
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/dashboard/stories/${story.slug}`)}
            className="w-full dash-card rounded-2xl p-5 dash-interactive text-left"
          >
            <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{story.title}</h3>
            <p className="text-[14px] leading-relaxed line-clamp-3 mb-3" style={{ color: 'var(--text-secondary)' }}>{story.summary}</p>
            <div className="flex items-center gap-2">
              <span className="text-[12px] px-3 py-1 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--border-subtle)' }}>Success Story</span>
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>3 min read</span>
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
            className="dash-card rounded-2xl p-5"
          >
            <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{story.title}</h3>
            <p className="text-[14px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{story.summary}</p>
            <div className="flex items-center gap-2">
              <span className="text-[12px] px-3 py-1 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--border-subtle)' }}>{story.tag}</span>
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>4 min read</span>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  )
}
