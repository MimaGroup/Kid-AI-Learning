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
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function AIQuizPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
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
              question: "Za kaj stoji kratica AI?",
              options: ["Umetna inteligenca", "Samodejne informacije", "Napredni internet", "Neverjetne ideje"],
              correct: 0,
              explanation: "AI pomeni Umetna inteligenca — računalniški sistemi, ki opravljajo naloge, ki zahtevajo človeško inteligenco!",
            },
          ])
        }
      } catch (error) {
        console.error("Error generating questions:", error)
      } finally {
        setLoadingQuestions(false)
      }
    }

    if (user) {
      generateQuestions()
    }
  }, [user])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
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
    } catch (error) {
      console.error("Error generating questions:", error)
    } finally {
      setLoadingQuestions(false)
    }
  }

  if (loading || loadingQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🎯</div>
          <p className="text-purple-300 font-semibold">Ustvarjanje tvojega kviza...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={spaceStyle}>
        <div className="text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <p className="text-white/60 mb-6">Ni uspelo ustvariti vprašanj.</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
            Poskusi znova
          </button>
        </div>
      </div>
    )
  }

  if (quizComplete) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 40px rgba(168,85,247,0.12)" }}>
          <div className="text-6xl mb-4">
            {pct >= 90 ? "🏆" : pct >= 70 ? "⭐" : pct >= 50 ? "👍" : "💪"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Kviz končan!</h2>
          <p className="text-white/60 mb-1">Dosegel si</p>
          <p className="text-4xl font-bold mb-1" style={{ color: "#a855f7" }}>{score}</p>
          <p className="text-white/40 text-sm mb-6">od {questions.length} vprašanj · {pct}%</p>
          <div className="flex flex-col gap-3">
            <button onClick={resetQuiz}
              className="w-full py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              Nov kviz
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

  const question = questions[currentQuestion]
  const pct = Math.round(((currentQuestion + 1) / questions.length) * 100)

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="mb-5">
          <Link href="/kids/activities"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
            ← Dejavnosti
          </Link>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 40px rgba(168,85,247,0.08)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(168,85,247,0.15)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h1 className="text-xl font-bold text-white">AI Kviz</h1>
                <p className="text-purple-400 text-xs font-medium">
                  Vprašanje {currentQuestion + 1} od {questions.length}
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
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(168,85,247,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7C3AED, #a855f7)" }} />
            </div>

            {/* Question */}
            <div className="rounded-2xl p-5"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <p className="text-white font-semibold text-base leading-relaxed">{question.question}</p>
            </div>

            {/* Answer options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let bg = "rgba(255,255,255,0.04)"
                let border = "rgba(255,255,255,0.1)"
                let textColor = "rgba(255,255,255,0.8)"
                if (selectedAnswer === index) {
                  if (showExplanation) {
                    if (index === question.correct) { bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)" }
                    else { bg = "rgba(239,68,68,0.15)"; border = "rgba(239,68,68,0.45)" }
                  } else { bg = "rgba(168,85,247,0.2)"; border = "rgba(168,85,247,0.5)" }
                } else if (showExplanation && index === question.correct) {
                  bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"
                }
                return (
                  <button key={index} onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className="w-full p-4 text-left rounded-2xl font-medium text-sm transition-all"
                    style={{ background: bg, border: `1px solid ${border}`, color: textColor, cursor: showExplanation ? "not-allowed" : "pointer" }}>
                    {option}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="rounded-2xl p-4 animate-slide-up"
                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
                <p className="text-blue-300 text-sm leading-relaxed">
                  <span className="font-bold">💡 Razlaga: </span>{question.explanation}
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
                <button onClick={handleNextQuestion}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentQuestion < questions.length - 1 ? "Naslednje vprašanje →" : "Zaključi kviz"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
