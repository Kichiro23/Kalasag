import { motion } from 'framer-motion';
import {
  Shield,
  User,
  Handshake,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kichiro23', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/drei_sanity', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/andrei.deleon23', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://discord.com/users/drei_sanity', label: 'Discord' },
  { icon: Globe, href: 'https://ctrl-create-srvcs.vercel.app', label: 'Website' },
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.about);

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
            {t.about.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.about.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.about.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Developer Story - PROMINENT */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-teal)]/5 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[var(--accent-teal)] to-purple-500 flex items-center justify-center shadow-xl">
                  <User className="w-14 h-14 md:w-16 md:h-16 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <span className="text-[13px] font-medium text-[var(--accent-teal)] uppercase tracking-wider">The Developer</span>
                  <h2 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mt-1">
                    {t.about.story.name}
                  </h2>
                  <p className="text-sm text-[var(--accent-teal)] mt-1">{t.about.story.role}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1"><Clock size={12} /> {t.about.story.experience}</span>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 md:p-6 mb-5 border-l-4 border-[var(--accent-teal)]">
                  <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed italic">
                    "{t.about.story.description}"
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] hover:scale-110 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
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

      {/* Principles */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              {t.about.principles.title}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.about.principles.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 text-center dash-interactive hover:scale-[1.02] transition-transform"
              >
                <CheckCircle className="w-6 h-6 text-[var(--accent-teal)] mx-auto mb-2" />
                <span className="text-sm font-medium text-[var(--text-primary)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
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

      {/* Direct Contact */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
              {t.about.contact.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <a href={`mailto:${t.about.contact.email}`} className="flex items-center gap-3 glass-card rounded-xl p-4 dash-interactive text-left">
                <Mail className="w-5 h-5 text-[var(--accent-teal)]" />
                <span className="text-sm text-[var(--text-primary)]">{t.about.contact.email}</span>
              </a>
              <a href={`tel:${t.about.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 glass-card rounded-xl p-4 dash-interactive text-left">
                <Phone className="w-5 h-5 text-[var(--accent-teal)]" />
                <span className="text-sm text-[var(--text-primary)]">{t.about.contact.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Non-profit */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
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
