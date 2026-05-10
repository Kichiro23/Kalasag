import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Save,
  TrendingUp,
  Calendar,
  Clock,
  Activity,
  X,
  Filter,
  Flame,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { usePageTitle } from '@/hooks/usePageTitle';

interface UrgeLog {
  id: string;
  timestamp: number;
  intensity: number;
  trigger: string;
  resisted: boolean;
  note: string;
}

const TRIGGERS = [
  'Boredom',
  'Stress / Anxiety',
  'Payday / Money',
  'Sports Event',
  'Social Pressure',
  'Loneliness',
  'Depression',
  'Celebration',
  'Alcohol / Drugs',
  'Seeing Ads',
  'Late Night',
  'Weekend',
  'Other',
];

function loadLogs(): UrgeLog[] {
  try {
    const raw = localStorage.getItem('kalasag-urge-logs');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLogs(logs: UrgeLog[]) {
  localStorage.setItem('kalasag-urge-logs', JSON.stringify(logs));
}

export default function UrgeLoggerPage() {
  usePageTitle('Urge Logger');
  const [logs, setLogs] = useState<UrgeLog[]>(loadLogs);
  const [showForm, setShowForm] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [trigger, setTrigger] = useState(TRIGGERS[0]);
  const [resisted, setResisted] = useState(true);
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState<'all' | 'resisted' | 'gave-in'>('all');

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const handleSave = () => {
    const newLog: UrgeLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      intensity,
      trigger,
      resisted,
      note: note.trim(),
    };
    setLogs((prev) => [newLog, ...prev]);
    setIntensity(5);
    setTrigger(TRIGGERS[0]);
    setResisted(true);
    setNote('');
    setShowForm(false);
  };

  const filtered = logs.filter((log) => {
    if (filter === 'resisted') return log.resisted;
    if (filter === 'gave-in') return !log.resisted;
    return true;
  });

  const totalLogs = logs.length;
  const resistedCount = logs.filter((l) => l.resisted).length;
  const resistRate = totalLogs ? Math.round((resistedCount / totalLogs) * 100) : 0;
  const avgIntensity = totalLogs
    ? (logs.reduce((s, l) => s + l.intensity, 0) / totalLogs).toFixed(1)
    : '0';

  // Simple trigger frequency count
  const triggerCounts = TRIGGERS.map((t) => ({
    trigger: t,
    count: logs.filter((l) => l.trigger === t).length,
  })).sort((a, b) => b.count - a.count);

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[800px] mx-auto">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Urge Tracker
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-3">
              Log Your Urges
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
              Every urge you log is a step toward understanding your patterns. Knowledge is power.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="glass-card rounded-2xl p-4 text-center">
              <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{totalLogs}</p>
              <p className="text-[11px] text-[var(--text-muted)]">Urges Logged</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{resistRate}%</p>
              <p className="text-[11px] text-[var(--text-muted)]">Resist Rate</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Activity className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{avgIntensity}</p>
              <p className="text-[11px] text-[var(--text-muted)]">Avg Intensity</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Zap className="w-5 h-5 text-[var(--accent-teal)] mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{resistedCount}</p>
              <p className="text-[11px] text-[var(--text-muted)]">Resisted</p>
            </div>
          </div>

          {/* Top Triggers */}
          {triggerCounts.some((t) => t.count > 0) && (
            <div className="glass-card rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Your Top Triggers</h3>
              <div className="space-y-2">
                {triggerCounts.slice(0, 5).map((t) =>
                  t.count > 0 ? (
                    <div key={t.trigger} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-secondary)] w-32 shrink-0">{t.trigger}</span>
                      <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-solid)] overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--accent-teal)] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((t.count / totalLogs) * 100 * 3, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] w-6 text-right">{t.count}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setShowForm(true)} className="btn-primary inline-flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              Log Urge
            </button>
            <div className="flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              {(['all', 'resisted', 'gave-in'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-[10px] font-medium transition-colors ${
                    filter === f ? 'bg-[var(--accent-teal)] text-white' : 'bg-[var(--bg-surface-solid)] text-[var(--text-muted)]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'resisted' ? 'Resisted' : 'Gave In'}
                </button>
              ))}
            </div>
          </div>

          {/* Logs */}
          {filtered.length === 0 && (
            <div className="glass-card rounded-3xl p-8 text-center">
              <Zap className="w-8 h-8 text-[var(--accent-teal)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">
                No urges logged yet. When you feel an urge, log it here to track your patterns.
              </p>
            </div>
          )}

          <div className="space-y-2">
            {filtered.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span className="text-xs text-[var(--text-muted)]">{formatDate(log.timestamp)}</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      log.resisted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {log.resisted ? 'Resisted' : 'Gave In'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-[var(--text-primary)] font-medium">{log.trigger}</span>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-[var(--text-muted)]">{log.intensity}/10</span>
                  </div>
                </div>
                {log.note && <p className="text-xs text-[var(--text-secondary)]">{log.note}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Log Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Log an Urge</h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors"
              >
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Intensity */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-2">
                Intensity: {intensity}/10
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full accent-[var(--accent-teal)]"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                <span>Mild</span>
                <span>Overwhelming</span>
              </div>
            </div>

            {/* Trigger */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Trigger</label>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                className="w-full glass-input rounded-xl h-10 px-3 text-sm text-[var(--text-primary)]"
              >
                {TRIGGERS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Resisted */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-2">Did you resist?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setResisted(true)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    resisted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[var(--bg-surface-solid)] text-[var(--text-muted)]'
                  }`}
                >
                  Yes, I resisted
                </button>
                <button
                  onClick={() => setResisted(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    !resisted
                      ? 'bg-red-500 text-white'
                      : 'bg-[var(--bg-surface-solid)] text-[var(--text-muted)]'
                  }`}
                >
                  No, I gave in
                </button>
              </div>
            </div>

            {/* Note */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Note (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What happened? What did you do instead?"
                rows={3}
                className="w-full glass-input rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              Save Log
            </button>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
