"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter, useParams } from "next/navigation"
import { KidsBottomNav } from "@/components/kids-bottom-nav"

interface Lesson {
  id: string
  module_index: number
  lesson_index: number
  title: string
  content_type: string
  duration_minutes: number
  key_concepts: string[] | null
}

interface Course {
  id: string
  title: string
  slug: string
  description: string
  long_description: string | null
  difficulty: string
  age_min: number
  age_max: number
  duration_minutes: number
  lessons_count: number
  is_free: boolean
  learning_outcomes: string[] | null
  curriculum: unknown
}

interface LessonProgress {
  lesson_id: string
  status: string
  quiz_score: number | null
}

const CONTENT_TYPE_ICON: Record<string, string> = {
  text: "📖",
  video: "🎬",
  quiz: "🎯",
  interactive: "🎮",
}

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function CourseDetailPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [hasAccess, setHasAccess] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState("")
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading, router])

  useEffect(() => {
    if (!slug) return
    fetch(`/api/courses/${slug}`)
      .then(r => {
        if (!r.ok) { setError("Tečaj ni bil najden."); return null }
        return r.json()
      })
      .then(data => {
        if (data) { setCourse(data.course); setLessons(data.lessons); setHasAccess(data.hasAccess ?? false) }
      })
      .finally(() => setPageLoading(false))
  }, [slug])

  // Fetch lesson progress after course loads
  useEffect(() => {
    if (!course?.id) return
    fetch(`/api/lesson-progress?course_id=${course.id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.progress) {
          const ids = (data.progress as LessonProgress[])
            .filter(p => p.status === "completed")
            .map(p => p.lesson_id)
          setCompletedLessons(new Set(ids))
        }
      })
  }, [course?.id])

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📚</div>
          <p className="text-purple-300 font-semibold">Nalaganje tečaja...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-white font-bold mb-4">{error || "Tečaj ni bil najden."}</p>
          <Link href="/kids/courses" className="text-purple-400 hover:text-purple-300 text-sm">← Nazaj na tečaje</Link>
        </div>
      </div>
    )
  }

  // Group lessons by module
  const modules: Record<number, Lesson[]> = {}
  lessons.forEach(l => {
    if (!modules[l.module_index]) modules[l.module_index] = []
    modules[l.module_index].push(l)
  })
  const moduleEntries = Object.entries(modules).sort(([a], [b]) => Number(a) - Number(b))

  const firstLesson = lessons[0]
  const completedCount = completedLessons.size

  return (
    <div className="min-h-screen pb-20 md:pb-8" style={spaceStyle}>
      {/* Top nav */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/kids/courses" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            ← Nazaj na tečaje
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/parent/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
              🛸 Starševska plošča
            </Link>
            <button onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all hover:bg-red-500/10 active:scale-95"
              style={{ color: "rgba(239,68,68,0.7)", border: "1px solid rgba(239,68,68,0.2)" }}>
              ↩ Odjava
            </button>
          </div>
        </div>

        {/* Course header */}
        <div className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
          <h1 className="text-2xl font-extrabold text-white mb-2">{course.title}</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {course.long_description || course.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-5">
            <span className="flex items-center gap-1 text-white/50 text-xs">⏱ {Math.round(course.duration_minutes / 60)} ur</span>
            <span className="flex items-center gap-1 text-white/50 text-xs">📖 {course.lessons_count} lekcij</span>
            <span className="flex items-center gap-1 text-white/50 text-xs">👤 {course.age_min}–{course.age_max} let</span>
            <span className="flex items-center gap-1 text-white/50 text-xs">📊 {course.difficulty}</span>
            {completedCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}>
                ✓ {completedCount}/{course.lessons_count} zaključenih
              </span>
            )}
          </div>

          {Array.isArray(course.learning_outcomes) && course.learning_outcomes.length > 0 && (
            <div className="mb-5">
              <p className="text-white/40 text-xs font-bold tracking-wider mb-2">KAJ SE BOŠ NAUČIL</p>
              <ul className="space-y-1">
                {(course.learning_outcomes as string[]).map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5">✓</span> {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {firstLesson && completedCount < course.lessons_count && (
              <Link href={`/kids/courses/${slug}/lessons/${firstLesson.id}`}>
                <button className="px-6 py-3 rounded-xl font-bold text-white transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
                  {completedCount > 0 ? "Nadaljuj tečaj →" : "Začni tečaj →"}
                </button>
              </Link>
            )}
            {completedCount >= course.lessons_count && course.lessons_count > 0 && (
              <Link href={`/kids/courses/${slug}/certificate`}>
                <button className="px-6 py-3 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}>
                  🏆 Moj certifikat
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Paywall banner */}
        {!hasAccess && (
          <div className="rounded-2xl px-5 py-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.35)" }}>
            <div>
              <p className="text-purple-300 font-bold text-sm">🔒 Tečaj zahteva aktivno naročnino</p>
              <p className="text-white/45 text-xs mt-0.5">Aktiviraj naročnino za dostop do vseh {course.lessons_count} lekcij.</p>
            </div>
            <Link href="/subscribe"
              className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
              Aktiviraj dostop →
            </Link>
          </div>
        )}

        {/* Lessons by module */}
        <div className="space-y-4">
          {moduleEntries.map(([moduleIdx, moduleLessons]) => (
            <div key={moduleIdx} className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-5 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
                <p className="text-white/40 text-xs font-bold tracking-wider">MODUL {Number(moduleIdx) + 1}</p>
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {moduleLessons.sort((a, b) => a.lesson_index - b.lesson_index).map((lesson) => {
                  const isDone = completedLessons.has(lesson.id)
                  if (!hasAccess) return (
                    <div key={lesson.id} className="flex items-center gap-4 px-5 py-4 opacity-50 cursor-not-allowed">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        🔒
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/50 text-sm font-semibold">{lesson.title}</p>
                      </div>
                      <span className="text-white/25 text-xs flex-shrink-0">{lesson.duration_minutes} min</span>
                    </div>
                  )
                  return (
                    <Link key={lesson.id} href={`/kids/courses/${slug}/lessons/${lesson.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-all group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg flex-shrink-0"
                        style={{
                          background: isDone ? "rgba(34,197,94,0.15)" : "rgba(168,85,247,0.15)",
                          border: isDone ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(168,85,247,0.3)",
                        }}>
                        {isDone ? "✓" : CONTENT_TYPE_ICON[lesson.content_type] ?? "📖"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold group-hover:text-purple-300 transition-colors ${isDone ? "text-green-300" : "text-white"}`}>
                          {lesson.title}
                        </p>
                        {Array.isArray(lesson.key_concepts) && lesson.key_concepts.length > 0 && (
                          <p className="text-white/35 text-xs mt-0.5 truncate">
                            {(lesson.key_concepts as string[]).slice(0, 3).join(" · ")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-white/30 text-xs">{lesson.duration_minutes} min</span>
                        {isDone
                          ? <span className="text-green-400 text-xs font-bold">Opravljeno</span>
                          : <span className="text-purple-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
                        }
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <KidsBottomNav />
    </div>
  )
}
