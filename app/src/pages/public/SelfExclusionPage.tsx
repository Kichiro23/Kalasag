import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Wallet,
  ArrowRight,
  Check,
  Smartphone,
  CreditCard,
  PiggyBank,
  Ban,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { selfExclusionPrograms, blockingSoftware } from '@/data/research';

export default function SelfExclusionPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.selfExclusion);

  const pagcor = selfExclusionPrograms.find(p => p.country === 'Philippines');
  const intl = selfExclusionPrograms.filter(p => p.country !== 'Philippines');
  const toolIcons = [CreditCard, Ban, Lock, PiggyBank];

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="section-eyebrow block mb-4"
          >
            {t.selfExclusion.hero.eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            {t.selfExclusion.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.selfExclusion.hero.description}
          </motion.p>
        </div>
      </section>

      {/* PAGCOR */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {t.selfExclusion.registry.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
              {t.selfExclusion.registry.description}
            </p>

            {pagcor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Website</p>
                      <a href={pagcor.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-teal)] hover:underline">
                        {pagcor.url}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Email</p>
                      <a href={`mailto:${pagcor.email}`} className="text-sm text-[var(--accent-teal)] hover:underline">
                        {pagcor.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Address</p>
                      <p className="text-sm text-[var(--text-primary)]">{pagcor.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Self-Exclusion Periods</p>
                    <div className="flex flex-wrap gap-2">
                      {pagcor.periods.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full text-xs bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Family Exclusion Periods</p>
                    <div className="flex flex-wrap gap-2">
                      {pagcor.familyPeriods.map(p => (
                        <span key={p} className="px-3 py-1 rounded-full text-xs bg-[var(--calm-blue)]/10 text-[var(--calm-blue)]">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Requirements</p>
                    <ul className="space-y-1">
                      {pagcor.requirements.map(r => (
                        <li key={r} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <Check className="w-3 h-3 text-[var(--success)]" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <a href="https://www.pagcor.ph/regulatory/exclusion.php" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
              {t.selfExclusion.registry.cta}
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Blocking Software */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="Blocking Software"
            title="Block Gambling Sites"
            description="These tools block gambling sites across all your devices. Most offer free trials or are completely free."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blockingSoftware.map((sw, i) => (
              <motion.div
                key={sw.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{sw.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{sw.price}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-3 flex-1">{sw.features}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-[10px] text-[var(--text-muted)]">{sw.platforms}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{sw.sites} sites blocked</p>
                </div>
                <a href={sw.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2">
                  Visit Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Programs */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            eyebrow="International"
            title="Self-Exclusion Abroad"
            description="If you gamble on international platforms, register with these programs too."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {intl.map((prog, i) => (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[var(--calm-blue)]" />
                  <span className="text-xs text-[var(--calm-blue)]">{prog.country}</span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{prog.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{prog.note}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {prog.periods.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--bg-surface-solid)] text-[var(--text-secondary)]">{p}</span>
                  ))}
                </div>
                {prog.url && (
                  <a href={prog.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1">
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Protection */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="section-eyebrow block mb-3">{t.selfExclusion.financial.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t.selfExclusion.financial.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {t.selfExclusion.financial.description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.selfExclusion.financial.tools.map((tool, i) => {
              const Icon = toolIcons[i] || Wallet;
              return (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-6 text-center"
                >
                  <div className="icon-container mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {tool}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
