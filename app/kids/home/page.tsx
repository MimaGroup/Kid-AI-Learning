"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useStats } from "../../../hooks/use-progress"
import { useAuth } from "../../../hooks/use-auth"
import { AdventureMap } from "../../../components/adventure-map"
import { KidsBottomNav } from "../../../components/kids-bottom-nav"
import { BadgeShowcase } from "../../../components/badge-showcase"
import { ByteTutor } from "../../../components/byte-tutor"
import { BYTE_CHARACTER } from "../../../lib/byte-character"
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
  const [xp, setXp] = useState<{ progress: number; needed: number; level: number; points: number } | null>(null)

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
    fetch("/api/gamification")
      .then(r => r.json())
      .then(data => setXp({
        progress: data.experienceProgress ?? 0,
        needed: data.experienceNeeded ?? 100,
        level: data.level ?? 1,
        points: data.points ?? 0,
      }))
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
        className="hidden md:flex w-64 flex-shrink-0 flex-col relative overflow-hidden h-screen sticky top-0"
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
            <span className="font-heading font-bold text-lg leading-tight bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">
              Kids Learning AI
            </span>
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

        {/* Byte avatar */}
        <div className="relative z-10 mx-3 mb-2">
          <div
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            <Image
              src={BYTE_CHARACTER.images.avatar}
              alt="Byte"
              width={32}
              height={32}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-white text-xs font-bold">Byte</p>
              <p className="text-purple-300 text-xs truncate">{BYTE_CHARACTER.phrases.helpOffer}</p>
            </div>
          </div>
        </div>

        {/* Parent link */}
        <div
          className="relative z-10 mx-3 mb-6 mt-2 pt-4"
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
            <h1 className="text-xl font-heading font-bold text-white">Byteov vesoljski zemljevid</h1>
          </div>
          <div className="text-3xl animate-bounce">🚀</div>
        </header>

        {/* Getting-started banner — only for new users with 0 lessons */}
        {!statsLoading && completedLessons === 0 && (
          <div className="px-6 md:px-8 pt-4">
            <div
              className="rounded-2xl p-5 flex items-center justify-between gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.15))",
                border: "1px solid rgba(168,85,247,0.4)",
                boxShadow: "0 0 20px rgba(168,85,247,0.1)",
              }}
            >
              <div>
                <p className="text-purple-300 text-xs font-semibold mb-1">🚀 Začni svojo pot</p>
                <p className="text-white font-bold text-base">Izberi svoj prvi tečaj in začni z učenjem!</p>
              </div>
              <Link
                href="/kids/courses"
                className="flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-white text-sm transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}
              >
                Začni →
              </Link>
            </div>
          </div>
        )}

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
                style={{ background: "rgba(108,212,195,0.12)", border: "1px solid rgba(108,212,195,0.25)" }}>
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-lg font-bold text-white">{statsLoading ? "—" : stats.streak}</div>
                <div className="text-xs" style={{ color: "#6CD4C3" }}>Niz dni</div>
              </div>
              <div className="text-center p-4 rounded-xl"
                style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}>
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-lg font-bold text-white">{statsLoading ? "—" : `Lv ${stats.level}`}</div>
                <div className="text-xs text-purple-400">{statsLoading ? "" : stats.levelName}</div>
              </div>
            </div>

            {/* XP progress bar toward next level */}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-purple-300">⭐ XP do naslednje stopnje</span>
                <span className="text-xs text-white/40">
                  {xp ? `${xp.progress} / ${xp.needed} XP` : "—"}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(168,85,247,0.15)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: xp ? `${Math.min(100, Math.round((xp.progress / xp.needed) * 100))}%` : "0%",
                    background: "linear-gradient(90deg, #7C3AED, #a855f7)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Badge showcase */}
        <div className="px-6 md:px-8 pb-6">
          <BadgeShowcase earnedBadgeIds={earnedBadges} completedLessons={completedLessons} />
        </div>
      </div>
      <ByteTutor />
      <KidsBottomNav />
    </div>
  )
}
