import { motion } from 'framer-motion';
import { Shield, Check, Lock, EyeOff, Database, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(lang === 'fil' ? 'Patakaran sa Privacy' : 'Privacy Policy');

  const sections = [
    {
      icon: EyeOff,
      title: lang === 'fil' ? '100% Anonymous' : '100% Anonymous',
      text: lang === 'fil'
        ? 'Hindi namin kailanman hihingin ang iyong tunay na pangalan, email, o anumang personal na impormasyon para gamitin ang aming core features. Maaari kang mag-access ng lahat ng support resources nang hindi naglologin.'
        : 'We never ask for your real name, email, or any personal information to use our core features. You can access all support resources without ever logging in.',
    },
    {
      icon: Lock,
      title: lang === 'fil' ? 'Walang Data na Sini-store' : 'Zero Data Retention',
      text: lang === 'fil'
        ? 'Para sa mga anonymous na feature, walang personal na data ang sini-store sa aming mga server. Ang mood journal at iba pang sensitive na tool ay maaaring mag-operate nang local-only sa iyong device.'
        : 'For anonymous features, no personal data is stored on our servers. Mood journals and other sensitive tools can operate local-only on your device.',
    },
    {
      icon: Database,
      title: lang === 'fil' ? 'Walang Tracking o Analytics' : 'No Tracking or Analytics',
      text: lang === 'fil'
        ? 'Hindi kami gumagamit ng tracking pixels, third-party cookies, o individual-identifying analytics. Kung gumagamit man kami ng anonymized metrics, ito ay aggregated at hindi maaaring traced pabalik sa iyo.'
        : 'We do not use tracking pixels, third-party cookies, or individual-identifying analytics. Any anonymized metrics we use are aggregated and cannot be traced back to you.',
    },
    {
      icon: Globe,
      title: lang === 'fil' ? 'Walang Pagbebenta ng Data' : 'No Data Selling',
      text: lang === 'fil'
        ? 'Hindi namin ibinebenta, ini-store, o shinashare ang iyong data sa third parties — kailanman. Ang Kalasag ay isang non-profit initiative na may tanging layuning tulungan, hindi kumita mula sa data.'
        : 'We do not sell, store, or share your data with third parties — ever. Kalasag is a non-profit initiative with the sole purpose of helping, not profiting from data.',
    },
  ];

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
              {lang === 'fil' ? 'Patakaran sa Privacy' : 'Privacy Policy'}
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {lang === 'fil'
                ? 'Ang iyong privacy ay ang pundasyon ng Kalasag. Basahin kung paano namin protektahan ang iyong data.'
                : 'Your privacy is the foundation of Kalasag. Read how we protect your data.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {sections.map((section, i) => (
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
                    <section.icon className="w-5 h-5" />
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
            ))}
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
                {lang === 'fil' ? 'Aming Pangako' : 'Our Pledge'}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              {lang === 'fil'
                ? 'Ang Kalasag ay hindi kailanman magbe-benta, magte-trade, o magdi-display ng ads gamit ang iyong data. Ang platform na ito ay libre, anonymous, at palaging magiging ganoon.'
                : 'Kalasag will never sell, trade, or display ads using your data. This platform is free, anonymous, and will always remain so.'}
            </p>
          </motion.div>

          <p className="text-xs text-[var(--text-muted)] text-center mt-8">
            {lang === 'fil'
              ? 'Huling na-update: Mayo 2026'
              : 'Last updated: May 2026'}
          </p>
        </div>
      </section>
    </Layout>
  );
}
