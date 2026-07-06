"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAchievements } from "@/hooks/use-progress"
import { ToastContainer } from "@/components/toast-notification"
import { Button } from "@/components/ui/button"
import { MessageCircle, Sparkles } from "lucide-react"
import { trackAIFriend } from "@/lib/analytics"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { ByteMascot, ByteBanner } from "@/components/byte-mascot"
import Image from "next/image"
import { useSubscription } from "@/hooks/use-subscription"
import Link from "next/link" // Added Link import for back button

interface AIFriend {
  id: string
  name: string
  personality: string
  color: string
  created_at: string
}

type Tab = "map" | "achievements" | "builder" | "lab"

const ACTIVITIES = [
  { id: "ai-detective", label: "AI Detektiv", icon: "🕵️", href: "/kids/games/ai-detective", activityType: "ai_detective", accent: "#3b82f6", bg: "from-blue-500 to-blue-700" },
  { id: "ai-quiz", label: "AI Kviz", icon: "🎯", href: "/kids/games/ai-quiz", activityType: "ai_quiz", accent: "#f97316", bg: "from-orange-400 to-orange-600" },
  { id: "pattern-training", label: "Vzorci", icon: "🧠", href: "/kids/games/pattern-training", activityType: "pattern_training", accent: "#22c55e", bg: "from-green-400 to-green-600" },
  { id: "ai-friend", label: "AI Prijatelji", icon: "🤖", href: "/kids/ai-friend", activityType: null, accent: "#a855f7", bg: "from-purple-500 to-purple-700" },
]

const LAB_SCENARIOS = [
  { scenario: "Telefon se odklene, ko vidi tvoj obraz", answer: true, explanation: "Ja! Prepoznavanje obraza uporablja AI, ki se nauči, kako izgledaš, in te takoj prepozna." },
  { scenario: "Kalkulator sešteje dve številki skupaj", answer: false, explanation: "Ne! Kalkulatorji sledijo fiksnim pravilom — ne učijo se in ne prilagajajo. To ni AI." },
  { scenario: "Netflix predlaga serijo, ki bi ti bila všeč", answer: true, explanation: "Ja! Netflix uporablja AI, ki preučuje, kaj gledaš, in napove, kaj ti bo všeč." },
  { scenario: "Stikalo za luč se vklopi, ko ga obrneš", answer: false, explanation: "Ne! Stikalo samo sklene električni krog — nobenega učenja ni vključenega." },
  { scenario: "Filter za neželeno pošto prestreže junk e-pošto", answer: true, explanation: "Ja! Filtri za neželeno pošto uporabljajo AI, da se naučijo, kako izgleda junk pošta, in jo samodejno blokirajo." },
  { scenario: "Ura prikazuje trenutni čas", answer: false, explanation: "Ne! Ura samo šteje sekunde — ne uči se in ne sprejema odločitev." },
  { scenario: "Glasovni asistent odgovori na tvoja vprašanja", answer: true, explanation: "Ja! Glasovni asistenti uporabljajo AI, da razumejo govorjene besede in ustvarijo koristne odgovore." },
  { scenario: "Svinčnik piše, ko ga pritisneš na papir", answer: false, explanation: "Ne! Svinčnik samo pusti grafit na papirju — nobene inteligence ni potrebne!" },
]

const STARS = [
  {x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},
  {x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},
  {x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8},
  {x:22,y:95},{x:65,y:95},{x:44,y:95},
]

const COLORS = ["#a855f7", "#3b82f6", "#22c55e", "#f97316", "#ec4899"]

