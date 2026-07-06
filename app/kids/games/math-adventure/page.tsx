"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"

type Difficulty = "easy" | "medium" | "hard"
type Operation = "addition" | "subtraction" | "multiplication" | "division"

interface MathProblem {
  question: string
  answer: number
  options: number[]
  operation: Operation
}

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: "Lahka", medium: "Srednja", hard: "Težka" }

export default function MathAdventurePage() {
  const { user, loading } = useAuth()
  const { submitProgress } = useProgress()

  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [problems, setProblems] = useState<MathProblem[]>([])
  const [currentProblem, setCurrentProblem] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())
  const [streak, setStreak] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const generateProblems = (diff: Difficulty, count = 10): MathProblem[] => {
    const result: MathProblem[] = []
    const operations: Operation[] = ["addition", "subtraction", "multiplication", "division"]

    for (let i = 0; i < count; i++) {
      let num1: number, num2: number, answer: number, operation: Operation

      switch (diff) {
        case "easy":
          operation = Math.random() > 0.5 ? "addition" : "subtraction"
          num1 = Math.floor(Math.random() * 10) + 1
          num2 = Math.floor(Math.random() * 10) + 1
          if (operation === "subtraction" && num2 > num1) { ;[num1, num2] = [num2, num1] }
          break
        case "medium":
          operation = operations[Math.floor(Math.random() * 3)] as Operation
          num1 = Math.floor(Math.random() * 20) + 1
          num2 = Math.floor(Math.random() * 12) + 1
          if (operation === "subtraction" && num2 > num1) { ;[num1, num2] = [num2, num1] }
          break
        case "hard":
          operation = operations[Math.floor(Math.random() * 4)] as Operation
          num1 = Math.floor(Math.random() * 50) + 10
          num2 = Math.floor(Math.random() * 12) + 1
          if (operation === "division") { num1 = num2 * (Math.floor(Math.random() * 10) + 1) }
          if (operation === "subtraction" && num2 > num1) { ;[num1, num2] = [num2, num1] }
          break
      }

      switch (operation) {
        case "addition": answer = num1 + num2; break
        case "subtraction": answer = num1 - num2; break
        case "multiplication": answer = num1 * num2; break
        case "division": answer = num1 / num2; break
      }

      const operatorSymbol = { addition: "+", subtraction: "−", multiplication: "×", division: "÷" }[operation]
      const wrongAnswers = new Set<number>()
      while (wrongAnswers.size < 3) {
        const offset = Math.floor(Math.random() * 10) - 5
        const wrongAnswer = answer + offset
        if (wrongAnswer !== answer && wrongAnswer > 0) wrongAnswers.add(wrongAnswer)
      }

      result.push({
        question: `${num1} ${operatorSymbol} ${num2} = ?`,
        answer,
        options: [answer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5),
        operation,
      })
    }
    return result
  }

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setProblems(generateProblems(selectedDifficulty))
    setGameStarted(true)
    setCurrentProblem(0)
    setScore(0)
    setStreak(0)
    setGameComplete(false)
    setNewAchievements([])
  }

  const handleAnswerSelect = (answer: number) => setSelectedAnswer(answer)

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    const isCorrect = selectedAnswer === problems[currentProblem].answer
    if (isCorrect) { setScore(score + 1); setStreak(streak + 1) } else { setStreak(0) }
    setShowResult(true)
  }

  const handleNextProblem = async () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        const achievements = await submitProgress("math_adventure", score, problems.length, timeSpent)
        setNewAchievements(achievements)
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentProblem(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setStreak(0)
    setGameComplete(false)
    setNewAchievements([])
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🧮</div>
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
          <div className="rounded-3xl p-8 text-center"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 0 40px rgba(34,197,94,0.06)" }}>
            <div className="text-6xl mb-4">🧮</div>
            <h1 className="text-3xl font-bold text-white mb-2">Matematična pustolovščina</h1>
            <p className="text-white/50 text-sm mb-8">Izberi težavnost in začni reševati!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => {
                const meta = {
                  easy:   { icon: "🌱", sub1: "Seštevanje in odštevanje", sub2: "Številke 1–10",  color: "34,197,94" },
                  medium: { icon: "🌟", sub1: "Seštevanje, odštevanje, množenje", sub2: "Številke 1–20", color: "59,130,246" },
                  hard:   { icon: "🚀", sub1: "Vse računske operacije", sub2: "Večje številke", color: "168,85,247" },
                }[diff]
                return (
                  <button key={diff} onClick={() => startGame(diff)}
                    className="p-6 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: `rgba(${meta.color},0.1)`, border: `1px solid rgba(${meta.color},0.3)` }}>
                    <div className="text-4xl mb-3">{meta.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{DIFFICULTY_LABELS[diff]}</h3>
                    <p className="text-xs text-white/50">{meta.sub1}</p>
                    <p className="text-xs text-white/40">{meta.sub2}</p>
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
    const percentage = Math.round((score / problems.length) * 100)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative" style={spaceStyle}>
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
        ))}
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl p-10"
          style={{ background: "rgba(8,8,30,0.9)", border: "1px solid rgba(34,197,94,0.35)", boxShadow: "0 0 40px rgba(34,197,94,0.1)" }}>
          <div className="text-6xl mb-4">
            {percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "👍" : "💪"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Pustolovščina končana!</h2>
          <p className="text-white/60 mb-1">Dosegel si</p>
          <p className="text-4xl font-bold mb-1" style={{ color: "#4ade80" }}>{score}</p>
          <p className="text-white/40 text-sm mb-6">od {problems.length} nalog · {percentage}%</p>
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

  const problem = problems[currentProblem]
  const isCorrect = selectedAnswer === problem.answer
  const pct = Math.round(((currentProblem + 1) / problems.length) * 100)

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
          style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 0 40px rgba(34,197,94,0.06)" }}>

          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(34,197,94,0.1)", borderBottom: "1px solid rgba(34,197,94,0.15)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧮</span>
              <div>
                <h1 className="text-xl font-bold text-white">Matematična pustolovščina</h1>
                <p className="text-xs font-medium" style={{ color: "#4ade80" }}>
                  Naloga {currentProblem + 1} od {problems.length} · {DIFFICULTY_LABELS[difficulty]}
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
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(34,197,94,0.12)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #059669, #4ade80)" }} />
            </div>

            {/* Problem */}
            <div className="rounded-2xl py-10 text-center"
              style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
              <p className="text-5xl font-bold text-white">{problem.question}</p>
              <p className="text-white/40 text-sm mt-3">Izberi pravilen odgovor</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {problem.options.map((option, index) => {
                let bg = "rgba(255,255,255,0.04)"
                let border = "rgba(255,255,255,0.1)"
                let textColor = "rgba(255,255,255,0.85)"
                if (selectedAnswer === option) {
                  if (showResult) {
                    if (isCorrect) { bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"; textColor = "#4ade80" }
                    else { bg = "rgba(239,68,68,0.15)"; border = "rgba(239,68,68,0.45)"; textColor = "#f87171" }
                  } else { bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.4)" }
                } else if (showResult && option === problem.answer) {
                  bg = "rgba(34,197,94,0.15)"; border = "rgba(34,197,94,0.45)"; textColor = "#4ade80"
                }
                return (
                  <button key={index} onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className="p-6 text-2xl font-bold rounded-2xl transition-all"
                    style={{ background: bg, border: `1px solid ${border}`, color: textColor, cursor: showResult ? "not-allowed" : "pointer" }}>
                    {option}
                  </button>
                )
              })}
            </div>

            {/* Result feedback */}
            {showResult && (
              <div className="rounded-2xl p-4 animate-slide-up"
                style={{
                  background: isCorrect ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${isCorrect ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                }}>
                <p className="font-bold text-sm" style={{ color: isCorrect ? "#4ade80" : "#f87171" }}>
                  {isCorrect ? "🎉 Pravilno! Odlično!" : `❌ Ni prav. Odgovor je ${problem.answer}`}
                </p>
              </div>
            )}

            {/* Action button */}
            <div className="flex justify-center pt-1">
              {!showResult ? (
                <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-30"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  Oddaj odgovor
                </button>
              ) : (
                <button onClick={handleNextProblem}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                  {currentProblem < problems.length - 1 ? "Naslednja naloga →" : "Zaključi pustolovščino"}
                </button>
              )}
            </div>

            <p className="text-center text-xs text-white/30">
              Rezultat: {score} / {currentProblem + (showResult ? 1 : 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
