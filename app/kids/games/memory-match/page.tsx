"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"

interface MemoryCard {
  id: number
  emoji: string
  label: string
  isFlipped: boolean
  isMatched: boolean
}

const CARD_SETS = {
  easy: [
    { emoji: "🤖", label: "Robot" },
    { emoji: "💻", label: "Računalnik" },
    { emoji: "📱", label: "Telefon" },
    { emoji: "🎮", label: "Igra" },
    { emoji: "🧠", label: "Možgani" },
    { emoji: "⚡", label: "Energija" },
  ],
  medium: [
    { emoji: "🤖", label: "Robot" },
    { emoji: "💻", label: "Računalnik" },
    { emoji: "📱", label: "Telefon" },
    { emoji: "🎮", label: "Igra" },
    { emoji: "🧠", label: "Možgani" },
    { emoji: "⚡", label: "Energija" },
    { emoji: "🔬", label: "Znanost" },
    { emoji: "🚀", label: "Raketa" },
  ],
  hard: [
    { emoji: "🤖", label: "Robot" },
    { emoji: "💻", label: "Računalnik" },
    { emoji: "📱", label: "Telefon" },
    { emoji: "🎮", label: "Igra" },
    { emoji: "🧠", label: "Možgani" },
    { emoji: "⚡", label: "Energija" },
    { emoji: "🔬", label: "Znanost" },
    { emoji: "🚀", label: "Raketa" },
    { emoji: "🎯", label: "Cilj" },
    { emoji: "🌟", label: "Zvezda" },
  ],
}

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function MemoryMatchPage() {
  const { user, loading } = useAuth()
  const { submitProgress } = useProgress()

  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, gameComplete, startTime])

  const initializeGame = (diff: "easy" | "medium" | "hard") => {
    setDifficulty(diff)
    const cardSet = CARD_SETS[diff]
    const duplicatedCards = [...cardSet, ...cardSet].map((card, index) => ({
      id: index, emoji: card.emoji, label: card.label, isFlipped: false, isMatched: false,
    }))
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameComplete(false)
    setNewAchievements([])
    setGameStarted(true)
    setStartTime(Date.now())
    setTimeElapsed(0)
  }

  const handleCardClick = (cardId: number) => {
    if (isChecking) return
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return
    const clickedCard = cards.find((card) => card.id === cardId)
    if (!clickedCard || clickedCard.isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)
    const newCards = cards.map((card) => card.id === cardId ? { ...card, isFlipped: true } : card)
    setCards(newCards)

    if (newFlippedCards.length === 2) {
      setIsChecking(true)
      setMoves(moves + 1)
      const [firstId, secondId] = newFlippedCards
      const firstCard = newCards.find((card) => card.id === firstId)
      const secondCard = newCards.find((card) => card.id === secondId)

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card,
            ),
          )
          setMatches((prevMatches) => {
            const newMatches = prevMatches + 1
            if (newMatches === cards.length / 2) handleGameComplete()
            return newMatches
          })
          setFlippedCards([])
          setIsChecking(false)
        }, 500)
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card,
            ),
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const handleGameComplete = async () => {
    setGameComplete(true)
    if (user) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const score = Math.max(0, 100 - moves * 2)
      const achievements = await submitProgress("memory_match", score, 100, timeSpent)
      setNewAchievements(achievements)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setDifficulty(null)
    setCards([])
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameComplete(false)
    setNewAchievements([])
    setTimeElapsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🎴</div>
          <p className="text-purple-300 font-semibold">Nalaganje...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/kids/activities"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
              ← Dejavnosti
            </Link>
          </div>
          <div className="rounded-3xl p-8"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(236,72,153,0.2)", boxShadow: "0 0 40px rgba(236,72,153,0.05)" }}>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎴</div>
              <h1 className="text-3xl font-bold text-white mb-2">Spomin</h1>
              <p className="text-white/50 text-sm">Poišči ujemajoče pare AI kartic!</p>
            </div>

            <div className="rounded-2xl p-4 mb-6"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <p className="text-blue-300 font-bold text-sm mb-2">Kako igrati:</p>
              <ul className="text-blue-200/70 text-xs space-y-1">
                <li>• Klikni na kartice, da jih obrneš</li>
                <li>• Poišči dve kartici z istim emojiem</li>
                <li>• Najdi vse pare, da zmagaš</li>
                <li>• Poskusi z čim manj potezami!</li>
              </ul>
            </div>

            <h3 className="text-white font-bold text-center mb-4">Izberi težavnost</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["easy", "medium", "hard"] as const).map((diff) => {
                const meta = {
                  easy:   { icon: "🌱", label: "Lahka",   sub: "6 parov (12 kartic)",  color: "34,197,94" },
                  medium: { icon: "⭐", label: "Srednja",  sub: "8 parov (16 kartic)",  color: "59,130,246" },
                  hard:   { icon: "🚀", label: "Težka",   sub: "10 parov (20 kartic)", color: "168,85,247" },
                }[diff]
                return (
                  <button key={diff} onClick={() => initializeGame(diff)}
                    className="p-6 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: `rgba(${meta.color},0.1)`, border: `1px solid rgba(${meta.color},0.3)` }}>
                    <div className="text-4xl mb-2">{meta.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-1">{meta.label}</h4>
                    <p className="text-xs text-white/50">{meta.sub}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const performance = moves <= cards.length / 2 + 5 ? "Odlično" : moves <= cards.length / 2 + 10 ? "Super" : "Dobro"
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(236,72,153,0.3)", boxShadow: "0 0 40px rgba(236,72,153,0.1)" }}>
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-white mb-1">Zmaga!</h2>
          <p className="text-xl font-bold mb-4" style={{ color: "#ec4899" }}>{performance}!</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-bold">{moves}</p>
              <p className="text-white/40 text-xs">potez</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-bold">{formatTime(timeElapsed)}</p>
              <p className="text-white/40 text-xs">čas</p>
            </div>
            <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-bold capitalize">{difficulty === "easy" ? "Lahka" : difficulty === "medium" ? "Srednja" : "Težka"}</p>
              <p className="text-white/40 text-xs">nivo</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={resetGame}
              className="w-full py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              Igraj znova
            </button>
            <Link href="/kids/activities"
              className="block w-full py-3 rounded-2xl font-bold text-sm text-center transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
              ← Dejavnosti
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const gridCols = difficulty === "hard" ? "grid-cols-5" : "grid-cols-4"

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/kids/activities"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
            ← Dejavnosti
          </Link>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl text-sm font-bold"
              style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)", color: "#f472b6" }}>
              {moves} potez
            </div>
            <div className="px-3 py-1.5 rounded-xl text-sm font-bold"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
              {formatTime(timeElapsed)}
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(236,72,153,0.2)", boxShadow: "0 0 40px rgba(236,72,153,0.05)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(236,72,153,0.1)", borderBottom: "1px solid rgba(236,72,153,0.15)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎴</span>
              <h1 className="text-xl font-bold text-white">Spomin</h1>
            </div>
            <p className="text-sm" style={{ color: "#f472b6" }}>
              {matches} / {cards.length / 2} parov
            </p>
          </div>

          <div className="p-4">
            {/* Progress */}
            <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ background: "rgba(236,72,153,0.12)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(matches / (cards.length / 2)) * 100}%`, background: "linear-gradient(90deg, #ec4899, #a855f7)" }} />
            </div>

            {/* Card grid */}
            <div className={`grid ${gridCols} gap-2`}>
              {cards.map((card) => (
                <button key={card.id} onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched || card.isFlipped || isChecking}
                  className="aspect-square rounded-xl transition-all duration-300"
                  style={{
                    background: card.isFlipped || card.isMatched
                      ? "rgba(255,255,255,0.07)"
                      : "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(236,72,153,0.4))",
                    border: card.isFlipped || card.isMatched
                      ? "1px solid rgba(168,85,247,0.3)"
                      : "1px solid rgba(168,85,247,0.5)",
                    opacity: card.isMatched ? 0.45 : 1,
                    cursor: card.isMatched || card.isFlipped || isChecking ? "not-allowed" : "pointer",
                  }}>
                  {(card.isFlipped || card.isMatched) ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-2xl md:text-4xl">{card.emoji}</div>
                      <div className="text-xs text-white/50 mt-0.5 hidden md:block">{card.label}</div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-2xl text-white/60">?</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
