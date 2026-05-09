import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Users, ArrowRight, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import ComingSoonModal from '@/components/primitives/ComingSoonModal';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const phHotlines = [
  { key: 'pagcorHotline', numberKey: 'pagcorNumber', tel: '+63285270995', icon: Phone },
  { key: 'dohHotline', numberKey: 'dohNumber', tel: '1553', icon: Phone },
  { key: 'natashaFoundation', numberKey: 'natashaNumber', tel: '+6328044673', icon: Phone },
  { key: 'inTouchHotline', numberKey: 'inTouchNumber', tel: '+63288937603', icon: Phone },
];

const intlHotlines = [
  { key: 'gamblersAnonymous', numberKey: 'gaNumber', tel: '+16269603500', icon: Phone },
];

export default function GetHelpPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  usePageTitle(t.nav.getHelp);

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
            {t.getHelp.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.getHelp.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.getHelp.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[1200px] mx-auto glass-card rounded-3xl p-8 md:p-12 text-center border-[var(--error)]/20"
        >
          <Heart className="w-10 h-10 text-[var(--error)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
            {t.getHelp.emergency.title}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-lg mx-auto">
            {t.getHelp.emergency.description}
          </p>
          <a href="tel:1553" className="btn-crisis inline-flex">
            {t.getHelp.emergency.cta}
            <Phone className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* Philippines Hotlines */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.getHelp.philippines.title}
            title={t.getHelp.philippines.title}
            description={t.getHelp.philippines.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phHotlines.map((hotline, i) => (
              <motion.a
                key={hotline.key}
                href={`tel:${hotline.tel}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-teal)]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {t.crisis[hotline.key as keyof typeof t.crisis]}
                  </h3>
                  <p className="text-lg font-bold text-[var(--accent-teal)]">
                    {t.crisis[hotline.numberKey as keyof typeof t.crisis]}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-teal)] transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* SMS */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.a
            href="sms:09178001123"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-6 flex items-center gap-5 group max-w-xl mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-teal)]/20 transition-colors">
              <MessageCircle className="w-5 h-5 text-[var(--accent-teal)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {t.crisis.text}
              </h3>
              <p className="text-lg font-bold text-[var(--accent-teal)]">
                {t.crisis.smsNumber}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-teal)] transition-colors shrink-0" />
          </motion.a>
        </div>
      </section>

      {/* International */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.getHelp.international.title}
            title={t.getHelp.international.title}
            description={t.getHelp.international.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {intlHotlines.map((hotline, i) => (
              <motion.a
                key={hotline.key}
                href={`tel:${hotline.tel}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--calm-blue)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--calm-blue)]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--calm-blue)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {t.crisis[hotline.key as keyof typeof t.crisis]}
                  </h3>
                  <p className="text-lg font-bold text-[var(--calm-blue)]">
                    {t.crisis[hotline.numberKey as keyof typeof t.crisis]}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--calm-blue)] transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Groups & Counselors */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="icon-container mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t.getHelp.supportGroups.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {t.getHelp.supportGroups.description}
            </p>
            <button onClick={() => setComingSoonOpen(true)} className="btn-secondary">
              {t.getHelp.supportGroups.cta}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="icon-container mb-5">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              {t.getHelp.counselors.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {t.getHelp.counselors.description}
            </p>
            <button onClick={() => setComingSoonOpen(true)} className="btn-secondary">
              {t.getHelp.counselors.cta}
            </button>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal open={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
    </Layout>
  );
}
