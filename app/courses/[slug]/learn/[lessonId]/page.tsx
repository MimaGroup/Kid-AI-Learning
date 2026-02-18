"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LessonQuiz } from "@/components/lesson-quiz"
import { cn } from "@/lib/utils"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import ReactMarkdown from "react-markdown"
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Clock,
  BookOpen,
  Brain,
  Lightbulb,
  Menu,
  X,
  ChevronLeft,
  Trophy,
} from "lucide-react"

interface LessonData {
  lesson: {
    id: string
    title: string
    content: string
    content_type: string
    duration_minutes: number
    module_index: number
    lesson_index: number
    key_concepts: Array<string | { name: string; explanation?: string }>
    moduleName: string
  }
  progress: { status: string; quiz_score: number | null }
  navigation: {
    prevLesson: { id: string; title: string } | null
    nextLesson: { id: string; title: string } | null
  }
  course: { id: string; title: string; slug: string; ageMin: number; ageMax: number }
}

function ExplanationContent({ text }: { text: string }) {
  // Clean up the text: remove "AI razlaga: ..." header line if present
  let cleaned = text.replace(/^AI razlaga:.*\n?/i, "").trim()
  // Convert double dashes to proper em-dashes
  cleaned = cleaned.replace(/\s--\s/g, " \u2014 ")

  // Split into paragraphs by double newlines or single newlines
  const paragraphs = cleaned.split(/\n\n+/).map(p => p.trim()).filter(Boolean)

  // If no double-newline splits found, try single newlines
  const blocks = paragraphs.length <= 1
    ? cleaned.split(/\n/).map(p => p.trim()).filter(Boolean)
    : paragraphs.flatMap(p => {
        // Within a paragraph, check if there are sub-lines
        const lines = p.split(/\n/).map(l => l.trim()).filter(Boolean)
        return lines
      })

  // Group consecutive lines into paragraphs and lists
  const elements: Array<{ type: "heading" | "paragraph" | "list"; content: string; items?: string[] }> = []
  let currentListItems: string[] = []

  const flushList = () => {
    if (currentListItems.length > 0) {
      elements.push({ type: "list", content: "", items: [...currentListItems] })
      currentListItems = []
    }
  }

  for (const block of blocks) {
    const isListItem = /^[-–•]\s/.test(block) || /^\d+[.)]\s/.test(block)
    const isHeading = block.endsWith("?") || block.endsWith("!") || (block.endsWith(":") && block.length < 60)

    if (isListItem) {
      currentListItems.push(block.replace(/^[-–•]\s*/, "").replace(/^\d+[.)]\s*/, ""))
    } else {
      flushList()
      if (isHeading && elements.length === 0) {
        elements.push({ type: "heading", content: block })
      } else {
        elements.push({ type: "paragraph", content: block })
      }
    }
  }
  flushList()

  return (
    <div className="pl-[42px] flex flex-col gap-3">
      {elements.map((el, i) => {
        if (el.type === "heading") {
          return (
            <p key={i} className="text-sm font-semibold text-[#2D2A3D]">
              {el.content}
            </p>
          )
        }
        if (el.type === "list" && el.items) {
          return (
            <ul key={i} className="flex flex-col gap-1.5 pl-1">
              {el.items.map((item, j) => (
                <li key={j} className="text-sm text-[#2D2A3D]/80 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-sm text-[#2D2A3D]/80 leading-relaxed">
            {el.content}
          </p>
        )
      })}
    </div>
  )
}

export default function LessonViewerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const lessonId = params.lessonId as string

  const [data, setData] = useState<LessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [markingComplete, setMarkingComplete] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [explainConcept, setExplainConcept] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [explaining, setExplaining] = useState(false)

  useEffect(() => {
    async function fetchLesson() {
      setLoading(true)
      try {
        const res = await fetch(`/api/courses/${slug}/lessons/${lessonId}`)
        if (res.status === 401) {
          router.push(`/auth/sign-in?redirect=/courses/${slug}/learn/${lessonId}`)
          return
        }
        if (res.status === 403) {
          router.push(`/courses/${slug}`)
          return
        }
        if (!res.ok) throw new Error("Failed to load")
        const json = await res.json()
        setData(json)
        setCompleted(json.progress?.status === "completed")
      } catch {
        router.push(`/courses/${slug}/learn`)
      } finally {
        setLoading(false)
      }
    }
    if (slug && lessonId) fetchLesson()
  }, [slug, lessonId, router])

  const markAsComplete = useCallback(async () => {
    if (!data || markingComplete) return
    setMarkingComplete(true)
    try {
      await fetch(`/api/courses/${slug}/lessons/${lessonId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      })
      setCompleted(true)
    } catch {
      // silent fail
    } finally {
      setMarkingComplete(false)
    }
  }, [data, slug, lessonId, markingComplete])

  const handleQuizComplete = async (score: number) => {
    try {
      await fetch(`/api/courses/${slug}/lessons/${lessonId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed", quiz_score: score }),
      })
      setCompleted(true)
    } catch {
      // silent fail
    }
  }

  const handleExplain = async (conceptName: string) => {
    setExplainConcept(conceptName)
    setExplanation(null)

    // Check for predefined explanation first
    const conceptObj = keyConcepts.find((c) => c.name === conceptName)
    if (conceptObj?.explanation) {
      setExplanation(conceptObj.explanation)
      return
    }

    setExplaining(true)
    try {
      const res = await fetch(`/api/courses/${slug}/lessons/${lessonId}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: conceptName }),
      })
      const json = await res.json()
      setExplanation(json.explanation)
    } catch {
      setExplanation("Poskusi znova pozneje.")
    } finally {
      setExplaining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    )
  }

  if (!data) return null

  const { lesson, navigation, course } = data
  const rawKeyConcepts = Array.isArray(lesson.key_concepts) ? lesson.key_concepts : []
  const keyConcepts = rawKeyConcepts.map((c) =>
    typeof c === "string" ? { name: c } : c
  ) as Array<{ name: string; explanation?: string }>

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBFF] to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 rounded-lg overflow-hidden ring-2 ring-[#7C3AED]/20">
                <Image
                  src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                  alt="KidsLearnAI"
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/courses/${slug}/learn`} className="text-sm text-muted-foreground hover:text-foreground transition-colors line-clamp-1">
              {course.title}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {completed && (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {"Zaključeno"}
              </Badge>
            )}
            <Link href={`/courses/${slug}/learn`}>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{"Vse lekcije"}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module / Lesson breadcrumb */}
        <div className="mb-6">
          <p className="text-xs text-[#7C3AED] font-semibold mb-1">
            Modul {lesson.module_index + 1}: {lesson.moduleName}
          </p>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] text-balance">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration_minutes} min
            </span>
            {lesson.content_type === "activity" && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Aktivnost</Badge>
            )}
            {lesson.content_type === "project" && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Projekt</Badge>
            )}
          </div>
        </div>

        {/* Lesson content */}
        <Card className="border-2 border-gray-100 mb-8">
          <CardContent className="p-6 md:p-10 prose prose-base max-w-none prose-headings:font-heading prose-headings:text-[#2D2A3D] prose-h1:text-2xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4 prose-li:text-foreground/80 prose-li:leading-relaxed prose-strong:text-[#2D2A3D] prose-hr:my-8 prose-hr:border-gray-200 prose-ul:my-4 prose-ol:my-4 prose-pre:my-4 prose-pre:rounded-xl prose-pre:bg-gray-50 prose-table:my-4 prose-blockquote:border-[#7C3AED]/30 prose-blockquote:bg-[#F5F3FF]/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-code:text-[#7C3AED] prose-code:bg-[#F5F3FF] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </CardContent>
        </Card>

        {/* Key concepts - clickable for AI explanation */}
        {keyConcepts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-[#2D2A3D] mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#7C3AED]" />
              {"Ključni pojmi"} <span className="text-xs text-muted-foreground font-normal">{"(klikni za razlago)"}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {keyConcepts.map((concept, i) => (
                <button
                  key={i}
                  onClick={() => handleExplain(concept.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                    explainConcept === concept.name
                      ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                      : "bg-[#F5F3FF] text-[#7C3AED] border-[#7C3AED]/20 hover:bg-[#7C3AED]/10"
                  )}
                >
                  {concept.name}
                </button>
              ))}
            </div>

            {/* AI explanation */}
            {explainConcept && (
              <Card className="mt-4 border-2 border-[#7C3AED]/20 bg-[#F5F3FF]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-semibold text-[#7C3AED]">
                        AI razlaga: {explainConcept}
                      </p>
                    </div>
                    <button
                      onClick={() => { setExplainConcept(null); setExplanation(null) }}
                      className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-white/50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {explaining ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pl-[42px]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      {"Razmišljam..."}
                    </div>
                  ) : (
                    <ExplanationContent text={explanation || ""} />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quiz section */}
        <div className="mb-8">
          <LessonQuiz
            courseSlug={slug}
            lessonId={lessonId}
            onQuizComplete={handleQuizComplete}
          />
        </div>

        {/* Mark as complete */}
        {!completed && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={markAsComplete}
              disabled={markingComplete}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-2 px-8"
            >
              {markingComplete ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              {"Označi kot zaključeno"}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between py-6 border-t border-border">
          {navigation.prevLesson ? (
            <Link href={`/courses/${slug}/learn/${navigation.prevLesson.id}`}>
              <Button variant="outline" className="rounded-full gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline line-clamp-1 max-w-[180px]">{navigation.prevLesson.title}</span>
                <span className="sm:hidden">{"Prejšnja"}</span>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {navigation.nextLesson ? (
            <Link href={`/courses/${slug}/learn/${navigation.nextLesson.id}`}>
              <Button className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full gap-2">
                <span className="hidden sm:inline line-clamp-1 max-w-[180px]">{navigation.nextLesson.title}</span>
                <span className="sm:hidden">{"Naslednja"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href={`/courses/${slug}/learn`}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-2">
                <Trophy className="w-4 h-4" />
                {"Nazaj na pregled"}
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
