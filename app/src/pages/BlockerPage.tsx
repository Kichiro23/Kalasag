import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Ban, Plus, ToggleLeft, ToggleRight, AlertTriangle, Shield, Globe, Gamepad2, CreditCard, PiggyBank } from 'lucide-react'
import { trpc } from '@/providers/trpc'

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
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-orange-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Blocker</h1>
        </div>

        {/* Stats */}
        <div className="px-5 mb-6">
          <div className="glass-base rounded-2xl p-5 specular-highlight">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Shield size={24} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-white">Gambling Blocker</h3>
                <p className="text-[13px] text-[#64748B]">{sites?.filter(s => s.isActive).length ?? 0} sites blocked</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#64748B]">Total blocks: {totalBlocked}</span>
              <span className="text-[13px] text-green-400">{sites?.length ?? 0} sites in list</span>
            </div>
          </div>
        </div>

        {/* Site List */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-semibold text-white">Blocked Sites</h3>
            <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full glass-base flex items-center justify-center specular-highlight">
              <Plus size={16} className="text-white" />
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
                  className="glass-base rounded-2xl p-4 specular-highlight flex items-center gap-4"
                >
                  <Icon size={20} className={site.isActive ? 'text-red-400' : 'text-[#64748B]'} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-semibold text-white truncate">{site.domain}</h4>
                    <p className="text-[12px] text-[#64748B]">{site.category} • {site.blockCount} blocks</p>
                  </div>
                  <button onClick={() => handleToggle(site.id)}>
                    {site.isActive
                      ? <ToggleRight size={28} className="text-green-400" />
                      : <ToggleLeft size={28} className="text-[#64748B]" />
                    }
                  </button>
                </motion.div>
              )
            })}
          </div>

          {(!sites || sites.length === 0) && (
            <div className="glass-base rounded-2xl p-6 specular-highlight text-center mt-4">
              <Ban size={32} className="text-[#64748B] mx-auto mb-3" />
              <p className="text-[15px] text-[#64748B]">No blocked sites yet</p>
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
            <div className="relative w-full glass-thick rounded-t-[32px] p-6 specular-highlight">
              <h3 className="text-[20px] font-bold text-white mb-4">Add Site to Block</h3>
              <input
                placeholder="Enter domain (e.g. example.com)"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-4 outline-none specular-highlight"
              />
              <button onClick={handleAdd} className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white">
                Block Site
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
