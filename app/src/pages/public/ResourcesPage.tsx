import { motion } from 'framer-motion';
import {
  BookOpen,
  AlertTriangle,
  Wallet,
  Flag,
  Check,
  Quote,
  TrendingUp,
  ExternalLink,
  Headphones,
  BookMarked,
  Users,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';
import { redditTips, philippinesStats, financialTools, recoveryApps } from '@/data/research';

const weeklyData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 1.5 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 0.5 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 1 },
];

const lossData = [
  { name: 'Slots', value: 35, color: '#ef4444' },
  { name: 'Sports', value: 25, color: '#f97316' },
  { name: 'Casino', value: 20, color: '#eab308' },
  { name: 'Online', value: 15, color: '#8b5cf6' },
  { name: 'Lottery', value: 5, color: '#06b6d4' },
];

const recoveryData = [
  { month: 'Jan', streak: 5, relapses: 2 },
  { month: 'Feb', streak: 12, relapses: 1 },
  { month: 'Mar', streak: 8, relapses: 1 },
  { month: 'Apr', streak: 21, relapses: 0 },
  { month: 'May', streak: 18, relapses: 1 },
  { month: 'Jun', streak: 30, relapses: 0 },
];

const urgeData = [
  { time: '0min', intensity: 80 },
  { time: '5min', intensity: 75 },
  { time: '10min', intensity: 60 },
  { time: '15min', intensity: 40 },
  { time: '20min', intensity: 25 },
  { time: '25min', intensity: 15 },
  { time: '30min', intensity: 10 },
];

const keyStats = [
  philippinesStats.onlineGamblers2025,
  philippinesStats.gamingRevenue2025,
  philippinesStats.youngGamblers,
  philippinesStats.weeklySpend,
];

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(t.nav.resources);

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-eyebrow block mb-4">
            {t.resources.hero.eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance">
            {t.resources.hero.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.resources.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Stats with sparklines */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card rounded-2xl p-5 text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-[var(--accent-teal)] mb-1">{stat.value}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-1">{stat.label}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Data & Insights" title="Visualizing the Impact" description="Charts and graphs that show the reality of gambling addiction and recovery." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Weekly Hours */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Average Hours Gambled Per Day</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="hours" fill="var(--accent-teal)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Loss Breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Where Gambling Money Goes</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={lossData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                    {lossData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {lossData.map(d => (
                  <span key={d.name} className="text-[10px] flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name} {d.value}%</span>
                ))}
              </div>
            </motion.div>

            {/* Recovery Journey */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Recovery Journey (Streak Days)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={recoveryData}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="streak" stroke="var(--accent-teal)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Urge Intensity */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Urge Intensity Over 30 Minutes</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={urgeData}>
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="intensity" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container"><BookOpen className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{t.resources.understanding.title}</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">{t.resources.understanding.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container"><AlertTriangle className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{t.resources.warningSigns.title}</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-2xl">{t.resources.warningSigns.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.resources.warningSigns.signs.map((sign, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                  <AlertTriangle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-primary)]">{sign}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reddit Tips */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="From Real People" title={t.resources.redditTips.title} description={t.resources.redditTips.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redditTips.map((tip, i) => (
              <motion.div key={tip.rank} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-teal)] flex items-center justify-center shrink-0"><span className="text-xs font-bold text-white">{tip.rank}</span></div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{tip.tip}</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">{tip.frequency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[var(--bg-surface-solid)]">
                  <Quote className="w-3 h-3 text-[var(--accent-teal)] shrink-0 mt-0.5" />
                  <p className="text-xs text-[var(--text-secondary)] italic">{tip.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Listen & Learn" title={t.resources.podcasts.title} description={t.resources.podcasts.description} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.resources.podcasts.items.map((podcast, i) => (
              <motion.div key={podcast.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 flex flex-col">
                <Headphones className="w-6 h-6 text-[var(--accent-teal)] mb-3" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{podcast.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-2">by {podcast.author}</p>
                <p className="text-xs text-[var(--text-secondary)] flex-1">{podcast.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Read & Recover" title={t.resources.books.title} description={t.resources.books.description} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.resources.books.items.map((book, i) => (
              <motion.div key={book.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 flex flex-col">
                <BookMarked className="w-6 h-6 text-[var(--accent-teal)] mb-3" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{book.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-2">by {book.author}</p>
                <p className="text-xs text-[var(--text-secondary)] flex-1">{book.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Connect" title={t.resources.communities.title} description={t.resources.communities.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.resources.communities.items.map((comm, i) => (
              <motion.a key={comm.name} href={comm.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 dash-interactive flex flex-col">
                <Users className="w-6 h-6 text-[var(--accent-teal)] mb-3" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{comm.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] flex-1">{comm.note}</p>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)] mt-2" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Apps */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading eyebrow="Also Recommended" title="External Recovery Apps" description="Apps built by psychologists and recovery experts that complement Kalasag." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recoveryApps.map((app, i) => (
              <motion.div key={app.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{app.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--success)]/10 text-[var(--success)]">{app.cost}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 flex-1">{app.features}</p>
                {app.url && <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--accent-teal)] hover:underline inline-flex items-center gap-1">Learn more <ExternalLink className="w-3 h-3" /></a>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Recovery */}
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container"><Wallet className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{t.resources.financial.title}</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-8">{t.resources.financial.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialTools.map((tool, i) => (
                <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                  <TrendingUp className="w-4 h-4 text-[var(--accent-teal)] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{tool.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{tool.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Context */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container"><Flag className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{t.resources.globalContext.title}</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-3xl leading-relaxed">{t.resources.globalContext.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.resources.globalContext.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)]">
                  <Check className="w-4 h-4 text-[var(--accent-teal)] shrink-0" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
