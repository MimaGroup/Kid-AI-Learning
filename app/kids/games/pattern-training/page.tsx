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
    explanation: "Številke se povečujejo za 1 vsak korak!",
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

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function PatternTrainingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { submitProgress } = useProgress()

  const [currentPattern, setCurrentPattern] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    if (selectedAnswer === patterns[currentPattern].correct) {
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
  }

  const pattern = patterns[currentPattern]
  const pct = Math.round(((currentPattern + 1) / patterns.length) * 100)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🧠</div>
          <p className="text-purple-300 font-semibold">Nalaganje...</p>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const pctScore = Math.round((score / patterns.length) * 100)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(108,212,195,0.35)", boxShadow: "0 0 40px rgba(108,212,195,0.1)" }}>
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-2">Mojster vzorcev!</h2>
          <p className="text-white/60 mb-1">Dosegel si</p>
          <p className="text-4xl font-bold mb-1" style={{ color: "#6CD4C3" }}>{score}</p>
          <p className="text-white/40 text-sm mb-6">od {patterns.length} vzorcev · {pctScore}%</p>
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

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/kids/activities"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
            ← Dejavnosti
          </Link>
          {streak >= 3 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ background: "rgba(251,146,60,0.2)", border: "1px solid rgba(251,146,60,0.4)", color: "#fb923c" }}>
              🔥 {streak} zapored!
            </div>
          )}
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(108,212,195,0.2)", boxShadow: "0 0 40px rgba(108,212,195,0.06)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(108,212,195,0.1)", borderBottom: "1px solid rgba(108,212,195,0.15)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <div>
                <h1 className="text-xl font-bold text-white">Prepoznavanje vzorcev</h1>
                <p className="text-xs font-medium" style={{ color: "#6CD4C3" }}>
                  Vzorec {currentPattern + 1} od {patterns.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-lg">{score}</p>
              <p className="text-white/40 text-xs">točk</p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Progress bar */}
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(108,212,195,0.12)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #059669, #6CD4C3)" }} />
            </div>

            {/* Pattern display */}
            <div className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(108,212,195,0.06)", border: "1px solid rgba(108,212,195,0.15)" }}>
              <p className="text-white/60 text-sm mb-4 font-medium">Kaj prihaja naslednje v vzorcu?</p>
              <div className="flex justify-center items-center gap-3 flex-wrap text-4xl">
                {pattern.sequence.map((item, index) => (
                  <div key={index}
                    className="min-w-[50px] text-center"
                    style={{ color: item === "?" ? "rgba(108,212,195,0.5)" : undefined }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div>
              <p className="text-white/60 text-sm font-medium text-center mb-3">Izberi pravilen odgovor:</p>
              <div className="grid grid-cols-2 gap-3">
                {pattern.options.map((option, index) => {
                  let bg = "rgba(255,255,255,0.04)"
                  let border = "rgba(255,255,255,0.1)"
                  if (selectedAnswer === index) {
                    if (showExplanation) {
                      if (index === pattern.correct) { bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)" }
                      else { bg = "rgba(239,68,68,0.15)"; border = "rgba(239,68,68,0.45)" }
                    } else { bg = "rgba(108,212,195,0.18)"; border = "rgba(108,212,195,0.5)" }
                  } else if (showExplanation && index === pattern.correct) {
                    bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"
                  }
                  return (
                    <button key={index} onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className="p-6 text-4xl rounded-2xl transition-all"
                      style={{ background: bg, border: `1px solid ${border}`, cursor: showExplanation ? "not-allowed" : "pointer" }}>
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="rounded-2xl p-4 animate-slide-up"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
                <p className="text-blue-300 text-sm leading-relaxed">
                  <span className="font-bold">💡 Razlaga: </span>{pattern.explanation}
                </p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center pt-1">
              {!showExplanation ? (
                <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-30"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  Oddaj odgovor
                </button>
              ) : (
                <button onClick={handleNextPattern}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentPattern < patterns.length - 1 ? "Naslednji vzorec →" : "Zaključi igro"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
