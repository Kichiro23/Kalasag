import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Smartphone,
  Wallet,
  Copy,
  Check,
  Server,
  Code,
  Phone,
  Users,
  BookOpen,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

function CopyButton({ text, copiedText }: { text: string; copiedText: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-2 text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors"
      title={copied ? copiedText : 'Copy'}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

const whyIcons = [Server, Code, Phone, Users, BookOpen];

export default function DonatePage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(lang === 'fil' ? 'Mag-donate' : 'Donate');

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
            {t.donate.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.donate.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.donate.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {t.donate.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`glass-card rounded-2xl p-6 text-center dash-interactive ${i === 3 ? 'border-[var(--accent-teal)]/40' : ''}`}
              >
                <Heart className={`w-6 h-6 mx-auto mb-3 ${i === 3 ? 'text-[var(--accent-teal)]' : 'text-[var(--text-muted)]'}`} />
                <p className="text-2xl font-bold text-[var(--text-primary)]">{tier.amount}</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">{tier.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">{tier.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">{t.donate.methods.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-[var(--text-primary)]">{t.donate.methods.gcash}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-[var(--text-secondary)] font-mono">{t.donate.methods.gcashNumber}</span>
                  <CopyButton text={t.donate.methods.gcashNumber} copiedText={t.donate.methods.copied} />
                </div>
              </div>
              <div className="glass-card rounded-xl p-5 border-l-4 border-[#003087]">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-[#003087]" />
                  <span className="font-semibold text-[var(--text-primary)]">{t.donate.methods.paypal}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-[var(--text-secondary)] font-mono">{t.donate.methods.paypalEmail}</span>
                  <CopyButton text={t.donate.methods.paypalEmail} copiedText={t.donate.methods.copied} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where Money Goes */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">{t.donate.why.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.donate.why.items.map((item, i) => {
                const Icon = whyIcons[i] || Heart;
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-3 glass-card rounded-xl p-4"
                  >
                    <Icon className="w-5 h-5 text-[var(--accent-teal)] shrink-0" />
                    <span className="text-sm text-[var(--text-primary)]">{item}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
