"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
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
    explanation: "The pattern alternates between red and blue circles!",
  },
  {
    sequence: ["1", "2", "3", "4", "5", "?"],
    options: ["6", "5", "1", "10"],
    correct: 0,
    explanation: "The numbers increase by 1 each time!",
  },
  {
    sequence: ["🐶", "🐱", "🐶", "🐱", "🐶", "?"],
    options: ["🐶", "🐱", "🐭", "🐹"],
    correct: 1,
    explanation: "The pattern alternates between dog and cat!",
  },
  {
    sequence: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐", "6⭐", "?"],
    options: ["1⭐", "5⭐", "2⭐", "3⭐"],
    correct: 0,
    explanation: "Each step adds one more star!",
  },
]

export default function PatternTrainingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
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

  if (gameComplete) {
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/activities" className="text-cyan-600 hover:underline">
            ← Back to Activities
          </Link>
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
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-cyan-600 hover:bg-cyan-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextPattern} className="bg-cyan-600 hover:bg-cyan-700">
                  {currentPattern < patterns.length - 1 ? "Next Pattern" : "Finish Game"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
