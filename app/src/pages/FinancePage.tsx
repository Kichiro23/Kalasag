import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet, TrendingDown, Plus, CheckCircle } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

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
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>My Finances</h1>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="dash-card-danger rounded-2xl p-4">
          <TrendingDown size={18} className="text-red-400 mb-2" />
          <div className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>₱{(stats?.totalDebt ?? 0).toLocaleString()}</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Remaining Debt</div>
        </div>
        <div className="dash-card-success rounded-2xl p-4">
          <Wallet size={18} className="text-emerald-400 mb-2" />
          <div className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>₱{(stats?.totalPaid ?? 0).toLocaleString()}</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total Paid Off</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="dash-card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>Debt Payoff Progress</span>
            <span className="text-[13px] text-emerald-400">
              {stats?.totalOriginal ? Math.round((stats.totalPaid / stats.totalOriginal) * 100) : 0}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-subtle)' }}>
            <motion.div
              animate={{ width: `${stats?.totalOriginal ? (stats.totalPaid / stats.totalOriginal) * 100 : 0}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Debt List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>My Debts</h3>
          <button onClick={() => setShowAdd(true)} className="w-8 h-8 rounded-full dash-card flex items-center justify-center dash-interactive">
            <Plus size={16} style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {debts?.length === 0 && (
          <div className="dash-card rounded-2xl p-6 text-center">
            <Wallet size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-[15px]" style={{ color: 'var(--text-muted)' }}>No debts recorded yet</p>
          </div>
        )}

        <div className="space-y-2">
          {debts?.map((debt, i) => (
            <motion.div
              key={debt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`dash-card rounded-2xl p-4 ${debt.isPaid ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{debt.creditor}</h4>
                {debt.isPaid && <CheckCircle size={16} className="text-emerald-400" />}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Original: ₱{Number(debt.amount).toLocaleString()}</p>
                  <p className="text-[13px] text-red-400">Remaining: ₱{Number(debt.remaining).toLocaleString()}</p>
                </div>
                {!debt.isPaid && (
                  <div className="w-12 h-12 rounded-full dash-card-danger flex items-center justify-center">
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
          <div className="relative w-full dash-card rounded-t-[32px] p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <h3 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Add New Debt</h3>
            <input
              placeholder="Creditor name"
              value={form.creditor}
              onChange={e => setForm(f => ({ ...f, creditor: e.target.value }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-3 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <input
              placeholder="Original amount"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-3 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <input
              placeholder="Remaining amount"
              value={form.remaining}
              onChange={e => setForm(f => ({ ...f, remaining: e.target.value }))}
              className="w-full dash-card rounded-xl px-4 py-3 mb-4 outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button onClick={handleAdd} className="w-full dash-card rounded-2xl py-4 dash-interactive text-[17px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Add Debt
            </button>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  )
}
