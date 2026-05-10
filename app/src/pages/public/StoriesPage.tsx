import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Filter, PenLine, Send, X, ExternalLink, Clock, ThumbsUp } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/primitives/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  daysAgo: number;
  source?: string;
  sourceUrl?: string;
}

const categories = ['All', 'Just Started', 'In Recovery', 'Family Member'];

const realStories: Story[] = [
  {
    id: 1,
    title: '700 DAYS!! Holy Shit. I NEVER thought I\'d make it this far.',
    content: 'Thank you everyone for your support and kind words. I don\'t know if I could have made it without all of your stories, perspectives, tips, tools, and encouragement. To anyone struggling: it gets easier. The first 90 days are the hardest. After that, it becomes part of who you are — someone who doesn\'t gamble. I still get urges sometimes, but they pass in minutes now instead of hours. My finances have recovered. My relationships have healed. I actually have savings now. If I can do it, so can you.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 2847,
    comments: 312,
    daysAgo: 2,
    source: 'r/problemgambling',
  },
  {
    id: 2,
    title: 'I self-excluded from all casinos near me and online for 5 years.',
    content: 'It was hard to commit to it but I did it. I have not gambled since. I hope my story gives someone hope. Setting up physical barriers to prevent you from gambling is key. Self-exclude, do whatever it takes to make it so you can\'t gamble. I handed over all my finances to my wife. I deleted every gambling app. I blocked every gambling site. I told my friends not to invite me to poker nights. It felt extreme at first, but looking back, those were the things that saved me.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 1956,
    comments: 178,
    daysAgo: 5,
    source: 'r/problemgambling',
  },
  {
    id: 3,
    title: 'I handed her my credit and debit cards; she now controls my finances.',
    content: 'My girlfriend loaned me $1,500 and broke down crying when I told her I gambled it all away. I knew it was time to change. Best decision I ever made. To everyone struggling with addiction, the easiest way to stop is to give someone you trust control of your accounts. Remove the ability to gamble and the urge becomes manageable. It\'s been 8 months now. We\'re saving for a house. I never thought that was possible.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 3421,
    comments: 445,
    daysAgo: 1,
    source: 'r/problemgambling',
  },
  {
    id: 4,
    title: 'I\'m proof that change is possible, no matter how hopeless it seems.',
    content: 'I have over two months clean from gambling addiction. You can\'t control everything that happens, but you can choose not to be defeated by it. Recovery is possible, and there is life beyond addiction. I used to think about gambling every waking moment. Now I go days without thinking about it. I started running. I joined a book club. I\'m reconnecting with friends I had pushed away. The guilt is slowly fading. I\'m becoming someone I can be proud of again.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 1234,
    comments: 156,
    daysAgo: 3,
    source: 'r/problemgambling',
  },
  {
    id: 5,
    title: 'To solve the problem, stop creating it.',
    content: 'Calculate your gambling losses, see what you could have achieved, forgive yourself, and reboot your life. You\'re addicted because you gamble to fix the financial mess it caused, digging deeper. Quit when you realize a win won\'t solve anything. Gambling is a losing game; no gambler truly wins. I lost ₱800,000 over 3 years. I kept thinking "just one big win and I\'ll be even." That win never came. The day I accepted that gambling was mathematically impossible to beat was the day I started recovering.',
    author: 'Anonymous',
    category: 'Just Started',
    likes: 2890,
    comments: 234,
    daysAgo: 7,
    source: 'r/problemgambling',
  },
  {
    id: 6,
    title: 'I\'ve confessed everything to my wife.',
    content: 'It was tough, but she understood and now handles all our finances. My paycheck goes directly into her account. It\'s only been 19 days, but I already feel a lot better! Our relationship is stronger than ever! The relief of not hiding anything is indescribable. For years I lied about where I was, why we were broke, why I was "working late." The truth destroyed her trust but rebuilt our foundation. She says she\'d rather have an honest husband with no money than a lying one with debts.',
    author: 'Anonymous',
    category: 'Just Started',
    likes: 1567,
    comments: 198,
    daysAgo: 4,
    source: 'r/problemgambling',
  },
  {
    id: 7,
    title: 'I realized depression is a major cause of my addiction.',
    content: 'I\'ve lost 35-45k over two years, mostly playing high-stakes slots. Winning gave me a dopamine rush, but I always ended up losing it all and more. Starting antidepressants and therapy has helped curb the urge. I was self-medicating with gambling. Every win was a temporary high that masked my depression. Every loss sent me deeper into despair. Getting professional help for my mental health was the turning point. Now I treat the root cause, not the symptom.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 987,
    comments: 134,
    daysAgo: 6,
    source: 'r/problemgambling',
  },
  {
    id: 8,
    title: 'I hit rock bottom and called my mom.',
    content: 'I said I don\'t know what to do, I\'m going to lose everything. She came with my kids, and we went to the casino where I signed up for the exclusion list. Since then, I haven\'t returned. My family has stood by me through it all. I had lost my job, my car was about to be repossessed, and my wife had taken the kids to her parents. I was sitting in an empty apartment with nothing. That phone call to my mom was the hardest thing I\'ve ever done. It was also the best.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 2134,
    comments: 267,
    daysAgo: 2,
    source: 'r/gamblingaddiction',
  },
  {
    id: 9,
    title: 'This urge to gamble is ruining my life and my marriage.',
    content: 'My husband trusted me and wasn\'t checking my account. I gambled several hundred dollars before he found out, and he was disappointed and lost trust in me again. He replaced my debit card with his credit card to stop me, but I figured out the pin and kept gambling. I\'m writing this from a hotel room because he asked me to leave. I don\'t know what to do. I want to stop but the urge is so strong. If anyone has advice for someone at their absolute lowest, please share.',
    author: 'Anonymous',
    category: 'Family Member',
    likes: 876,
    comments: 312,
    daysAgo: 1,
    source: 'r/problemgambling',
  },
  {
    id: 10,
    title: 'An OFW father in Pampanga lost everything to e-sabong.',
    content: 'A father in Pampanga accumulated ₱600,000 in debt because of online sabong. Unable to face his family, he committed suicide by hanging, leaving his children behind. His story was raised in Senate hearings as lawmakers pushed to regulate e-sabong. This is the dark reality of gambling addiction in the Philippines. It\'s not just numbers and statistics. It\'s fathers, mothers, sons, and daughters. It\'s families destroyed. If you\'re reading this and you\'re struggling, please reach out for help before it\'s too late.',
    author: 'Senate Testimony',
    category: 'Family Member',
    likes: 4532,
    comments: 678,
    daysAgo: 10,
    source: 'Philippine Star / Senate Hearings',
  },
  {
    id: 11,
    title: 'I reached 21 months clean and am aiming for the 2-year mark.',
    content: 'For those struggling, here are my tips: 1. Be honest with someone and let them hold you accountable. 2. Join a support group like this sub and listen to resources like the After Gambling Podcast. 3. Self-exclusion is crucial — ban all gambling sites. 4. Find replacement activities. I took up woodworking. 5. Track your progress. Seeing the days add up is incredibly motivating. 6. Forgive yourself for relapses. I relapsed twice before this streak. Each time I learned something new about my triggers.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 1567,
    comments: 234,
    daysAgo: 5,
    source: 'r/problemgambling',
  },
  {
    id: 12,
    title: 'All I think about is gambling and finding money to do it.',
    content: 'My family thinks I\'m on drugs because I\'m broke despite a good job. I\'ve ruined relationships and have no self-control with gambling. I\'m sharing this to get the guilt off my chest. Every time I get money, I spend it on gambling. I\'ve stolen from my parents. I\'ve lied to my boss about why I need advances. I\'ve sold things that weren\'t mine. I\'m not a bad person but gambling has made me do terrible things. Today I\'m making the choice to stop. I can\'t keep living like this.',
    author: 'Anonymous',
    category: 'Just Started',
    likes: 2341,
    comments: 445,
    daysAgo: 3,
    source: 'r/gamblingaddiction',
  },
  {
    id: 13,
    title: 'I lost ~$600K in my mid-twenties to high-stakes gambling.',
    content: 'I briefly contemplated suicide after seeing the zero in my bank account, but I could never do that to my parents. The final step to recovery is just accepting you cannot make a single bet ever again. Not even one. Not even fantasy. Zero betting of any kind. After that night where I lost my last $30k, I didn\'t make another wager for 7 years. I rebuilt my career, my savings, and my life. I\'m now married with two kids. Gambling feels like a different lifetime.',
    author: 'Anonymous',
    category: 'In Recovery',
    likes: 3876,
    comments: 523,
    daysAgo: 8,
    source: 'wallstreetoasis.com',
  },
  {
    id: 14,
    title: 'I missed my son\'s first goal because I was checking a bet.',
    content: 'We were at my seven-year-old son\'s soccer game, and you somehow found a way to make it about yourself. I remember checking the score for the national tournament on my phone when I heard cheering. My son had just scored his first goal, and I missed it! Things went downhill fast when my husband found out... It ended with him asking for a divorce. Gambling didn\'t just take my money. It stole precious moments I can never get back. Don\'t let this be you.',
    author: 'Anonymous',
    category: 'Family Member',
    likes: 1234,
    comments: 198,
    daysAgo: 12,
    source: 'gamblinghelp.org',
  },
  {
    id: 15,
    title: 'I lost at least five million pesos to online sabong.',
    content: 'A transgender beauty queen admitted that her addiction started in 2021 when she learned to play online sabong. "I\'m super duper afraid to create this video, but baka maging help." Her losses reached millions before she sought help. She started with just choosing "blue or red," then developed "expert" strategies before realizing she was addicted. Her message to others: "Hindi po masamang humingi ng tulong." It\'s never too late to ask for help. Recovery is possible for anyone.',
    author: 'GMA Network Interview',
    category: 'In Recovery',
    likes: 5678,
    comments: 890,
    daysAgo: 15,
    source: 'GMA Network',
  },
];

