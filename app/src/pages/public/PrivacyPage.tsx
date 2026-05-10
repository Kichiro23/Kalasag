import { motion } from 'framer-motion';
import { Shield, Check, Lock, EyeOff, Database, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const iconMap: Record<string, typeof Shield> = {
  EyeOff,
  Lock,
  Database,
  Globe,
};

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.privacy.title);

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[var(--accent-teal)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
              {t.privacy.title}
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {t.privacy.subtitle}
            </p>
          </motion.div>

          <div className="space-y-6">
            {t.privacy.sections.map((section, i) => {
              const Icon = iconMap[section.icon] || Shield;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="icon-container shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {section.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 p-6 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check className="w-5 h-5 text-[var(--success)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {t.privacy.pledge.title}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              {t.privacy.pledge.text}
            </p>
          </motion.div>

          <p className="text-xs text-[var(--text-muted)] text-center mt-8">
            {t.privacy.updated}
          </p>
        </div>
      </section>
    </Layout>
  );
}
