import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, MessageCircle, Users, Shield } from 'lucide-react'
import { trpc } from '@/providers/trpc'

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
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/20 via-[#020617] to-[#020617]" />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="px-5 pt-12 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full glass-base flex items-center justify-center specular-highlight">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div>
              <h1 className="text-[22px] font-bold text-white">Bayanihan Chat</h1>
              <p className="text-[12px] text-[#64748B]">Anonymous peer support</p>
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
                      ? 'bg-[#4338CA] text-white'
                      : 'glass-base text-[#64748B]'
                  }`}
                >
                  <Icon size={14} />
                  {ch.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pb-4">
          {(!messages || messages.length === 0) && (
            <div className="text-center py-20">
              <MessageCircle size={40} className="text-[#64748B] mx-auto mb-4" />
              <p className="text-[15px] text-[#64748B]">No messages yet. Be the first!</p>
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
              <div className={`glass-base rounded-2xl px-4 py-3 specular-highlight inline-block max-w-[80%]`}>
                <p className="text-[14px] text-[#CBD5E1] leading-relaxed">{msg.content}</p>
                <span className="text-[10px] text-[#64748B] mt-1 block">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="shrink-0 px-5 pb-8 pt-2">
          <div className="glass-thick rounded-full px-4 py-2 flex items-center gap-3 specular-highlight">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Send an anonymous message..."
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
