"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"
import { useSubscription } from "@/hooks/use-subscription"

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
    sequence: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐", "⭐⭐", "?"],
    options: ["⭐", "⭐⭐⭐", "⭐⭐", "⭐⭐⭐⭐"],
    correct: 1,
    explanation: "The pattern repeats: one star, two stars, three stars!",
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
  const { hasPremium, loading: subscriptionLoading } = useSubscription()

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
    if (!loading && !subscriptionLoading && user && !hasPremium) {
      router.push("/pricing")
    }
  }, [user, loading, router, hasPremium, subscriptionLoading])

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-600">Loading Pattern Training...</p>
        </div>
      </div>
    )
  }

  if (!hasPremium) {
    return null
  }

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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-cyan-600">Pattern Master!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">🎯</div>
              <p className="text-xl">
                You scored <span className="font-bold text-cyan-600">{score}</span> out of{" "}
                <span className="font-bold">{patterns.length}</span>!
              </p>
              {newAchievements.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-900 mb-2">New Achievements!</h4>
                  {newAchievements.map((achievement) => (
                    <p key={achievement.id} className="text-yellow-800">
                      🏆 {achievement.title}
                    </p>
                  ))}
                </div>
              )}
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <p className="text-cyan-800">
                  <strong>Pattern Recognition:</strong> You're getting better at spotting patterns! This skill helps AI
                  systems learn from data.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={resetGame} className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto">
                  Play Again
                </Button>
                <Link href="/kids/activities">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                    Back to Activities
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-cyan-600">🎯 Pattern Training</CardTitle>
              <div className="text-sm text-gray-500">
                Pattern {currentPattern + 1} of {patterns.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                Score: <span className="font-bold text-cyan-600">{score}</span>
              </div>
              <div className="text-sm">
                Streak: <span className="font-bold text-orange-600">{streak} 🔥</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPattern + 1) / patterns.length) * 100}%` }}
              />
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">What comes next in the pattern?</h3>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                {pattern.sequence.map((item, index) => (
                  <div key={index} className="flex items-center justify-center min-w-[48px] min-h-[48px] text-4xl">
                    {item === "?" ? <span className="text-gray-400 font-bold">?</span> : <span>{item}</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-center">Choose the correct answer:</h4>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {pattern.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`p-6 text-4xl rounded-lg border-2 transition-all flex items-center justify-center min-h-[100px] ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === pattern.correct
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-cyan-500 bg-cyan-50"
                        : showExplanation && index === pattern.correct
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-cyan-300 bg-white"
                    } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span className="whitespace-nowrap">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
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
