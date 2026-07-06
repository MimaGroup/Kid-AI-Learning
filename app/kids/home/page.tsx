"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useStats } from "../../../hooks/use-progress"
import { useAuth } from "../../../hooks/use-auth"
import { AdventureMap } from "../../../components/adventure-map"
import { KidsBottomNav } from "../../../components/kids-bottom-nav"
import { BadgeShowcase } from "../../../components/badge-showcase"
import { useEffect, useState } from "react"

const NAV = [
  { href: "/kids/home",       icon: "🏠", label: "Domov" },
  { href: "/kids/activities", icon: "🎮", label: "Dejavnosti" },
  { href: "/kids/courses",    icon: "📚", label: "Tečaji" },
]

const SIDEBAR_STARS = [
  {x:15,y:8},{x:70,y:15},{x:30,y:30},{x:85,y:40},
  {x:10,y:55},{x:60,y:62},{x:40,y:75},{x:80,y:85},
  {x:25,y:92},{x:55,y:20},
]

export default function KidsHome() {
  const { stats, isLoading: statsLoading } = useStats()
  const { logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [earnedBadges, setEarnedBadges] = useState<string[]>([])
  const [completedLessons, setCompletedLessons] = useState(0)

  useEffect(() => {
    fetch("/api/lesson-progress")
      .then(r => r.json())
      .then(data => {
        const all = data.progress ?? []
        setCompletedLessons(all.filter((p: any) => p.status === "completed").length)
      })
      .catch(() => {})
    fetch("/api/user-badges")
      .then(r => r.json())
      .then(data => setEarnedBadges((data.badges ?? []).map((b: any) => b.badge_id)))
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

  return (
    <div className="min-h-screen flex" style={spaceStyle}>
      {/* ── Sidebar — hidden on mobile, bottom nav handles it ── */}
      <aside
        className="hidden md:flex w-64 flex-shrink-0 flex-col relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0d0d2b 0%, #050510 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Sidebar stars */}
        {SIDEBAR_STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.12 + (i % 3) * 0.08 }}
          />
        ))}

        {/* Logo */}
        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-lg leading-tight">Kids Learning AI</span>
          </div>
          <p className="text-white/35 text-xs pl-9">Tvoje učno središče</p>
        </div>

        {/* Nav */}
        <nav className="relative z-10 px-3 space-y-1 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: active ? "rgba(168,85,247,0.25)" : "transparent",
                  color: active ? "white" : "rgba(255,255,255,0.55)",
                  border: active ? "1px solid rgba(168,85,247,0.4)" : "1px solid transparent",
                  boxShadow: active ? "0 0 12px rgba(168,85,247,0.2)" : "none",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Parent link */}
        <div
          className="relative z-10 mx-3 mb-6 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Link
            href="/parent/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="text-base">🛸</span>
            <span>Starševska plošča</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-red-500/10 active:scale-95"
            style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <span>↩</span>
            <span>Odjava</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        {/* Top bar */}
        <header
          className="px-6 md:px-8 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <p className="text-white/40 text-xs font-medium mb-0.5">Dobrodošel nazaj, mladi AI raziskovalec! 👋</p>
            <h1 className="text-xl font-bold text-white">Byteov vesoljski zemljevid</h1>
          </div>
          <div className="text-3xl animate-bounce">🚀</div>
        </header>

        {/* Map */}
        <div className="px-6 md:px-8 pt-6">
          <AdventureMap />
        </div>

        {/* Progress stats */}
        <div className="px-6 md:px-8 pt-6 pb-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="text-white font-bold mb-4">Tvoj učni napredek</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 rounded-xl"
                style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <div className="text-2xl mb-1">📖</div>
                <div className="text-lg font-bold text-white">{statsLoading ? "—" : completedLessons}</div>
                <div className="text-xs text-blue-400">Lekcij</div>
              </div>
              <div className="text-center p-4 rounded-xl"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-lg font-bold text-white">{statsLoading ? "—" : stats.streak}</div>
                <div className="text-xs text-green-400">Niz dni</div>
              </div>
              <div className="text-center p-4 rounded-xl"
                style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}>
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-lg font-bold text-white">{statsLoading ? "—" : `Lv ${stats.level}`}</div>
                <div className="text-xs text-purple-400">{statsLoading ? "" : stats.levelName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Badge showcase */}
        <div className="px-6 md:px-8 pb-6">
          <BadgeShowcase earnedBadgeIds={earnedBadges} completedLessons={completedLessons} />
        </div>
      </div>
      <KidsBottomNav />
    </div>
  )
}
