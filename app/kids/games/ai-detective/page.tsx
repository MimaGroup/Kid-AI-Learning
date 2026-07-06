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

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

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
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }
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
          body: JSON.stringify({ theme: "school", difficulty: "easy" }),
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
      toast.info("Namig razkrit!")
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
          if (achievements.length > 0) toast.success("Nov dosežek odklenjen!")
        } catch {
          toast.error("Shranjevanje napredka ni uspelo")
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
        body: JSON.stringify({ theme: "school", difficulty: "easy" }),
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

  const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

  if (loading || loadingCase || !caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <p className="text-blue-300 font-semibold">Ustvarjanje detektivskega primera...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative p-4 pb-8" style={spaceStyle}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.12 + (i % 4) * 0.08 }}
        />
      ))}

      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
      <AchievementPopup badges={newAchievements.map((a: any) => a.achievement_type ?? a.id)} onClose={() => setNewAchievements([])} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/kids/home"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1"
          >
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
            border: "1px solid rgba(59,130,246,0.3)",
            boxShadow: "0 0 40px rgba(59,130,246,0.12)",
          }}
        >
          {/* Panel header */}
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{ background: "rgba(59,130,246,0.18)", borderBottom: "1px solid rgba(59,130,246,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔍</span>
              <div>
                <h1 className="text-xl font-bold text-white">AI Detektiv</h1>
                <p className="text-blue-400 text-xs font-medium">
                  {revealedClues.length}/{caseData.clues.length} namigov odkritih
                </p>
              </div>
            </div>
            <button
              onClick={newCase}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-blue-300 transition-all hover:bg-blue-500/20"
              style={{ border: "1px solid rgba(59,130,246,0.35)" }}
            >
              Nov primer
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Case description */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}
            >
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span>📁</span> {caseData.title}
              </h3>
              <p className="text-blue-200 leading-relaxed text-sm">{caseData.description}</p>
            </div>

            {/* Clues */}
            <div>
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <span>🕵️</span> Namigi
              </h4>
              <div className="space-y-3">
                {caseData.clues.map((clue, index) => (
                  <div key={index}>
                    {revealedClues.includes(index) ? (
                      <div
                        className="rounded-2xl p-4 flex items-start gap-3 animate-slide-up"
                        style={{ background: "rgba(251,191,36,0.13)", border: "1px solid rgba(251,191,36,0.35)" }}
                      >
                        <span className="text-yellow-400 text-xl mt-0.5 flex-shrink-0">💡</span>
                        <div>
                          <p className="text-yellow-400 text-xs font-bold mb-1 tracking-wider">
                            NAMIG {index + 1}
                          </p>
                          <p className="text-yellow-100 text-sm leading-relaxed">{clue}</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => revealClue(index)}
                        className="w-full rounded-2xl p-4 flex items-center gap-3 text-left transition-all group hover:bg-blue-500/15"
                        style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}
                      >
                        <span className="text-2xl flex-shrink-0">🔒</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-blue-300 font-semibold">Namig {index + 1}</p>
                          <p className="text-blue-500 text-xs">Tapni, da razkriješ namig</p>
                        </div>
                        <span className="text-blue-500 text-lg group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Theory input */}
            {revealedClues.length > 0 && !showSolution && (
              <div className="animate-slide-up">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span>🔬</span> Tvoja teorija
                </h4>
                <textarea
                  value={theory}
                  onChange={(e) => setTheory(e.target.value)}
                  placeholder="Kaj meniš, da se je zgodilo? Zapiši svojo teorijo tukaj..."
                  rows={3}
                  className="w-full rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none resize-none text-sm"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(59,130,246,0.3)" }}
                />
                <button
                  onClick={submitTheory}
                  disabled={!theory.trim()}
                  className="mt-3 w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
                >
                  Oddaj teorijo →
                </button>
              </div>
            )}

            {/* Solution */}
            {showSolution && (
              <div
                className="rounded-2xl p-5 animate-slide-up"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)" }}
              >
                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                  <span>✅</span> Rešitev
                </h4>
                <p className="text-green-200 leading-relaxed text-sm">{caseData.solution}</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={newCase}
                    className="flex-1 py-3 rounded-2xl font-bold text-white text-sm transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
                  >
                    Nov primer 🔍
                  </button>
                  <button
                    onClick={resetCase}
                    className="flex-1 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                  >
                    Poskusi znova
                  </button>
                  <Link href="/kids/activities" className="flex-1">
                    <button
                      className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                    >
                      ← Dejavnosti
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
