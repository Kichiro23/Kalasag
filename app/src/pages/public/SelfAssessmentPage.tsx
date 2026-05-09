import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Heart,
  Check,
  X,
  RefreshCw,
  Phone,
  BookOpen,
  Wind,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/providers/LanguageProvider';
import { content } from '@/i18n/content';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function SelfAssessmentPage() {
  const { lang } = useLanguage();
  const t = content[lang];
  usePageTitle(lang === 'fil' ? 'Self-Assessment' : 'Self-Assessment');

  const questions = t.home.assessment.questions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (newAnswers.length >= questions.length) {
      setShowResult(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      setAnswers(answers.slice(0, -1));
      setStep(questions.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const yesCount = answers.filter(Boolean).length;

  const getResult = () => {
    if (yesCount === 0) {
      return {
        level: 'low',
        title: lang === 'fil' ? 'Mababang Risk' : 'Low Risk',
        color: 'text-[var(--success)]',
        bg: 'bg-[var(--success)]/10',
        message: lang === 'fil'
          ? 'Ang iyong mga sagot ay nagpapakita ng mababang risk para sa gambling harm. Gayunpaman, manatiling alerto at gamitin ang aming resources para mapanatili ang healthy na relasyon sa pagsusugal.'
          : 'Your answers indicate a low risk for gambling harm. However, stay mindful and use our resources to maintain a healthy relationship with gambling.',
      };
    } else if (yesCount <= 2) {
      return {
        level: 'moderate',
        title: lang === 'fil' ? 'Katamtamang Risk' : 'Moderate Risk',
        color: 'text-[var(--warning)]',
        bg: 'bg-[var(--warning)]/10',
        message: lang === 'fil'
          ? 'May ilang senyales na maaaring magdulot ng problema. Mahalagang magkaroon ng kamalayan at subukang gamitin ang aming mga tool para maiwasan ang paglala.'
          : 'There are some signs that could lead to problems. It is important to be aware and try using our tools to prevent things from getting worse.',
      };
    } else {
      return {
        level: 'high',
        title: lang === 'fil' ? 'Mataas na Risk' : 'High Risk',
        color: 'text-[var(--error)]',
        bg: 'bg-[var(--error)]/10',
        message: lang === 'fil'
          ? 'Ang iyong mga sagot ay nagpapakita ng maraming senyales ng gambling harm. Hindi ka nag-iisa — may tulong na available. Inirerekomenda naming kumontak sa isang crisis hotline o gamitin ang aming recovery tools.'
          : 'Your answers show several signs of gambling harm. You are not alone — help is available. We recommend reaching out to a crisis hotline or using our recovery tools.',
      };
    }
  };

  const result = getResult();

  const progress = showResult ? 100 : ((step) / questions.length) * 100;

  return (
    <Layout>
      <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[var(--accent-teal)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
              {t.home.assessment.title}
            </h1>
            <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
              {t.home.assessment.description}
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-8">
            <div className="h-2 rounded-full bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[var(--accent-teal)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
              {showResult
                ? lang === 'fil' ? 'Tapos na' : 'Complete'
                : `${lang === 'fil' ? 'Tanong' : 'Question'} ${step + 1} ${lang === 'fil' ? 'ng' : 'of'} ${questions.length}`}
            </p>
          </div>

          {/* Content */}
          <div className="min-h-[320px]">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-8 md:p-10"
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)] flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-white">{step + 1}</span>
                    </div>
                    <p className="text-lg md:text-xl font-medium text-[var(--text-primary)] leading-relaxed pt-1.5">
                      {questions[step]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="glass-card rounded-2xl p-5 text-center hover:border-[var(--accent-teal)] hover:bg-[var(--accent-teal)]/5 transition-all group"
                    >
                      <Check className="w-6 h-6 text-[var(--success)] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {lang === 'fil' ? 'Oo' : 'Yes'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="glass-card rounded-2xl p-5 text-center hover:border-[var(--text-muted)] hover:bg-[var(--text-muted)]/5 transition-all group"
                    >
                      <X className="w-6 h-6 text-[var(--text-muted)] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {lang === 'fil' ? 'Hindi' : 'No'}
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="glass-card rounded-3xl p-8 md:p-10 text-center"
                >
                  <div className={`w-20 h-20 rounded-full ${result.bg} flex items-center justify-center mx-auto mb-6`}>
                    <Heart className={`w-10 h-10 ${result.color}`} />
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold ${result.color} mb-3`}>
                    {result.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto mb-8">
                    {result.message}
                  </p>

                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] mb-8">
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      {lang === 'fil' ? 'Score' : 'Score'}
                    </p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]">
                      {yesCount} / {questions.length}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    {yesCount >= 2 && (
                      <Link to="/get-help" className="btn-crisis w-full sm:w-auto">
                        <Phone className="w-4 h-4" />
                        {lang === 'fil' ? 'Kumuha ng Tulong' : 'Get Help'}
                      </Link>
                    )}
                    <Link to="/recovery-tools" className="btn-primary w-full sm:w-auto">
                      <Wind className="w-4 h-4" />
                      {lang === 'fil' ? 'Mga Tool sa Pagbangon' : 'Recovery Tools'}
                    </Link>
                    <Link to="/resources" className="btn-secondary w-full sm:w-auto">
                      <BookOpen className="w-4 h-4" />
                      {lang === 'fil' ? 'Mga Resource' : 'Resources'}
                    </Link>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {lang === 'fil' ? 'Ulitin ang Assessment' : 'Retake Assessment'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Back button */}
          {(step > 0 || showResult) && (
            <div className="mt-6 text-center">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.common.back}
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-[var(--text-muted)] text-center mt-10 max-w-md mx-auto">
            {lang === 'fil'
              ? 'Ang assessment na ito ay para sa personal na kamalayan lamang at hindi substitute sa propesyonal na diagnosis. Kung nasa crisis ka, mangyaring tumawag sa emergency services.'
              : 'This assessment is for personal awareness only and is not a substitute for professional diagnosis. If you are in crisis, please call emergency services.'}
          </p>
        </div>
      </section>
    </Layout>
  );
}
