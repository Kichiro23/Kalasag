import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  PenLine,
  Save,
  Trash2,
  Sparkles,
  Calendar,
  Clock,
  ChevronDown,
  Heart,
  AlertTriangle,
  TrendingUp,
  X,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { usePageTitle } from '@/hooks/usePageTitle';

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  mood: number;
  createdAt: number;
}

const PROMPTS = [
  'What triggered me today and how did I handle it?',
  'What am I grateful for today?',
  'What would my life look like in 1 year if I keep gambling vs. if I stop?',
  'What is one small win I had today?',
  'How did I feel when an urge hit today? What helped it pass?',
  'What is one thing I can do tomorrow to protect my recovery?',
  'Who can I reach out to when I feel like gambling?',
  'What has gambling cost me that I want to reclaim?',
  'What are 3 things I value more than gambling?',
  'Write a letter to your future self 1 year from now.',
];

const MOODS = [
  { value: 1, label: 'Struggling', color: 'bg-red-500' },
  { value: 2, label: 'Low', color: 'bg-orange-500' },
  { value: 3, label: 'Okay', color: 'bg-amber-500' },
  { value: 4, label: 'Good', color: 'bg-emerald-500' },
  { value: 5, label: 'Strong', color: 'bg-[var(--accent-teal)]' },
];

function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem('kalasag-journal');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  localStorage.setItem('kalasag-journal', JSON.stringify(entries));
}

export default function JournalPage() {
  usePageTitle('Recovery Journal');
  const [entries, setEntries] = useState<JournalEntry[]>(loadEntries);
  const [showForm, setShowForm] = useState(false);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleSave = () => {
    if (!content.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      prompt,
      content: content.trim(),
      mood,
      createdAt: Date.now(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setContent('');
    setMood(3);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEntry?.id === id) setSelectedEntry(null);
  };

  const avgMood = entries.length
    ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
    : '0';

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[800px] mx-auto">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Private Journal
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-3">
              Recovery Journal
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
              Write freely. No one else can see this. Use the prompts or write your own thoughts.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="glass-card rounded-2xl p-4 text-center">
              <BookOpen className="w-5 h-5 text-[var(--accent-teal)] mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{entries.length}</p>
              <p className="text-[11px] text-[var(--text-muted)]">Entries</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">{avgMood}</p>
              <p className="text-[11px] text-[var(--text-muted)]">Avg Mood</p>
            </div>
            <div className="glass-card rounded-2xl p-4 text-center">
              <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-[var(--text-primary)]">
                {entries.filter((e) => e.mood >= 4).length}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">Good Days</p>
            </div>
          </div>

          {/* New Entry Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <PenLine className="w-4 h-4" />
              New Entry
            </button>
          </div>

          {/* Entries List */}
          {entries.length === 0 && !showForm && (
            <div className="glass-card rounded-3xl p-8 text-center">
              <Sparkles className="w-8 h-8 text-[var(--accent-teal)] mx-auto mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">
                Your journal is empty. Start writing — even a few sentences can help.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-4 dash-interactive cursor-pointer"
                onClick={() => setSelectedEntry(entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedEntry(entry);
                  }
                }}
                tabIndex={0}
                role="button"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span className="text-xs text-[var(--text-muted)]">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${MOODS.find((m) => m.value === entry.mood)?.color || 'bg-gray-400'}`} />
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {MOODS.find((m) => m.value === entry.mood)?.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--accent-teal)] mb-1 font-medium">{entry.prompt}</p>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{entry.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">New Journal Entry</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Prompt Selector */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                  Prompt
                </label>
                <select
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full glass-input rounded-xl h-10 px-3 text-sm text-[var(--text-primary)]"
                >
                  {PROMPTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mood */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-2">
                  How are you feeling?
                </label>
                <div className="flex gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMood(m.value)}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-medium transition-all ${
                        mood === m.value
                          ? `${m.color} text-white`
                          : 'bg-[var(--bg-surface-solid)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                  Your Thoughts
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write freely..."
                  rows={6}
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] resize-none"
                  autoFocus
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!content.trim()}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                Save Entry
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedEntry(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)]">{selectedEntry.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedEntry.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors"
                  >
                    <X className="w-4 h-4 text-[var(--text-muted)]" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[var(--accent-teal)] font-medium mb-3">{selectedEntry.prompt}</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {selectedEntry.content}
              </p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
                <div
                  className={`w-2 h-2 rounded-full ${MOODS.find((m) => m.value === selectedEntry.mood)?.color || 'bg-gray-400'}`}
                />
                <span className="text-xs text-[var(--text-muted)]">
                  Mood: {MOODS.find((m) => m.value === selectedEntry.mood)?.label}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
