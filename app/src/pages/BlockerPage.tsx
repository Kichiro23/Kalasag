import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Ban, Plus, ToggleLeft, ToggleRight, AlertTriangle, Shield, Globe, Gamepad2, CreditCard, PiggyBank } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const categoryIcons: Record<string, typeof Globe> = {
  casino: Globe,
  sabong: Gamepad2,
  sports_betting: Gamepad2,
  lottery: CreditCard,
  poker: Gamepad2,
  loan_shark: PiggyBank,
  betting_app: Gamepad2,
  gambling_ad: AlertTriangle,
}

export default function BlockerPage() {
  const navigate = useNavigate()
  const { data: sites } = trpc.blocker.list.useQuery()
  const toggle = trpc.blocker.toggle.useMutation()
  const addSite = trpc.blocker.add.useMutation()
  const utils = trpc.useUtils()

  const [showAdd, setShowAdd] = useState(false)
  const [domain, setDomain] = useState('')

  const handleToggle = (siteId: number) => {
    toggle.mutate({ siteId }, { onSuccess: () => utils.blocker.list.invalidate() })
  }

  const handleAdd = () => {
    if (!domain.trim()) return
    addSite.mutate(
      { domain, category: 'casino' },
      { onSuccess: () => { setShowAdd(false); setDomain(''); utils.blocker.list.invalidate() } }
    )
  }

  const totalBlocked = sites?.reduce((s, site) => s + site.blockCount, 0) ?? 0

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Blocker</h1>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="dash-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Shield size={24} className="text-orange-400" />
            </div>
            <div>
              <h3 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>Gambling Blocker</h3>
              <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{sites?.filter(s => s.isActive).length ?? 0} sites blocked</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Total blocks: {totalBlocked}</span>
            <span className="text-[13px] text-emerald-400">{sites?.length ?? 0} sites in list</span>
          </div>
        </div>
      </div>

      {/* Site List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>Blocked Sites</h3>
          <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full dash-card flex items-center justify-center dash-interactive">
            <Plus size={16} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        <div className="space-y-2">
          {sites?.map((site, i) => {
            const Icon = categoryIcons[site.category] || Globe
            return (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="dash-card rounded-2xl p-4 flex items-center gap-4"
              >
                <Icon size={20} className={site.isActive ? 'text-red-400' : ''} style={!site.isActive ? { color: 'var(--text-muted)' } : undefined} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{site.domain}</h4>
                  <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{site.category} • {site.blockCount} blocks</p>
                </div>
                <button onClick={() => handleToggle(site.id)}>
                  {site.isActive
                    ? <ToggleRight size={28} className="text-emerald-400" />
                    : <ToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                  }
                </button>
              </motion.div>
            )
          })}
        </div>

        {(!sites || sites.length === 0) && (
          <div className="dash-card rounded-2xl p-6 text-center mt-4">
            <Ban size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-[15px]" style={{ color: 'var(--text-muted)' }}>No blocked sites yet</p>
          </div>
        )}
      </div>

      {showAdd && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="fixed inset-0 z-50 flex items-end"
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAdd(false)} />
          <div className="relative w-full dash-card rounded-t-[32px] p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Add Site to Block</h3>
            <input
              placeholder="Enter domain (e.g. example.com)"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="w-full dash-card rounded-xl px-4 py-3 mb-4 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button onClick={handleAdd} className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Block Site
            </button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
