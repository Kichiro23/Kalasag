import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Shield,
  Wallet,
  Users,
  Check,
  X,
  AlertCircle,
  Lock,
  BookOpen,
  ExternalLink,
  MessageSquare,
  ClipboardList,
  Siren,
  ChevronRight,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const tabs = [
  { key: 'howToHelp', label: 'How to Help', icon: Heart },
  { key: 'boundaries', label: 'Boundaries', icon: Lock },
  { key: 'financial', label: 'Financial', icon: Wallet },
  { key: 'codependency', label: 'Codependency', icon: ClipboardList },
  { key: 'communication', label: 'Communication', icon: MessageSquare },
  { key: 'emergency', label: 'Emergency Plan', icon: Siren },
];

const dos = [
  { icon: Heart, text: 'Express concern without judgment — use "I" statements' },
  { icon: BookOpen, text: 'Encourage professional help — GA, therapy, counseling' },
  { icon: Shield, text: 'Protect your own finances — separate accounts if needed' },
  { icon: Users, text: 'Join a support group for yourself — Gam-Anon' },
  { icon: Check, text: 'Celebrate small victories — even one day without gambling is progress' },
  { icon: Lock, text: 'Set clear boundaries — be specific about unacceptable behaviors' },
];

const donts = [
  { icon: X, text: 'Do not lend money for gambling or to pay gambling debts' },
  { icon: X, text: 'Do not cover up or make excuses for their behavior' },
  { icon: X, text: 'Do not bail them out — paying debts often leads to more gambling' },
  { icon: X, text: 'Do not try to control their gambling 24/7 — you cannot monitor everything' },
  { icon: X, text: 'Do not take it personally — addiction is a medical condition' },
  { icon: X, text: 'Do not blame yourself — you did not cause the addiction' },
];

const boundaries = [
  'Require dual signatures for withdrawals',
  'Limit cash access to a specific amount',
  'Monitor accounts regularly and set transaction alerts',
  'Remove your name from joint credit cards if necessary',
  'Have a plan for what happens if they relapse',
];

const financialChecklist = [
  { text: 'Open a separate bank account in your name only', done: false },
  { text: 'Freeze or cancel joint credit cards', done: false },
  { text: 'Set up transaction alerts on all accounts', done: false },
  { text: 'Change online banking passwords', done: false },
  { text: 'Remove saved payment methods from shared devices', done: false },
  { text: 'Set daily withdrawal limits', done: false },
  { text: 'Consider a credit freeze with credit bureaus', done: false },
  { text: 'Document all shared assets and debts', done: false },
];

