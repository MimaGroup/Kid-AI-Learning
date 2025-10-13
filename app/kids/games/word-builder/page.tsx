"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"

type GameMode = "spelling" | "unscramble" | "definition"

interface WordChallenge {
  word: string
  definition: string
  scrambled?: string
  options?: string[]
  hint: string
}

const WORD_LISTS = {
  easy: [
    { word: "robot", definition: "A machine that can do tasks automatically", hint: "Starts with R" },
    { word: "computer", definition: "An electronic device for processing data", hint: "You're using one now" },
    { word: "game", definition: "An activity you play for fun", hint: "4 letters" },
    { word: "learn", definition: "To gain knowledge or skill", hint: "What you do at school" },
    { word: "smart", definition: "Having intelligence", hint: "Opposite of dumb" },
    { word: "think", definition: "To use your mind", hint: "What your brain does" },
    { word: "code", definition: "Instructions for computers", hint: "Programmers write this" },
    { word: "data", definition: "Information stored in computers", hint: "4 letters, starts with D" },
    { word: "brain", definition: "The organ that helps you think", hint: "Inside your head" },
    { word: "friend", definition: "Someone you like and trust", hint: "A pal or buddy" },
  ],
  medium: [
    { word: "algorithm", definition: "A set of steps to solve a problem", hint: "Used in programming" },
    { word: "artificial", definition: "Made by humans, not natural", hint: "AI stands for this + Intelligence" },
    { word: "technology", definition: "Tools and machines that help us", hint: "Computers and phones are this" },
    { word: "intelligence", definition: "The ability to learn and understand", hint: "What makes you smart" },
    { word: "pattern", definition: "A repeated design or sequence", hint: "AI looks for these" },
    { word: "machine", definition: "A device that does work", hint: "Robots are a type of this" },
    { word: "digital", definition: "Using computer technology", hint: "Opposite of analog" },
    { word: "network", definition: "Connected computers sharing information", hint: "The internet is one" },
    { word: "program", definition: "Instructions that tell a computer what to do", hint: "Software" },
    { word: "creative", definition: "Using imagination to make new things", hint: "Artists are this" },
  ],
  hard: [
    { word: "neural", definition: "Related to nerves or the brain", hint: "AI networks are named after this" },
    { word: "recognition", definition: "Identifying something you've seen before", hint: "Face ___" },
    { word: "automation", definition: "Making things work automatically", hint: "Robots do this to tasks" },
    { word: "prediction", definition: "Guessing what will happen in the future", hint: "Weather forecast is a ___" },
    { word: "processing", definition: "Handling and organizing information", hint: "What computers do with data" },
    { word: "interface", definition: "The way you interact with a computer", hint: "User ___" },
    { word: "virtual", definition: "Existing in computers, not physical", hint: "___ reality" },
    { word: "simulation", definition: "Imitating a real situation", hint: "Flight ___ for pilots" },
    {
      word: "optimization",
      definition: "Making something work as well as possible",
      hint: "Finding the best solution",
    },
    { word: "classification", definition: "Sorting things into categories", hint: "Organizing by type" },
  ],
}

