import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  Download,
  FileText,
  User,
  Camera,
  Clock,
  Users,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { selfExclusionPrograms, blockingSoftware } from '@/data/research';

const steps = [
  { num: 1, title: 'Requirements', icon: FileText, desc: 'Gather required documents' },
  { num: 2, title: 'Fill Form', icon: User, desc: 'Complete the application' },
  { num: 3, title: 'Submit', icon: ArrowRight, desc: 'Send to PAGCOR' },
  { num: 4, title: 'Track', icon: Clock, desc: 'Monitor your status' },
];

const financialTools = [
  { icon: CreditCard, title: 'Freeze Credit Cards', desc: 'Contact your bank to temporarily freeze all credit cards.' },
  { icon: Ban, title: 'Block Transactions', desc: 'Set up gambling transaction blocks with your bank.' },
  { icon: Lock, title: 'Set Spending Limits', desc: 'Reduce daily withdrawal and spending limits.' },
  { icon: PiggyBank, title: 'Automate Savings', desc: 'Auto-transfer a portion of income to a separate savings account.' },
];

export default function SelfExclusionPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.selfExclusion);

  const [activeStep, setActiveStep] = useState(1);
  const [openBlocker, setOpenBlocker] = useState<string | null>(null);

  const pagcor = selfExclusionPrograms.find(p => p.country === 'Philippines');
  const intl = selfExclusionPrograms.filter(p => p.country !== 'Philippines');

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-eyebrow block mb-4">
            {t.selfExclusion.hero.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance">
            {t.selfExclusion.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.selfExclusion.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Step-by-Step Wizard */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Application Guide" title="PAGCOR Self-Exclusion Walkthrough" description="Follow these 4 steps to register for PAGCOR's self-exclusion program." />

          {/* Step Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {steps.map((step) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeStep === step.num ? 'bg-[var(--accent-teal)] text-white' : 'bg-[var(--bg-surface-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <step.icon className="w-3.5 h-3.5" />
                {step.num}. {step.title}
              </button>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-6 md:p-10"
            >
              {activeStep === 1 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Step 1: Gather Required Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pagcor?.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                        <Check className="w-4 h-4 text-[var(--accent-teal)] shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-primary)]">{req}</span>
                      </div>
                    )) || <p className="text-sm text-[var(--text-secondary)]">Loading requirements...</p>}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <p className="text-xs text-amber-600"><strong>Note:</strong> The first 6 months of self-exclusion are irrevocable. You cannot cancel or shorten the period once registered.</p>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Step 2: Complete the Application</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">Download and fill out the PAGCOR RG Form 2 (Self-Exclusion Application Form). Ensure all information is accurate.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Application Form</p>
                        <p className="text-xs text-[var(--text-secondary)]">RG Form 2 — available at PAGCOR offices or downloadable online</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Camera className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">2x2 Photos</p>
                        <p className="text-xs text-[var(--text-secondary)]">Recent passport-size photos with white background</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Valid Government ID</p>
                        <p className="text-xs text-[var(--text-secondary)]">Passport, Driver's License, SSS ID, or any government-issued ID</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">Family Exclusion</p>
                        <p className="text-xs text-[var(--text-secondary)]">Spouse or parent 18+ can apply on behalf of the gambler</p>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.pagcor.ph/regulatory/exclusion.php" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-sm">
                    <Download className="w-4 h-4" />
                    Download Forms
                  </a>
                </div>
              )}

              {activeStep === 3 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Step 3: Submit Your Application</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="glass-card rounded-xl p-4">
                      <p className="text-xs text-[var(--text-muted)] mb-1">In Person</p>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{pagcor?.address || 'PAGCOR Regulatory Office'}</p>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <p className="text-xs text-[var(--text-muted)] mb-1">By Email</p>
                      <a href={`mailto:${pagcor?.email}`} className="text-sm text-[var(--accent-teal)] hover:underline">{pagcor?.email || 'responsiblegaming@pagcor.ph'}</a>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">Processing typically takes 5-10 business days. You will receive confirmation via email or SMS.</p>
                </div>
              )}

              {activeStep === 4 && (
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Step 4: Track Your Status</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">Once approved, your name is added to the National Database of Restricted Personalities (NDRP). This is enforced across all PAGCOR facilities nationwide.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pagcor?.periods.map((p, i) => (
                      <div key={i} className="glass-card rounded-xl p-4 text-center">
                        <Clock className="w-5 h-5 text-[var(--accent-teal)] mx-auto mb-2" />
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PAGCOR Info Card */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container"><Shield className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{t.selfExclusion.registry.title}</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-6">{t.selfExclusion.registry.description}</p>
            {pagcor && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><Globe className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" /><div><p className="text-xs text-[var(--text-muted)]">Website</p><a href={pagcor.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-teal)] hover:underline">{pagcor.url}</a></div></div>
                  <div className="flex items-start gap-3"><Mail className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" /><div><p className="text-xs text-[var(--text-muted)]">Email</p><a href={`mailto:${pagcor.email}`} className="text-sm text-[var(--accent-teal)] hover:underline">{pagcor.email}</a></div></div>
                  <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[var(--accent-teal)] mt-1 shrink-0" /><div><p className="text-xs text-[var(--text-muted)]">Address</p><p className="text-sm text-[var(--text-primary)]">{pagcor.address}</p></div></div>
                </div>
                <div className="space-y-3">
                  <div><p className="text-xs font-semibold text-[var(--text-primary)] mb-1">Self-Exclusion Periods</p><div className="flex flex-wrap gap-2">{pagcor.periods.map(p => <span key={p} className="px-3 py-1 rounded-full text-xs bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{p}</span>)}</div></div>
                  <div><p className="text-xs font-semibold text-[var(--text-primary)] mb-1">Family Exclusion Periods</p><div className="flex flex-wrap gap-2">{pagcor.familyPeriods.map(p => <span key={p} className="px-3 py-1 rounded-full text-xs bg-[var(--calm-blue)]/10 text-[var(--calm-blue)]">{p}</span>)}</div></div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <a href="https://www.pagcor.ph/regulatory/exclusion.php" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex text-sm">{t.selfExclusion.registry.cta}<ExternalLink className="w-4 h-4" /></a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blocking Software with Accordion */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Blocking Software" title="Block Gambling Sites" description="These tools block gambling sites across all your devices. Most offer free trials or are completely free." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blockingSoftware.map((sw, i) => (
              <motion.div key={sw.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{sw.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{sw.price}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-2">{sw.features}</p>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] mb-3">
                  <span>{sw.platforms}</span>
                  <span>{sw.sites} sites</span>
                </div>
                <button onClick={() => setOpenBlocker(openBlocker === sw.name ? null : sw.name)} className="text-xs text-[var(--accent-teal)] flex items-center gap-1 mb-2">
                  How to Install <ChevronDown className={`w-3 h-3 transition-transform ${openBlocker === sw.name ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openBlocker === sw.name && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <ol className="text-xs text-[var(--text-secondary)] space-y-1 list-decimal list-inside pl-1">
                        <li>Visit the official website and create an account</li>
                        <li>Download the app for your device(s)</li>
                        <li>Install and grant necessary permissions</li>
                        <li>Enable gambling site blocking category</li>
                        <li>Set a restriction period (recommended: at least 6 months)</li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
                <a href={sw.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 mt-2 inline-flex">Visit Website<ExternalLink className="w-3 h-3" /></a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Protection */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Financial Safety" title="Protect Your Finances" description="Take control of your money while you recover from gambling addiction." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financialTools.map((tool, i) => (
              <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                  <tool.icon className="w-5 h-5 text-[var(--accent-teal)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{tool.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Programs */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="International" title="Self-Exclusion Abroad" description="If you gamble on international platforms, register with these programs too." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intl.map((prog, i) => (
              <motion.div key={prog.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[var(--calm-blue)]" />
                  <span className="text-xs text-[var(--calm-blue)]">{prog.country}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{prog.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{prog.note}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {prog.periods.map(p => <span key={p} className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--bg-surface-solid)] text-[var(--text-secondary)]">{p}</span>)}
                </div>
                {prog.url && <a href={prog.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1">Visit <ExternalLink className="w-3 h-3" /></a>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
