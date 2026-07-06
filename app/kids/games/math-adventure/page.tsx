"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    const problems: MathProblem[] = []
    const operations: Operation[] = ["addition", "subtraction", "multiplication", "division"]

    for (let i = 0; i < count; i++) {
      let num1: number, num2: number, answer: number, operation: Operation

      switch (diff) {
        case "easy":
          operation = Math.random() > 0.5 ? "addition" : "subtraction"
          num1 = Math.floor(Math.random() * 10) + 1
          num2 = Math.floor(Math.random() * 10) + 1
          if (operation === "subtraction" && num2 > num1) {
            ;[num1, num2] = [num2, num1]
          }
          break
        case "medium":
          operation = operations[Math.floor(Math.random() * 3)] as Operation
          num1 = Math.floor(Math.random() * 20) + 1
          num2 = Math.floor(Math.random() * 12) + 1
          if (operation === "subtraction" && num2 > num1) {
            ;[num1, num2] = [num2, num1]
          }
          break
        case "hard":
          operation = operations[Math.floor(Math.random() * 4)] as Operation
          num1 = Math.floor(Math.random() * 50) + 10
          num2 = Math.floor(Math.random() * 12) + 1
          if (operation === "division") {
            num1 = num2 * (Math.floor(Math.random() * 10) + 1)
          }
          if (operation === "subtraction" && num2 > num1) {
            ;[num1, num2] = [num2, num1]
          }
          break
      }

      switch (operation) {
        case "addition":
          answer = num1 + num2
          break
        case "subtraction":
          answer = num1 - num2
          break
        case "multiplication":
          answer = num1 * num2
          break
        case "division":
          answer = num1 / num2
          break
      }

      const operatorSymbol = {
        addition: "+",
        subtraction: "-",
        multiplication: "×",
        division: "÷",
      }[operation]

      const wrongAnswers = new Set<number>()
      while (wrongAnswers.size < 3) {
        const offset = Math.floor(Math.random() * 10) - 5
        const wrongAnswer = answer + offset
        if (wrongAnswer !== answer && wrongAnswer > 0) {
          wrongAnswers.add(wrongAnswer)
        }
      }

      const options = [answer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5)

      problems.push({
        question: `${num1} ${operatorSymbol} ${num2} = ?`,
        answer,
        options,
        operation,
      })
    }

    return problems
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

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === problems[currentProblem].answer

    if (isCorrect) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧮</div>
          <p className="text-gray-600">Loading Math Adventure...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/kids/activities" className="text-green-600 hover:underline">
              ← Back to Activities
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">🧮</div>
              <CardTitle className="text-4xl text-green-600">Math Adventure</CardTitle>
              <p className="text-gray-600 mt-2">Choose your difficulty level and start solving!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => startGame("easy")}
                  className="p-6 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 transition-all"
                >
                  <div className="text-4xl mb-2">🌱</div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">Easy</h3>
                  <p className="text-sm text-gray-600">Addition & Subtraction</p>
                  <p className="text-sm text-gray-600">Numbers 1-10</p>
                </button>

                <button
                  onClick={() => startGame("medium")}
                  className="p-6 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 transition-all"
                >
                  <div className="text-4xl mb-2">🌟</div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Medium</h3>
                  <p className="text-sm text-gray-600">+, -, × operations</p>
                  <p className="text-sm text-gray-600">Numbers 1-20</p>
                </button>

                <button
                  onClick={() => startGame("hard")}
                  className="p-6 bg-purple-100 hover:bg-purple-200 rounded-lg border-2 border-purple-300 transition-all"
                >
                  <div className="text-4xl mb-2">🚀</div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2">Hard</h3>
                  <p className="text-sm text-gray-600">All operations</p>
                  <p className="text-sm text-gray-600">Larger numbers</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((score / problems.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-green-600">Adventure Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">
                {percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "👍" : "💪"}
              </div>
              <div>
                <p className="text-xl mb-2">
                  You scored <span className="font-bold text-green-600">{score}</span> out of{" "}
                  <span className="font-bold">{problems.length}</span>!
                </p>
                <p className="text-lg text-gray-600">{percentage}% correct</p>
              </div>

              {percentage >= 90 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-900 font-bold">Outstanding! You're a math champion!</p>
                </div>
              )}

              {newAchievements.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">New Achievements!</h4>
                  {newAchievements.map((achievement) => (
                    <p key={achievement.id} className="text-blue-800">
                      🏆 {achievement.title}
                    </p>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                  Play Again
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

  const problem = problems[currentProblem]
  const isCorrect = selectedAnswer === problem.answer

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/kids/activities" className="text-green-600 hover:underline">
            ← Back
          </Link>
          {streak >= 3 && (
            <div className="bg-orange-100 border border-orange-300 rounded-full px-4 py-2 flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <span className="font-bold text-orange-700">{streak} streak!</span>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-green-600">Math Adventure</CardTitle>
              <div className="text-sm text-gray-500">
                Problem {currentProblem + 1} of {problems.length}
              </div>
            </div>
            <div className="text-sm text-gray-600 capitalize">{difficulty} Level</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
              />
            </div>

            <div className="text-center py-8">
              <h3 className="text-5xl font-bold text-gray-900 mb-4">{problem.question}</h3>
              <p className="text-gray-600">Choose the correct answer</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {problem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-6 text-2xl font-bold rounded-lg border-2 transition-all ${
                    selectedAnswer === option
                      ? showResult
                        ? isCorrect
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : "border-green-500 bg-green-50"
                      : showResult && option === problem.answer
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 hover:border-green-300 bg-white"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div
                className={`rounded-lg p-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <p className={`font-bold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "🎉 Correct! Great job!" : `❌ Not quite. The answer is ${problem.answer}`}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              {!showResult ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextProblem} className="bg-green-600 hover:bg-green-700">
                  {currentProblem < problems.length - 1 ? "Next Problem" : "Finish Adventure"}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-600">
              Score: {score} / {currentProblem + (showResult ? 1 : 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
