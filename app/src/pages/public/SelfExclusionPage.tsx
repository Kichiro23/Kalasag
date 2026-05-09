import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Wallet,
  ArrowRight,
  Check,
  Smartphone,
  CreditCard,
  PiggyBank,
  Ban,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ComingSoonModal from '@/components/primitives/ComingSoonModal';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function SelfExclusionPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  usePageTitle(t.nav.selfExclusion);

  const steps = t.selfExclusion.registry.steps;
  const tools = t.selfExclusion.financial.tools;

  const toolIcons = [CreditCard, Ban, Lock, PiggyBank];

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
            {t.selfExclusion.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.selfExclusion.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.selfExclusion.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Registry */}
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
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.selfExclusion.registry.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
              {t.selfExclusion.registry.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{step}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setComingSoonOpen(true)} className="btn-primary">
              {t.selfExclusion.registry.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Blocking */}
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
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.selfExclusion.blocking.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
              {t.selfExclusion.blocking.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {['iOS / Safari', 'Android / Chrome', 'Windows / Edge', 'Mac / Safari', 'Router-Level', 'App Blockers'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span className="text-sm text-[var(--text-primary)]">{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setComingSoonOpen(true)} className="btn-secondary">
              {t.selfExclusion.blocking.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Financial */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-eyebrow block mb-3">{t.selfExclusion.financial.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t.selfExclusion.financial.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {t.selfExclusion.financial.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => {
              const Icon = toolIcons[i] || Wallet;
              return (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-6 text-center"
                >
                  <div className="icon-container mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {tool}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
    </Layout>
  );
}