export default function WordBuilderPage() {
  const { user, loading } = useAuth()
  const { submitProgress } = useProgress()

  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [challenges, setChallenges] = useState<WordChallenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())
  const [gameStarted, setGameStarted] = useState(false)

  const scrambleWord = (word: string): string => {
    const arr = word.split("")
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    const scrambled = arr.join("")
    return scrambled === word ? scrambleWord(word) : scrambled
  }

  const generateWrongOptions = (correctWord: string, allWords: string[]): string[] => {
    const wrong = allWords
      .filter((w) => w !== correctWord)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    return [correctWord, ...wrong].sort(() => Math.random() - 0.5)
  }

  const startGame = (mode: GameMode, diff: "easy" | "medium" | "hard") => {
    setGameMode(mode)
    setDifficulty(diff)

    const wordList = WORD_LISTS[diff]
    const selectedWords = [...wordList].sort(() => Math.random() - 0.5).slice(0, 8)

    const generatedChallenges: WordChallenge[] = selectedWords.map((item) => {
      const challenge: WordChallenge = {
        word: item.word,
        definition: item.definition,
        hint: item.hint,
      }

      if (mode === "unscramble") {
        challenge.scrambled = scrambleWord(item.word)
      } else if (mode === "definition") {
        challenge.options = generateWrongOptions(
          item.word,
          wordList.map((w) => w.word),
        )
      }

      return challenge
    })

    setChallenges(generatedChallenges)
    setGameStarted(true)
    setCurrentChallenge(0)
    setScore(0)
    setGameComplete(false)
    setNewAchievements([])
    setUserInput("")
    setSelectedOption(null)
    setShowResult(false)
  }

  const handleSubmitAnswer = () => {
    const challenge = challenges[currentChallenge]
    let isCorrect = false

    if (gameMode === "spelling" || gameMode === "unscramble") {
      isCorrect = userInput.toLowerCase().trim() === challenge.word.toLowerCase()
    } else if (gameMode === "definition") {
      isCorrect = selectedOption?.toLowerCase() === challenge.word.toLowerCase()
    }

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNextChallenge = async () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
      setUserInput("")
      setSelectedOption(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        const achievements = await submitProgress("word_builder", score, challenges.length, timeSpent)
        setNewAchievements(achievements)
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameMode(null)
    setCurrentChallenge(0)
    setUserInput("")
    setSelectedOption(null)
    setShowResult(false)
    setScore(0)
    setGameComplete(false)
    setNewAchievements([])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading Word Builder...</p>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/kids/activities" className="text-orange-600 hover:underline">
              ← Back to Activities
            </Link>
          </div>

          <Card className="text-center">
            <CardHeader>
              <div className="text-6xl mb-4">📚</div>
              <CardTitle className="text-4xl text-orange-600">Word Builder</CardTitle>
              <p className="text-gray-600 mt-2">Choose your game mode and difficulty!</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select Game Mode</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setGameMode("spelling")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "spelling"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-300 bg-white"
                    }`}
                  >
                    <div className="text-4xl mb-2">✍️</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Spelling</h4>
                    <p className="text-sm text-gray-600">Type the word correctly</p>
                  </button>

                  <button
                    onClick={() => setGameMode("unscramble")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "unscramble"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-300 bg-white"
                    }`}
                  >
                    <div className="text-4xl mb-2">🔀</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Unscramble</h4>
                    <p className="text-sm text-gray-600">Rearrange the letters</p>
                  </button>

                  <button
                    onClick={() => setGameMode("definition")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "definition"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-300 bg-white"
                    }`}
                  >
                    <div className="text-4xl mb-2">📖</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Definition</h4>
                    <p className="text-sm text-gray-600">Match word to meaning</p>
                  </button>
                </div>
              </div>

              {gameMode && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Select Difficulty</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => startGame(gameMode, "easy")}
                      variant="outline"
                      className="p-6 h-auto flex flex-col items-center"
                    >
                      <div className="text-3xl mb-2">🌱</div>
                      <div className="font-bold">Easy</div>
                      <div className="text-sm text-gray-600">Simple words</div>
                    </Button>

                    <Button
                      onClick={() => startGame(gameMode, "medium")}
                      variant="outline"
                      className="p-6 h-auto flex flex-col items-center"
                    >
                      <div className="text-3xl mb-2">⭐</div>
                      <div className="font-bold">Medium</div>
                      <div className="text-sm text-gray-600">Tech words</div>
                    </Button>

                    <Button
                      onClick={() => startGame(gameMode, "hard")}
                      variant="outline"
                      className="p-6 h-auto flex flex-col items-center"
                    >
                      <div className="text-3xl mb-2">🚀</div>
                      <div className="font-bold">Hard</div>
                      <div className="text-sm text-gray-600">Advanced terms</div>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((score / challenges.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
        <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-orange-600">Game Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl">
                {percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "👍" : "📚"}
              </div>
              <div>
                <p className="text-xl mb-2">
                  You scored <span className="font-bold text-orange-600">{score}</span> out of{" "}
                  <span className="font-bold">{challenges.length}</span>!
                </p>
                <p className="text-lg text-gray-600">{percentage}% correct</p>
              </div>

              {percentage >= 90 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-900 font-bold">Excellent! You're a word master!</p>
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
                <Button onClick={resetGame} className="bg-orange-600 hover:bg-orange-700">
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

  const challenge = challenges[currentChallenge]
  const isCorrect =
    gameMode === "definition"
      ? selectedOption?.toLowerCase() === challenge.word.toLowerCase()
      : userInput.toLowerCase().trim() === challenge.word.toLowerCase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/activities" className="text-orange-600 hover:underline">
            ← Back
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-orange-600">Word Builder</CardTitle>
              <div className="text-sm text-gray-500">
                Word {currentChallenge + 1} of {challenges.length}
              </div>
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {gameMode} - {difficulty} Level
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                <strong>Definition:</strong> {challenge.definition}
              </p>
              {!showResult && (
                <p className="text-blue-700 text-sm mt-2">
                  <strong>Hint:</strong> {challenge.hint}
                </p>
              )}
            </div>

            {gameMode === "unscramble" && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-2">Unscramble these letters:</p>
                <p className="text-4xl font-bold text-orange-600 tracking-wider">{challenge.scrambled}</p>
              </div>
            )}

            {(gameMode === "spelling" || gameMode === "unscramble") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type your answer:</label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={showResult}
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Enter the word..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !showResult && userInput.trim()) {
                      handleSubmitAnswer()
                    }
                  }}
                />
              </div>
            )}

            {gameMode === "definition" && challenge.options && (
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">Choose the correct word:</p>
                {challenge.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedOption === option
                        ? showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-orange-500 bg-orange-50"
                        : showResult && option.toLowerCase() === challenge.word.toLowerCase()
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-orange-300 bg-white"
                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {showResult && (
              <div
                className={`rounded-lg p-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <p className={`font-bold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "🎉 Correct! Well done!" : `❌ Not quite. The answer is: ${challenge.word}`}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Word:</strong> {challenge.word}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Meaning:</strong> {challenge.definition}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              {!showResult ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={gameMode === "definition" ? selectedOption === null : userInput.trim() === ""}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextChallenge} className="bg-orange-600 hover:bg-orange-700">
                  {currentChallenge < challenges.length - 1 ? "Next Word" : "Finish Game"}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-600">
              Score: {score} / {currentChallenge + (showResult ? 1 : 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
