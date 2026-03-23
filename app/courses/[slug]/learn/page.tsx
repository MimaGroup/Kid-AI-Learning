"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { CourseCertificate } from "@/components/course-certificate"
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  PlayCircle,
  Circle,
  Clock,
  Trophy,
  BookOpen,
  ChevronRight,
} from "lucide-react"

interface LessonProgress {
  status: string
  completed_at: string | null
  quiz_score: number | null
}

interface Lesson {
  id: string
  module_index: number
  lesson_index: number
  title: string
  content_type: string
  duration_minutes: number
  progress: LessonProgress
}

interface Module {
  index: number
  title: string
  totalLessons: number
  completedLessons: number
  lessons: Lesson[]
}

interface CourseData {
  course: { id: string; title: string; slug: string }
  modules: Module[]
  totalLessons: number
  completedLessons: number
  progressPercent: number
}

export default function LearnDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [data, setData] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch(`/api/courses/${slug}/lessons`)
        if (res.status === 401) {
          router.push(`/auth/sign-in?redirect=/courses/${slug}/learn`)
          return
        }
        if (res.status === 403) {
          router.push(`/courses/${slug}`)
          return
        }
        if (!res.ok) throw new Error("Failed to load")
        const json = await res.json()
        setData(json)
      } catch {
        setError("Napaka pri nalaganju lekcij.")
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchLessons()
  }, [slug, router])

  // Find the first incomplete lesson for "Continue" button
  const getNextLesson = (): Lesson | null => {
    if (!data) return null
    for (const mod of data.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.progress.status !== "completed") {
          return lesson
        }
      }
    }
    return data.modules[0]?.lessons[0] || null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Napaka pri nalaganju."}</p>
        <Link href={`/courses/${slug}`}>
          <Button variant="outline" className="rounded-full">{"Nazaj na tečaj"}</Button>
        </Link>
      </div>
    )
  }

  const nextLesson = getNextLesson()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-[#7C3AED]/20">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt="KidsLearnAI"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-heading font-bold text-lg text-[#2D2A3D]">KidsLearnAI</span>
          </Link>
          <Link href={`/courses/${slug}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              {"O tečaju"}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course progress hero */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-2 text-balance">
            {data.course.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#7C3AED]" />
              {data.completedLessons}/{data.totalLessons} lekcij
            </span>
            {data.progressPercent === 100 && (
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Trophy className="w-4 h-4" />
                {"Zaključeno!"}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#a78bfa] transition-all duration-700"
              style={{ width: `${data.progressPercent}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-[#7C3AED]">{data.progressPercent}% dokončano</p>
        </div>

        {/* Certificate - shown when course is 100% complete */}
        {data.progressPercent === 100 && (
          <div className="mb-8">
            <CourseCertificate slug={slug} />
          </div>
        )}

        {/* Continue button */}
        {nextLesson && data.progressPercent < 100 && (
          <Link href={`/courses/${slug}/learn/${nextLesson.id}`}>
            <Card className="mb-8 border-2 border-[#7C3AED]/20 bg-gradient-to-r from-[#F5F3FF] to-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#7C3AED] font-semibold mb-0.5">{"Nadaljuj z učenjem"}</p>
                    <p className="font-heading font-bold text-[#2D2A3D]">{nextLesson.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {nextLesson.duration_minutes} min
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7C3AED]" />
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Modules */}
        <div className="space-y-6">
          {data.modules.map(mod => {
            const isModComplete = mod.completedLessons === mod.totalLessons && mod.totalLessons > 0
            const modProgress = mod.totalLessons > 0 ? Math.round((mod.completedLessons / mod.totalLessons) * 100) : 0

            return (
              <div key={mod.index}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                    isModComplete ? "bg-emerald-100 text-emerald-700" : "bg-[#7C3AED]/10 text-[#7C3AED]"
                  )}>
                    {isModComplete ? <CheckCircle2 className="w-4 h-4" /> : mod.index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading font-bold text-[#2D2A3D]">{mod.title}</h2>
                  </div>
                </div>

                <div className="space-y-2 ml-4 border-l-2 border-muted pl-4">
                  {mod.lessons.map(lesson => {
                    const isCompleted = lesson.progress.status === "completed"
                    const isInProgress = lesson.progress.status === "in_progress"

                    return (
                      <Link key={lesson.id} href={`/courses/${slug}/learn/${lesson.id}`}>
                        <Card className={cn(
                          "border hover:shadow-sm transition-all cursor-pointer",
                          isCompleted && "border-emerald-200 bg-emerald-50/50",
                          isInProgress && "border-[#7C3AED]/20 bg-[#F5F3FF]/50",
                        )}>
                          <CardContent className="p-4 flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            ) : isInProgress ? (
                              <PlayCircle className="w-5 h-5 text-[#7C3AED] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium",
                                isCompleted ? "text-emerald-800" : "text-[#2D2A3D]"
                              )}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration_minutes} min
                                </span>
                                {lesson.content_type === "activity" && (
                                  <span className="text-amber-600 font-medium">Aktivnost</span>
                                )}
                                {lesson.content_type === "project" && (
                                  <span className="text-blue-600 font-medium">Projekt</span>
                                )}
                              </p>
                            </div>
                            {lesson.progress.quiz_score !== null && (
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                {lesson.progress.quiz_score}%
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
