import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Plus, Clock, Users, Wallet, Heart, X } from 'lucide-react'
import { trpc } from '@/providers/trpc'

const categories = [
  { id: 'location', icon: MapPin, label: 'Location', color: 'text-blue-400' },
  { id: 'time', icon: Clock, label: 'Time', color: 'text-yellow-400' },
  { id: 'person', icon: Users, label: 'Person', color: 'text-green-400' },
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
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">Trigger Map</h1>
        </div>

        {/* Category Filters */}
        <div className="px-5 mb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap ${
              !activeCategory ? 'bg-[#4338CA] text-white' : 'glass-base text-[#64748B]'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap ${
                activeCategory === cat.id ? 'bg-[#4338CA] text-white' : 'glass-base text-[#64748B]'
              }`}
            >
              <cat.icon size={12} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Triggers List */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-semibold text-white">Your Triggers</h3>
            <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full glass-base flex items-center justify-center specular-highlight">
              <Plus size={16} className="text-white" />
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
                  className="glass-base rounded-2xl p-4 specular-highlight"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {cat && <cat.icon size={18} className={cat.color + ' mt-0.5 shrink-0'} />}
                      <div>
                        <h4 className="text-[15px] font-semibold text-white">{trigger.trigger}</h4>
                        {trigger.copingStrategy && (
                          <p className="text-[12px] text-[#64748B] mt-1">Strategy: {trigger.copingStrategy}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                        trigger.riskLevel > 7 ? 'bg-red-500/20 text-red-400' :
                        trigger.riskLevel > 4 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {trigger.riskLevel}/10
                      </div>
                      <button onClick={() => deleteTrigger.mutate({ triggerId: trigger.id }, { onSuccess: () => utils.trigger.list.invalidate() })}>
                        <X size={14} className="text-[#64748B]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {(!filtered || filtered.length === 0) && (
            <div className="glass-base rounded-2xl p-6 specular-highlight text-center mt-4">
              <MapPin size={32} className="text-[#64748B] mx-auto mb-3" />
              <p className="text-[15px] text-[#64748B]">No triggers mapped yet</p>
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
            <div className="relative w-full glass-thick rounded-t-[32px] p-6 specular-highlight">
              <h3 className="text-[20px] font-bold text-white mb-4">Add Trigger</h3>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as typeof form.category }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white mb-3 outline-none specular-highlight bg-transparent"
              >
                {categories.map(c => <option key={c.id} value={c.id} className="bg-[#0F172A]">{c.label}</option>)}
              </select>
              <input
                placeholder="What triggers you?"
                value={form.trigger}
                onChange={e => setForm(f => ({ ...f, trigger: e.target.value }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-3 outline-none specular-highlight"
              />
              <div className="mb-3">
                <label className="text-[13px] text-[#64748B] mb-1 block">Risk Level: {form.riskLevel}/10</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.riskLevel}
                  onChange={e => setForm(f => ({ ...f, riskLevel: Number(e.target.value) }))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <input
                placeholder="Coping strategy"
                value={form.copingStrategy}
                onChange={e => setForm(f => ({ ...f, copingStrategy: e.target.value }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-4 outline-none specular-highlight"
              />
              <button onClick={handleAdd} className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white">
                Add Trigger
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
