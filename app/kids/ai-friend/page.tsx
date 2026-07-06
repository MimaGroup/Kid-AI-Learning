"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/toast-notification"

interface AIFriend {
  id: string
  name: string
  personality: string
  color: string
  created_at: string
}

const CONSENT_KEY = "ai-friend-consent"

export default function AIFriendBuilder() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const toast = useToast()

  const [consentGiven, setConsentGiven] = useState(true) // default true to avoid flash
  const [friendName, setFriendName] = useState("")
  const [personality, setPersonality] = useState("Friendly")
  const [color, setColor] = useState("#4F46E5")

  const [savedFriends, setSavedFriends] = useState<AIFriend[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingFriends, setIsLoadingFriends] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    setConsentGiven(!!localStorage.getItem(CONSENT_KEY))
  }, [])

  useEffect(() => {
    if (user) {
      loadFriends()
    }
  }, [user])

  const loadFriends = async () => {
    try {
      setIsLoadingFriends(true)
      const response = await fetch("/api/ai-friends")
      const data = await response.json()

      if (response.ok) {
        setSavedFriends(data.friends || [])
      } else {
        toast.error(data.error || "Napaka pri nalaganju prijateljev")
      }
    } catch (err) {
      toast.error("Napaka pri nalaganju. Preveri svojo povezavo.")
    } finally {
      setIsLoadingFriends(false)
    }
  }

  const handleSaveFriend = async () => {
    if (!friendName.trim()) {
      toast.warning("Vpiši ime za svojega AI prijatelja")
      return
    }

    try {
      setIsSaving(true)

      const response = await fetch("/api/ai-friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: friendName,
          personality,
          color,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`${friendName} je bil ustvarjen!`)
        setSavedFriends([data.friend, ...savedFriends])

        setFriendName("")
        setPersonality("Friendly")
        setColor("#4F46E5")
      } else {
        toast.error(data.error || "Napaka pri shranjevanju prijatelja")
      }
    } catch (err) {
      toast.error("Napaka pri shranjevanju. Poskusi znova.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteFriend = async (id: string, name: string) => {
    if (!confirm(`Ali res želiš izbrisati ${name}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/ai-friends/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSavedFriends(savedFriends.filter((f) => f.id !== id))
        toast.success("Prijatelj uspešno izbrisan")
      } else {
        const data = await response.json()
        toast.error(data.error || "Napaka pri brisanju prijatelja")
      }
    } catch (err) {
      toast.error("Napaka pri brisanju. Poskusi znova.")
    }
  }

  if (loading || isLoadingFriends) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🤖</div>
          <p className="text-purple-300 font-semibold">Nalaganje...</p>
        </div>
      </div>
    )
  }

  if (!consentGiven) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}
      >
        <div
          className="max-w-sm w-full rounded-3xl p-8 text-center"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(168,85,247,0.35)" }}
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-white mb-3">AI Prijatelj</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-2">
            Tu lahko ustvariš svojega AI spremljevalca, ki ti pomaga pri učenju.
          </p>
          <p className="text-purple-300 text-xs font-medium mb-6">
            ℹ️ Starši so obveščeni o tej funkciji in lahko dostopajo do vseh pogovorov prek starševske plošče.
          </p>
          <button
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, "1")
              setConsentGiven(true)
            }}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}
          >
            Razumem, gremo naprej! 🚀
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative pb-8"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-6">
        {/* Back */}
        <div className="mb-6">
          <a href="/kids/home" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors flex items-center gap-1">
            ← Nazaj na zemljevid
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ustvari AI prijatelja 🤖</h1>
          <p className="text-white/50 text-sm">Prilagodi svojega lastnega AI spremljevalca!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Build form */}
          <div className="rounded-3xl p-6"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.25)" }}>
            <h2 className="text-xl font-bold text-white mb-5">Ustvari AI prijatelja</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Ime tvojega AI prijatelja</label>
                <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)}
                  className="w-full p-3 text-white rounded-2xl focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.3)" }}
                  placeholder="Vpiši ime..." />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Izberi osebnost</label>
                <select value={personality} onChange={(e) => setPersonality(e.target.value)}
                  className="w-full p-3 text-white rounded-2xl focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <option value="Friendly">Prijazno</option>
                  <option value="Curious">Radovedno</option>
                  <option value="Helpful">Koristno</option>
                  <option value="Playful">Igrivo</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-medium mb-2">Priljubljena barva prijatelja</label>
                <div className="flex gap-3">
                  {["#4F46E5", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"].map((c) => (
                    <button key={c} onClick={() => setColor(c)}
                      className="w-11 h-11 rounded-xl transition-all"
                      style={{ backgroundColor: c, outline: color === c ? "2px solid white" : "none", outlineOffset: "2px" }}
                      aria-label={`Barva ${c}`} />
                  ))}
                </div>
              </div>

              <button onClick={handleSaveFriend} disabled={isSaving || !friendName.trim()}
                className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
                {isSaving ? "Ustvarjanje..." : "Ustvari AI prijatelja"}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-3xl p-6 flex flex-col"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(168,85,247,0.25)" }}>
            <h3 className="text-xl font-bold text-white mb-5">Predogled</h3>
            <div className="flex-1 flex flex-col items-center justify-center rounded-2xl py-10"
              style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4"
                style={{ backgroundColor: color }}>
                🤖
              </div>
              <h4 className="text-xl font-bold text-white mb-1">{friendName || "Tvoj prijatelj"}</h4>
              <p className="text-white/40 text-sm">
                {personality === "Friendly" ? "Prijazno" : personality === "Curious" ? "Radovedno" : personality === "Helpful" ? "Koristno" : "Igrivo"}
              </p>
            </div>
          </div>
        </div>

        {/* Saved friends */}
        {savedFriends.length > 0 && (
          <div className="rounded-3xl p-6"
            style={{ background: "rgba(8,8,30,0.88)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="text-xl font-bold text-white mb-5">Tvoji AI prijatelji</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedFriends.map((friend) => (
                <div key={friend.id} className="rounded-2xl p-4 transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: friend.color }}>
                      🤖
                    </div>
                    <button onClick={() => handleDeleteFriend(friend.id, friend.name)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-red-500/10"
                      style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      Izbriši
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white mb-0.5">{friend.name}</h4>
                  <p className="text-white/40 text-xs">
                    {friend.personality === "Friendly" ? "Prijazno" : friend.personality === "Curious" ? "Radovedno" : friend.personality === "Helpful" ? "Koristno" : friend.personality === "Playful" ? "Igrivo" : friend.personality}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
