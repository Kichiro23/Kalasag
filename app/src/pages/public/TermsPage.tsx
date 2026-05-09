import { motion } from 'framer-motion';
import { FileText, AlertCircle, Heart, Scale } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function TermsPage() {
  const { lang } = useLanguage();
  usePageTitle(lang === 'fil' ? 'Mga Tuntunin ng Paggamit' : 'Terms of Use');

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
              <FileText className="w-8 h-8 text-[var(--accent-teal)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
              {lang === 'fil' ? 'Mga Tuntunin ng Paggamit' : 'Terms of Use'}
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {lang === 'fil'
                ? 'Mahalaga sa amin ang iyong kaligtasan. Pakibasa ang mga tuntuning ito bago gamitin ang Kalasag.'
                : 'Your safety matters to us. Please read these terms before using Kalasag.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="icon-container shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {lang === 'fil' ? 'Hindi Medical Advice' : 'Not Medical Advice'}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {lang === 'fil'
                      ? 'Ang Kalasag ay nagbibigay ng peer support, edukasyon, at self-help tools. Hindi ito kapalit ng propesyonal na medical o psychiatric na payo. Kung nasa panganib ka, tumawag agad sa emergency services o sa mga crisis hotline na nakalista sa aming platform.'
                      : 'Kalasag provides peer support, education, and self-help tools. It is not a substitute for professional medical or psychiatric advice. If you are in danger, call emergency services or the crisis hotlines listed on our platform immediately.'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="icon-container shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {lang === 'fil' ? 'Komunidad ng Paggalang' : 'Community of Respect'}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {lang === 'fil'
                      ? 'Inaasahan namin na ang lahat ng user ay makikitungo nang may paggalang, walang diskriminasyon, at walang pangha-harass. Ang anumang uri ng hate speech, bullying, o pananakot ay hindi pinapayagan at maaaring magresulta sa pagbabawal ng access.'
                      : 'We expect all users to engage with respect, without discrimination, and without harassment. Any form of hate speech, bullying, or intimidation is prohibited and may result in access restriction.'}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="icon-container shrink-0 mt-0.5">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {lang === 'fil' ? 'Limitasyon ng Pananagutan' : 'Limitation of Liability'}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {lang === 'fil'
                      ? 'Ginagawa namin ang aming makakaya para matiyak ang kawastuhan ng impormasyon, ngunit hindi kami mananagot para sa anumang direktang o indirektang pinsala na maaaring magresulta mula sa paggamit ng platform na ito. Kung ikaw ay nasa crisis, mangyaring kumontak sa mga propesyonal na serbisyo.'
                      : 'We do our best to ensure information accuracy, but we are not liable for any direct or indirect harm that may result from using this platform. If you are in crisis, please contact professional services.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

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
