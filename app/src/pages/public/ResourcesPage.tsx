import { motion } from 'framer-motion';
import {
  BookOpen,
  AlertTriangle,
  Users,
  Wallet,
  Flag,
  Check,
  Quote,
  TrendingUp,
  Heart,
  ExternalLink,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { redditTips, philippinesStats, financialTools, recoveryApps } from '@/data/research';

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.resources);

  const keyStats = [
    philippinesStats.onlineGamblers2025,
    philippinesStats.gamingRevenue2025,
    philippinesStats.youngGamblers,
    philippinesStats.weeklySpend,
  ];

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

      {/* Philippine Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Philippines Gambling Data"
            title="The Scale of the Crisis"
            description="Real numbers from PAGCOR, GGRAsia, and peer-reviewed studies."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-[var(--accent-teal)] mb-1">{stat.value}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2">{stat.label}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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

      {/* Reddit Tips */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="From Real People"
            title={t.resources.redditTips.title}
            description={t.resources.redditTips.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {redditTips.map((tip, i) => (
              <motion.div
                key={tip.rank}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-teal)] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{tip.rank}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{tip.tip}</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">{tip.frequency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--bg-surface-solid)]">
                  <Quote className="w-3 h-3 text-[var(--accent-teal)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--text-secondary)] italic">{tip.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Apps */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Recommended Apps"
            title="Recovery Apps That Work"
            description="Evidence-based apps recommended by psychologists and recovering gamblers."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recoveryApps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{app.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--success)]/10 text-[var(--success)]">{app.cost}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 flex-1">{app.features}</p>
                {app.url && (
                  <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1">
                    Learn more <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Recovery */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">
              {t.resources.financial.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]"
                >
                  <TrendingUp className="w-4 h-4 text-[var(--accent-teal)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{tool.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{tool.note}</p>
                    {tool.url && (
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--accent-teal)] hover:underline">
                        {tool.url}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filipino Context */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
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
