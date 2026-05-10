import { Link } from 'react-router';
import {
  Shield,
  Phone,
  Heart,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Globe,
} from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: 'Get Help', to: '/get-help' },
  { label: 'Resources', to: '/resources' },
  { label: 'Self-Exclusion', to: '/self-exclusion' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Subscribe', to: '/subscribe' },
  { label: 'Donate', to: '/donate' },
  { label: 'Dashboard', to: '/dashboard-access' },
];

const crisisHotlines = [
  { name: 'DOH 1553', number: '1553', href: 'tel:1553' },
  { name: 'PAGCOR', number: '(02) 8527-0995', href: 'tel:0285270995' },
  { name: 'Natasha Goulbourn', number: '(02) 804-4673', href: 'tel:028044673' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kichiro23', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/drei_sanity', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/andrei.deleon23', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://discord.com/users/drei_sanity', label: 'Discord' },
  { icon: Globe, href: 'https://ctrl-create-srvcs.vercel.app', label: 'Website' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer className="relative z-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-[var(--accent-teal)]" />
              <span className="text-lg font-bold text-[var(--text-primary)]">Kalasag</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Built by <a href="https://ctrl-create-srvcs.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--accent-teal)] transition-colors">Rommel Andrei De Leon</a> from Malolos, Bulacan, Philippines.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis Hotlines */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              {t.footer.crisisHotline}
            </h3>
            <ul className="space-y-3">
              {crisisHotlines.map((hotline) => (
                <li key={hotline.name}>
                  <a
                    href={hotline.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors block"
                  >
                    <span className="font-medium text-[var(--text-primary)]">{hotline.name}</span>
                    <span className="text-[var(--text-muted)] ml-1">{hotline.number}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Badges */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Trust
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                {t.footer.anonymous}
              </li>
              <li className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                {t.footer.noDataStored}
              </li>
              <li className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Heart className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
                {t.footer.filipinoOwned}
              </li>
              <li className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Shield className="w-3.5 h-3.5 text-purple-500" />
                {t.footer.premiumAvailable}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            {t.footer.copyright.replace('{year}', String(currentYear))}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
