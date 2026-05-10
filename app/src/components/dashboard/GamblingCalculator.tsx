import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Home, Car, GraduationCap, Plane } from 'lucide-react';

export default function GamblingCalculator() {
  const [dailySpend, setDailySpend] = useState('');
  const [years, setYears] = useState('');

  const daily = parseFloat(dailySpend) || 0;
  const yrs = parseFloat(years) || 0;
  const totalLost = daily * 365 * yrs;

  const comparisons = [
    { icon: Home, label: 'Small House Down Payment', value: 500000 },
    { icon: Car, label: 'Brand New Car', value: 1000000 },
    { icon: GraduationCap, label: '4-Year College Degree', value: 800000 },
    { icon: Plane, label: 'Round-the-World Trip', value: 300000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mb-6"
    >
      <h3 className="text-[17px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        <Calculator className="w-4 h-4 inline mr-2" />
        Gambling Cost Calculator
      </h3>
      <div className="dash-card rounded-2xl p-5">
        <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>
          See how much gambling has really cost you.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>Daily Spend (₱)</label>
            <input
              type="number"
              value={dailySpend}
              onChange={(e) => setDailySpend(e.target.value)}
              placeholder="500"
              className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)]"
            />
          </div>
          <div>
            <label className="block text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>Years Gambling</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="3"
              className="w-full px-3 py-2 rounded-xl text-sm bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)]"
            />
          </div>
        </div>

        {totalLost > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="text-center p-4 rounded-xl bg-[var(--error)]/10">
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Total Money Lost</p>
              <p className="text-2xl font-bold text-[var(--error)]">₱{totalLost.toLocaleString()}</p>
            </div>
            <p className="text-[12px] font-medium" style={{ color: 'var(--text-primary)' }}>That could have been:</p>
            <div className="grid grid-cols-2 gap-2">
              {comparisons.map((comp) => {
                const count = Math.floor(totalLost / comp.value);
                return count > 0 ? (
                  <div key={comp.label} className="flex items-center gap-2 p-2 rounded-xl bg-[var(--bg-surface-solid)]">
                    <comp.icon className="w-4 h-4 text-[var(--accent-teal)] shrink-0" />
                    <div>
                      <p className="text-[11px] font-medium" style={{ color: 'var(--text-primary)' }}>{count}x {comp.label}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>₱{comp.value.toLocaleString()} each</p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
