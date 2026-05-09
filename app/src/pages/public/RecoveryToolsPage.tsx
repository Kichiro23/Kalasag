import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BookHeart,
  Zap,
  Library,
  Waves,
  ArrowRight,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const tools = [
  {
    key: 'streakTracker',
    icon: TrendingUp,
    link: '/dashboard/analytics',
  },
  {
    key: 'moodJournal',
    icon: BookHeart,
    link: '/dashboard/daily-check',
  },
  {
    key: 'triggers',
    icon: Zap,
    link: '/dashboard/trigger-map',
  },
  {
    key: 'coping',
    icon: Library,
    link: '/dashboard/recovery',
  },
  {
    key: 'rideTheWave',
    icon: Waves,
    link: '/intervention',
  },
];

export default function RecoveryToolsPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.recoveryTools);

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
            {t.recoveryTools.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.recoveryTools.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.recoveryTools.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const toolData = t.recoveryTools[tool.key as keyof typeof t.recoveryTools] as { title: string; description: string; cta: string };
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-6 md:p-8 flex flex-col"
                >
                  <div className="icon-container mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {toolData.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                    {toolData.description}
                  </p>
                  <Link to={tool.link} className="btn-primary text-sm py-3 px-6">
                    {toolData.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
