"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { KidsBottomNav } from "@/components/kids-bottom-nav"

const SIDEBAR_STARS = [
  {x:15,y:8},{x:70,y:15},{x:30,y:30},{x:85,y:40},
  {x:10,y:55},{x:60,y:62},{x:40,y:75},{x:80,y:85},
  {x:25,y:92},{x:55,y:20},
]

const NAV = [
  { href: "/kids/home",       icon: "🏠", label: "Domov" },
  { href: "/kids/activities", icon: "🎮", label: "Dejavnosti" },
  { href: "/kids/courses",    icon: "📚", label: "Tečaji" },
]

const LEVELS = ["Vsi", "Začetnik", "Srednji", "Napreden"] as const
type Level = typeof LEVELS[number]

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Začetnik: { bg: "rgba(34,197,94,0.2)",  text: "#4ade80", border: "rgba(34,197,94,0.4)" },
  Srednji:  { bg: "rgba(251,191,36,0.2)", text: "#fbbf24", border: "rgba(251,191,36,0.4)" },
  Napreden: { bg: "rgba(239,68,68,0.2)",  text: "#f87171", border: "rgba(239,68,68,0.4)" },
}

const SLUG_IMAGE: Record<string, string> = {
  basic:   "/courses/ai-basics.jpg",
  safety:  "/courses/ai-safety.jpg",
  safe:    "/courses/ai-safety.jpg",
  art:     "/courses/ai-art.jpg",
  coding:  "/courses/coding-ai.jpg",
  robot:   "/courses/ai-robotics.jpg",
}

function getThumbnail(slug: string): string {
  for (const [key, img] of Object.entries(SLUG_IMAGE)) {
    if (slug.includes(key)) return img
  }
  return "/courses/ai-basics.jpg"
}

function normalizeLevel(d: string): "Začetnik" | "Srednji" | "Napreden" {
  const l = d.toLowerCase()
  if (l.includes("begin") || l.includes("začet") || l.includes("easy") || l.includes("osnov")) return "Začetnik"
  if (l.includes("inter") || l.includes("srednji") || l.includes("medium")) return "Srednji"
  return "Napreden"
}

