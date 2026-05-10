import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BookHeart,
  Zap,
  Library,
  Waves,
  ArrowRight,
  Gamepad2,
  TreePine,
  Brain,
  Shield,
  ExternalLink,
  LayoutDashboard,
  Flame,
  Trophy,
  Wallet,
  BarChart3,
  Ban,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { use3DTilt } from '@/hooks/use3DTilt';
import { recoveryApps } from '@/data/research';

const dashboardTools = [
  { icon: Flame, label: 'Streak Tracker', desc: '12 day streak', path: '/dashboard/analytics', color: 'text-orange-400' },
  { icon: BookHeart, label: 'Mood Journal', desc: 'Track daily mood', path: '/dashboard/daily-check', color: 'text-pink-400' },
  { icon: Zap, label: 'Trigger Map', desc: 'Identify triggers', path: '/dashboard/trigger-map', color: 'text-amber-400' },
  { icon: Brain, label: 'CBT Chat', desc: 'Talk to Shield Bot', path: '/dashboard/shield-bot', color: 'text-blue-400' },
  { icon: Wallet, label: 'Finance Tracker', desc: 'Monitor spending', path: '/dashboard/finance', color: 'text-emerald-400' },
  { icon: Shield, label: 'Urge Intervention', desc: 'Immediate help', path: '/intervention', color: 'text-red-400' },
];

const tools = [
  { key: 'streakTracker', icon: TrendingUp, link: '/dashboard/analytics' },
  { key: 'moodJournal', icon: BookHeart, link: '/dashboard/daily-check' },
  { key: 'triggers', icon: Zap, link: '/dashboard/trigger-map' },
  { key: 'coping', icon: Library, link: '/dashboard/recovery' },
  { key: 'rideTheWave', icon: Waves, link: '/intervention' },
];

const games = [
  { title: 'Urge Surfer', description: 'Ride a virtual wave for 20 minutes — the exact window most urges last.', icon: Waves, status: 'Available' },
  { title: 'Tree Grower', description: 'Plant a virtual tree that grows the longer you resist gambling.', icon: TreePine, status: 'Available' },
  { title: 'Budget Defender', description: 'Tower defense game where you defend your savings from gambling temptations.', icon: Shield, status: 'Coming Soon' },
  { title: 'Breathing Bubble', description: 'Interactive breathing exercise with gamified streaks and rewards.', icon: Brain, status: 'Available' },
];

const externalApps = [
  ...recoveryApps,
  { name: 'Whistl', cost: 'Subscription', features: 'AI-powered proactive intervention. Biometric integration. Partner accountability.', url: 'https://whistl.app' },
  { name: 'BetBlocker', cost: 'Free', features: '327,500+ sites blocked. Charity-funded. Custom restriction periods. Unlimited devices.', url: 'https://betblocker.org' },
  { name: 'Gamban', cost: 'Free via GamCare', features: '100,000+ sites blocked. 99% effectiveness. Blocks crypto/CFD/trading. 7-day free trial.', url: 'https://gamban.com' },
  { name: 'Freedom', cost: 'Subscription', features: 'Blocks gambling apps across multiple devices with customizable schedules.', url: 'https://freedom.to' },
  { name: 'Cold Turkey Blocker', cost: 'Free + Premium', features: 'Unbreakable custom rules. Schedule blocks for set periods. Desktop only.', url: 'https://getcoldturkey.com' },
  { name: 'GamBlock', cost: '~₱600/mo', features: 'Heuristic-based blocking. Survives factory resets. Cannot bypass with VPN/Tor.', url: 'https://gamblock.com' },
];

function ToolCard({ tool, index }: { tool: { key: string; icon: React.ComponentType<{ className?: string }>; link: string }; index: number }) {
  const tiltRef = use3DTilt(6);
  const { lang } = useLanguage();
  const t = content[lang];
  const toolData = t.recoveryTools[tool.key as keyof typeof t.recoveryTools] as { title: string; description: string; cta: string };
  const Icon = tool.icon;

  return (
    <motion.div
      key={tool.key}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      ref={tiltRef}
      className="glass-card rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group cursor-default"
    >
      <div className="tilt-glare absolute inset-0 pointer-events-none z-10" />
      <div className="icon-container mb-5">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {toolData.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
        {toolData.description}
      </p>
      <Link to={tool.link} className="btn-primary text-sm py-3 px-6">
        {toolData.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

export default function RecoveryToolsPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.recoveryTools);

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-eyebrow block mb-4">
            {t.recoveryTools.hero.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance">
            {t.recoveryTools.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.recoveryTools.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Your Dashboard */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Your Tools" title="Your Dashboard" description="Access all your personal recovery tools in one place." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {dashboardTools.map((tool, i) => (
              <motion.div key={tool.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <Link to={tool.path} className="glass-card rounded-2xl p-5 dash-interactive block h-full">
                  <tool.icon size={20} className={`${tool.color} mb-2`} />
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{tool.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">{tool.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2 text-sm">
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Built-in Tools" title="Your Personal Toolkit" description="Track, reflect, and build healthier habits with our evidence-based tools." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, i) => (
              <ToolCard key={tool.key} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Urge-Stopping Games" title="Play Your Way to Recovery" description="Gamified exercises that make resisting urges fun and rewarding." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((game, i) => {
              const Icon = game.icon;
              return (
                <motion.div key={game.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 flex flex-col">
                  <div className="icon-container mb-4"><Icon className="w-5 h-5" /></div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{game.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3 flex-1">{game.description}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${game.status === 'Available' ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--warning)]/10 text-[var(--warning)]'}`}>{game.status}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Apps */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Also Recommended" title="External Recovery Apps" description="Apps built by psychologists and recovery experts that complement Kalasag." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalApps.map((app, i) => (
              <motion.div key={app.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="glass-card rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{app.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--success)]/10 text-[var(--success)]">{app.cost}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 flex-1">{app.features}</p>
                {app.url && <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1">Visit Website <ExternalLink className="w-3 h-3" /></a>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
