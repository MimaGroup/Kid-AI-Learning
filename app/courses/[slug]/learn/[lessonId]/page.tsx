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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Module / Lesson breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F3FF] rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm font-medium text-[#7C3AED]">
              Modul {lesson.module_index + 1}: {lesson.moduleName}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#2D2A3D] text-balance leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-muted-foreground bg-gray-100 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{lesson.duration_minutes} min</span>
            </span>
            {lesson.content_type === "activity" && (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1">Aktivnost</Badge>
            )}
            {lesson.content_type === "project" && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">Projekt</Badge>
            )}
          </div>
        </div>

        {/* Lesson content - Kid-friendly styling */}
        <Card className="border-2 border-gray-100 mb-8 shadow-sm">
          <CardContent className="p-6 md:p-10 lg:p-12">
            <div className="lesson-content space-y-6">
              <ReactMarkdown
                components={{
                  // Style paragraphs - check if they contain only a strong tag (section heading)
                  p: ({ children, ...props }) => {
                    // Check if this paragraph is just a bold heading (contains only strong with emoji)
                    const childArray = Array.isArray(children) ? children : [children]
                    const firstChild = childArray[0]
                    const isSectionHeading = 
                      childArray.length <= 2 && 
                      typeof firstChild === 'object' && 
                      firstChild !== null &&
                      'type' in firstChild &&
                      (firstChild as { type?: { name?: string } }).type?.name === 'strong'
                    
                    if (isSectionHeading) {
                      return (
                        <div className="mt-10 mb-5 pb-3 border-b-2 border-[#7C3AED]/20 first:mt-0">
                          <h2 className="text-xl md:text-2xl font-heading font-bold text-[#2D2A3D] flex items-center gap-2">
                            {children}
                          </h2>
                        </div>
                      )
                    }
                    
                    return (
                      <p className="text-base md:text-lg text-[#2D2A3D]/80 leading-[1.8] mb-4" {...props}>
                        {children}
                      </p>
                    )
                  },
                  // Style bold/strong text
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[#2D2A3D]">{children}</strong>
                  ),
                  // Style headings
                  h1: ({ children }) => (
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-6 mt-8 first:mt-0">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <div className="mt-10 mb-5 pb-3 border-b-2 border-[#7C3AED]/20 first:mt-0">
                      <h2 className="text-xl md:text-2xl font-heading font-bold text-[#2D2A3D]">{children}</h2>
                    </div>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg md:text-xl font-heading font-bold text-[#7C3AED] mt-8 mb-4">{children}</h3>
                  ),
                  // Style lists
                  ul: ({ children }) => (
                    <ul className="my-6 pl-2 space-y-3">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-6 pl-2 space-y-3 list-decimal list-inside marker:text-[#7C3AED] marker:font-semibold">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-base md:text-lg text-[#2D2A3D]/80 leading-[1.8] flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#7C3AED] mt-2.5 flex-shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  // Style blockquotes as callout boxes
                  blockquote: ({ children }) => (
                    <div className="my-6 p-5 md:p-6 bg-[#F5F3FF] border-l-4 border-[#7C3AED] rounded-r-xl">
                      <div className="text-base md:text-lg text-[#2D2A3D]/90 leading-relaxed">{children}</div>
                    </div>
                  ),
                  // Style horizontal rules
                  hr: () => (
                    <hr className="my-10 border-gray-200" />
                  ),
                  // Style links
                  a: ({ children, href }) => (
                    <a href={href} className="text-[#7C3AED] font-medium underline underline-offset-2 hover:text-[#6B2FD6] transition-colors">
                      {children}
                    </a>
                  ),
                  // Style code
                  code: ({ children }) => (
                    <code className="text-[#7C3AED] bg-[#F5F3FF] px-2 py-1 rounded-md font-medium text-sm">{children}</code>
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Key concepts - clickable for AI explanation */}
        {keyConcepts.length > 0 && (
          <Card className="mb-8 border-2 border-[#7C3AED]/10 bg-gradient-to-br from-[#F5F3FF]/50 to-white">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-heading font-bold text-[#2D2A3D] mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#7C3AED]" />
                </div>
                {"Ključni pojmi"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{"Klikni na pojem, da izveš več!"}</p>
              <div className="flex flex-wrap gap-3">
                {keyConcepts.map((concept, i) => (
                  <button
                    key={i}
                    onClick={() => handleExplain(concept.name)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm md:text-base font-medium transition-all border-2 shadow-sm hover:shadow-md",
                      explainConcept === concept.name
                        ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-[#7C3AED]/25"
                        : "bg-white text-[#7C3AED] border-[#7C3AED]/20 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5"
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
            </CardContent>
          </Card>
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
          <Card className="mb-8 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-2">{"Si prebral/-a lekcijo?"}</h3>
              <p className="text-sm text-muted-foreground mb-5">{"Označi kot zaključeno in nadaljuj z učenjem!"}</p>
              <Button
                onClick={markAsComplete}
                disabled={markingComplete}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 px-8 h-12 text-base shadow-md hover:shadow-lg transition-all"
              >
                {markingComplete ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {"Zaključi lekcijo"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <Card className="border-2 border-gray-100 bg-gray-50/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-4">
              {navigation.prevLesson ? (
                <Link href={`/courses/${slug}/learn/${navigation.prevLesson.id}`} className="flex-1 max-w-[45%]">
                  <Button variant="outline" className="w-full rounded-xl gap-2 h-auto py-3 px-4 justify-start hover:bg-white hover:border-[#7C3AED]/30 transition-all">
                    <ChevronLeft className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex flex-col items-start text-left min-w-0">
                      <span className="text-xs text-muted-foreground">{"Prejšnja lekcija"}</span>
                      <span className="text-sm font-medium text-[#2D2A3D] line-clamp-1">{navigation.prevLesson.title}</span>
                    </div>
                  </Button>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {navigation.nextLesson ? (
                <Link href={`/courses/${slug}/learn/${navigation.nextLesson.id}`} className="flex-1 max-w-[45%]">
                  <Button className="w-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-xl gap-2 h-auto py-3 px-4 justify-end transition-all shadow-md hover:shadow-lg">
                    <div className="flex flex-col items-end text-right min-w-0">
                      <span className="text-xs text-white/80">{"Naslednja lekcija"}</span>
                      <span className="text-sm font-medium line-clamp-1">{navigation.nextLesson.title}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${slug}/learn`} className="flex-1 max-w-[45%]">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-auto py-3 px-4 justify-center transition-all shadow-md hover:shadow-lg">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">{"Nazaj na pregled"}</span>
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
