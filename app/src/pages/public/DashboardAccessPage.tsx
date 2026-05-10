import { motion } from 'framer-motion';
import { ArrowRight, Flame, BookOpen, Zap, TrendingUp, Phone, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const featureIcons = [Flame, BookOpen, Zap, TrendingUp, Phone, Users];

export default function DashboardAccessPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle('Dashboard');

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-eyebrow block mb-4"
          >
            {t.dashboardAccess.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.dashboardAccess.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {t.dashboardAccess.hero.description}
          </motion.p>
          <motion.a
            href="/dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="btn-primary inline-flex items-center gap-2 text-sm px-8 py-4 text-base"
          >
            {t.dashboardAccess.cta}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {t.dashboardAccess.features.map((feature, i) => {
              const Icon = featureIcons[i] || Flame;
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center dash-interactive"
                >
                  <Icon className="w-7 h-7 text-[var(--accent-teal)] mx-auto mb-3" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{feature}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
