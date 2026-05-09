import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  X,
  Heart,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';

const phHotlines = [
  { name: 'pagcorHotline', number: 'pagcorNumber', tel: '+63285270995' },
  { name: 'dohHotline', number: 'dohNumber', tel: '1553' },
  { name: 'natashaFoundation', number: 'natashaNumber', tel: '+6328044673' },
  { name: 'inTouchHotline', number: 'inTouchNumber', tel: '+63288937603' },
];

const intlHotlines = [
  { name: 'gamblersAnonymous', number: 'gaNumber', tel: '+16269603500' },
];

export default function CrisisWidget() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = content[lang];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[80] w-14 h-14 rounded-full bg-[var(--error)] text-white flex items-center justify-center shadow-lg btn-crisis"
        aria-label={open ? t.crisis.close : t.crisis.open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-[80] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[420px] h-[520px] max-h-[calc(100vh-8rem)] rounded-3xl glass-panel shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-5 h-5 text-[var(--error)]" />
                <h3 className="font-bold text-[var(--text-primary)]">
                  {t.crisis.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {t.crisis.subtitle}
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* I Need Help Now */}
              <a
                href="tel:1553"
                className="block w-full text-center py-3.5 rounded-2xl font-semibold text-white bg-[var(--error)] animate-breathe shadow-lg"
              >
                {t.crisis.iNeedHelp}
              </a>

              {/* Philippines */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[var(--accent-teal)]" />
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {t.crisis.philippines}
                  </h4>
                </div>
                <div className="space-y-2">
                  {phHotlines.map((h) => (
                    <a
                      key={h.name}
                      href={`tel:${h.tel}`}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {t.crisis[h.name as keyof typeof t.crisis]}
                        </p>
                        <p className="text-xs text-[var(--accent-teal)] font-medium">
                          {t.crisis[h.number as keyof typeof t.crisis]}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center group-hover:bg-[var(--accent-teal)]/20 transition-colors">
                        <Phone className="w-4 h-4 text-[var(--accent-teal)]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* SMS */}
              <a
                href="sms:09178001123"
                className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {t.crisis.text}
                  </p>
                  <p className="text-xs text-[var(--accent-teal)] font-medium">
                    {t.crisis.smsNumber}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center group-hover:bg-[var(--accent-teal)]/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-[var(--accent-teal)]" />
                </div>
              </a>

              {/* International */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[var(--calm-blue)]" />
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    {t.crisis.international}
                  </h4>
                </div>
                <div className="space-y-2">
                  {intlHotlines.map((h) => (
                    <a
                      key={h.name}
                      href={`tel:${h.tel}`}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-glow)] transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {t.crisis[h.name as keyof typeof t.crisis]}
                        </p>
                        <p className="text-xs text-[var(--calm-blue)] font-medium">
                          {t.crisis[h.number as keyof typeof t.crisis]}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[var(--calm-blue)]/10 flex items-center justify-center group-hover:bg-[var(--calm-blue)]/20 transition-colors">
                        <Phone className="w-4 h-4 text-[var(--calm-blue)]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
