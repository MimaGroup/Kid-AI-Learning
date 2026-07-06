"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
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
          console.error("Failed to generate questions:", data.error)
          // Fallback to sample questions if AI generation fails
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
        body: JSON.stringify({
          topic: "artificial intelligence and technology",
          difficulty: "beginner",
          count: 5,
        }),
      })

      const data = await response.json()
      if (response.ok && data.questions) {
        setQuestions(data.questions)
      }
    } catch (error) {
      console.error("Error generating questions:", error)
    } finally {
      setLoadingQuestions(false)
    }
  }

  if (loading || loadingQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-gray-600">Generating your personalized quiz...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Failed to generate quiz questions</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-purple-600">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">🏆</div>
              <p className="text-xl">
                You scored <span className="font-bold text-purple-600">{score}</span> out of{" "}
                <span className="font-bold">{questions.length}</span>!
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
              <div className="space-y-4">
                <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
                  Try New Quiz
                </Button>
                <div>
                  <Link href="/kids/activities">
                    <Button variant="outline">Back to Activities</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/activities" className="text-purple-600 hover:underline">
            ← Back to Activities
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-purple-600">AI Quiz</CardTitle>
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="text-xl font-semibold">{question.question}</h3>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === question.correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-purple-500 bg-purple-50"
                      : showExplanation && index === question.correct
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-purple-300"
                  } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              {!showExplanation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-700">
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
