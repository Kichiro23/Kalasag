import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Wind,
  Phone,
  Clock,
  Heart,
  ChevronRight,
  RotateCcw,
  Shield,
  Sparkles,
  X,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import Layout from '@/components/layout/Layout';
import { usePageTitle } from '@/hooks/usePageTitle';

const STEPS = [
  {
    id: 'breathe',
    title: 'Breathe',
    description: 'Take 10 deep breaths with us.',
    duration: 60,
    icon: Wind,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    id: 'reflect',
    title: 'Reflect',
    description: 'Remember why you started recovery.',
    duration: 30,
    icon: Heart,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    id: 'delay',
    title: 'Delay',
    description: 'Wait 5 minutes. Urges peak and fade.',
    duration: 300,
    icon: Clock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'choose',
    title: 'Choose',
    description: 'Pick a healthy alternative activity.',
    duration: 0,
    icon: Sparkles,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
];

const ALTERNATIVES = [
  'Take a cold shower',
  'Call a friend or family member',
  'Go for a 10-minute walk',
  'Listen to your favorite music',
  'Watch a movie or TV show',
  'Cook a meal',
  'Do 20 pushups',
  'Write in your journal',
  'Meditate for 5 minutes',
  'Clean your room',
];

function BreathingCircle({ progress }: { progress: number }) {
  return (
    <div className="relative w-40 h-40 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-[var(--border-subtle)]" />
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-blue-400"
        style={{
          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(progress * Math.PI * 2)}% ${50 - 50 * Math.cos(progress * Math.PI * 2)}%, 50% 50%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Wind className="w-10 h-10 text-blue-400" />
      </div>
    </div>
  );
}

export default function PanicModePage() {
  usePageTitle('Panic Mode');
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStep = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
    const duration = STEPS[stepIndex].duration;
    setTimeLeft(duration);
    setIsRunning(duration > 0);
    if (duration > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsRunning(false);
            setCompletedSteps((s) => new Set(s).add(STEPS[stepIndex].id));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const step = STEPS[currentStep];
  const progress = step.duration > 0 ? 1 - timeLeft / step.duration : 1;

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
              <AlertTriangle className="w-4 h-4" />
              Panic Mode
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-3">
              You Are Stronger Than This Urge
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
              Follow these steps. Each one is designed to insert space between your urge and your action. You can do this.
            </p>
          </motion.div>

          {/* Step Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  startStep(i);
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  completedSteps.has(s.id)
                    ? 'bg-emerald-500 text-white'
                    : i === currentStep
                    ? 'bg-[var(--accent-teal)] text-white'
                    : 'bg-[var(--bg-surface-solid)] text-[var(--text-muted)]'
                }`}
              >
                {completedSteps.has(s.id) ? <Shield className="w-4 h-4" /> : i + 1}
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-3xl p-8 md:p-10 text-center"
            >
              <div className={`w-16 h-16 rounded-full ${step.bg} flex items-center justify-center mx-auto mb-4`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{step.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">{step.description}</p>

              {step.id === 'breathe' && (
                <div className="mb-6">
                  {isRunning ? (
                    <BreathingCircle progress={progress} />
                  ) : (
                    <div className="w-40 h-40 mx-auto rounded-full border-4 border-emerald-500/30 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-emerald-400" />
                    </div>
                  )}
                  <p className="text-3xl font-mono font-bold text-[var(--text-primary)] mt-4">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              )}

              {step.id === 'reflect' && (
                <div className="mb-6 space-y-3 text-left max-w-md mx-auto">
                  <div className="glass-card rounded-xl p-4 border-l-4 border-red-400">
                    <p className="text-sm text-[var(--text-secondary)] italic">
                      "The last time I gambled, I felt worse afterward. The high lasted minutes. The regret lasted days."
                    </p>
                  </div>
                  <div className="glass-card rounded-xl p-4 border-l-4 border-[var(--accent-teal)]">
                    <p className="text-sm text-[var(--text-secondary)] italic">
                      "I am not my urges. I am the person who chooses not to act on them."
                    </p>
                  </div>
                </div>
              )}

              {step.id === 'delay' && (
                <div className="mb-6">
                  <div className="w-full h-4 rounded-full bg-[var(--bg-surface-solid)] overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <p className="text-4xl font-mono font-bold text-[var(--text-primary)]">
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Most urges fade within 15-30 minutes. You are almost there.
                  </p>
                </div>
              )}

              {step.id === 'choose' && (
                <div className="mb-6">
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Pick one thing to do right now instead of gambling:
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                    {ALTERNATIVES.map((alt) => (
                      <button
                        key={alt}
                        onClick={() => setSelectedAlternative(alt)}
                        className={`p-3 rounded-xl text-xs text-left transition-all ${
                          selectedAlternative === alt
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-600'
                            : 'bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-teal)]'
                        }`}
                      >
                        {alt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step.duration > 0 && !isRunning && timeLeft === 0 && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => startStep(currentStep)}
                    className="btn-secondary inline-flex items-center gap-2 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restart
                  </button>
                  {currentStep < STEPS.length - 1 && (
                    <button
                      onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        startStep(currentStep + 1);
                      }}
                      className="btn-primary inline-flex items-center gap-2 text-sm"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {step.duration > 0 && isRunning && (
                <button
                  onClick={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsRunning(false);
                  }}
                  className="btn-secondary inline-flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  Skip
                </button>
              )}

              {step.duration === 0 && (
                <div className="flex items-center justify-center gap-3">
                  <Link
                    to="/dashboard/shield-bot"
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Talk to Recovery Assistant
                  </Link>
                  <Link
                    to="/dashboard"
                    className="btn-secondary inline-flex items-center gap-2 text-sm"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Crisis Hotlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 glass-card rounded-2xl p-5 text-center"
          >
            <p className="text-xs text-[var(--text-muted)] mb-3">
              If you are in immediate crisis, call now:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="tel:1553" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors">
                <Phone className="w-4 h-4" />
                DOH 1553
              </a>
              <a href="tel:0966-351-4518" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors">
                <Phone className="w-4 h-4" />
                NCMH Crisis
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
