"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const STARS = [
  {x:7,y:12},{x:20,y:80},{x:30,y:28},{x:42,y:65},{x:52,y:8},
  {x:62,y:78},{x:72,y:42},{x:82,y:88},{x:90,y:22},{x:96,y:58},
  {x:14,y:52},{x:55,y:48},{x:85,y:68},{x:35,y:85},{x:75,y:15},
]

const OPTION_LETTERS = ["A", "B", "C", "D"]

export default function AIQuizPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }
  const { submitProgress } = useProgress()

  const [questions, setQuestions] = useState<Question[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const generateQuestions = async () => {
      try {
        setLoadingQuestions(true)
        const response = await fetch("/api/generate/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: "artificial intelligence and technology",
            difficulty: "beginner",
            count: 5,
          }),
        })
        const data = await response.json()
        if (response.ok && data.questions) {
          setQuestions(data.questions)
        } else {
          setQuestions([
            {
              question: "What does AI stand for?",
              options: ["Artificial Intelligence", "Automatic Information", "Advanced Internet", "Amazing Ideas"],
              correct: 0,
              explanation:
                "AI stands for Artificial Intelligence - computer systems that can perform tasks that typically require human intelligence!",
            },
          ])
        }
      } catch {
        // silence
      } finally {
        setLoadingQuestions(false)
      }
    }
    if (user) generateQuestions()
  }, [user])

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        const achievements = await submitProgress("ai_quiz", score, questions.length, timeSpent)
        setNewAchievements(achievements)
      }
    }
  }

  const resetQuiz = async () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
    setNewAchievements([])
    setLoadingQuestions(true)
    try {
      const response = await fetch("/api/generate/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "artificial intelligence and technology", difficulty: "beginner", count: 5 }),
      })
      const data = await response.json()
      if (response.ok && data.questions) setQuestions(data.questions)
    } catch {
      // silence
    } finally {
      setLoadingQuestions(false)
    }
  }

  const spaceStyle = { background: "radial-gradient(ellipse at 60% 20%, #2d1000 0%, #0a0a1a 75%)" }

  if (loading || loadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <p className="text-orange-300 font-semibold">Ustvarjanje tvojega kviza...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={spaceStyle}>
        <div
          className="rounded-3xl p-8 text-center max-w-sm"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(249,115,22,0.3)" }}
        >
          <div className="text-5xl mb-4">😕</div>
          <p className="text-white mb-4">Ustvarjanje vprašanj ni uspelo</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #ea580c, #f97316)" }}
          >
            Poskusi znova
          </button>
        </div>
      </div>
    )
  }

  if (quizComplete) {
    const pct = Math.round((score / questions.length) * 100)
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
            border: "1px solid rgba(249,115,22,0.35)",
            boxShadow: "0 0 40px rgba(249,115,22,0.12)",
          }}
        >
          <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "💪"}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Kviz končan!</h2>
          <p className="text-orange-300 text-lg mb-6">
            <span className="text-3xl font-bold text-orange-400">{score}</span>
            <span className="text-white/50"> / {questions.length} točk</span>
          </p>

          {newAchievements.length > 0 && (
            <div
              className="rounded-2xl p-4 mb-6"
              style={{ background: "rgba(251,191,36,0.13)", border: "1px solid rgba(251,191,36,0.35)" }}
            >
              <h4 className="text-yellow-400 text-xs font-bold mb-2 tracking-wider">🏆 NOVI DOSEŽKI</h4>
              {newAchievements.map((a) => (
                <p key={a.id} className="text-yellow-200 text-sm">{a.title}</p>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #c2410c, #f97316)" }}
            >
              Nov kviz
            </button>
            <Link href="/kids/home">
              <button
                className="w-full py-3 rounded-2xl font-semibold text-orange-300 text-sm transition-all hover:bg-orange-500/10"
                style={{ border: "1px solid rgba(249,115,22,0.3)" }}
              >
                Na zemljevid
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

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
          <Link href="/kids/home" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
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
            border: "1px solid rgba(249,115,22,0.3)",
            boxShadow: "0 0 40px rgba(249,115,22,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(249,115,22,0.18)", borderBottom: "1px solid rgba(249,115,22,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h1 className="text-xl font-bold text-white">AI Kviz</h1>
                <p className="text-orange-400 text-xs font-medium">
                  Vprašanje {currentQuestion + 1} od {questions.length}
                </p>
              </div>
            </div>
            <div
              className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{ background: "rgba(249,115,22,0.25)", border: "1px solid rgba(249,115,22,0.35)" }}
            >
              <span className="text-orange-300">{score}</span>
              <span className="text-white/40 text-xs"> točk</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #c2410c, #f97316)",
                boxShadow: "0 0 8px rgba(249,115,22,0.6)",
              }}
            />
          </div>

          <div className="p-6 space-y-5">
            {/* Question */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <p className="text-xs text-orange-400 font-bold mb-2 tracking-wider">VPRAŠANJE</p>
              <h3 className="text-lg font-semibold text-white leading-snug">{question.question}</h3>
            </div>

            {/* Answer options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let bg = "rgba(255,255,255,0.05)"
                let borderColor = "rgba(255,255,255,0.12)"
                let textColor = "rgba(255,255,255,0.8)"
                let letterBg = "rgba(255,255,255,0.1)"
                let letterColor = "rgba(255,255,255,0.5)"

                if (showExplanation) {
                  if (index === question.correct) {
                    bg = "rgba(34,197,94,0.18)"
                    borderColor = "rgba(34,197,94,0.5)"
                    textColor = "#86efac"
                    letterBg = "rgba(34,197,94,0.3)"
                    letterColor = "#4ade80"
                  } else if (index === selectedAnswer) {
                    bg = "rgba(239,68,68,0.18)"
                    borderColor = "rgba(239,68,68,0.5)"
                    textColor = "#fca5a5"
                    letterBg = "rgba(239,68,68,0.3)"
                    letterColor = "#f87171"
                  }
                } else if (index === selectedAnswer) {
                  bg = "rgba(249,115,22,0.2)"
                  borderColor = "rgba(249,115,22,0.6)"
                  textColor = "#fdba74"
                  letterBg = "rgba(249,115,22,0.35)"
                  letterColor = "#fb923c"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className="w-full rounded-2xl p-4 flex items-center gap-4 text-left transition-all hover:brightness-125 disabled:cursor-default"
                    style={{ background: bg, border: `1.5px solid ${borderColor}` }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all"
                      style={{ background: letterBg, color: letterColor }}
                    >
                      {OPTION_LETTERS[index]}
                    </span>
                    <span className="text-sm font-medium transition-all" style={{ color: textColor }}>
                      {option}
                    </span>
                    {showExplanation && index === question.correct && (
                      <span className="ml-auto text-green-400 text-lg">✓</span>
                    )}
                    {showExplanation && index === selectedAnswer && index !== question.correct && (
                      <span className="ml-auto text-red-400 text-lg">✗</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div
                className="rounded-2xl p-4 animate-slide-up"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
              >
                <p className="text-indigo-400 text-xs font-bold mb-1 tracking-wider">💡 RAZLAGA</p>
                <p className="text-indigo-200 text-sm leading-relaxed">{question.explanation}</p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center pt-1">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-10 py-3.5 rounded-2xl font-bold text-white text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  style={{ background: "linear-gradient(135deg, #c2410c, #f97316)" }}
                >
                  Oddaj odgovor →
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-10 py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #c2410c, #f97316)" }}
                >
                  {currentQuestion < questions.length - 1 ? "Naslednje vprašanje →" : "Zaključi kviz →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
