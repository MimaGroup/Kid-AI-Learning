"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"

interface Pattern {
  sequence: string[]
  options: string[]
  correct: number
  explanation: string
}

const patterns: Pattern[] = [
  {
    sequence: ["🔴", "🔵", "🔴", "🔵", "🔴", "?"],
    options: ["🔴", "🔵", "🟢", "🟡"],
    correct: 1,
    explanation: "Vzorec se izmenjuje med rdečim in modrim krogom!",
  },
  {
    sequence: ["1", "2", "3", "4", "5", "?"],
    options: ["6", "5", "1", "10"],
    correct: 0,
    explanation: "Številke se vsak korak povečajo za 1!",
  },
  {
    sequence: ["🐶", "🐱", "🐶", "🐱", "🐶", "?"],
    options: ["🐶", "🐱", "🐭", "🐹"],
    correct: 1,
    explanation: "Vzorec se izmenjuje med psom in mačko!",
  },
  {
    sequence: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "?"],
    options: ["⭐", "⭐⭐⭐⭐⭐", "⭐⭐", "⭐⭐⭐"],
    correct: 1,
    explanation: "Vsak korak doda eno zvezdico več!",
  },
]

// Renders an emoji item — if it's multiple of the same emoji, wraps them in a flex grid
// so "⭐⭐⭐⭐" never overlaps inside a fixed-size box.
function EmojiItem({ value, size }: { value: string; size: number }) {
  if (value === "?") return <span style={{ fontSize: 22, color: "#4ade80" }}>?</span>
  const chars = [...value] // spread handles multi-byte emoji correctly
  if (chars.length <= 1 || !isNaN(Number(value))) {
    return <span style={{ fontSize: 28 }}>{value}</span>
  }
  const perItem = chars.length <= 2 ? 20 : chars.length <= 4 ? 15 : 12
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", maxWidth: size - 10 }}>
      {chars.map((c, i) => (
        <span key={i} style={{ fontSize: perItem, lineHeight: 1.1 }}>{c}</span>
      ))}
    </div>
  )
}

const STARS = [
  {x:4,y:15},{x:17,y:78},{x:27,y:32},{x:40,y:62},{x:50,y:10},
  {x:60,y:82},{x:70,y:45},{x:80,y:90},{x:92,y:25},{x:97,y:60},
  {x:10,y:55},{x:48,y:50},{x:88,y:70},{x:33,y:88},{x:77,y:18},
]

