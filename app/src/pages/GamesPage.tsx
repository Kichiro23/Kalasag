import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Palette, Circle, Type, Wind, Trophy, RotateCcw } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

interface GameState {
  game: string | null
  score: number
  targetColor: string
  colors: string[]
  message: string
}

const colorOptions = [
  { name: 'Red', bg: 'bg-red-500', hex: '#EF4444' },
  { name: 'Blue', bg: 'bg-blue-500', hex: '#3B82F6' },
  { name: 'Green', bg: 'bg-green-500', hex: '#22C55E' },
  { name: 'Yellow', bg: 'bg-yellow-500', hex: '#EAB308' },
  { name: 'Purple', bg: 'bg-purple-500', hex: '#A855F7' },
  { name: 'Pink', bg: 'bg-pink-500', hex: '#EC4899' },
]

const words = ['BAYANIHAN', 'KALASAG', 'TIBAY', 'PAG-ASA', 'PAMILYA', 'KALUSUGAN']

export default function GamesPage() {
  const navigate = useNavigate()
  const [state, setState] = useState<GameState>({
    game: null,
    score: 0,
    targetColor: '',
    colors: [],
    message: '',
  })
  const [scrambledWord, setScrambledWord] = useState('')
  const [userGuess, setUserGuess] = useState('')
  const [balloons, setBalloons] = useState<{ id: number; color: string; popped: boolean }[]>([])

  const startColorGame = () => {
    const target = colorOptions[Math.floor(Math.random() * colorOptions.length)]
    const options = [...colorOptions].sort(() => Math.random() - 0.5).slice(0, 4)
    if (!options.find(c => c.name === target.name)) {
      options[Math.floor(Math.random() * 4)] = target
    }
    setState({ ...state, game: 'color', targetColor: target.name, colors: options.map(c => c.name), message: `Tap ${target.name}!` })
  }

  const startWordGame = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('')
    setScrambledWord(scrambled)
    setUserGuess('')
    setState({ ...state, game: 'word', message: 'Unscramble the Filipino word!' })
  }

  const startBalloonGame = () => {
    const newBalloons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)].bg,
      popped: false,
    }))
    setBalloons(newBalloons)
    setState({ ...state, game: 'balloon', score: 0, message: 'Pop the balloons!' })
  }

  const handleColorTap = (colorName: string) => {
    if (colorName === state.targetColor) {
      setState(s => ({ ...s, score: s.score + 10, message: 'Correct! +10 pts' }))
      setTimeout(startColorGame, 800)
    } else {
      setState(s => ({ ...s, message: 'Try again!' }))
    }
  }

  const handleWordSubmit = () => {
    const original = words.find(w => w.split('').sort().join('') === scrambledWord.split('').sort().join(''))
    if (userGuess.toUpperCase() === original) {
      setState(s => ({ ...s, score: s.score + 25, message: 'Correct! +25 pts' }))
      setTimeout(startWordGame, 1000)
    } else {
      setState(s => ({ ...s, message: 'Not quite, try again!' }))
    }
  }

  const popBalloon = (id: number) => {
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b))
    setState(s => ({ ...s, score: s.score + 5 }))
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
          <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
        </button>
        <div className="flex-1">
          <h1 className="text-[22px] font-bold" style={{ color: 'var(--text-primary)' }}>Urge Arcade</h1>
          {state.game && (
            <div className="flex items-center gap-2 mt-1">
              <Trophy size={14} className="text-amber-400" />
              <span className="text-[13px] text-amber-400">{state.score} pts</span>
            </div>
          )}
        </div>
        {state.game && (
          <button onClick={() => setState({ game: null, score: 0, targetColor: '', colors: [], message: '' })} className="w-10 h-10 rounded-full dash-card flex items-center justify-center dash-interactive">
            <RotateCcw size={18} style={{ color: 'var(--text-primary)' }} />
          </button>
        )}
      </div>

      {!state.game ? (
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Palette, name: 'Color Match', desc: 'Tap the right color', action: startColorGame, color: 'text-pink-400' },
            { icon: Circle, name: 'Balloon Pop', desc: 'Pop all balloons', action: startBalloonGame, color: 'text-blue-400' },
            { icon: Type, name: 'Word Scramble', desc: 'Unscramble words', action: startWordGame, color: 'text-emerald-400' },
            { icon: Wind, name: 'Breathing', desc: 'Breathe & relax', action: () => navigate('/dashboard/breathe'), color: 'text-[var(--accent-teal)]' },
          ].map((game, i) => (
            <motion.button
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={game.action}
              className="dash-card rounded-2xl p-5 dash-interactive flex flex-col items-center text-center gap-3"
            >
              <game.icon size={32} className={game.color} />
              <div>
                <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>{game.name}</h3>
                <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>{game.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <p className="text-[17px] text-center mb-6 font-medium" style={{ color: 'var(--text-primary)' }}>{state.message}</p>

          {state.game === 'color' && (
            <div className="grid grid-cols-2 gap-3">
              {state.colors.map((colorName) => {
                const color = colorOptions.find(c => c.name === colorName)
                return (
                  <button
                    key={colorName}
                    onClick={() => handleColorTap(colorName)}
                    className={`${color?.bg ?? 'bg-gray-500'} rounded-2xl h-24 flex items-center justify-center shadow-lg dash-interactive`}
                  >
                    <span className="text-white font-bold text-[15px]">{colorName}</span>
                  </button>
                )
              })}
            </div>
          )}

          {state.game === 'word' && (
            <div className="flex flex-col items-center gap-4">
              <div className="dash-card rounded-2xl p-6">
                <p className="text-[28px] font-bold text-[var(--accent-teal)] tracking-[8px] text-center">{scrambledWord}</p>
              </div>
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleWordSubmit()}
                placeholder="Your answer..."
                className="w-full dash-card rounded-2xl px-5 py-4 text-[17px] text-center outline-none placeholder:text-[var(--text-muted)]"
                style={{ color: 'var(--text-primary)' }}
              />
              <button onClick={handleWordSubmit} className="dash-card rounded-full px-8 py-3 font-medium dash-interactive" style={{ color: 'var(--text-primary)' }}>
                Submit
              </button>
            </div>
          )}

          {state.game === 'balloon' && (
            <div className="grid grid-cols-4 gap-3">
              {balloons.map(b => (
                <motion.button
                  key={b.id}
                  initial={{ scale: 1 }}
                  animate={{ scale: b.popped ? 0 : 1, opacity: b.popped ? 0 : 1 }}
                  onClick={() => !b.popped && popBalloon(b.id)}
                  className={`${b.color} rounded-full aspect-square shadow-lg dash-interactive`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  )
}
