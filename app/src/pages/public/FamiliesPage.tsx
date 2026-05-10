import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

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

export default function FamiliesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.families);

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

      {/* Do's */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="What Helps" title="Do This" description="These actions support recovery without enabling the addiction." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dos.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-2xl p-5 flex items-start gap-4 hover:border-[var(--success)]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--success)]" />
                </div>
                <p className="text-sm text-[var(--text-primary)] pt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Don'ts */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="What Hurts" title="Don't Do This" description="These actions, while well-intentioned, often make addiction worse." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donts.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass-card rounded-2xl p-5 flex items-start gap-4 hover:border-[var(--error)]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[var(--error)]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[var(--error)]" />
                </div>
                <p className="text-sm text-[var(--text-primary)] pt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundaries */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Setting Boundaries</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-2xl">
              Clear boundaries protect both you and your loved one. They are not punishments — they are necessary protections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boundaries.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                  <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support for You */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12 text-center">
            <div className="icon-container mx-auto mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">You Need Support Too</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
              Being close to someone with a gambling addiction is emotionally exhausting. You cannot pour from an empty cup. Gam-Anon provides support specifically for family members affected by gambling addiction.
            </p>
            <a href="https://gam-anon.org" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              Visit Gam-Anon
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