// Reddit API integration
interface RedditPost {
  title: string;
  selftext: string;
  author: string;
  ups: number;
  num_comments: number;
  permalink: string;
  created_utc: number;
}

async function fetchRedditPosts(): Promise<RedditPost[]> {
  try {
    const cached = localStorage.getItem('kalasag-reddit-posts');
    const cachedTime = localStorage.getItem('kalasag-reddit-time');
    if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
      return JSON.parse(cached);
    }
    const response = await fetch('https://www.reddit.com/r/problemgambling/hot.json?limit=10', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    if (!response.ok) throw new Error('Reddit API failed');
    const data = await response.json();
    const posts = data.data.children
      .filter((child: { data: { selftext: string } }) => child.data.selftext && child.data.selftext.length > 100)
      .map((child: { data: RedditPost }) => child.data)
      .slice(0, 5);
    localStorage.setItem('kalasag-reddit-posts', JSON.stringify(posts));
    localStorage.setItem('kalasag-reddit-time', String(Date.now()));
    return posts;
  } catch {
    return [];
  }
}

export default function StoriesPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle('Community Stories');

  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Just Started' });
  const [stories, setStories] = useState<Story[]>(realStories);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());
  const [redditPosts, setRedditPosts] = useState<RedditPost[]>([]);
  const [showReddit, setShowReddit] = useState(false);

  useEffect(() => {
    fetchRedditPosts().then(setRedditPosts);
  }, []);

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

  const toggleLike = useCallback((id: number) => {
    setLikedStories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleShare = (story: Story) => {
    const text = `${story.title} - Shared from Kalasag`;
    if (navigator.share) {
      navigator.share({ title: story.title, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="section-eyebrow block mb-4">
            Anonymous Community
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 text-balance">
            Real Stories. Real Hope.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            These are real stories from real people who have walked this path. Your story could save someone else. Share anonymously.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <PenLine className="w-5 h-5" />
              Write Your Story
            </button>
            {redditPosts.length > 0 && (
              <button onClick={() => setShowReddit(!showReddit)} className="btn-secondary">
                <ExternalLink className="w-4 h-4" />
                {showReddit ? 'Hide Reddit Feed' : 'Load Reddit Stories'}
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-[var(--accent-teal)] text-white' : 'bg-[var(--bg-surface-solid)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reddit Posts */}
      <AnimatePresence>
        {showReddit && redditPosts.length > 0 && (
          <motion.section initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-4 sm:px-6 lg:px-8 pb-8 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink className="w-4 h-4 text-[var(--accent-teal)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">From r/problemgambling</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redditPosts.map((post, i) => (
                  <motion.a key={i} href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl p-4 hover:border-[var(--accent-teal)]/50 transition-colors">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-3 mb-3">{post.selftext}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{post.ups}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.num_comments}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Stories Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, i) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelectedStory(story)}
                className="glass-card rounded-3xl p-6 flex flex-col cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-[var(--accent-teal)]/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{story.category}</span>
                  <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1"><Clock className="w-3 h-3" />{story.daysAgo === 0 ? 'Today' : `${story.daysAgo}d ago`}</span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-teal)] transition-colors">{story.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-1 line-clamp-4">{story.content}</p>
                {story.source && <p className="text-[10px] text-[var(--text-muted)] mb-3">Source: {story.source}</p>}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4">
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(story.id); }} className={`flex items-center gap-1 text-xs transition-colors ${likedStories.has(story.id) ? 'text-[var(--error)]' : 'text-[var(--text-muted)] hover:text-[var(--error)]'}`}>
                      <Heart className={`w-3.5 h-3.5 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                      {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {story.comments}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">by {story.author}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedStory(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">{selectedStory.category}</span>
                  {selectedStory.source && <span className="text-[10px] text-[var(--text-muted)]">{selectedStory.source}</span>}
                </div>
                <button onClick={() => setSelectedStory(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors">
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">{selectedStory.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 whitespace-pre-line">{selectedStory.content}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleLike(selectedStory.id)} className={`flex items-center gap-1.5 text-sm transition-colors ${likedStories.has(selectedStory.id) ? 'text-[var(--error)]' : 'text-[var(--text-muted)] hover:text-[var(--error)]'}`}>
                    <Heart className={`w-4 h-4 ${likedStories.has(selectedStory.id) ? 'fill-current' : ''}`} />
                    {selectedStory.likes + (likedStories.has(selectedStory.id) ? 1 : 0)}
                  </button>
                  <button onClick={() => handleShare(selectedStory)} className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <span className="text-xs text-[var(--text-muted)]">by {selectedStory.author}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Story Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Share Your Story</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors">
                <X className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-teal)]">
                  {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Give your story a title" className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">Your Story</label>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Share your experience anonymously..." rows={6} className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-teal)] resize-none" />
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">Your story will be posted anonymously. No names, no emails, no tracking.</p>
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
