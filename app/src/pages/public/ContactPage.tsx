import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  Smartphone,
  Wallet,
  Bug,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  MessageSquare,
  Trash2,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

interface StoredMessage {
  id: string;
  type: string;
  message: string;
  date: string;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kichiro23', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/drei_sanity', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/andrei.deleon23', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://discord.com/users/drei_sanity', label: 'Discord' },
];

function CopyButton({ text, copiedText }: { text: string; copiedText: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for unsupported browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors"
      title={copied ? copiedText : 'Copy'}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

const STORAGE_KEY = 'kalasag_contact_messages';

function loadMessages(): StoredMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: StoredMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    // ignore
  }
}

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.contact);

  const [formType, setFormType] = useState(t.contact.form.types[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>(loadMessages);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setFormType(t.contact.form.types[0]);
  }, [lang, t.contact.form.types]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const newMsg: StoredMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      type: formType,
      message: message.trim(),
      date: new Date().toISOString(),
    };

    const updated = [newMsg, ...storedMessages].slice(0, 50);
    setStoredMessages(updated);
    saveMessages(updated);
    setSubmitted(true);
    setMessage('');
  };

  const handleDelete = (id: string) => {
    const updated = storedMessages.filter((m) => m.id !== id);
    setStoredMessages(updated);
    saveMessages(updated);
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    setFormType(t.contact.form.types[0]);
  };

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
            {t.contact.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.contact.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.contact.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Developer Contact Card */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">{t.contact.developer.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">{t.contact.developer.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">Email</p>
                  <div className="flex items-center">
                    <a href={`mailto:${t.contact.developer.email}`} className="text-sm font-medium text-[var(--text-primary)] truncate">{t.contact.developer.email}</a>
                    <CopyButton text={t.contact.developer.email} copiedText={t.contact.developer.copied} />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">Phone</p>
                  <div className="flex items-center">
                    <a href={`tel:${t.contact.developer.phone.replace(/\s/g, '')}`} className="text-sm font-medium text-[var(--text-primary)] truncate">{t.contact.developer.phone}</a>
                    <CopyButton text={t.contact.developer.phone} copiedText={t.contact.developer.copied} />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">Location</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{t.contact.developer.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] text-sm text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all"
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support / Payment */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">{t.contact.payment.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">{t.contact.payment.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 border-l-4 border-blue-500 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] font-medium">{t.contact.payment.gcash}</p>
                </div>
                <CopyButton text="0962 790 5910" copiedText={t.contact.payment.copied} />
              </div>

              <div className="glass-card rounded-xl p-5 border-l-4 border-[#003087] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#003087]/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-[#003087]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)] font-medium">{t.contact.payment.paypal}</p>
                </div>
                <CopyButton text="rommeld216@gmail.com" copiedText={t.contact.payment.copied} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bug Bounty */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                <Bug className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">{t.contact.bugBounty.title}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{t.contact.bugBounty.description}</p>
              </div>
            </div>
            <a href={`mailto:${t.contact.developer.email}?subject=Bug%20Bounty%20Report`} className="btn-primary inline-flex items-center gap-2 text-sm">
              {t.contact.bugBounty.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Anonymous Feedback Form */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t.contact.form.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">{t.contact.form.description}</p>

            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-base font-medium text-[var(--text-primary)] mb-4">{t.contact.form.success}</p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="text-sm text-[var(--accent-teal)] hover:underline"
                >
                  {t.contact.form.submit} — {t.contact.form.messageLabel}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="visually-hidden" style={{ position: 'absolute', left: '-9999px' }}>
                  <label htmlFor="website">{t.contact.form.honeypot}</label>
                  <input id="website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">{t.contact.form.typeLabel}</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full glass-input rounded-xl h-11 px-3 text-sm text-[var(--text-primary)]"
                  >
                    {t.contact.form.types.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">{t.contact.form.messageLabel}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={5}
                    className="w-full glass-input rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] resize-none"
                    required
                  />
                </div>

                <button type="submit" disabled={!message.trim()} className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {t.contact.form.submit}
                </button>
              </form>
            )}

            {/* Previous Messages */}
            {storedMessages.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[var(--accent-teal)]" />
                  {t.contact.form.previous}
                </h3>
                <div className="space-y-3">
                  <AnimatePresence>
                    {storedMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-card rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] uppercase tracking-wider font-medium text-[var(--accent-teal)] bg-[var(--accent-teal)]/10 px-2 py-0.5 rounded-full">
                                {msg.type}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {new Date(msg.date).toLocaleDateString(lang === 'fil' ? 'fil-PH' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="text-[var(--text-muted)] hover:text-red-400 transition-colors shrink-0"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
