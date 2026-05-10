import { motion } from 'framer-motion';
import { Phone, MessageCircle, Globe, Mail, ArrowRight, Heart, Users, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { phHotlines, intlHotlines, pagcorAccreditedRehabs, communityPlatforms } from '@/data/research';

export default function GetHelpPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.getHelp);

  const phCall = phHotlines.filter(h => h.type === 'call');
  const phSms = phHotlines.filter(h => h.type === 'sms');
  const phEmail = phHotlines.filter(h => h.type === 'email');

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
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.getHelp.philippines.title}
            title={t.getHelp.philippines.title}
            description={t.getHelp.philippines.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phCall.slice(0, 12).map((hotline, i) => (
              <motion.a
                key={`${hotline.org}-${hotline.number}`}
                href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 group hover:border-[var(--accent-teal)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-teal)]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[var(--accent-teal)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-[var(--text-primary)] truncate">{hotline.org}</h3>
                  <p className="text-sm font-bold text-[var(--accent-teal)]">{hotline.number}</p>
                  {hotline.note && <p className="text-[10px] text-[var(--text-muted)]">{hotline.note}</p>}
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-teal)] transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* SMS & Email */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-[var(--accent-teal)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">SMS Hotlines</h3>
            </div>
            <div className="space-y-3">
              {phSms.map((h) => (
                <a key={h.number} href={`sms:${h.number.replace(/[^0-9]/g, '')}`} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] hover:border-[var(--accent-teal)]/50 transition-colors">
                  <div>
                    <p className="text-xs text-[var(--text-primary)]">{h.org}</p>
                    <p className="text-sm font-bold text-[var(--accent-teal)]">{h.number}</p>
                  </div>
                  <MessageCircle className="w-4 h-4 text-[var(--text-muted)]" />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[var(--accent-teal)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Email Support</h3>
            </div>
            <div className="space-y-3">
              {phEmail.map((h) => (
                <a key={h.number} href={`mailto:${h.number}`} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] hover:border-[var(--accent-teal)]/50 transition-colors">
                  <div>
                    <p className="text-xs text-[var(--text-primary)]">{h.org}</p>
                    <p className="text-sm font-bold text-[var(--accent-teal)]">{h.number}</p>
                  </div>
                  <Mail className="w-4 h-4 text-[var(--text-muted)]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* International */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow={t.getHelp.international.title}
            title={t.getHelp.international.title}
            description={t.getHelp.international.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {intlHotlines.map((hotline, i) => (
              <motion.a
                key={hotline.org}
                href={hotline.type === 'call' ? `tel:${hotline.number.replace(/[^0-9+]/g, '')}` : hotline.url}
                target={hotline.type !== 'call' ? '_blank' : undefined}
                rel={hotline.type !== 'call' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-2xl p-4 flex items-center gap-4 group hover:border-[var(--calm-blue)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--calm-blue)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--calm-blue)]/20 transition-colors">
                  <Globe className="w-4 h-4 text-[var(--calm-blue)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-medium text-[var(--text-primary)] truncate">{hotline.org}</h3>
                  <p className="text-sm font-bold text-[var(--calm-blue)]">{hotline.number}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--calm-blue)] transition-colors shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Rehab Centers */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="PAGCOR-Accredited Rehab Centers"
            title="Professional Treatment"
            description="DOH-accredited residential treatment centers for gambling addiction in the Philippines."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pagcorAccreditedRehabs.map((rehab, i) => (
              <motion.div
                key={rehab.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6"
              >
                <MapPin className="w-5 h-5 text-[var(--accent-teal)] mb-3" />
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{rehab.name}</h3>
                <p className="text-xs text-[var(--accent-teal)] font-medium mb-2">{rehab.contact}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2">{rehab.location}</p>
                <p className="text-xs text-[var(--text-muted)]">{rehab.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Online Communities"
            title="Support Groups"
            description="Connect with people who understand. Anonymous. Free. Available 24/7."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityPlatforms.map((comm, i) => (
              <motion.a
                key={comm.name}
                href={comm.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-2xl p-5 hover:border-[var(--accent-teal)]/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[var(--accent-teal)]" />
                  <span className="text-xs font-medium text-[var(--accent-teal)]">{comm.type}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{comm.name}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{comm.note}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
