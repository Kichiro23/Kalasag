import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';
import PageLoader from '@/components/PageLoader';

// Existing pages (preserved)
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import SosPage from './pages/SosPage'
import ShieldBot from './pages/ShieldBot'
import RecoveryLibrary from './pages/RecoveryLibrary'
import RecoveryDetail from './pages/RecoveryDetail'
import GamesPage from './pages/GamesPage'
import StoriesPage from './pages/StoriesPage'
import StoryDetail from './pages/StoryDetail'
import BreathingPage from './pages/BreathingPage'
import TimbanginPage from './pages/TimbanginPage'
import DailyCheckPage from './pages/DailyCheckPage'
import TriggerMapPage from './pages/TriggerMapPage'
import AnalyticsPage from './pages/AnalyticsPage'
import FinancePage from './pages/FinancePage'
import BlockerPage from './pages/BlockerPage'
import ChatPage from './pages/ChatPage'
import PunoKoPage from './pages/PunoKoPage'
import ValuesPage from './pages/ValuesPage'
import ProfilePage from './pages/ProfilePage'
import FamilyDashboard from './pages/FamilyDashboard'
import OnboardingPage from './pages/OnboardingPage'
import UrgeIntervention from './pages/UrgeIntervention'

// New public pages (lazy loaded)
const HomePage = lazy(() => import('./pages/public/HomePage'));
const GetHelpPage = lazy(() => import('./pages/public/GetHelpPage'));
const SelfExclusionPage = lazy(() => import('./pages/public/SelfExclusionPage'));
const ResourcesPage = lazy(() => import('./pages/public/ResourcesPage'));
const RecoveryToolsPage = lazy(() => import('./pages/public/RecoveryToolsPage'));
const FamiliesPage = lazy(() => import('./pages/public/FamiliesPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/public/TermsPage'));
const SelfAssessmentPage = lazy(() => import('./pages/public/SelfAssessmentPage'));
const PublicStoriesPage = lazy(() => import('./pages/public/StoriesPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          {/* New public pages */}
          <Route path="/" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="/get-help" element={<Suspense fallback={<PageLoader />}><GetHelpPage /></Suspense>} />
          <Route path="/self-exclusion" element={<Suspense fallback={<PageLoader />}><SelfExclusionPage /></Suspense>} />
          <Route path="/resources" element={<Suspense fallback={<PageLoader />}><ResourcesPage /></Suspense>} />
          <Route path="/recovery-tools" element={<Suspense fallback={<PageLoader />}><RecoveryToolsPage /></Suspense>} />
          <Route path="/families" element={<Suspense fallback={<PageLoader />}><FamiliesPage /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />
          <Route path="/self-assessment" element={<Suspense fallback={<PageLoader />}><SelfAssessmentPage /></Suspense>} />
          <Route path="/stories" element={<Suspense fallback={<PageLoader />}><PublicStoriesPage /></Suspense>} />

          {/* Preserved existing routes */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/sos" element={<SosPage />} />
          <Route path="/dashboard/shield-bot" element={<ShieldBot />} />
          <Route path="/dashboard/recovery" element={<RecoveryLibrary />} />
          <Route path="/dashboard/recovery/:slug" element={<RecoveryDetail />} />
          <Route path="/dashboard/games" element={<GamesPage />} />
          <Route path="/dashboard/stories" element={<StoriesPage />} />
          <Route path="/dashboard/stories/:slug" element={<StoryDetail />} />
          <Route path="/dashboard/breathe" element={<BreathingPage />} />
          <Route path="/dashboard/timbangin" element={<TimbanginPage />} />
          <Route path="/dashboard/daily-check" element={<DailyCheckPage />} />
          <Route path="/dashboard/trigger-map" element={<TriggerMapPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/finance" element={<FinancePage />} />
          <Route path="/dashboard/blocker" element={<BlockerPage />} />
          <Route path="/dashboard/chat" element={<ChatPage />} />
          <Route path="/dashboard/puno-ko" element={<PunoKoPage />} />
          <Route path="/dashboard/values" element={<ValuesPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/family" element={<FamilyDashboard />} />
          <Route path="/intervention" element={<UrgeIntervention />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <AnimatedRoutes />
    </ErrorBoundary>
  )
}