export default function FamiliesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.families);

  const [activeTab, setActiveTab] = useState('howToHelp');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [openScript, setOpenScript] = useState<number | null>(null);

  const toggleCheck = (i: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-eyebrow block mb-4">
            {t.families.hero.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance">
            {t.families.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.families.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key ? 'bg-[var(--accent-teal)] text-white' : 'bg-[var(--bg-surface-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {/* How to Help */}
              {activeTab === 'howToHelp' && (
                <div className="space-y-4">
                  <SectionHeading eyebrow="What Helps" title="Do This" description="These actions support recovery without enabling the addiction." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dos.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-2xl p-4 flex items-start gap-3 hover:border-[var(--success)]/30 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-[var(--success)]/10 flex items-center justify-center shrink-0"><item.icon className="w-4 h-4 text-[var(--success)]" /></div>
                        <p className="text-sm text-[var(--text-primary)] pt-1.5">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                  <SectionHeading eyebrow="What Hurts" title="Don't Do This" description="These actions, while well-intentioned, often make addiction worse." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {donts.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-2xl p-4 flex items-start gap-3 hover:border-[var(--error)]/30 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-[var(--error)]/10 flex items-center justify-center shrink-0"><item.icon className="w-4 h-4 text-[var(--error)]" /></div>
                        <p className="text-sm text-[var(--text-primary)] pt-1.5">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Boundaries */}
              {activeTab === 'boundaries' && (
                <div>
                  <SectionHeading eyebrow="Protection" title="Setting Boundaries" description="Clear boundaries protect both you and your loved one. They are not punishments — they are necessary protections." />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {boundaries.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                        <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-primary)]">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial */}
              {activeTab === 'financial' && (
                <div>
                  <SectionHeading eyebrow="Money Safety" title="Financial Protection Checklist" description="Tick off each item as you complete it. Your financial safety is critical." />
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <div className="space-y-2">
                      {financialChecklist.map((item, i) => (
                        <button key={i} onClick={() => toggleCheck(i)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-left hover:border-[var(--accent-teal)]/30 transition-colors">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${checkedItems.has(i) ? 'bg-[var(--accent-teal)] border-[var(--accent-teal)]' : 'border-[var(--border-subtle)]'}`}>
                            {checkedItems.has(i) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${checkedItems.has(i) ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>{item.text}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-xs text-[var(--text-muted)]">{checkedItems.size} of {financialChecklist.length} completed</p>
                      <div className="w-full h-2 rounded-full bg-[var(--bg-surface-solid)] mt-2 overflow-hidden">
                        <motion.div className="h-full bg-[var(--accent-teal)] rounded-full" initial={{ width: 0 }} animate={{ width: `${(checkedItems.size / financialChecklist.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Codependency */}
              {activeTab === 'codependency' && (
                <div>
                  <SectionHeading eyebrow="Self-Check" title="Codependency Assessment" description="Answer these 10 questions honestly. If you answer yes to 5 or more, consider seeking support for yourself." />
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <div className="space-y-2">
                      {t.families.codependency.questions.map((q, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                          <span className="text-xs font-bold text-[var(--accent-teal)] shrink-0 w-5">{i + 1}.</span>
                          <span className="text-sm text-[var(--text-primary)]">{q}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <p className="text-xs text-amber-600"><strong>Remember:</strong> Codependency is common among family members of addicts. It is not your fault, and help is available. Gam-Anon specializes in supporting people in your position.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Communication */}
              {activeTab === 'communication' && (
                <div>
                  <SectionHeading eyebrow="Scripts" title="Communication Templates" description="Use these I-statement templates for difficult conversations. Click to expand." />
                  <div className="space-y-3">
                    {t.families.communication.scripts.map((script, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                        <button onClick={() => setOpenScript(openScript === i ? null : i)} className="w-full glass-card rounded-2xl p-4 text-left flex items-center justify-between hover:border-[var(--accent-teal)]/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="w-4 h-4 text-[var(--accent-teal)]" />
                            <span className="text-sm font-semibold text-[var(--text-primary)]">{script.title}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${openScript === i ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openScript === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mx-4 p-4 rounded-b-2xl bg-[var(--bg-surface-solid)] border-x border-b border-[var(--border-subtle)]">
                                <p className="text-sm text-[var(--text-secondary)] italic">"{script.text}"</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency */}
              {activeTab === 'emergency' && (
                <div>
                  <SectionHeading eyebrow="Crisis" title="Emergency Action Plan" description="What to do when relapse happens. Stay calm and follow these steps." />
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <div className="space-y-3">
                      {t.families.emergencyPlan.steps.map((step, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-red-500">{i + 1}</span>
                          </div>
                          <p className="text-sm text-[var(--text-primary)] pt-1">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 glass-card rounded-2xl p-5 text-center">
                    <Users className="w-6 h-6 text-[var(--accent-teal)] mx-auto mb-2" />
                    <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">You Need Support Too</h3>
                    <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto mb-3">Being close to someone with a gambling addiction is emotionally exhausting. Gam-Anon provides support specifically for family members.</p>
                    <a href="https://gam-anon.org" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex text-xs">Visit Gam-Anon<ExternalLink className="w-3 h-3" /></a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Support for You */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12 text-center">
            <div className="icon-container mx-auto mb-4"><Users className="w-6 h-6" /></div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">You Need Support Too</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-6">Being close to someone with a gambling addiction is emotionally exhausting. You cannot pour from an empty cup.</p>
            <a href="https://gam-anon.org" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">Visit Gam-Anon<ExternalLink className="w-4 h-4" /></a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
