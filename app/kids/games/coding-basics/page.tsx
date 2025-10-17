"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Play, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"

interface CodeChallenge {
  id: string
  title: string
  description: string
  instructions: string
  codeBlocks: { id: string; code: string }[]
  correctOrder: string[]
  explanation: string
}

export default function CodingBasicsPage() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([])
  const [availableBlocks, setAvailableBlocks] = useState<{ id: string; code: string }[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const challenges: CodeChallenge[] = [
    {
      id: "robot-walk",
      title: "Make the Robot Walk",
      description: "Arrange the code blocks to make the robot walk forward!",
      instructions: "Drag the blocks in the correct order to create a program",
      codeBlocks: [
        { id: "1", code: "START" },
        { id: "2", code: "Move Forward" },
        { id: "3", code: "Move Forward" },
        { id: "4", code: "STOP" },
      ],
      correctOrder: ["1", "2", "3", "4"],
      explanation: "Programs run from top to bottom. We start, move twice, then stop!",
    },
    {
      id: "if-statement",
      title: "Make a Decision",
      description: "Help the robot decide what to do!",
      instructions: "Create a program that checks if it's raining",
      codeBlocks: [
        { id: "1", code: "IF it's raining" },
        { id: "2", code: "Take umbrella" },
        { id: "3", code: "ELSE" },
        { id: "4", code: "Wear sunglasses" },
      ],
      correctOrder: ["1", "2", "3", "4"],
      explanation: "IF statements help computers make decisions based on conditions!",
    },
    {
      id: "loop",
      title: "Repeat Actions",
      description: "Use a loop to repeat actions!",
      instructions: "Make the robot jump 3 times",
      codeBlocks: [
        { id: "1", code: "REPEAT 3 times" },
        { id: "2", code: "Jump" },
        { id: "3", code: "END REPEAT" },
      ],
      correctOrder: ["1", "2", "3"],
      explanation: "Loops help us repeat actions without writing the same code multiple times!",
    },
  ]

  const challenge = challenges[currentChallenge]

  useState(() => {
    setAvailableBlocks([...challenge.codeBlocks].sort(() => Math.random() - 0.5))
  })

  const handleSelectBlock = (block: { id: string; code: string }) => {
    setSelectedBlocks([...selectedBlocks, block.id])
    setAvailableBlocks(availableBlocks.filter((b) => b.id !== block.id))
  }

  const handleRemoveBlock = (blockId: string) => {
    const block = challenge.codeBlocks.find((b) => b.id === blockId)
    if (block) {
      setSelectedBlocks(selectedBlocks.filter((id) => id !== blockId))
      setAvailableBlocks([...availableBlocks, block])
    }
  }

  const handleCheckAnswer = () => {
    const correct = JSON.stringify(selectedBlocks) === JSON.stringify(challenge.correctOrder)
    setIsCorrect(correct)
    setShowResult(true)
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      const nextChallenge = challenges[currentChallenge + 1]
      setCurrentChallenge(currentChallenge + 1)
      setSelectedBlocks([])
      setAvailableBlocks([...nextChallenge.codeBlocks].sort(() => Math.random() - 0.5))
      setShowResult(false)
      setIsCorrect(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentChallenge(0)
    setSelectedBlocks([])
    setAvailableBlocks([...challenges[0].codeBlocks].sort(() => Math.random() - 0.5))
    setShowResult(false)
    setIsCorrect(false)
    setScore(0)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardHeader>
              <div className="text-6xl mb-4">🎉</div>
              <CardTitle className="text-3xl text-purple-600">Coding Challenge Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-purple-600">
                {score}/{challenges.length}
              </div>
              <p className="text-xl text-gray-700">
                {score === challenges.length
                  ? "Perfect! You're a coding superstar!"
                  : "Great job learning to code! Keep practicing!"}
              </p>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-purple-900">You Learned:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>✓ How to sequence commands</li>
                  <li>✓ How IF statements work</li>
                  <li>✓ How loops repeat actions</li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} className="bg-purple-600 hover:bg-purple-700">
                  Try Again
                </Button>
                <Link href="/kids/home">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8 text-purple-600" />
                <CardTitle className="text-2xl text-purple-600">Coding Basics</CardTitle>
              </div>
              <Badge variant="secondary">
                Challenge {currentChallenge + 1}/{challenges.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h2>
              <p className="text-gray-700 text-lg mb-3">{challenge.description}</p>
              <p className="text-sm text-gray-600">{challenge.instructions}</p>
            </div>

            {!showResult ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Play className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold">Your Program:</h3>
                  </div>
                  <div className="space-y-2 min-h-[200px] bg-gray-50 p-4 rounded-lg">
                    {selectedBlocks.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">Drag code blocks here...</p>
                    ) : (
                      selectedBlocks.map((blockId, index) => {
                        const block = challenge.codeBlocks.find((b) => b.id === blockId)
                        return (
                          <div
                            key={blockId}
                            onClick={() => handleRemoveBlock(blockId)}
                            className="bg-purple-600 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                          >
                            <span className="font-mono">{block?.code}</span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="font-bold mb-4">Available Blocks:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {availableBlocks.map((block) => (
                      <button
                        key={block.id}
                        onClick={() => handleSelectBlock(block)}
                        className="bg-gray-100 hover:bg-purple-100 p-3 rounded-lg transition-colors text-left border-2 border-gray-300 hover:border-purple-400"
                      >
                        <span className="font-mono text-sm">{block.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setSelectedBlocks([])
                      setAvailableBlocks([...challenge.codeBlocks].sort(() => Math.random() - 0.5))
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedBlocks.length !== challenge.correctOrder.length}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Run Program
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-lg ${
                    isCorrect ? "bg-green-100 border-2 border-green-500" : "bg-yellow-100 border-2 border-yellow-500"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    ) : (
                      <XCircle className="w-8 h-8 text-yellow-600" />
                    )}
                    <h3 className="font-bold text-xl">{isCorrect ? "Perfect!" : "Try Again!"}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {isCorrect ? "Your program works correctly!" : "The blocks aren't in the right order yet."}
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">💡 Explanation:</h4>
                  <p className="text-gray-700">{challenge.explanation}</p>
                </div>

                <Button onClick={handleNextChallenge} className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                  {currentChallenge < challenges.length - 1 ? "Next Challenge" : "See Results"}
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-gray-600">
              Score: {score}/{currentChallenge + (showResult && isCorrect ? 1 : 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
