import { motion } from 'framer-motion';
import {
  BookOpen,
  AlertTriangle,
  Users,
  Wallet,
  Flag,
  Check,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.resources);

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
            {t.resources.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.resources.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.resources.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Understanding */}
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
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.resources.understanding.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {t.resources.understanding.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warning Signs */}
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
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.resources.warningSigns.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-2xl">
              {t.resources.warningSigns.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.resources.warningSigns.signs.map((sign, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <AlertTriangle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)]">{sign}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Family Impact */}
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
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.resources.families.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {t.resources.families.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Financial Recovery */}
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
                <Wallet className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.resources.financial.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {t.resources.financial.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filipino Context */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
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
                <Flag className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.resources.filipinoContext.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">
              {t.resources.filipinoContext.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.resources.filipinoContext.topics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <Check className="w-4 h-4 text-[var(--accent-teal)] shrink-0" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
