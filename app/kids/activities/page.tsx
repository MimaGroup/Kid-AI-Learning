"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSubscription } from "@/hooks/use-subscription"
import { KidsBottomNav } from "@/components/kids-bottom-nav"

const STARS = [
  {x:4,y:6},{x:14,y:80},{x:24,y:18},{x:36,y:52},{x:47,y:9},
  {x:57,y:70},{x:67,y:35},{x:76,y:86},{x:87,y:16},{x:93,y:50},
  {x:10,y:44},{x:50,y:38},{x:80,y:60},{x:30,y:74},{x:70,y:5},
  {x:20,y:93},{x:63,y:93},{x:42,y:93},
]

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { hasPremium, loading } = useSubscription()
  const router = useRouter()

  const activities = [
    {
      id: "ai-detective",
      title: "AI Detektiv",
      description: "Odkrij, kateri predmeti in aplikacije uporabljajo AI!",
      category: "igre",
      difficulty: "Začetnik",
      icon: "🕵️",
      gradient: "linear-gradient(135deg, #1d4ed8, #06b6d4)",
      href: "/kids/games/ai-detective",
      isPremium: false,
    },
    {
      id: "pattern-training",
      title: "Prepoznavanje vzorcev",
      description: "Nauči AI prepoznavati vzorce — kot pravi inženir!",
      category: "ucenje",
      difficulty: "Nadaljevalec",
      icon: "🧠",
      gradient: "linear-gradient(135deg, #059669, #10b981)",
      href: "/kids/games/pattern-training",
      isPremium: true,
    },
    {
      id: "ai-friend",
      title: "Ustvari AI prijatelja",
      description: "Ustvari svojega lastnega AI spremljevalca!",
      category: "ustvarjanje",
      difficulty: "Začetnik",
      icon: "🤖",
      gradient: "linear-gradient(135deg, #7C3AED, #ec4899)",
      href: "/kids/ai-friend",
      isPremium: true,
    },
    {
      id: "ai-quiz",
      title: "AI Kviz",
      description: "Preveri svoje znanje o umetni inteligenci!",
      category: "igre",
      difficulty: "Vsi nivoji",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #ea580c, #ef4444)",
      href: "/kids/games/ai-quiz",
      isPremium: false,
    },
    {
      id: "math-adventure",
      title: "Matematična pustolovščina",
      description: "Reši matematične naloge in napreduj na višji nivo!",
      category: "ucenje",
      difficulty: "Vsi nivoji",
      icon: "🧮",
      gradient: "linear-gradient(135deg, #059669, #1d4ed8)",
      href: "/kids/games/math-adventure",
      isPremium: false,
    },
    {
      id: "word-builder",
      title: "Graditelj besed",
      description: "Razširjaj besedni zaklad s črkovalnimi igrami!",
      category: "ucenje",
      difficulty: "Vsi nivoji",
      icon: "📚",
      gradient: "linear-gradient(135deg, #d97706, #ea580c)",
      href: "/kids/games/word-builder",
      isPremium: false,
    },
    {
      id: "memory-match",
      title: "Spomin",
      description: "Poišči ujemajoče pare AI kartic in vadij spomin!",
      category: "igre",
      difficulty: "Vsi nivoji",
      icon: "🎴",
      gradient: "linear-gradient(135deg, #ec4899, #7C3AED)",
      href: "/kids/games/memory-match",
      isPremium: false,
    },
  ]

  const categories = [
    { id: "all",        name: "Vse dejavnosti", icon: "🌟" },
    { id: "igre",       name: "Igre",           icon: "🎮" },
    { id: "ucenje",     name: "Učenje",         icon: "📖" },
    { id: "ustvarjanje",name: "Ustvarjanje",    icon: "🎨" },
  ]

  const filteredActivities =
    selectedCategory === "all"
      ? activities
      : activities.filter((a) => a.category === selectedCategory)

  const handleActivityClick = (activity: (typeof activities)[0]) => {
    if (activity.isPremium && !hasPremium) {
      router.push("/pricing")
    } else {
      router.push(activity.href)
    }
  }

  return (
    <div className="min-h-screen relative pb-20 md:pb-8" style={spaceStyle}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-8">
        {/* Back */}
        <div className="mb-6">
          <Link href="/kids/home"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors flex items-center gap-1">
            ← Nazaj na zemljevid
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
            AI Dejavnosti 🚀
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Izberi igro ali izziv in se nauči kako deluje umetna inteligenca!
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: active ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.06)",
                  border: active ? "1px solid rgba(168,85,247,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  boxShadow: active ? "0 0 12px rgba(168,85,247,0.25)" : "none",
                }}>
                <span className="mr-1.5">{cat.icon}</span>{cat.name}
              </button>
            )
          })}
        </div>

        {/* Grid — always visible; only premium button waits for subscription */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id}
              className="rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-[1.02]"
              style={{ background: "rgba(8,8,30,0.85)", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>

              {/* Icon banner */}
              <div className="h-28 flex items-center justify-center relative"
                style={{ background: activity.gradient }}>
                <span className="text-5xl drop-shadow-lg">{activity.icon}</span>
                {activity.isPremium && (
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                    style={{ background: "rgba(168,85,247,0.5)", border: "1px solid rgba(168,85,247,0.7)" }}>
                    Pro ✨
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-white font-bold text-base mb-1">{activity.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3 flex-1">{activity.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(168,85,247,0.18)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
                    {activity.difficulty}
                  </span>
                </div>

                {activity.isPremium ? (
                  loading ? (
                    <button disabled
                      className="w-full py-3 rounded-xl font-bold text-sm"
                      style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: "rgba(192,132,252,0.5)" }}>
                      ·  ·  ·
                    </button>
                  ) : !hasPremium ? (
                    <button onClick={() => handleActivityClick(activity)}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                      style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)", color: "#c084fc" }}>
                      Nadgradi za dostop 🔒
                    </button>
                  ) : (
                    <Link href={activity.href}
                      className="block w-full py-3 rounded-xl font-bold text-white text-sm text-center transition-all active:scale-95"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)", boxShadow: "0 2px 12px rgba(168,85,247,0.35)" }}>
                      Začni igro →
                    </Link>
                  )
                ) : (
                  <Link href={activity.href}
                    className="block w-full py-3 rounded-xl font-bold text-white text-sm text-center transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)", boxShadow: "0 2px 12px rgba(168,85,247,0.35)" }}>
                    Začni igro →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <KidsBottomNav />
    </div>
  )
}
