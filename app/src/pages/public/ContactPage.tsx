import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Globe,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const socialLinks = [
  { icon: Globe, href: 'https://ctrl-create-srvcs.vercel.app', label: 'Website' },
  { icon: Github, href: 'https://github.com/Kichiro23', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/drei_sanity', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/andrei.deleon23', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://discord.com/users/drei_sanity', label: 'Discord' },
];

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.contact);

  const [formType, setFormType] = useState(0);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setMessage('');
  };

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
            {t.contact.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.contact.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.contact.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Form & Contact */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-3 glass-card rounded-3xl p-6 md:p-10"
          >
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
              {t.contact.form.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {t.contact.form.description}
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-4">
                  <Send className="w-7 h-7 text-[var(--success)]" />
                </div>
                <p className="text-base font-medium text-[var(--text-primary)]">
                  {t.contact.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    placeholder={t.contact.form.honeypot}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    {t.contact.form.typeLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.types.map((type, i) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormType(i)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                          formType === i
                            ? 'bg-[var(--accent-teal)] text-white'
                            : 'bg-[var(--bg-surface-solid)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={5}
                    required
                    className="glass-input w-full resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full md:w-auto"
                >
                  {submitting ? t.contact.form.submitting : t.contact.form.submit}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                {t.contact.developer.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                {t.contact.developer.description}
              </p>
              <div className="space-y-3">
                <a
                  href={`mailto:${t.contact.developer.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t.contact.developer.email}
                </a>
                <a
                  href={`tel:${t.contact.developer.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t.contact.developer.phone}
                </a>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <MapPin className="w-4 h-4" />
                  {t.contact.developer.location}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                {t.contact.social.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                {t.contact.social.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