export default function AIFriendBuilder() {
  const router = useRouter()
  const toast = useToast()
  const { hasPremium, loading: subscriptionLoading } = useSubscription()

  const [friendName, setFriendName] = useState("")
  const [personality, setPersonality] = useState("Prijazno")
  const [color, setColor] = useState("#a855f7")
  const [savedFriends, setSavedFriends] = useState<AIFriend[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingFriends, setIsLoadingFriends] = useState(true)

  const [completedTypes, setCompletedTypes] = useState<Set<string>>(new Set())

  const [labIndex, setLabIndex] = useState(0)
  const [labScore, setLabScore] = useState(0)
  const [labAnswered, setLabAnswered] = useState(false)
  const [labUserAnswer, setLabUserAnswer] = useState<boolean | null>(null)
  const [labDone, setLabDone] = useState(false)

  useEffect(() => {
    loadFriendsFromLocalStorage()
    if (!subscriptionLoading && !hasPremium) {
      router.push("/pricing")
    }
  }, [subscriptionLoading, hasPremium, router])

  const loadFriendsFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("ai_friends")
      if (stored) {
        setSavedFriends(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Error loading friends from localStorage:", err)
    } finally {
      setIsLoadingFriends(false)
    }
  }

  const loadProgress = async () => {
    try {
      const response = await fetch("/api/progress")
      const data = await response.json()
      if (response.ok) {
        const types = new Set<string>((data.progress || []).map((p: any) => p.activity_type as string))
        setCompletedTypes(types)
      }
    } catch {}
  }

    setIsSaving(true)

    try {
      const newFriend: AIFriend = {
        id: crypto.randomUUID(),
        name: friendName,
        personality,
        color,
        created_at: new Date().toISOString(),
      }

      const updatedFriends = [newFriend, ...savedFriends]
      setSavedFriends(updatedFriends)
      localStorage.setItem("ai_friends", JSON.stringify(updatedFriends))

      trackAIFriend("created", friendName)

      toast.success(`${friendName} has been created!`)

      // Reset form
      setFriendName("")
      setPersonality("Friendly")
      setColor("#4F46E5")
    } catch (err) {
      console.error("Error saving friend:", err)
      toast.error("Failed to create friend. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFriend = async (id: string, name: string) => {
    if (!confirm(`Ali ste prepričani, da želite izbrisati ${name}?`)) return
    try {
      const updatedFriends = savedFriends.filter((f) => f.id !== id)
      setSavedFriends(updatedFriends)
      localStorage.setItem("ai_friends", JSON.stringify(updatedFriends))

      localStorage.removeItem(`chat_${id}`)

      toast.success("Friend deleted")
    } catch (err) {
      console.error("Error deleting friend:", err)
      toast.error("Failed to delete friend. Please try again.")
    }
  }

  const handleChatWithFriend = (friendId: string) => {
    const friend = savedFriends.find((f) => f.id === friendId)
    if (friend) {
      trackAIFriend("chat_started", friend.name)
    }
    router.push(`/kids/ai-friend/chat/${friendId}`)
  }

  if (isLoadingFriends || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🤖</div>
          <p className="text-purple-300 font-semibold">Nalaganje AI Igrišča...</p>
        </div>
      </div>
    )
  }

  if (!hasPremium) {
    return null
  }

  return (
    <div className="min-h-screen relative pb-8" style={spaceStyle}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }}
        />
      ))}

      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/kids/activities" className="text-cyan-600 hover:underline">
            ← Back to Activities
          </Link>
        </div>

        <ByteBanner
          title="AI Playground"
          subtitle="Spoznaj Byte-a in ustvari svoje AI prijatelje!"
          variant="waving"
          className="mb-6"
        />

        {/* Meet Byte - Featured Character */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-purple-200 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt={BYTE_CHARACTER.fullName}
                width={120}
                height={120}
                className="rounded-full ring-4 ring-purple-200 shadow-lg"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Spoznaj Byte-a!</h2>
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-gray-600 mb-4">
                Byte je prijazen robotek, ki te bo spremljal na poti ucenja o umetni inteligenci. Pogovarjaj se z njim, postavljaj vprasanja in skupaj odkrivajta svet AI!
              </p>
              <Button
                onClick={() => {
                  // Ensure Byte exists in saved friends
                  const stored = localStorage.getItem("ai_friends")
                  const friends: AIFriend[] = stored ? JSON.parse(stored) : []
                  let byteFriend = friends.find((f) => f.name === BYTE_CHARACTER.name)
                  if (!byteFriend) {
                    byteFriend = {
                      id: "byte-default",
                      name: BYTE_CHARACTER.name,
                      personality: "Curious, Playful, Encouraging",
                      color: BYTE_CHARACTER.colors.primary,
                      created_at: new Date().toISOString(),
                    }
                    const updatedFriends = [byteFriend, ...friends]
                    localStorage.setItem("ai_friends", JSON.stringify(updatedFriends))
                    setSavedFriends(updatedFriends)
                  }
                  handleChatWithFriend(byteFriend.id)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Klepetaj z Byte-om
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl mb-6 flex items-start gap-4">
          <ByteMascot variant="teaching" size="sm" />
          <div>
            <p className="text-sm font-semibold text-purple-700">Byte pravi:</p>
            <p className="text-sm text-purple-900 mt-1">
              Ustvari si lahko tudi svoje AI prijatelje! Izberi jim ime, osebnost in barvo.
            </p>
          </div>
        </div>

            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)" }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-sm">Skupni napredek</span>
                <span className="text-purple-300 font-bold text-sm">{completedCount} / {ACTIVITIES.length}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedCount / ACTIVITIES.length) * 100}%`,
                    background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                    boxShadow: "0 0 8px rgba(168,85,247,0.6)",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Tvoji dosežki</h2>
            <p className="text-purple-300 text-sm mb-5">Značke, ki si jih prislužil z dokončevanjem dejavnosti!</p>

            {achievementsLoading ? (
              <div className="text-center py-12 text-purple-400">Nalaganje dosežkov...</div>
            ) : achievements.length === 0 ? (
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold"
                style={{ backgroundColor: color }}
              >
                {friendName ? friendName.charAt(0).toUpperCase() : "?"}
              </div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">{friendName || "Your Friend"}</h4>
              <p className="text-sm text-gray-600 mb-3">Personality: {personality}</p>
            </div>
          </div>
        )}

        {/* LAB TAB */}
        {activeTab === "lab" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-1">Eksperimentalni laboratorij</h2>
            <p className="text-purple-300 text-sm mb-5">AI ali ne AI? Poglej vsak scenarij in odloči!</p>

            {labDone ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.35)" }}
              >
                <div className="text-7xl mb-4">🧪</div>
                <h3 className="text-2xl font-bold text-white mb-2">Eksperiment končan!</h3>
                <p className="text-purple-300 text-xl font-semibold mb-4">
                  <span className="text-3xl font-bold text-purple-400">{labScore}</span>
                  <span className="text-white/40"> / {LAB_SCENARIOS.length} pravilnih</span>
                </p>
                <p className="text-white/60 text-sm mb-6">
                  {labScore === LAB_SCENARIOS.length ? "Popoln rezultat — si pravi AI strokovnjak! 🎉" :
                   labScore >= LAB_SCENARIOS.length * 0.7 ? "Odlično! Res dobro poznaš AI! 🌟" :
                   "Dobro poskušanje! Igraj znova, da izboljšaš znanje o AI."}
                </p>
                <button
                  onClick={handleLabRestart}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    {friend.name === BYTE_CHARACTER.name ? (
                      <Image
                        src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                        alt={BYTE_CHARACTER.fullName}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full ring-2 ring-purple-200"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white font-bold"
                        style={{ backgroundColor: friend.color }}
                      >
                        {friend.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <button
                      onClick={() => handleDeleteFriend(friend.id, friend.name)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{friend.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">Personality: {friend.personality}</p>
                  <Button onClick={() => handleChatWithFriend(friend.id)} className="w-full" variant="default">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with {friend.name}
                  </Button>
                </div>

                {/* Progress */}
                <div className="h-1" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${((labIndex + 1) / LAB_SCENARIOS.length) * 100}%`,
                      background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                      boxShadow: "0 0 8px rgba(168,85,247,0.6)",
                    }}
                  />
                </div>

                <div className="p-6 space-y-5">
                  {/* Scenario card */}
                  <div
                    className="rounded-2xl p-5 text-center"
                    style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}
                  >
                    <p className="text-white text-lg font-semibold leading-snug">{LAB_SCENARIOS[labIndex].scenario}</p>
                  </div>

                  {/* Yes/No buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    {([true, false] as const).map((answer) => {
                      const isSelected = labUserAnswer === answer
                      const isCorrect = answer === LAB_SCENARIOS[labIndex].answer

                      let bg = "rgba(255,255,255,0.05)"
                      let borderColor = "rgba(255,255,255,0.15)"
                      let textColor = "rgba(255,255,255,0.8)"

                      if (labAnswered) {
                        if (isCorrect) { bg = "rgba(34,197,94,0.2)"; borderColor = "rgba(34,197,94,0.6)"; textColor = "#86efac" }
                        else if (isSelected) { bg = "rgba(239,68,68,0.2)"; borderColor = "rgba(239,68,68,0.6)"; textColor = "#fca5a5" }
                        else { bg = "rgba(255,255,255,0.03)"; borderColor = "rgba(255,255,255,0.08)"; textColor = "rgba(255,255,255,0.3)" }
                      }

                      return (
                        <button
                          key={String(answer)}
                          onClick={() => handleLabAnswer(answer)}
                          disabled={labAnswered}
                          className="py-5 rounded-2xl font-bold text-xl transition-all disabled:cursor-not-allowed active:scale-95 hover:brightness-125"
                          style={{ background: bg, border: `2px solid ${borderColor}`, color: textColor }}
                        >
                          {answer ? "🤖 AI!" : "❌ Ni AI"}
                        </button>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  {labAnswered && (
                    <div
                      className="rounded-2xl p-4 animate-slide-up"
                      style={{
                        background: labUserAnswer === LAB_SCENARIOS[labIndex].answer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                        border: `1px solid ${labUserAnswer === LAB_SCENARIOS[labIndex].answer ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                      }}
                    >
                      <p
                        className="text-xs font-bold mb-1 tracking-wider"
                        style={{ color: labUserAnswer === LAB_SCENARIOS[labIndex].answer ? "#4ade80" : "#f87171" }}
                      >
                        {labUserAnswer === LAB_SCENARIOS[labIndex].answer ? "✓ PRAVILNO!" : "✗ NAPAČNO!"}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">{LAB_SCENARIOS[labIndex].explanation}</p>
                    </div>
                  )}

                  {labAnswered && (
                    <button
                      onClick={handleLabNext}
                      className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                    >
                      {labIndex + 1 >= LAB_SCENARIOS.length ? "Prikaži rezultate →" : "Naslednji scenarij →"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
