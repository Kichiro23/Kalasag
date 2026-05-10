import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';

const navLinks = [
  { path: '/', key: 'home' },
  { path: '/get-help', key: 'getHelp' },
  { path: '/self-exclusion', key: 'selfExclusion' },
  { path: '/resources', key: 'resources' },
  { path: '/recovery-tools', key: 'recoveryTools' },
  { path: '/stories', key: 'stories' },
  { path: '/families', key: 'families' },
  { path: '/about', key: 'about' },
  { path: '/contact', key: 'contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = content[lang];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <nav className="glass-navbar rounded-full max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[var(--accent-teal)] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[var(--text-primary)]">
              Kalasag
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isActive(link.path) && (
                  <div className="absolute inset-0 bg-[var(--accent-teal)] rounded-full" />
                )}
                <span className="relative z-10">
                  {t.nav[link.key as keyof typeof t.nav]}
                </span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)] transition-colors text-xs font-bold"
              aria-label={t.nav.toggleLanguage}
              title={lang === 'en' ? 'Switch to Filipino' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="ml-0.5">{lang.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)] transition-colors"
              aria-label={t.nav.toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)] transition-all"
            >
              {t.nav.login}
            </Link>
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-[var(--accent-teal)] hover:brightness-110 transition-all"
            >
              {t.nav.dashboard}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)] transition-colors"
              aria-label={t.nav.openMenu}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[280px] glass-panel shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
                <span className="font-bold text-lg text-[var(--text-primary)]">Kalasag</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface-solid)] transition-colors"
                  aria-label={t.nav.closeMenu}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-[var(--accent-teal)] text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)]'
                      }`}
                    >
                      {t.nav[link.key as keyof typeof t.nav]}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 px-3 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-solid)] transition-all border border-[var(--border-subtle)]"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-full text-sm font-semibold text-white bg-[var(--accent-teal)] hover:brightness-110 transition-all"
                  >
                    {t.nav.dashboard}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
