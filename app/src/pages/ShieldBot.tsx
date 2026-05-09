import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Bot, User, Shield } from 'lucide-react'

interface Message {
  id: string
  role: 'bot' | 'user'
  content: string
  type?: 'text' | 'slider' | 'scale'
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'bot',
    content: "Kamusta! I'm Shield Bot, your CBT companion. I'm here to help you work through thoughts and urges using proven techniques.\n\nHow are you feeling right now?",
  },
]

const cbtFlows: Record<string, Message[]> = {
  anxious: [
    { id: 'a1', role: 'bot', content: 'I hear you. Anxiety is a common trigger for gambling urges. Let\'s work through this together.\n\nOn a scale of 1-10, how intense is your anxiety right now?' },
    { id: 'a2', role: 'bot', content: 'Thank you for sharing. Now, let\'s identify what triggered this anxiety. What situation or thought started it?' },
    { id: 'a3', role: 'bot', content: 'That makes sense. Now let\'s challenge that thought together.\n\nIs this thought based on facts, or is it an assumption?' },
    { id: 'a4', role: 'bot', content: 'Excellent work! You\'re practicing CBT right now. Remember: thoughts are not facts.\n\nLet\'s reframe: instead of "I need to gamble to feel better," try "This feeling will pass. I have other ways to cope."' },
    { id: 'a5', role: 'bot', content: 'You\'re doing great! Would you like to try a breathing exercise or play a game in the Urge Arcade?' },
  ],
  urge: [
    { id: 'u1', role: 'bot', content: 'I understand. The urge feels strong right now. But remember: urges are temporary. They peak and then fade.\n\nLet\'s use the STOP technique:\n\nS - Stop what you\'re doing\nT - Take a breath\nO - Observe your thoughts\nP - Proceed with a different action' },
    { id: 'u2', role: 'bot', content: 'Good! Now let\'s delay. Can you commit to waiting just 10 minutes before making any decision? Set a timer now.' },
    { id: 'u3', role: 'bot', content: 'Those 10 minutes are your superpower. During this time, let\'s do something else.\n\nWhat\'s one thing you enjoy that doesn\'t involve gambling?' },
    { id: 'u4', role: 'bot', content: 'Perfect choice! Every minute you wait, the urge gets weaker. You\'re stronger than you think.\n\nRemember your "why" - why did you start this recovery journey?' },
  ],
  sad: [
    { id: 's1', role: 'bot', content: 'I\'m sorry you\'re feeling sad. It\'s okay to feel this way. Sadness is a normal emotion.\n\nSometimes gambling seems like an escape from sadness, but it actually makes things worse in the long run.' },
    { id: 's2', role: 'bot', content: 'Let\'s practice self-compassion. Would you talk to a friend the way you talk to yourself?\n\nTry this: place a hand on your heart and say "This is hard, and I\'m doing my best."' },
    { id: 's3', role: 'bot', content: 'You deserve kindness, especially from yourself.\n\nCan you think of one small thing that brought you joy this week, no matter how small?' },
  ],
}

export default function ShieldBot() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [flowIndex, setFlowIndex] = useState(0)
  const [currentFlow, setCurrentFlow] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const detectFlow = (text: string): string | null => {
    const lower = text.toLowerCase()
    if (lower.includes('anxious') || lower.includes('worried') || lower.includes('nervous')) return 'anxious'
    if (lower.includes('urge') || lower.includes('gamble') || lower.includes('bet') || lower.includes('taya')) return 'urge'
    if (lower.includes('sad') || lower.includes('depress') || lower.includes('lonely') || lower.includes('lungkot')) return 'sad'
    return null
  }

  const addBotMessage = (msg: Message) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, msg])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])

    const flow = detectFlow(input)
    if (flow && flow !== currentFlow) {
      setCurrentFlow(flow)
      setFlowIndex(0)
      const flowMessages = cbtFlows[flow]
      if (flowMessages && flowMessages.length > 0) {
        addBotMessage(flowMessages[0])
      }
    } else if (currentFlow) {
      const flowMessages = cbtFlows[currentFlow]
      if (flowMessages && flowIndex < flowMessages.length - 1) {
        const nextIndex = flowIndex + 1
        setFlowIndex(nextIndex)
        addBotMessage(flowMessages[nextIndex])
      } else {
        addBotMessage({
          id: Date.now().toString(),
          role: 'bot',
          content: "You're doing amazing work right now. Remember, recovery is a journey, not a destination. Every step counts!\n\nIs there anything else you'd like to talk about?",
        })
      }
    } else {
      addBotMessage({
        id: Date.now().toString(),
        role: 'bot',
        content: "Thank you for sharing that with me. I'm here to support you through this journey.\n\nWould you like to try a CBT exercise, or is there something specific on your mind?",
      })
    }

    setInput('')
  }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/30 via-[#020617] to-[#020617]" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4 shrink-0">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
            <Shield size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-[17px] font-semibold text-white">Shield Bot</h1>
            <p className="text-[12px] text-[#64748B]">CBT Companion</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`flex gap-3 mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-full glass-base flex items-center justify-center shrink-0 specular-highlight self-start">
                  <Bot size={16} className="text-indigo-400" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#4338CA] text-white rounded-br-md'
                    : 'glass-base text-[#CBD5E1] rounded-bl-md specular-highlight'
                }`}
              >
                <p className="text-[15px] whitespace-pre-line leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#4338CA] flex items-center justify-center shrink-0 self-start">
                  <User size={16} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full glass-base flex items-center justify-center specular-highlight">
                <Bot size={16} className="text-indigo-400" />
              </div>
              <div className="glass-base rounded-2xl rounded-bl-md px-4 py-3 specular-highlight">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-5 pb-8 pt-2">
          <div className="glass-thick rounded-full px-4 py-2 flex items-center gap-3 specular-highlight">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your thoughts..."
              className="flex-1 bg-transparent text-white text-[15px] placeholder-[#64748B] outline-none"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#4338CA] flex items-center justify-center shrink-0"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
