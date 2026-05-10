import { type ReactNode } from 'react';
import AnimatedBackground from './AnimatedBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import CrisisWidget from './CrisisWidget';
import BackToTop from '@/components/BackToTop';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[var(--accent-teal)] focus:text-white focus:font-medium"
      >
        Skip to content
      </a>
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10 flex-1 pt-24 pb-20">
        {children}
      </main>
      <Footer />
      <CrisisWidget />
      <BackToTop />
    </div>
  );
}
