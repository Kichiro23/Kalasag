import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function ComingSoonModal({ open, onClose, title }: ComingSoonModalProps) {
  const { lang } = useLanguage();
  const t = content[lang];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90vw] max-w-[420px] glass-panel rounded-3xl p-6 md:p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-surface-solid)] transition-colors"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-[var(--accent-teal)]" />
              </div>
              <h3 id="coming-soon-title" className="text-xl font-bold text-[var(--text-primary)] mb-2">
                {title || 'Coming Soon'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                {lang === 'fil'
                  ? 'Ang feature na ito ay kasalukuyang pinapaunlad. Manatiling nakatutok para sa mga update.'
                  : 'This feature is currently being developed. Stay tuned for updates.'}
              </p>
              <button onClick={onClose} className="btn-primary">
                {t.common.close}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
