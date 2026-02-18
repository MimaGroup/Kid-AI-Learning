"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Loader2, CheckCircle2, XCircle, Brain, Trophy, RotateCcw } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface LessonQuizProps {
  courseSlug: string
  lessonId: string
  onQuizComplete: (score: number) => void
}

export function LessonQuiz({ courseSlug, lessonId, onQuizComplete }: LessonQuizProps) {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startQuiz = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/courses/${courseSlug}/lessons/${lessonId}/quiz`, {
        method: "POST",
      })
      const data = await res.json()
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
        setStarted(true)
        setCurrentIndex(0)
        setCorrectCount(0)
        setFinished(false)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setError("Ni bilo mogoče ustvariti kviza. Poskusite znova.")
      }
    } catch {
      setError("Napaka pri nalaganju kviza. Poskusite znova.")
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === questions[currentIndex].correct) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      const score = Math.round(((correctCount + (selectedAnswer === questions[currentIndex].correct ? 0 : 0)) / questions.length) * 100)
      // Recalculate properly
      const finalCorrect = correctCount
      const finalScore = Math.round((finalCorrect / questions.length) * 100)
      setFinished(true)
      onQuizComplete(finalScore)
    } else {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  // Not started yet
  if (!started) {
    return (
      <Card className="border-2 border-[#7C3AED]/20 bg-[#F5F3FF]">
        <CardContent className="p-6 text-center">
          <Brain className="w-12 h-12 text-[#7C3AED] mx-auto mb-4" />
          <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-2">
            {"Preveri svoje znanje!"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {"AI bo ustvaril kviz na podlagi te lekcije. Pripravljen/a?"}
          </p>
          {error && <p className="text-sm text-destructive mb-4">{error}</p>}
          <Button
            onClick={startQuiz}
            disabled={loading}
            className="bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {loading ? "Ustvarjam kviz..." : "Začni kviz"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Finished
  if (finished) {
    const finalScore = Math.round((correctCount / questions.length) * 100)
    const isGreat = finalScore >= 75

    return (
      <Card className={cn(
        "border-2",
        isGreat ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
      )}>
        <CardContent className="p-6 text-center">
          <Trophy className={cn("w-12 h-12 mx-auto mb-4", isGreat ? "text-emerald-500" : "text-amber-500")} />
          <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-2">
            {isGreat ? "Odlično!" : "Dobro opravljeno!"}
          </h3>
          <p className="text-2xl font-bold text-[#2D2A3D] mb-1">{finalScore}%</p>
          <p className="text-sm text-muted-foreground mb-4">
            {correctCount}/{questions.length} pravilnih odgovorov
          </p>
          <Button
            onClick={startQuiz}
            variant="outline"
            className="rounded-full gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {"Ponovi kviz"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Active quiz
  const question = questions[currentIndex]

  return (
    <Card className="border-2 border-[#7C3AED]/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-1 rounded-full">
            {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-xs text-muted-foreground">
            {correctCount} pravilnih
          </span>
        </div>

        <h4 className="text-base font-semibold text-[#2D2A3D] mb-4">{question.question}</h4>

        <div className="space-y-2 mb-4">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i
            const isCorrect = i === question.correct
            const showResult = showExplanation

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={cn(
                  "w-full text-left p-3 rounded-xl border-2 transition-all text-sm",
                  !showResult && !isSelected && "border-gray-200 hover:border-[#7C3AED]/50 hover:bg-[#F5F3FF]",
                  !showResult && isSelected && "border-[#7C3AED] bg-[#F5F3FF]",
                  showResult && isCorrect && "border-emerald-400 bg-emerald-50",
                  showResult && isSelected && !isCorrect && "border-red-400 bg-red-50",
                  showResult && !isCorrect && !isSelected && "border-gray-100 opacity-60",
                  selectedAnswer !== null && "cursor-default",
                )}
              >
                <div className="flex items-center gap-2">
                  {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-blue-800">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <Button
            onClick={nextQuestion}
            className="w-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white rounded-full"
          >
            {currentIndex + 1 >= questions.length ? "Poglej rezultat" : "Naslednje vprašanje"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
