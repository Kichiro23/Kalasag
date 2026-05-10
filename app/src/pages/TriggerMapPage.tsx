import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Plus, Clock, Users, Wallet, Heart, X } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

const categories = [
  { id: 'location', icon: MapPin, label: 'Location', color: 'text-blue-400' },
  { id: 'time', icon: Clock, label: 'Time', color: 'text-amber-400' },
  { id: 'person', icon: Users, label: 'Person', color: 'text-emerald-400' },
  { id: 'money', icon: Wallet, label: 'Money', color: 'text-emerald-400' },
  { id: 'emotion', icon: Heart, label: 'Emotion', color: 'text-pink-400' },
]

export default function TriggerMapPage() {
  const navigate = useNavigate()
  const { data: triggers } = trpc.trigger.list.useQuery()
  const addTrigger = trpc.trigger.add.useMutation()
  const deleteTrigger = trpc.trigger.delete.useMutation()
  const utils = trpc.useUtils()

  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ category: 'location' as const, trigger: '', riskLevel: 5, copingStrategy: '' })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleAdd = () => {
    if (!form.trigger) return
    addTrigger.mutate(form, {
      onSuccess: () => { setShowAdd(false); setForm({ category: 'location', trigger: '', riskLevel: 5, copingStrategy: '' }); utils.trigger.list.invalidate() }
    })
  }

  const filtered = activeCategory
    ? triggers?.filter(t => t.category === activeCategory)
    : triggers

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Trigger Map</h1>
      </div>

      {/* Category Filters */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
            !activeCategory ? 'bg-[var(--accent-teal)] text-white' : 'dash-card'
          }`}
          style={activeCategory ? { color: 'var(--text-muted)' } : undefined}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id ? 'bg-[var(--accent-teal)] text-white' : 'dash-card'
            }`}
            style={activeCategory !== cat.id ? { color: 'var(--text-muted)' } : undefined}
          >
            <cat.icon size={12} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Triggers List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>Your Triggers</h3>
          <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full dash-card flex items-center justify-center dash-interactive">
            <Plus size={16} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        <div className="space-y-2">
          {filtered?.map((trigger, i) => {
            const cat = categories.find(c => c.id === trigger.category)
            return (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="dash-card rounded-2xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {cat && <cat.icon size={18} className={cat.color + ' mt-0.5 shrink-0'} />}
                    <div>
                      <h4 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{trigger.trigger}</h4>
                      {trigger.copingStrategy && (
                        <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>Strategy: {trigger.copingStrategy}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                      trigger.riskLevel > 7 ? 'bg-red-500/20 text-red-400' :
                      trigger.riskLevel > 4 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {trigger.riskLevel}/10
                    </div>
                    <button onClick={() => deleteTrigger.mutate({ triggerId: trigger.id }, { onSuccess: () => utils.trigger.list.invalidate() })}>
                      <X size={14} style={{ color: 'var(--text-muted)' }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {(!filtered || filtered.length === 0) && (
          <div className="dash-card rounded-2xl p-6 text-center mt-4">
            <MapPin size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-[15px]" style={{ color: 'var(--text-muted)' }}>No triggers mapped yet</p>
          </div>
        )}
      </div>

      {/* Add Trigger Sheet */}
      {showAdd && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="fixed inset-0 z-50 flex items-end"
        >
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAdd(false)} />
          <div className="relative w-full dash-card rounded-t-[32px] p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Add Trigger</h3>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value as typeof form.category }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-3 outline-none bg-transparent"
              style={{ color: 'var(--text-primary)' }}
            >
              {categories.map(c => <option key={c.id} value={c.id} style={{ backgroundColor: 'var(--bg-primary)' }}>{c.label}</option>)}
            </select>
            <input
              placeholder="What triggers you?"
              value={form.trigger}
              onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-3 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <div className="mb-3">
              <label className="text-[13px] mb-1 block" style={{ color: 'var(--text-muted)' }}>Risk Level: {form.riskLevel}/10</label>
              <input
                type="range"
                min={1}
                max={10}
                value={form.riskLevel}
                onChange={e => setForm(f => ({ ...f, riskLevel: Number(e.target.value) }))}
                className="w-full accent-[var(--accent-teal)]"
              />
            </div>
            <input
              placeholder="Coping strategy"
              value={form.copingStrategy}
              onChange={e => setForm(f => ({ ...f, copingStrategy: e.target.value }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-4 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button onClick={handleAdd} className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Add Trigger
            </button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
