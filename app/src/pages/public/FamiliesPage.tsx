import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Wallet,
  Users,
  ArrowRight,
  Check,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ComingSoonModal from '@/components/primitives/ComingSoonModal';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function FamiliesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  usePageTitle(t.nav.families);

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-eyebrow block mb-4"
          >
            {t.families.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.families.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.families.hero.description}
          </motion.p>
        </div>
      </section>

      {/* How to Help */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.families.howToHelp.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-2xl">
              {t.families.howToHelp.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.families.howToHelp.tips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)]">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boundaries & Financial */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="icon-container mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t.families.boundaries.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.families.boundaries.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="icon-container mb-5">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t.families.financial.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.families.financial.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Groups */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="icon-container mx-auto mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              {t.families.supportGroups.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-8">
              {t.families.supportGroups.description}
            </p>
            <button onClick={() => setComingSoonOpen(true)} className="btn-secondary">
              {t.families.supportGroups.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
    </Layout>
  );
}
