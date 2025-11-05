"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import { AchievementPopup } from "@/components/achievement-popup"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"

interface Case {
  title: string
  description: string
  clues: string[]
  solution: string
}

const FALLBACK_MYSTERIES: Case[] = [
  {
    title: "The Missing Robot",
    description: "A classroom robot has gone missing! Can you find out what happened?",
    clues: [
      "The robot was last seen near the art room",
      "There are paint footprints leading to the storage closet",
      "The art teacher mentioned needing help with a project",
    ],
    solution: "The art teacher borrowed the robot to help demonstrate movement for an art project!",
  },
  {
    title: "The Case of the Missing Lunch",
    description:
      "Someone's lunch has disappeared from the cafeteria! The sandwich was there at noon, but by 12:30 it was gone.",
    clues: [
      "There are crumbs leading from the lunch table to the playground door",
      "A student saw a squirrel near the open window around 12:15",
      "The lunch bag was found outside, empty but not torn",
    ],
    solution:
      "A clever squirrel came through the open window and took the sandwich! The crumbs show its path, and it carefully removed the sandwich without damaging the bag.",
  },
  {
    title: "The Mystery of the Switched Backpacks",
    description:
      "Two students accidentally took each other's identical backpacks home. How can we figure out whose is whose?",
    clues: [
      "One backpack has a math book with 'Room 204' written inside",
      "The other backpack contains a permission slip signed by 'Mrs. Johnson'",
      "The school directory shows Mrs. Johnson teaches in Room 204",
    ],
    solution:
      "Both backpacks belong to students in Room 204! By checking the class roster and matching the names, we can return each backpack to its owner.",
  },
]

export default function AIDetectivePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { submitProgress } = useProgress()
  const toast = useToast()

  const isGeneratingRef = useRef(false)

  const [caseData, setCaseData] = useState<Case | null>(null)
  const [loadingCase, setLoadingCase] = useState(true)
  const [revealedClues, setRevealedClues] = useState<number[]>([])
  const [showSolution, setShowSolution] = useState(false)
  const [theory, setTheory] = useState("")
  const [newAchievements, setNewAchievements] = useState<any[]>([])
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const generateMystery = async () => {
      if (isGeneratingRef.current) return

      try {
        isGeneratingRef.current = true
        setLoadingCase(true)

        // Set a timeout to show fallback if API takes too long
        const timeoutId = setTimeout(() => {
          if (!caseData) {
            const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
            setCaseData(randomMystery)
            setLoadingCase(false)
          }
        }, 3000) // Show fallback after 3 seconds

        const response = await fetch("/api/generate/mystery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theme: "school",
            difficulty: "easy",
          }),
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          if (data.mystery) {
            setCaseData(data.mystery)
          } else {
            throw new Error("No mystery in response")
          }
        } else {
          throw new Error("API request failed")
        }
      } catch (error) {
        console.error("[v0] Error generating mystery:", error)
        // Use fallback mystery on any error
        const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
        setCaseData(randomMystery)
      } finally {
        setLoadingCase(false)
        isGeneratingRef.current = false
      }
    }

    if (user && !caseData) {
      generateMystery()
    }
  }, [user, caseData])

  const revealClue = (index: number) => {
    if (!revealedClues.includes(index)) {
      setRevealedClues([...revealedClues, index])
      toast.info("Clue revealed!")
    }
  }

  const submitTheory = async () => {
    if (theory.trim()) {
      setShowSolution(true)
      if (user) {
        try {
          const timeSpent = Math.floor((Date.now() - startTime) / 1000)
          const achievements = await submitProgress("ai_detective", 1, 1, timeSpent, {
            cluesUsed: revealedClues.length,
            theoryLength: theory.length,
          })
          setNewAchievements(achievements)
          if (achievements.length > 0) {
            toast.success("New achievement unlocked!")
          }
        } catch (error) {
          toast.error("Failed to save progress")
        }
      }
    }
  }

  const newCase = async () => {
    if (isGeneratingRef.current) return

    setRevealedClues([])
    setShowSolution(false)
    setTheory("")
    setNewAchievements([])
    setCaseData(null) // Clear current case

    try {
      isGeneratingRef.current = true
      setLoadingCase(true)

      const response = await fetch("/api/generate/mystery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: "school",
          difficulty: "easy",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.mystery) {
          setCaseData(data.mystery)
          toast.success("New case loaded!")
        } else {
          throw new Error("No mystery in response")
        }
      } else {
        throw new Error("API request failed")
      }
    } catch (error) {
      console.error("[v0] Error generating mystery:", error)
      const randomMystery = FALLBACK_MYSTERIES[Math.floor(Math.random() * FALLBACK_MYSTERIES.length)]
      setCaseData(randomMystery)
      toast.info("Using a pre-made mystery!")
    } finally {
      setLoadingCase(false)
      isGeneratingRef.current = false
    }
  }

  const resetCase = () => {
    setRevealedClues([])
    setShowSolution(false)
    setTheory("")
    setNewAchievements([])
  }

  if (loading || loadingCase || !caseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">Generating detective case...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <AchievementPopup achievements={newAchievements} onClose={() => setNewAchievements([])} />

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/activities" className="text-indigo-600 hover:underline">
            ← Back to Activities
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-indigo-600">🔍 AI Detective</CardTitle>
              <Button onClick={newCase} variant="outline" size="sm">
                New Case
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">{caseData.title}</h3>
              <p className="text-indigo-800">{caseData.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">Clues:</h4>
              <div className="space-y-3">
                {caseData.clues.map((clue, index) => (
                  <div key={index}>
                    {revealedClues.includes(index) ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-900">
                          <strong>Clue {index + 1}:</strong> {clue}
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={() => revealClue(index)}
                        variant="outline"
                        className="w-full border-indigo-300 hover:bg-indigo-50"
                      >
                        Reveal Clue {index + 1}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {revealedClues.length > 0 && !showSolution && (
              <div>
                <h4 className="font-semibold text-lg mb-3">Your Theory:</h4>
                <textarea
                  value={theory}
                  onChange={(e) => setTheory(e.target.value)}
                  placeholder="What do you think happened? Write your theory here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px]"
                />
                <Button
                  onClick={submitTheory}
                  disabled={!theory.trim()}
                  className="mt-3 bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit Theory
                </Button>
              </div>
            )}

            {showSolution && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Solution:</h4>
                <p className="text-green-800">{caseData.solution}</p>
                <div className="mt-4 space-x-3">
                  <Button onClick={newCase} className="bg-green-600 hover:bg-green-700">
                    New Mystery
                  </Button>
                  <Button onClick={resetCase} variant="outline">
                    Try Again
                  </Button>
                  <Link href="/kids/activities">
                    <Button variant="outline">Back to Activities</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
