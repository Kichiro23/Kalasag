import { Link } from 'react-router';
import { Shield, Github, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';

const quickLinks = [
  { path: '/get-help', key: 'getHelp' },
  { path: '/resources', key: 'resources' },
  { path: '/self-exclusion', key: 'selfExclusion' },
  { path: '/about', key: 'about' },
  { path: '/contact', key: 'contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kichiro23', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/drei_sanity', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/andrei.deleon23', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://discord.com/users/drei_sanity', label: 'Discord' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 glass-footer mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-teal)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[var(--text-primary)]">
                Kalasag
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {t.footer.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
                  >
                    {t.nav[link.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              {t.footer.crisisHotline}
            </h3>
            <div className="space-y-3">
              <a
                href="tel:1553"
                className="block text-sm font-medium text-[var(--error)] hover:underline"
              >
                DOH 1553
              </a>
              <a
                href="tel:+63285270995"
                className="block text-sm font-medium text-[var(--error)] hover:underline"
              >
                PAGCOR (02) 8527-0995
              </a>
              <a
                href="tel:+6328044673"
                className="block text-sm font-medium text-[var(--error)] hover:underline"
              >
                NGF (02) 804-4673
              </a>
            </div>
          </div>

          {/* Trust */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Kalasag
            </h3>
            <div className="space-y-2">
              <div className="trust-badge">
                <Shield className="w-3.5 h-3.5" />
                {t.footer.anonymous}
              </div>
              <div className="trust-badge">
                <Shield className="w-3.5 h-3.5" />
                {t.footer.noDataStored}
              </div>
              <div className="trust-badge">
                <Shield className="w-3.5 h-3.5" />
                {t.footer.freeForever}
              </div>
              <div className="trust-badge">
                <Shield className="w-3.5 h-3.5" />
                {t.footer.filipinoOwned}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            {t.footer.copyright.replace('{year}', String(year))}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
