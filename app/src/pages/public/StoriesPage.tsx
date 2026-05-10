import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Filter, PenLine, Send, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

const categories = ['All', 'Just Started', 'In Recovery', 'Family Member', 'Professional'];

const sampleStories = [
  {
    id: 1,
    title: 'I Lost Everything to Online Sabong',
    content: 'Nagsimula lang akong maglaro para ma-entertain. ₱500 a day. Tapos naging ₱5,000. Hanggang sa nawalan ako ng ₱300,000. Umabot sa punto na umutang ako sa 5-6. Hindi ko na kayang itago sa asawa ko. Ngayon, Day 45 na akong clean. Hindi madali. Pero worth it.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 127,
    comments: 23,
    daysAgo: 2,
  },
  {
    id: 2,
    title: 'As a Wife, I Didn\'t Know What to Do',
    content: 'My husband was a good provider. Then the pandemic hit. He discovered online casinos. In 8 months, he lost our savings, our car, and almost our house. The hardest part was the lying. Now he\'s in GA and we\'re rebuilding. I found support through Gam-Anon.',
    author: 'Anonymous',
    category: 'Family Member',
    likes: 89,
    comments: 15,
    daysAgo: 5,
  },
  {
    id: 3,
    title: 'Day 1: I Admit I Have a Problem',
    content: 'First time kong aaminin ito: addict ako sa gambling. Hindi ko na ma-control. Bawat sweldo, nauubos sa casino. Hindi ko na mabayaran ang bills. Today, I\'m choosing to stop. I downloaded Kalasag. I called the NCMH hotline. This is my first step.',
    author: 'Anonymous',
    category: 'Just Started',
    likes: 234,
    comments: 45,
    daysAgo: 1,
  },
  {
    id: 4,
    title: 'A Psychologist\'s Perspective',
    content: 'I\'ve treated over 200 gambling addicts in the Philippines. The most common pattern? They all believe they can "win it back." This is called the gambler\'s fallacy. The truth: the house always wins. Recovery is possible with CBT, support groups, and financial counseling.',
    author: 'Dr. A. (Clinical Psychologist)',
    category: 'Professional',
    likes: 312,
    comments: 56,
    daysAgo: 3,
  },
  {
    id: 5,
    title: '2 Years Clean: What I Learned',
    content: 'Ang pinakamahirap na part ay ang first 30 days. Every urge feels like an emergency. Pero natutunan kong: 1) Huminga ng malalim, 2) Tumawag sa kaibigan, 3) Iwasan ang triggers. Ngayon, may ipon na ulit ako. Bumili ako ng motor. May trust ulit ang pamilya ko.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 456,
    comments: 78,
    daysAgo: 7,
  },
  {
    id: 6,
    title: 'My Son\'s Gambling Ruined Our Family Business',
    content: 'We ran a small sari-sari store. My son started betting on e-sabong using our business funds. He lost ₱150,000 in 3 months. We almost closed the store. After an intervention and GA meetings, he\'s now 6 months clean and helping rebuild the business.',
    author: 'Anonymous',
    category: 'Family Member',
    likes: 67,
    comments: 12,
    daysAgo: 4,
  },
];

export default function StoriesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle('Community Stories');

  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Just Started' });
  const [stories, setStories] = useState(sampleStories);

  const filtered = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    setStories([{
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      author: 'Anonymous',
      category: formData.category,
      likes: 0,
      comments: 0,
      daysAgo: 0,
    }, ...stories]);
    setFormData({ title: '', content: '', category: 'Just Started' });
    setShowForm(false);
  };

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
            Anonymous Community
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance"
          >
            Share Your Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Your story could save someone else. Share anonymously. No judgment. No names. Just hope.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <PenLine className="w-5 h-5" />
            Write Your Story
          </motion.button>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[var(--accent-teal)] text-white'
                    : 'bg-[var(--bg-surface-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, i) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">
                    {story.category}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{story.daysAgo === 0 ? 'Today' : `${story.daysAgo}d ago`}</span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {story.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-1 line-clamp-4">
                  {story.content}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--error)] transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      {story.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {story.comments}
                    </button>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">by {story.author}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Story Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Share Your Story</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors">
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-teal)]"
                >
                  {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Give your story a title"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Your Story</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your experience anonymously..."
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)] resize-none"
                />
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                Your story will be posted anonymously. No names, no emails, no tracking.
              </p>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send className="w-4 h-4" />
                Post Anonymously
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
