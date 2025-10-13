"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    { emoji: "💻", label: "Computer" },
    { emoji: "📱", label: "Phone" },
    { emoji: "🎮", label: "Game" },
    { emoji: "🧠", label: "Brain" },
    { emoji: "⚡", label: "Energy" },
  ],
  medium: [
    { emoji: "🤖", label: "Robot" },
    { emoji: "💻", label: "Computer" },
    { emoji: "📱", label: "Phone" },
    { emoji: "🎮", label: "Game" },
    { emoji: "🧠", label: "Brain" },
    { emoji: "⚡", label: "Energy" },
    { emoji: "🔬", label: "Science" },
    { emoji: "🚀", label: "Rocket" },
  ],
  hard: [
    { emoji: "🤖", label: "Robot" },
    { emoji: "💻", label: "Computer" },
    { emoji: "📱", label: "Phone" },
    { emoji: "🎮", label: "Game" },
    { emoji: "🧠", label: "Brain" },
    { emoji: "⚡", label: "Energy" },
    { emoji: "🔬", label: "Science" },
    { emoji: "🚀", label: "Rocket" },
    { emoji: "🎯", label: "Target" },
    { emoji: "🌟", label: "Star" },
  ],
}

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
      id: index,
      emoji: card.emoji,
      label: card.label,
      isFlipped: false,
      isMatched: false,
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

    const newCards = cards.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card))
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
            if (newMatches === cards.length / 2) {
              handleGameComplete()
            }
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎴</div>
          <p className="text-gray-600">Loading Memory Match...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/kids/activities" className="text-purple-600 hover:underline">
              ← Back to Activities
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">🎴</div>
              <CardTitle className="text-4xl text-purple-600">Memory Match</CardTitle>
              <p className="text-gray-600 mt-2">Find matching pairs of AI-themed cards!</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">How to Play:</h3>
                <ul className="text-blue-800 text-sm space-y-1 text-left max-w-md mx-auto">
                  <li>• Click on cards to flip them over</li>
                  <li>• Find two cards with the same emoji</li>
                  <li>• Match all pairs to win</li>
                  <li>• Try to complete in as few moves as possible!</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Difficulty</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => initializeGame("easy")}
                    className="p-6 bg-green-100 hover:bg-green-200 rounded-lg border-2 border-green-300 transition-all"
                  >
                    <div className="text-4xl mb-2">🌱</div>
                    <h4 className="text-xl font-bold text-green-700 mb-2">Easy</h4>
                    <p className="text-sm text-gray-600">6 pairs (12 cards)</p>
                  </button>

                  <button
                    onClick={() => initializeGame("medium")}
                    className="p-6 bg-blue-100 hover:bg-blue-200 rounded-lg border-2 border-blue-300 transition-all"
                  >
                    <div className="text-4xl mb-2">⭐</div>
                    <h4 className="text-xl font-bold text-blue-700 mb-2">Medium</h4>
                    <p className="text-sm text-gray-600">8 pairs (16 cards)</p>
                  </button>

                  <button
                    onClick={() => initializeGame("hard")}
                    className="p-6 bg-purple-100 hover:bg-purple-200 rounded-lg border-2 border-purple-300 transition-all"
                  >
                    <div className="text-4xl mb-2">🚀</div>
                    <h4 className="text-xl font-bold text-purple-700 mb-2">Hard</h4>
                    <p className="text-sm text-gray-600">10 pairs (20 cards)</p>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const performance = moves <= cards.length / 2 + 5 ? "Excellent" : moves <= cards.length / 2 + 10 ? "Great" : "Good"
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-purple-600">You Won!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">🏆</div>
              <div>
                <p className="text-xl mb-2">
                  <span className="font-bold text-purple-600">{performance}</span> job!
                </p>
                <div className="space-y-1 text-gray-600">
                  <p>Moves: {moves}</p>
                  <p>Time: {formatTime(timeElapsed)}</p>
                  <p className="capitalize">Difficulty: {difficulty}</p>
                </div>
              </div>

              {performance === "Excellent" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-900 font-bold">Amazing memory! You're a champion!</p>
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
                <Button onClick={resetGame} className="bg-purple-600 hover:bg-purple-700">
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

  const gridCols = difficulty === "easy" ? "grid-cols-4" : difficulty === "medium" ? "grid-cols-4" : "grid-cols-5"

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/kids/activities" className="text-purple-600 hover:underline">
            ← Back
          </Link>
          <div className="flex space-x-4 text-sm">
            <div className="bg-white rounded-lg px-4 py-2 shadow">
              <span className="font-bold text-purple-600">{moves}</span> moves
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow">
              <span className="font-bold text-purple-600">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-purple-600">Memory Match</CardTitle>
              <div className="text-sm text-gray-600 capitalize">{difficulty} Level</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(matches / (cards.length / 2)) * 100}%` }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                {matches} / {cards.length / 2} pairs found
              </p>
            </div>

            <div className={`grid ${gridCols} gap-3`}>
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched || card.isFlipped || isChecking}
                  className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? "bg-white border-purple-300"
                      : "bg-gradient-to-br from-purple-400 to-pink-400 border-purple-500 hover:from-purple-500 hover:to-pink-500 cursor-pointer"
                  } ${card.isMatched ? "opacity-50" : ""} ${isChecking && !card.isFlipped && !card.isMatched ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {(card.isFlipped || card.isMatched) && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-4xl">{card.emoji}</div>
                      <div className="text-xs text-gray-600 mt-1">{card.label}</div>
                    </div>
                  )}
                  {!card.isFlipped && !card.isMatched && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-3xl text-white">?</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
