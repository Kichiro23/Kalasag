import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, CheckCircle, BookOpen, Users, Shield, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const featureIcons = [BookOpen, Sparkles, Users, Shield];

export default function SubscribePage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(lang === 'fil' ? 'Mag-subscribe' : 'Subscribe');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
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
            {t.subscribe.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.subscribe.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.subscribe.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Subscribe Form */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t.subscribe.form.success}</h2>
                <p className="text-sm text-[var(--text-secondary)]">{t.subscribe.privacy}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.subscribe.form.placeholder}
                    className="w-full glass-input rounded-xl h-14 pl-12 pr-4 text-sm text-[var(--text-primary)]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full h-12 inline-flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  <Bell className="w-4 h-4" />
                  {status === 'loading' ? t.subscribe.form.subscribing : t.subscribe.form.button}
                </button>
                {status === 'error' && (
                  <p className="text-sm text-red-500 text-center">{t.subscribe.form.error}</p>
                )}
                <p className="text-xs text-[var(--text-muted)] text-center">{t.subscribe.privacy}</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-12 md:pb-20">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.subscribe.features.map((feature, i) => {
              const Icon = featureIcons[i] || Bell;
              return (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 text-center dash-interactive"
                >
                  <Icon className="w-6 h-6 text-[var(--accent-teal)] mx-auto mb-2" />
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
