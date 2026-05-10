import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, MessageCircle, Users, Shield } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function ChatPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('general')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: messages } = trpc.chat.messages.useQuery({ channel })
  const { data: channels } = trpc.chat.channels.useQuery()
  const sendMutation = trpc.chat.send.useMutation()
  const utils = trpc.useUtils()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return
    sendMutation.mutate(
      { channel, content: message },
      { onSuccess: () => { setMessage(''); utils.chat.messages.invalidate() } }
    )
  }

  const channelIcons: Record<string, typeof MessageCircle> = {
    general: MessageCircle,
    urges: Shield,
    family: Users,
    success: MessageCircle,
  }

  return (
    <DashboardLayout showNav={false}>
      <div className="flex flex-col h-[calc(100vh-48px)]">
        {/* Header */}
        <div className="pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
              <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
            </button>
            <div>
              <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Bayanihan Chat</h1>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Anonymous peer support</p>
            </div>
          </div>

          {/* Channel Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {channels?.map(ch => {
              const Icon = channelIcons[ch.id] || MessageCircle
              return (
                <button
                  key={ch.id}
                  onClick={() => setChannel(ch.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                    channel === ch.id
                      ? 'bg-[var(--accent-teal)] text-white'
                      : 'dash-card'
                  }`}
                  style={channel !== ch.id ? { color: 'var(--text-muted)' } : undefined}
                >
                  <Icon size={14} />
                  {ch.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4 -mx-5 px-5">
          {(!messages || messages.length === 0) && (
            <div className="text-center py-20">
              <MessageCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <p className="text-[15px]" style={{ color: 'var(--text-muted)' }}>No messages yet. Be the first!</p>
            </div>
          )}
          {messages?.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="mb-3"
            >
              <div className={`dash-card rounded-2xl px-4 py-3 inline-block max-w-[80%]`}>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{msg.content}</p>
                <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-muted)' }}>
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="shrink-0 pb-4 pt-2 -mx-5 px-5">
          <div className="dash-card rounded-full px-4 py-2 flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send an anonymous message..."
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--text-muted)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[var(--accent-teal)] flex items-center justify-center shrink-0 dash-interactive"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
