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
    <footer className="relative z-10 border-t border-[var(--border-subtle)]" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-[var(--accent-teal)]" />
              <span className="text-base font-bold text-[var(--text-primary)]">Kalasag</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-2 leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mb-3">
              Built by <a href="https://ctrl-create-srvcs.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--accent-teal)] transition-colors">Rommel Andrei De Leon</a>
            </p>
            <div className="flex items-center gap-1.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[var(--accent-teal)] transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-3">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis Hotlines */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-red-500" />
              {t.footer.crisisHotline}
            </h3>
            <ul className="space-y-1.5">
              {crisisHotlines.map((hotline) => (
                <li key={hotline.name}>
                  <a
                    href={hotline.href}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors block"
                  >
                    <span className="font-medium text-[var(--text-primary)]">{hotline.name}</span>
                    <span className="text-[var(--text-muted)] ml-1">{hotline.number}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <Shield className="w-3 h-3 text-green-500" /> {t.footer.anonymous}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <Heart className="w-3 h-3 text-[var(--accent-teal)]" /> {t.footer.noDataStored}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <Shield className="w-3 h-3 text-blue-500" /> {t.footer.evidenceBased}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[var(--text-muted)]">
            {t.footer.copyright.replace('{year}', String(currentYear))}
          </p>
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="text-[10px] text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
