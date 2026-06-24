"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter, useParams } from "next/navigation"
import { KidsBottomNav } from "@/components/kids-bottom-nav"
import { ByteTutor } from "@/components/byte-tutor"

interface Lesson {
  id: string
  course_id: string
  module_index: number
  lesson_index: number
  title: string
  content: string
  content_type: string
  duration_minutes: number
  key_concepts: string[] | null
  quiz_questions: QuizQuestion[] | null
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation?: string
}

const BADGE_INFO: Record<string, { icon: string; name: string }> = {
  first_steps:       { icon: "🎯", name: "Първi korak!" },
  quick_learner:     { icon: "⚡", name: "Hitri učenec!" },
  dedicated_student: { icon: "📚", name: "Marljivi učenec!" },
  master_learner:    { icon: "🎓", name: "Mojster učenja!" },
  perfect_score:     { icon: "💯", name: "Popoln rezultat!" },
}

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

export default function LessonPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState("")
  const [noSubscription, setNoSubscription] = useState(false)

  // Quiz state
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Progress / badge state
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [completedCourseTitle, setCompletedCourseTitle] = useState("")
  const progressStartedRef = useRef(false)

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading, router])

  useEffect(() => {
    if (!lessonId) return
    fetch(`/api/courses/${slug}/lessons/${lessonId}`)
      .then(r => {
        if (r.status === 401) { router.push("/auth/login"); return null }
        if (r.status === 403) { setNoSubscription(true); return null }
        if (!r.ok) { setError("Lekcija ni bila najdena."); return null }
        return r.json()
      })
      .then(data => { if (data) setLesson(data.lesson) })
      .finally(() => setPageLoading(false))
  }, [slug, lessonId, router])

  // Mark lesson as started (once, only if not yet recorded)
  useEffect(() => {
    if (!lesson || progressStartedRef.current) return
    progressStartedRef.current = true
    fetch("/api/lesson-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lesson_id: lesson.id, course_id: lesson.course_id, status: "started" }),
    })
  }, [lesson])

  const markCompleted = async (scorePercent?: number) => {
    if (lessonCompleted || !lesson) return
    setLessonCompleted(true)
    const body: Record<string, unknown> = {
      lesson_id: lesson.id,
      course_id: lesson.course_id,
      status: "completed",
    }
    if (scorePercent !== undefined) body.quiz_score = scorePercent
    const res = await fetch("/api/lesson-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.newBadges?.length) setNewBadges(data.newBadges)
    if (data.courseCompleted) {
      setCourseCompleted(true)
      setCompletedCourseTitle(data.courseTitle ?? "")
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📖</div>
          <p className="text-purple-300 font-semibold">Nalaganje lekcije...</p>
        </div>
      </div>
    )
  }

  if (noSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-5">🔒</div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Potrebna je naročnina</h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Ta lekcija je del plačljive vsebine. Aktiviraj naročnino za dostop do vseh tečajev in lekcij.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/subscribe"
              className="px-6 py-3 rounded-xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
              Aktiviraj naročnino →
            </Link>
            <Link href={`/kids/courses/${slug}`}
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
              ← Nazaj na tečaj
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center">
          <p className="text-white font-bold mb-4">{error || "Lekcija ni bila najdena."}</p>
          <Link href={`/kids/courses/${slug}`} className="text-purple-400 hover:text-purple-300 text-sm">
            ← Nazaj na tečaj
          </Link>
        </div>
      </div>
    )
  }

  const quizQuestions = Array.isArray(lesson.quiz_questions) ? lesson.quiz_questions as QuizQuestion[] : []
  const hasQuiz = quizQuestions.length > 0
  const allAnswered = Object.keys(answers).length >= quizQuestions.length

  return (
    <div className="min-h-screen pb-24" style={spaceStyle}>

      {/* Course completion overlay */}
      {courseCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "rgba(7,7,26,0.92)", backdropFilter: "blur(8px)" }}>
          <div className="text-center max-w-sm w-full">
            <div className="text-6xl mb-4" style={{ animation: "bounce 1s infinite" }}>🏆</div>
            <h2 className="text-3xl font-black text-white mb-2">Čestitamo!</h2>
            <p className="text-purple-300 font-semibold mb-1">Tečaj zaključen</p>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Uspešno si zaključil/a tečaj<br />
              <strong className="text-white">{completedCourseTitle}</strong>
            </p>
            <div className="flex flex-col gap-3">
              <Link href={`/kids/courses/${slug}/certificate`}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 20px rgba(168,85,247,0.5)" }}>
                🎓 Oglej si certifikat
              </Link>
              <button onClick={() => setCourseCompleted(false)}
                className="px-6 py-3 rounded-2xl font-semibold transition-all hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                Zapri
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge notification */}
      {newBadges.length > 0 && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {newBadges.map(badgeId => {
            const info = BADGE_INFO[badgeId]
            if (!info) return null
            return (
              <div key={badgeId}
                className="px-4 py-3 rounded-2xl flex items-center gap-3 animate-bounce shadow-2xl"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">Odznaka pridobljena!</p>
                  <p className="text-purple-200 text-xs">{info.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/kids/courses/${slug}`} className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            ← Nazaj na tečaj
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

        {/* Lesson header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/30 text-xs">Modul {lesson.module_index + 1} · Lekcija {lesson.lesson_index + 1}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/30 text-xs">⏱ {lesson.duration_minutes} min</span>
            {lessonCompleted && (
              <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}>
                ✓ Zaključeno
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-4">{lesson.title}</h1>

          {Array.isArray(lesson.key_concepts) && lesson.key_concepts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(lesson.key_concepts as string[]).map((concept, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
                  {concept}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Lesson content */}
        <div className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="prose prose-invert max-w-none">
            {lesson.content.split("\n").map((para, i) =>
              para.trim() ? (
                <p key={i} className="text-white/75 text-sm leading-relaxed mb-3">{para}</p>
              ) : <div key={i} className="h-2" />
            )}
          </div>
        </div>

        {/* Quiz */}
        {hasQuiz && (
          <div className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <h2 className="text-white font-bold text-lg mb-5">🎯 Mini kviz</h2>
            <div className="space-y-6">
              {quizQuestions.map((q, qi) => (
                <div key={qi}>
                  <p className="text-white font-semibold text-sm mb-3">{qi + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = answers[qi] === oi
                      const isCorrect = submitted && oi === q.correct
                      const isWrong = submitted && isSelected && oi !== q.correct
                      return (
                        <button key={oi} disabled={submitted}
                          onClick={() => setAnswers(prev => ({ ...prev, [qi]: oi }))}
                          className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                          style={{
                            background: isCorrect ? "rgba(34,197,94,0.2)" : isWrong ? "rgba(239,68,68,0.2)" : isSelected ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                            border: isCorrect ? "1px solid rgba(34,197,94,0.5)" : isWrong ? "1px solid rgba(239,68,68,0.4)" : isSelected ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.08)",
                            color: isCorrect ? "#4ade80" : isWrong ? "#f87171" : "rgba(255,255,255,0.75)",
                          }}>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {submitted && q.explanation && (
                    <p className="text-white/45 text-xs mt-2 pl-1">{q.explanation}</p>
                  )}
                </div>
              ))}
            </div>

            {!submitted ? (
              <button
                onClick={async () => {
                  setSubmitted(true)
                  const correct = quizQuestions.filter((q, i) => answers[i] === q.correct).length
                  const pct = Math.round((correct / quizQuestions.length) * 100)
                  setQuizScore(correct)
                  await markCompleted(pct)
                }}
                disabled={!allAnswered}
                className="mt-6 px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-40 active:scale-95"
                style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
                Preveri odgovore
              </button>
            ) : (
              <div className="mt-4 px-4 py-3 rounded-xl"
                style={{ background: quizScore === quizQuestions.length ? "rgba(34,197,94,0.15)" : "rgba(251,191,36,0.12)", border: quizScore === quizQuestions.length ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(251,191,36,0.3)" }}>
                <p className="text-white font-bold text-sm">
                  {quizScore === quizQuestions.length ? "🏆 Odlično!" : "💪 Dobro!"} {quizScore}/{quizQuestions.length} pravilnih odgovorov
                </p>
              </div>
            )}
          </div>
        )}

        {/* Complete button for lessons without quiz */}
        {!hasQuiz && !lessonCompleted && (
          <div className="mb-6 text-center">
            <button
              onClick={() => markCompleted()}
              className="px-8 py-3 rounded-xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}>
              ✓ Zaključi lekcijo
            </button>
          </div>
        )}

        {/* Back to course */}
        <div className="text-center">
          <Link href={`/kids/courses/${slug}`}
            className="inline-block px-6 py-3 rounded-xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
            ← Nazaj na seznam lekcij
          </Link>
        </div>
      </div>
      <KidsBottomNav />
      <ByteTutor lessonTitle={lesson.title} lessonContent={lesson.content} />
    </div>
  )
}
