"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, PlayCircle, ChevronDown, ChevronRight, BookOpen } from "lucide-react"
import { useState } from "react"

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

interface LessonSidebarProps {
  courseSlug: string
  courseTitle: string
  modules: Module[]
  currentLessonId?: string
  progressPercent: number
  completedLessons: number
  totalLessons: number
}

export function LessonSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  progressPercent,
  completedLessons,
  totalLessons,
}: LessonSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(() => {
    // Auto-expand the module containing the current lesson
    if (currentLessonId) {
      for (const mod of modules) {
        if (mod.lessons.some(l => l.id === currentLessonId)) {
          return new Set([mod.index])
        }
      }
    }
    return new Set([0])
  })

  const toggleModule = (index: number) => {
    setExpandedModules(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Course header */}
      <div className="p-4 border-b border-border">
        <Link href={`/courses/${courseSlug}`} className="text-sm text-[#7C3AED] hover:underline flex items-center gap-1 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{courseTitle}</span>
        </Link>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{completedLessons}/{totalLessons} lekcij</span>
          <span className="font-semibold text-[#7C3AED]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-[#7C3AED] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto">
        {modules.map(mod => {
          const isExpanded = expandedModules.has(mod.index)
          const isComplete = mod.completedLessons === mod.totalLessons && mod.totalLessons > 0

          return (
            <div key={mod.index} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggleModule(mod.index)}
                className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  isComplete
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-[#7C3AED]/10 text-[#7C3AED]"
                )}>
                  {isComplete ? <CheckCircle2 className="w-4 h-4" /> : mod.index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">{mod.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {mod.completedLessons}/{mod.totalLessons} lekcij
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="pb-2">
                  {mod.lessons.map(lesson => {
                    const isCurrent = lesson.id === currentLessonId
                    const isCompleted = lesson.progress.status === "completed"
                    const isInProgress = lesson.progress.status === "in_progress"

                    return (
                      <Link
                        key={lesson.id}
                        href={`/courses/${courseSlug}/learn/${lesson.id}`}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 pl-8 hover:bg-muted/50 transition-colors",
                          isCurrent && "bg-[#7C3AED]/5 border-l-2 border-[#7C3AED]",
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : isInProgress || isCurrent ? (
                          <PlayCircle className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm line-clamp-1",
                            isCurrent ? "font-semibold text-[#7C3AED]" : "text-foreground/80",
                            isCompleted && !isCurrent && "text-muted-foreground"
                          )}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{lesson.duration_minutes} min</p>
                        </div>
                        {lesson.progress.quiz_score !== null && (
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {lesson.progress.quiz_score}%
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
