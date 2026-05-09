import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet, TrendingDown, Plus, CheckCircle } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function FinancePage() {
  const navigate = useNavigate()
  const { data: debts } = trpc.finance.debts.useQuery()
  const { data: stats } = trpc.finance.stats.useQuery()
  const addDebt = trpc.finance.addDebt.useMutation()
  const utils = trpc.useUtils()

  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ creditor: '', amount: '', remaining: '' })

  const handleAdd = () => {
    if (!form.creditor || !form.amount || !form.remaining) return
    addDebt.mutate(
      { creditor: form.creditor, amount: form.amount, remaining: form.remaining },
      { onSuccess: () => { setShowAdd(false); setForm({ creditor: '', amount: '', remaining: '' }); utils.finance.debts.invalidate() } }
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-8">
      <div className="fixed inset-0 bg-gradient-to-b from-emerald-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 px-5 pt-12 pb-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[22px] font-bold text-white">My Finances</h1>
        </div>

        {/* Stats Cards */}
        <div className="px-5 mb-6 grid grid-cols-2 gap-3">
          <div className="glass-red rounded-2xl p-4 specular-highlight">
            <TrendingDown size={18} className="text-red-400 mb-2" />
            <div className="text-[22px] font-bold text-white">₱{(stats?.totalDebt ?? 0).toLocaleString()}</div>
            <div className="text-[11px] text-[#64748B]">Remaining Debt</div>
          </div>
          <div className="glass-green rounded-2xl p-4 specular-highlight">
            <Wallet size={18} className="text-green-400 mb-2" />
            <div className="text-[22px] font-bold text-white">₱{(stats?.totalPaid ?? 0).toLocaleString()}</div>
            <div className="text-[11px] text-[#64748B]">Total Paid Off</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-5 mb-6">
          <div className="glass-base rounded-2xl p-4 specular-highlight">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[#CBD5E1]">Debt Payoff Progress</span>
              <span className="text-[13px] text-green-400">
                {stats?.totalOriginal ? Math.round((stats.totalPaid / stats.totalOriginal) * 100) : 0}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${stats?.totalOriginal ? (stats.totalPaid / stats.totalOriginal) * 100 : 0}%` }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Debt List */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[17px] font-semibold text-white">My Debts</h3>
            <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full glass-base flex items-center justify-center specular-highlight">
              <Plus size={16} className="text-white" />
            </button>
          </div>

          {debts?.length === 0 && (
            <div className="glass-base rounded-2xl p-6 specular-highlight text-center">
              <Wallet size={32} className="text-[#64748B] mx-auto mb-3" />
              <p className="text-[15px] text-[#64748B]">No debts recorded yet</p>
            </div>
          )}

          <div className="space-y-2">
            {debts?.map((debt, i) => (
              <motion.div
                key={debt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-base rounded-2xl p-4 specular-highlight ${debt.isPaid ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[15px] font-semibold text-white">{debt.creditor}</h4>
                  {debt.isPaid && <CheckCircle size={16} className="text-green-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-[#64748B]">Original: ₱{Number(debt.amount).toLocaleString()}</p>
                    <p className="text-[13px] text-red-400">Remaining: ₱{Number(debt.remaining).toLocaleString()}</p>
                  </div>
                  {!debt.isPaid && (
                    <div className="w-12 h-12 rounded-full glass-red flex items-center justify-center">
                      <span className="text-[11px] text-red-400 font-bold">{Math.round((1 - Number(debt.remaining) / Number(debt.amount)) * 100)}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Debt Sheet */}
        {showAdd && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="fixed inset-0 z-50 flex items-end"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowAdd(false)} />
            <div className="relative w-full glass-thick rounded-t-[32px] p-6 specular-highlight">
              <h3 className="text-[20px] font-bold text-white mb-4">Add New Debt</h3>
              <input
                placeholder="Creditor name"
                value={form.creditor}
                onChange={e => setForm(f => ({ ...f, creditor: e.target.value }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-3 outline-none specular-highlight"
              />
              <input
                placeholder="Original amount"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-3 outline-none specular-highlight"
              />
              <input
                placeholder="Remaining amount"
                value={form.remaining}
                onChange={e => setForm(f => ({ ...f, remaining: e.target.value }))}
                className="w-full glass-base rounded-xl px-4 py-3 text-white placeholder-[#64748B] mb-4 outline-none specular-highlight"
              />
              <button onClick={handleAdd} className="w-full glass-base rounded-2xl py-4 specular-highlight glass-interactive text-[17px] font-semibold text-white">
                Add Debt
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