export default function PatternTrainingPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }
  const { submitProgress } = useProgress()

  const [currentPattern, setCurrentPattern] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    const correct = selectedAnswer === patterns[currentPattern].correct
    setLastCorrect(correct)
    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
    setShowExplanation(true)
  }

  const handleNextPattern = async () => {
    if (currentPattern < patterns.length - 1) {
      setCurrentPattern(currentPattern + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setLastCorrect(null)
    } else {
      setGameComplete(true)
      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        const achievements = await submitProgress("pattern_training", score, patterns.length, timeSpent, { streak })
        setNewAchievements(achievements)
      }
    }
  }

  const resetGame = () => {
    setCurrentPattern(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setStreak(0)
    setGameComplete(false)
    setLastCorrect(null)
  }

  const spaceStyle = { background: "radial-gradient(ellipse at 30% 60%, #001a10 0%, #0a0a1a 75%)" }
  const pattern = patterns[currentPattern]
  const progress = ((currentPattern + 1) / patterns.length) * 100

  if (gameComplete) {
    const pct = Math.round((score / patterns.length) * 100)
    return (
      <div className="min-h-screen relative p-4 pb-8 flex items-center justify-center" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.12 + (i % 4) * 0.08 }}
          />
        ))}
        <AchievementPopup badges={newAchievements.map((a: any) => a.achievement_type ?? a.id)} onClose={() => setNewAchievements([])} />
        <div
          className="relative z-10 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl"
          style={{
            background: "rgba(8,8,30,0.9)",
            border: "1px solid rgba(34,197,94,0.35)",
            boxShadow: "0 0 40px rgba(34,197,94,0.12)",
          }}
        >
          <div className="text-7xl mb-4">{pct >= 80 ? "🧠" : pct >= 60 ? "⭐" : "💪"}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Mojster vzorcev!</h2>
          <p className="text-green-300 text-lg mb-6">
            <span className="text-3xl font-bold text-green-400">{score}</span>
            <span className="text-white/50"> / {patterns.length} točk</span>
          </p>

          {newAchievements.length > 0 && (
            <div
              className="rounded-2xl p-4 mb-4"
              style={{ background: "rgba(251,191,36,0.13)", border: "1px solid rgba(251,191,36,0.35)" }}
            >
              <h4 className="text-yellow-400 text-xs font-bold mb-2 tracking-wider">🏆 NOVI DOSEŽKI</h4>
              {newAchievements.map((a) => (
                <p key={a.id} className="text-yellow-200 text-sm">{a.title}</p>
              ))}
            </div>
          )}

          <div
            className="rounded-2xl p-4 mb-6"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            <p className="text-green-200 text-sm leading-relaxed">
              <strong className="text-green-400">Prepoznavanje vzorcev</strong> je osnova, kako se AI uči iz podatkov!
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #15803d, #22c55e)" }}
            >
              Igraj znova
            </button>
            <Link href="/kids/home">
              <button
                className="w-full py-3 rounded-2xl font-semibold text-green-300 text-sm transition-all hover:bg-green-500/10"
                style={{ border: "1px solid rgba(34,197,94,0.3)" }}
              >
                Na zemljevid
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.12 + (i % 4) * 0.08 }}
        />
      ))}

      <AchievementPopup badges={newAchievements.map((a: any) => a.achievement_type ?? a.id)} onClose={() => setNewAchievements([])} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/kids/home" className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
            ← Nazaj na zemljevid
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/parent/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              🛸 Starševska plošča
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-red-500/10 active:scale-95"
              style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              ↩ Odjava
            </button>
          </div>
        </div>

        {/* Main game panel */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(8,8,30,0.88)",
            border: "1px solid rgba(34,197,94,0.3)",
            boxShadow: "0 0 40px rgba(34,197,94,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(34,197,94,0.18)", borderBottom: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <div>
                <h1 className="text-xl font-bold text-white">Vzorci</h1>
                <p className="text-green-400 text-xs font-medium">
                  Vzorec {currentPattern + 1} od {patterns.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="px-3 py-1.5 rounded-xl text-sm font-bold"
                style={{ background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                <span className="text-green-300">{score}</span>
                <span className="text-white/40 text-xs"> pt</span>
              </div>
              {streak > 0 && (
                <div
                  className="px-3 py-1.5 rounded-xl text-sm font-bold"
                  style={{ background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.35)" }}
                >
                  <span className="text-orange-300">{streak}</span>
                  <span className="text-orange-400 ml-1">🔥</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #15803d, #22c55e)",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
              }}
            />
          </div>

          <div className="p-6 space-y-5">
            {/* Pattern sequence */}
            <div>
              <p className="text-green-400 text-xs font-bold mb-3 tracking-wider">KAJ PRIDE NASLEDNJE?</p>
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
              >
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  {pattern.sequence.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl font-bold"
                      style={{
                        width: 60,
                        height: 60,
                        background: item === "?" ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)",
                        border: item === "?" ? "2px dashed rgba(34,197,94,0.6)" : "1px solid rgba(255,255,255,0.12)",
                        animation: item === "?" ? "pulse 1.5s ease-in-out infinite" : "none",
                      }}
                    >
                      <EmojiItem value={item} size={60} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Answer grid */}
            <div>
              <p className="text-white/60 text-xs font-semibold mb-3 text-center">Izberi pravilen odgovor:</p>
              <div className="grid grid-cols-2 gap-3">
                {pattern.options.map((option, index) => {
                  let bg = "rgba(255,255,255,0.05)"
                  let borderColor = "rgba(255,255,255,0.12)"
                  let textColor = "white"

                  if (showExplanation) {
                    if (index === pattern.correct) {
                      bg = "rgba(34,197,94,0.2)"
                      borderColor = "rgba(34,197,94,0.6)"
                      textColor = "#86efac"
                    } else if (index === selectedAnswer) {
                      bg = "rgba(239,68,68,0.2)"
                      borderColor = "rgba(239,68,68,0.6)"
                      textColor = "#fca5a5"
                    }
                  } else if (index === selectedAnswer) {
                    bg = "rgba(34,197,94,0.2)"
                    borderColor = "rgba(34,197,94,0.7)"
                    textColor = "#4ade80"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className="rounded-2xl flex flex-col items-center justify-center transition-all hover:brightness-125 disabled:cursor-default active:scale-95"
                      style={{
                        background: bg,
                        border: `2px solid ${borderColor}`,
                        padding: "20px 12px",
                        gap: 6,
                        color: textColor,
                      }}
                    >
                      <EmojiItem value={option} size={80} />
                      {showExplanation && index === pattern.correct && (
                        <span className="text-green-400 text-lg">✓</span>
                      )}
                      {showExplanation && index === selectedAnswer && index !== pattern.correct && (
                        <span className="text-red-400 text-lg">✗</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div
                className="rounded-2xl p-4 animate-slide-up"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
              >
                <p className="text-indigo-400 text-xs font-bold mb-1 tracking-wider">💡 RAZLAGA</p>
                <p className="text-indigo-200 text-sm leading-relaxed">{pattern.explanation}</p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center pt-1">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-10 py-3.5 rounded-2xl font-bold text-white text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  style={{ background: "linear-gradient(135deg, #15803d, #22c55e)" }}
                >
                  Oddaj odgovor →
                </button>
              ) : (
                <button
                  onClick={handleNextPattern}
                  className="px-10 py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #15803d, #22c55e)" }}
                >
                  {currentPattern < patterns.length - 1 ? "Naslednji vzorec →" : "Zaključi igro →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
