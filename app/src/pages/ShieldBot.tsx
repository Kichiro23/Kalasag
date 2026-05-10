import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Sparkles, AlertTriangle, RotateCcw, Phone } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: Date
}

const QUICK_REPLIES = [
  "I'm having an urge right now",
  "I relapsed today",
  "I feel depressed",
  "Give me a CBT exercise",
  "I need motivation",
]

// Pattern-based AI responses (frontend-only, no backend needed)
function getAIResponse(input: string): string {
  const lower = input.toLowerCase()

  if (/urge|want to gamble|craving|tempted|itching/i.test(lower)) {
    return "I hear you — urges are intense but they pass. Let's try the 5-minute rule: wait just 5 minutes before acting. Most urges peak and fade within 15-30 minutes. While you wait, try this breathing exercise: inhale for 4 seconds, hold for 7, exhale for 8. Repeat 5 times. You've got this."
  }

  if (/relapse|slipped|gambled again|lost money again/i.test(lower)) {
    return "Relapse is not failure — it's part of recovery for 90% of people. The key is what you do next. One gambling session doesn't erase all your progress. Take a deep breath, remove yourself from the gambling environment, and review your trigger map. What led to this moment? Write it down. Then start again — right now."
  }

  if (/depress|sad|hopeless|empty|suicide|kill myself/i.test(lower)) {
    if (/suicide|kill myself/i.test(lower)) {
      return "I'm really concerned about what you're sharing. Your life matters. Please reach out to a crisis helpline right now: DOH 1553 or NCMH 0966-351-4518. You are not alone, and help is available 24/7."
    }
    return "Depression and gambling addiction often go hand in hand — many people gamble to escape emotional pain. But there's a healthier path. Consider speaking with a mental health professional. In the meantime, try the 'opposite action' technique: when you feel like withdrawing, do something social. When you feel like staying in bed, take a short walk. Small actions can shift your mood."
  }

  if (/cbt|exercise|technique|tool|help me now/i.test(lower)) {
    return "Here's a quick CBT exercise — the STOP technique:\n\n**S** — Stop what you're doing\n**T** — Take a breath (4-7-8 breathing)\n**O** — Observe your thoughts (What am I thinking? Is it realistic?)\n**P** — Proceed with a different action (call a friend, go for a walk, open Kalasag games)\n\nWrite down what you observed. This builds awareness of your thought patterns."
  }

  if (/motivat|encourag|inspir|strength/i.test(lower)) {
    return "You are stronger than you think. Every day you resist gambling, you're rewiring your brain. Recovery is not linear — there will be ups and downs. But the trend matters, not individual days. Remember why you started: your future self is thanking you right now. Keep going."
  }

  if (/debt|money|financ|broke|cant pay/i.test(lower)) {
    return "Financial recovery is possible, but it takes time and a plan. First, stop the bleeding — no more gambling, no matter what. Second, list all debts from smallest to largest. Third, contact your creditors and explain your situation — many offer hardship programs. Fourth, consider a nonprofit credit counseling agency. You can rebuild. One step at a time."
  }

  if (/family|wife|husband|partner|parent|child|mom|dad/i.test(lower)) {
    return "Relationships are often the biggest casualty of gambling addiction — but they can also be the biggest motivator for recovery. Honesty is the foundation. If you haven't already, consider having an open conversation using 'I' statements: 'I feel guilty about my gambling, and I want to change.' Trust is rebuilt one day at a time."
  }

  if (/block|stop|blocker|software|app|ban/i.test(lower)) {
    return "Blocking software is one of the most effective tools. Here are the top options:\n\n1. **BetBlocker** — FREE, blocks 327,500+ sites\n2. **Gamban** — FREE via GamCare, 99% effectiveness\n3. **GamBlock** — ~₱600/mo, survives factory resets\n4. **Freedom** — Subscription, multi-device\n\nInstall at least one TODAY. Remove the ability to gamble, and the urge becomes manageable."
  }

  if (/hello|hi|hey|good morning|good afternoon/i.test(lower)) {
    return "Hello! I'm your recovery assistant. I'm here to help with urges, provide CBT exercises, offer motivation, or just listen. What would you like to talk about today?"
  }

  if (/thank/i.test(lower)) {
    return "You're very welcome. Remember, reaching out for help is a sign of strength, not weakness. I'm here whenever you need me. Take care of yourself."
  }

  // Default fallback
  return "Thank you for sharing that with me. Recovery is a journey, and every conversation is a step forward. Would you like me to suggest a CBT exercise, help with an urge, or just listen? You can also try the quick-reply buttons below."
}

export default function ShieldBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: "Hello, I'm your recovery assistant. I'm trained in CBT and Motivational Interviewing. I'm here 24/7 to help you through urges, provide exercises, or just listen. What's on your mind?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    timeoutRef.current = setTimeout(() => {
      const response = getAIResponse(text)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const resetChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'bot',
      text: "Hello, I'm your recovery assistant. I'm trained in CBT and Motivational Interviewing. I'm here 24/7 to help you through urges, provide exercises, or just listen. What's on your mind?",
      timestamp: new Date(),
    }])
  }

  return (
    <DashboardLayout showNav={false}>
      <div className="h-[calc(100vh-160px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[var(--accent-teal)]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">Recovery Assistant</h1>
              <p className="text-xs text-[var(--text-muted)]">CBT-powered · Anonymous · 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetChat} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-surface-solid)] transition-colors" title="Reset chat">
              <RotateCcw className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
            <a href="tel:1553" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10 transition-colors" title="Crisis hotline">
              <Phone className="w-4 h-4 text-red-400" />
            </a>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'bot' ? 'bg-[var(--accent-teal)]/10' : 'bg-[var(--bg-surface-solid)]'
                }`}>
                  {msg.role === 'bot' ? <Bot className="w-4 h-4 text-[var(--accent-teal)]" /> : <User className="w-4 h-4 text-[var(--text-muted)]" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'bot'
                    ? 'bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                    : 'bg-[var(--accent-teal)] text-white'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.includes('**') ? (
                        <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ) : line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-teal)]/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[var(--accent-teal)]" />
              </div>
              <div className="bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => sendMessage(reply)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-[var(--bg-surface-solid)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-teal)] transition-colors whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 glass-input rounded-full h-11 px-4 text-sm text-[var(--text-primary)]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-full bg-[var(--accent-teal)] flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-[10px] text-[var(--text-muted)] text-center mt-2">
          This is an AI assistant, not a substitute for professional help. If you're in crisis, call 1553.
        </p>
      </div>
    </DashboardLayout>
  )
}
