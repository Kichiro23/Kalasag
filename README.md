# Kalasag — Your Shield Against Gambling Harm

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-0D9488?logo=vercel&logoColor=white)](https://kalasag.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-F59E0B)](LICENSE)

> **Anonymous · Free · Filipino-Owned**

Kalasag is a premium, anonymous, and secure anti-gambling support platform designed as a digital sanctuary for people struggling with gambling addiction, their families, and support networks. "Kalasag" means *shield* in Filipino — the platform is a protective space where people at their most vulnerable can find hope, help, and healing without fear or shame.

---

## 🛡️ Mission

To provide **accessible, anonymous, and culturally-aware support** for anyone affected by gambling harm — completely free, forever. No judgment. No tracking. Just support when you need it most.

---

## ✨ Features

### Public Website (11 Pages)

| Page | Path | Description |
|------|------|-------------|
| **Home** | `/` | Hero with breathing CTA, feature grid with 3D tilt cards, crisis band, self-assessment teaser, testimonials, animated stats |
| **Get Help** | `/get-help` | Philippines crisis hotlines (PAGCOR, DOH, NGF, InTouch), international hotlines, one-tap call/SMS |
| **Self-Exclusion** | `/self-exclusion` | Digital registry steps, platform blocking guides, financial protection tools |
| **Resources** | `/resources` | Gambling addiction education, warning signs checklist, family impact, Filipino context (sabong, e-sabong, perya) |
| **Recovery Tools** | `/recovery-tools` | Streak tracker, mood journal, trigger identification, coping strategies, "Ride the Wave" intervention |
| **For Families** | `/families` | How to help a loved one, setting boundaries, financial protection, support groups |
| **About** | `/about` | Mission, developer story, partners, non-profit stance |
| **Contact** | `/contact` | Anonymous feedback form with honeypot spam protection, developer contact, social links |
| **Privacy** | `/privacy` | Zero data retention pledge, no tracking, no selling |
| **Terms** | `/terms` | Not medical advice, community respect, limitation of liability |
| **Self-Assessment** | `/self-assessment` | Interactive 5-question anonymous tool with animated risk scoring |

### Dashboard App (20+ Pages)

Existing recovery app features are preserved and fully functional:
- SOS Crisis Intervention
- Shield Bot (CBT Chat)
- Recovery Library
- Analytics & Streak Tracking
- Mood Journal & Daily Check-in
- Trigger Map
- Financial Tools
- Site Blocker
- Anonymous Chat
- Puno Ko (Gamification Tree)
- Values Alignment
- Family Dashboard

### Design System

- **Glassmorphism** — `backdrop-blur-xl` frosted glass cards, navbar, and panels
- **Dual Theme** — Light & dark mode with CSS variables, synced to `localStorage` and system preference
- **Apple-Level Aesthetic** — Pill-shaped buttons, rounded-3xl cards, Inter typography, generous whitespace
- **3D Tilt Cards** — Mouse-tracking perspective tilt on desktop (±6deg, disabled on touch)
- **Ambient Background** — Floating gradient orbs with slow infinite animations
- **Breathing CTA** — Subtle pulse animation on crisis/help buttons
- **Scroll Reveal** — Framer Motion `whileInView` animations with staggered delays
- **Page Transitions** — Smooth 200ms fade between all public routes

### Crisis Support (Always Accessible)

- **Fixed Crisis Widget** — Bottom-right toggle, never hidden, collapsible panel
- **Philippines Hotlines** — PAGCOR, DOH 1553, Natasha Goulbourn Foundation, InTouch Crisis Line
- **SMS Support** — 0917-800-1123
- **International** — Gamblers Anonymous, Gambling Therapy
- **One-Tap Calling** — Direct `tel:` links on all hotline cards

### Internationalization

- **English / Filipino (Tagalog)** toggle in navbar
- Full Tagalog translations for all UI text
- Filipino cultural context in resources (sabong, e-sabong, fiesta games, family pressure)

### Accessibility & Performance

- WCAG 2.1 AA compliant — semantic HTML, focus states, aria labels, keyboard navigation
- `prefers-reduced-motion` — All animations disable instantly for users who need it
- Skip-to-content link — Hidden until focused
- Back-to-top button — Appears after scrolling 600px
- Error Boundary — Graceful crash recovery with reload/home options
- React Lazy Loading — Public pages loaded on-demand
- Build size ~640KB main chunk + lazy-loaded page chunks

### SEO

- Open Graph image (1200×630 SVG)
- Twitter Cards
- Sitemap.xml (all 11 public pages)
- Robots.txt
- Per-page titles and meta descriptions
- Favicon SVG + Apple Touch Icon

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript (Strict Mode) |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Routing | React Router v7 |
| Backend | tRPC + Hono |
| Database | Drizzle ORM + SQLite |
| Auth | Kimi OAuth |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
git clone https://github.com/Kichiro23/anti-gambling.git
cd anti-gambling/app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

Output is generated in `dist/public/`.

---

## 🔐 Security & Anonymity

- **100% Anonymous** — No login required for core features
- **Zero Data Retention** — No personal data stored on servers for anonymous features
- **No Tracking** — No tracking pixels, third-party cookies, or individual-identifying analytics
- **No Data Selling** — We do not sell, trade, or display ads using your data
- **Encrypted Mood Journal** — Local-only option available
- **Honeypot Spam Protection** — Contact form includes invisible honeypot field
- **Content Security Policy** — HTTPS-only with HSTS

---

## 🎨 Color System

### Light Mode
```css
--bg-primary: #f0f4f8
--bg-surface: rgba(255, 255, 255, 0.82)
--text-primary: #1a1a2e
--text-secondary: #4a5568
--accent-teal: #0D9488
--accent-warm: #F59E0B
--error: #EF4444
--success: #10B981
```

### Dark Mode
```css
--bg-primary: #0f172a
--bg-surface: rgba(30, 41, 59, 0.65)
--text-primary: #F8FAFC
--text-secondary: #94A3B8
--accent-teal: #14B8A6
--accent-warm: #FBBF24
--error: #F87171
--success: #34D399
```

---

## 👤 Developer

**Rommel Andrei De Leon**

Full Stack Developer · IT & Multimedia Specialist · AI Automation Engineer · Freelance Creative & Technical Professional

- 📍 Malolos, Bulacan, Philippines
- 📧 rommeld216@gmail.com
- 📱 +63 962 790 5910
- 🌐 [ctrl-create-srvcs.vercel.app](https://ctrl-create-srvcs.vercel.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/rommel-andrei-de-leon-36ba8b291/)
- 🐙 [GitHub](https://github.com/Kichiro23)
- 📸 [Instagram](https://www.instagram.com/drei_sanity)
- 💬 [Discord](https://discord.com/users/drei_sanity)

---

## 📄 License

This project is licensed under the MIT License.

Kalasag is a **non-profit initiative**. We do not sell data, display ads, or charge for any feature. Our only goal is to reduce gambling harm.

---

## 🙏 Acknowledgments

- **PAGCOR** — Philippines gambling regulatory authority and crisis support
- **DOH** — Department of Health Mental Health services
- **Natasha Goulbourn Foundation** — Mental health advocacy in the Philippines
- **InTouch Community Services** — Crisis intervention and counseling
- **Gamblers Anonymous** — Worldwide fellowship of men and women

---

> *"Kalasag is not just a website — it is a digital sanctuary where people at their most vulnerable can find hope, help, and healing without fear or shame."*
