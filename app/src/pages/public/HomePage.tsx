import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Heart,
  Shield,
  Wind,
  Users,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Check,
  ChevronRight,
  Lock,
  Zap,
  BarChart3,
  Gamepad2,
  Globe,
  FileText,
  Sparkles,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';

import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { use3DTilt } from '@/hooks/use3DTilt';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useCountUp } from '@/hooks/useCountUp';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Shield,
  Wind,
  Users,
  BookOpen,
  MessageCircle,
};

function StatCounter({ value, label }: { value: string; label: string }) {
  const numericMatch = value.replace(/,/g, '').replace(/\./g, '').match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = value.replace(/[\d,\.]/g, '');
  const shouldAnimate = numericValue > 0 && numericValue < 1000000;
  const { count, ref } = useCountUp(numericValue, 2000, shouldAnimate);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-card rounded-3xl p-6 text-center"
    >
      <p className="text-3xl md:text-4xl font-extrabold text-[var(--accent-teal)] mb-2">
        {shouldAnimate ? `${count.toLocaleString()}${suffix}` : value}
      </p>
      <p className="text-sm text-[var(--text-secondary)]">
        {label}
      </p>
    </motion.div>
  );
}

function FeatureCard({ card, index }: { card: { title: string; description: string; icon: string }; index: number }) {
  const tiltRef = use3DTilt(6);
  const Icon = iconMap[card.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      ref={tiltRef}
      className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden group cursor-default"
    >
      <div className="tilt-glare absolute inset-0 pointer-events-none z-10" />
      <div className="icon-container mb-5">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {card.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {card.description}
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle('');

  return (
    <Layout>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-eyebrow block mb-4"
          >
            {t.home.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.home.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.home.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link to="/get-help" className="btn-primary animate-breathe">
              {t.home.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/resources" className="btn-secondary">
              {t.home.hero.ctaSecondary}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {t.home.hero.trust.map((badge) => (
              <div key={badge} className="trust-badge">
                <Check className="w-3.5 h-3.5" />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Crisis Band */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[1200px] mx-auto glass-card rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
              {t.home.crisisBand.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t.home.crisisBand.description}
            </p>
          </div>
          <Link to="/get-help" className="btn-crisis shrink-0">
            {t.home.crisisBand.cta}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.home.features.eyebrow}
            title={t.home.features.title}
            description={t.home.features.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.home.features.cards.map((card, i) => (
              <FeatureCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Teaser */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center"
          >
            <span className="section-eyebrow block mb-3">{t.home.assessment.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t.home.assessment.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              {t.home.assessment.description}
            </p>
            <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
              {t.home.assessment.questions.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[var(--accent-teal)]">{i + 1}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{q}</p>
                </div>
              ))}
            </div>
            <Link to="/self-assessment" className="btn-primary">
              {t.home.assessment.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Real Impact (replacing testimonials) */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.home.realImpact.eyebrow}
            title={t.home.realImpact.title}
            description={t.home.realImpact.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.home.realImpact.cases.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 md:p-8"
              >
                <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-6">
                  {story.summary}
                </p>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {story.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {story.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.realImpact.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-[var(--error)] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center mt-6">
            {t.home.realImpact.source}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.home.stats.eyebrow}
            title={t.home.stats.title}
            description={t.home.stats.description}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.stats.items.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center"
          >
            <span className="section-eyebrow block mb-3">{t.home.pricing.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t.home.pricing.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              {t.home.pricing.description}
            </p>
            <div className="mb-8">
              <span className="text-5xl md:text-6xl font-extrabold text-[var(--accent-teal)]">
                {t.home.pricing.price}
              </span>
              <span className="text-sm text-[var(--text-muted)] ml-2">
                {t.home.pricing.period}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto mb-8">
              {t.home.pricing.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--accent-teal)] shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary animate-breathe">
              {t.home.pricing.cta}
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              {t.home.pricing.guarantee}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
