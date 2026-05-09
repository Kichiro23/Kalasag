import { motion } from 'framer-motion';
import {
  Shield,
  User,
  Handshake,
  Heart,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.about);

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
            {t.about.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.about.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.about.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="icon-container mx-auto mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              {t.about.mission.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t.about.mission.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Developer Story */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                <User className="w-12 h-12 md:w-16 md:h-16 text-[var(--accent-teal)]" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                  {t.about.story.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-2xl">
                  {t.about.story.description}
                </p>
                <div>
                  <p className="text-base font-semibold text-[var(--text-primary)]">
                    {t.about.story.name}
                  </p>
                  <p className="text-sm text-[var(--accent-teal)]">
                    {t.about.story.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
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
                <Handshake className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.about.partners.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {t.about.partners.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Non-profit */}
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
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
              {t.about.nonprofit.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {t.about.nonprofit.description}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