interface DBCourse {
  id: string
  title: string
  slug: string
  description: string
  difficulty: string
  age_min: number
  age_max: number
  duration_minutes: number
  lessons_count: number
  thumbnail_url: string | null
  is_free: boolean
  price: number
  currency: string
  category: string
}

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function CoursesPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [activeLevel, setActiveLevel] = useState<Level>("Vsi")
  const [courses, setCourses] = useState<DBCourse[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [progressMap, setProgressMap] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading, router])

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(data => setCourses(data.courses ?? []))
      .finally(() => setCoursesLoading(false))
  }, [])

  useEffect(() => {
    fetch("/api/lesson-progress")
      .then(r => r.json())
      .then(data => {
        const map: Record<string, number> = {}
        for (const p of data.progress ?? []) {
          if (p.status === "completed") {
            map[p.course_id] = (map[p.course_id] ?? 0) + 1
          }
        }
        setProgressMap(map)
      })
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📚</div>
          <p className="text-purple-300 font-semibold">Nalaganje tečajev...</p>
        </div>
      </div>
    )
  }

  const filtered = courses.filter(c => {
    const level = normalizeLevel(c.difficulty)
    return activeLevel === "Vsi" || level === activeLevel
  })

  return (
    <div className="min-h-screen flex" style={spaceStyle}>

      {/* ── Sidebar ── */}
      <aside
        className="hidden md:flex w-64 flex-shrink-0 flex-col relative overflow-hidden h-screen sticky top-0"
        style={{
          background: "linear-gradient(180deg, #0d0d2b 0%, #050510 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {SIDEBAR_STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.12 + (i % 3) * 0.08 }} />
        ))}

        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-bold text-lg leading-tight">Kids Learning AI</span>
          </div>
          <p className="text-white/35 text-xs pl-9">Tvoje učno središče</p>
        </div>

        <nav className="relative z-10 px-3 space-y-1 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
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
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </Link>
            )
          })}
        </nav>

        <div className="relative z-10 mx-3 mb-6 mt-4 pt-4 space-y-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link href="/parent/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="text-base">🛸</span>
            <span>Starševska plošča</span>
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-red-500/10 active:scale-95"
            style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <span>↩</span><span>Odjava</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen pb-16 md:pb-0">
        <header className="px-6 md:px-8 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-white/40 text-xs font-medium mb-0.5">Učenje skozi vsebino</p>
            <h1 className="text-xl font-bold text-white">Tečaji</h1>
          </div>
          <span className="text-3xl">📚</span>
        </header>

        <div className="flex-1 px-6 md:px-8 py-8">
          {/* Level filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {LEVELS.map((level) => (
              <button key={level} onClick={() => setActiveLevel(level)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95"
                style={activeLevel === level
                  ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white", boxShadow: "0 0 16px rgba(168,85,247,0.4)" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }
                }>
                {level}
              </button>
            ))}
          </div>

          {/* Loading skeleton */}
          {coursesLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", height: 360 }} />
              ))}
            </div>
          )}

          {/* Course grid */}
          {!coursesLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((course, index) => {
                const level = normalizeLevel(course.difficulty)
                const lc = LEVEL_COLORS[level]
                const isPro = !course.is_free
                const hours = course.duration_minutes ? Math.round(course.duration_minutes / 60) : null
                const isRecommended = index === 0 && activeLevel === "Vsi"

                return (
                  <div key={course.id}
                    className="rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-[1.01]"
                    style={{
                      background: "rgba(8,8,30,0.88)",
                      border: isRecommended ? "1px solid rgba(16,185,129,0.5)" : "1px solid rgba(255,255,255,0.09)",
                      boxShadow: isRecommended ? "0 4px 24px rgba(16,185,129,0.15)" : "0 4px 24px rgba(0,0,0,0.3)",
                    }}>

                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden">
                      <Image src={getThumbnail(course.slug)}
                        alt={course.title} fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                        style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
                        {level}
                      </div>
                      {isRecommended && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                          style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "white" }}>
                          ⭐ Začni tukaj
                        </div>
                      )}
                      {!isRecommended && isPro && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                          style={{ background: "rgba(168,85,247,0.4)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.5)" }}>
                          Pro
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-white font-bold text-lg mb-2 leading-snug">{course.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{course.description}</p>

                      <div className="flex flex-wrap gap-3 mb-4">
                        {hours && hours > 0 && (
                          <span className="flex items-center gap-1 text-white/40 text-xs">⏱ {hours} ur</span>
                        )}
                        <span className="flex items-center gap-1 text-white/40 text-xs">📖 {course.lessons_count} lekcij</span>
                        <span className="flex items-center gap-1 text-white/40 text-xs">👤 {course.age_min}–{course.age_max} let</span>
                      </div>

                      {/* Progress bar */}
                      {(() => {
                        const done = progressMap[course.id] ?? 0
                        const total = course.lessons_count ?? 0
                        const pct = total > 0 ? Math.round((done / total) * 100) : 0
                        const started = done > 0
                        const completed = done >= total && total > 0
                        return started ? (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium" style={{ color: completed ? "#4ade80" : "rgba(255,255,255,0.5)" }}>
                                {completed ? "✓ Opravljeno" : `${done} / ${total} lekcij`}
                              </span>
                              <span className="text-xs font-bold" style={{ color: completed ? "#4ade80" : "#a855f7" }}>{pct}%</span>
                            </div>
                            <div className="rounded-full overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,0.08)" }}>
                              <div className="h-full rounded-full transition-all"
                                style={{
                                  width: `${pct}%`,
                                  background: completed
                                    ? "linear-gradient(90deg, #22c55e, #4ade80)"
                                    : "linear-gradient(90deg, #7c3aed, #a855f7)",
                                }} />
                            </div>
                          </div>
                        ) : null
                      })()}

                      <Link href={`/kids/courses/${course.slug}`} className="block">
                        <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                          {(progressMap[course.id] ?? 0) > 0 ? "Nadaljuj →" : isPro ? "Preizkusi brezplačno" : "Začni tečaj"}
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              })}

              {!coursesLoading && filtered.length === 0 && (
                <div className="col-span-3 text-center py-16 text-white/30">
                  Ni tečajev za izbrani nivo.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <KidsBottomNav />
    </div>
  )
}
