import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function NotFound() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(lang === 'fil' ? 'Hindi Natagpuan' : 'Page Not Found');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[var(--accent-teal)]" />
          </div>
          <h1 className="text-6xl font-extrabold text-[var(--text-primary)] mb-2">
            404
          </h1>
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            {lang === 'fil' ? 'Hindi Natagpuan ang Pahina' : 'Page Not Found'}
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            {lang === 'fil'
              ? 'Ang pahinang hinahanap mo ay hindi umiiral o inilipat. Huwag mag-alala, ligtas ka pa rin.'
              : 'The page you are looking for does not exist or has been moved. Do not worry, you are still safe.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary w-full sm:w-auto">
              <Home className="w-4 h-4" />
              {t.nav.home}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.common.back}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
