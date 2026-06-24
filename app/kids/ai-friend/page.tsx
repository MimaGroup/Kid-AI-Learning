"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAchievements } from "@/hooks/use-progress"
import { ToastContainer } from "@/components/toast-notification"
import Link from "next/link"

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
  const { user, loading } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const { achievements, isLoading: achievementsLoading } = useAchievements()

  const [activeTab, setActiveTab] = useState<Tab>("builder")

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
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading, router])

  useEffect(() => {
    if (user) { loadFriends(); loadProgress() }
  }, [user])

  const loadFriends = async () => {
    try {
      setIsLoadingFriends(true)
      const response = await fetch("/api/ai-friends")
      const data = await response.json()
      if (response.ok) setSavedFriends(data.friends || [])
      else toast.error(data.error || "Nalaganje prijateljev ni uspelo")
    } catch {
      toast.error("Nalaganje prijateljev ni uspelo. Preverite povezavo.")
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

  const handleSaveFriend = async () => {
    if (!friendName.trim()) { toast.warning("Vnesite ime za vašega AI prijatelja"); return }
    try {
      setIsSaving(true)
      const response = await fetch("/api/ai-friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: friendName, personality, color }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success(`${friendName} je bil ustvarjen!`)
        setSavedFriends([data.friend, ...savedFriends])
        setFriendName("")
        setPersonality("Prijazno")
        setColor("#a855f7")
      } else {
        toast.error(data.error || "Shranjevanje prijatelja ni uspelo")
      }
    } catch {
      toast.error("Shranjevanje prijatelja ni uspelo. Poskusite znova.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFriend = async (id: string, name: string) => {
    if (!confirm(`Ali ste prepričani, da želite izbrisati ${name}?`)) return
    try {
      const response = await fetch(`/api/ai-friends/${id}`, { method: "DELETE" })
      if (response.ok) {
        setSavedFriends(savedFriends.filter((f) => f.id !== id))
        toast.success("Prijatelj uspešno izbrisan")
      } else {
        const data = await response.json()
        toast.error(data.error || "Brisanje prijatelja ni uspelo")
      }
    } catch {
      toast.error("Brisanje prijatelja ni uspelo. Poskusite znova.")
    }
  }

  const handleLabAnswer = (answer: boolean) => {
    if (labAnswered) return
    setLabUserAnswer(answer)
    setLabAnswered(true)
    if (answer === LAB_SCENARIOS[labIndex].answer) setLabScore((s) => s + 1)
  }

  const handleLabNext = () => {
    if (labIndex + 1 >= LAB_SCENARIOS.length) { setLabDone(true); return }
    setLabIndex((i) => i + 1)
    setLabAnswered(false)
    setLabUserAnswer(null)
  }

  const handleLabRestart = () => {
    setLabIndex(0); setLabScore(0); setLabAnswered(false); setLabUserAnswer(null); setLabDone(false)
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "map",          label: "Pustolovska karta",        icon: "🗺️" },
    { id: "achievements", label: "Dosežki",                  icon: "🏆" },
    { id: "builder",      label: "AI Prijatelji",            icon: "🤖" },
    { id: "lab",          label: "Laboratorij",              icon: "🧪" },
  ]

  const spaceStyle = { background: "radial-gradient(ellipse at 50% 20%, #1a0040 0%, #0a0a1a 75%)" }

  if (loading || isLoadingFriends) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🤖</div>
          <p className="text-purple-300 font-semibold">Nalaganje AI Igrišča...</p>
        </div>
      </div>
    )
  }

  const completedCount = ACTIVITIES.filter(a =>
    a.activityType ? completedTypes.has(a.activityType) : savedFriends.length > 0
  ).length

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

      {/* Header */}
      <div
        className="relative z-10 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(168,85,247,0.18)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎮</span>
          <h1 className="text-xl font-bold text-white">AI Igrišče</h1>
        </div>
        <Link href="/kids/home" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
          ← Zemljevid
        </Link>
      </div>

      <div className="max-w-5xl mx-auto p-4 relative z-10">
        {/* Tab bar */}
        <div
          className="flex gap-1 p-1 rounded-2xl mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "transparent",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.5)",
                boxShadow: activeTab === tab.id ? "0 0 16px rgba(168,85,247,0.4)" : "none",
              }}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ADVENTURE MAP TAB */}
        {activeTab === "map" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Tvoja pustolovska karta</h2>
            <p className="text-purple-300 text-sm mb-5">Dokonča vse dejavnosti in postani AI mojster!</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {ACTIVITIES.map((activity) => {
                const done = activity.activityType ? completedTypes.has(activity.activityType) : savedFriends.length > 0
                return (
                  <Link key={activity.id} href={activity.href} className="group block">
                    <div
                      className={`rounded-2xl p-5 text-white transition-all group-hover:scale-105 relative overflow-hidden`}
                      style={{
                        background: `linear-gradient(135deg, ${activity.accent}33, ${activity.accent}11)`,
                        border: `1px solid ${activity.accent}44`,
                        boxShadow: done ? `0 0 20px ${activity.accent}33` : "none",
                      }}
                    >
                      {done && (
                        <div
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ background: activity.accent }}
                        >
                          ✓
                        </div>
                      )}
                      <div className="text-4xl mb-3">{activity.icon}</div>
                      <p className="font-bold text-sm">{activity.label}</p>
                      <p className="text-white/60 text-xs mt-1">{done ? "Dokončano!" : "Tapni →"}</p>
                    </div>
                  </Link>
                )
              })}
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
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
              >
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Še nobenih značk!</h3>
                <p className="text-purple-300 text-sm mb-6">Dokonči dejavnosti in dosezi popolne rezultate, da prislužiš svojo prvo značko.</p>
                <Link href="/kids/home">
                  <button
                    className="px-6 py-3 rounded-xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                  >
                    Na zemljevid
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="rounded-2xl p-5 flex items-start gap-4"
                    style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}
                  >
                    <div className="text-3xl">🏆</div>
                    <div>
                      <p className="font-bold text-white">{achievement.title}</p>
                      <p className="text-yellow-200 text-xs mt-1">{achievement.description}</p>
                      <p className="text-yellow-500/60 text-xs mt-1">{new Date(achievement.earned_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BUILDER TAB */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Build form */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(8,8,30,0.8)", border: "1px solid rgba(168,85,247,0.3)" }}
            >
              <h2 className="text-xl font-bold text-white mb-1">Ustvari AI prijatelja</h2>
              <p className="text-purple-300 text-sm mb-5">Prilagodi ime, osebnost in barvo.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-purple-300 text-xs font-bold mb-2 tracking-wider">IME</label>
                  <input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
                    placeholder="Poimenuj svojega AI prijatelja..."
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.3)" }}
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-xs font-bold mb-2 tracking-wider">OSEBNOST</label>
                  <select
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-white focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.3)" }}
                  >
                    <option value="Prijazno" className="bg-gray-900">Prijazno</option>
                    <option value="Radovedno" className="bg-gray-900">Radovedno</option>
                    <option value="Koristno" className="bg-gray-900">Koristno</option>
                    <option value="Igrivo" className="bg-gray-900">Igrivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-300 text-xs font-bold mb-3 tracking-wider">BARVA</label>
                  <div className="flex gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="w-11 h-11 rounded-xl transition-all"
                        style={{
                          backgroundColor: c,
                          border: color === c ? "3px solid white" : "3px solid transparent",
                          transform: color === c ? "scale(1.15)" : "scale(1)",
                          boxShadow: color === c ? `0 0 12px ${c}` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveFriend}
                  disabled={isSaving || !friendName.trim()}
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
                >
                  {isSaving ? "Ustvarjanje..." : "Ustvari AI prijatelja →"}
                </button>
              </div>
            </div>

            {/* Preview + saved list */}
            <div className="space-y-4">
              {/* Preview */}
              <div
                className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(8,8,30,0.8)", border: "1px solid rgba(168,85,247,0.3)" }}
              >
                <p className="text-purple-400 text-xs font-bold mb-4 tracking-wider">PREDOGLED</p>
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-lg transition-all"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 24px ${color}88`,
                  }}
                >
                  🤖
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{friendName || "Tvoj prijatelj"}</h4>
                <p className="text-purple-400 text-sm">Osebnost: {personality}</p>
              </div>

              {/* Saved friends */}
              {savedFriends.length > 0 && (
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(8,8,30,0.8)", border: "1px solid rgba(168,85,247,0.2)" }}
                >
                  <p className="text-purple-400 text-xs font-bold mb-3 tracking-wider">TVOJI PRIJATELJI ({savedFriends.length})</p>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {savedFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-3 rounded-xl p-3"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                          style={{ backgroundColor: friend.color }}
                        >
                          🤖
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{friend.name}</p>
                          <p className="text-purple-400 text-xs">{friend.personality}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteFriend(friend.id, friend.name)}
                          className="text-red-500/60 hover:text-red-400 text-xs transition-colors flex-shrink-0"
                        >
                          Izbriši
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  Poskusi znova
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.3)" }}
              >
                {/* Lab header */}
                <div
                  className="px-6 py-4 flex justify-between items-center"
                  style={{ background: "rgba(168,85,247,0.18)", borderBottom: "1px solid rgba(168,85,247,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧪</span>
                    <span className="text-white font-bold">Scenarij {labIndex + 1} od {LAB_SCENARIOS.length}</span>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-xl text-sm font-bold"
                    style={{ background: "rgba(168,85,247,0.25)", border: "1px solid rgba(168,85,247,0.3)" }}
                  >
                    <span className="text-purple-300">{labScore}</span>
                    <span className="text-white/40 text-xs"> pt</span>
                  </div>
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
