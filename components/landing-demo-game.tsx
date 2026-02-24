"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, XCircle, Sparkles } from "lucide-react"
import { BYTE_CHARACTER } from "@/lib/byte-character"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
  byteReaction: string
}

const DEMO_QUESTIONS: Question[] = [
  {
    question: "Kaj je umetna inteligenca (AI)?",
    options: [
      "Robot, ki izgleda kot človek",
      "Računalniški program, ki se uči iz podatkov",
      "Posebna vrsta interneta",
      "Igrica na telefonu",
    ],
    correct: 1,
    explanation: "AI je računalniški program, ki se lahko uči iz primerov in podatkov -- podobno kot se ti učiš iz izkušenj!",
    byteReaction: "Odlično! Točno tako -- AI se uči podobno kot ti!",
  },
  {
    question: "Kateri od teh je primer AI v vsakdanjem življenju?",
    options: [
      "Navaden kalkulator",
      "Knjiga v knjižnici",
      "Glasovni pomočnik (Siri, Alexa)",
      "Ura na steni",
    ],
    correct: 2,
    explanation: "Glasovni pomočniki uporabljajo AI, da razumejo tvoj glas in ti pomagajo z odgovori.",
    byteReaction: "Super! Siri in Alexa res uporabljata AI za razumevanje govora!",
  },
  {
    question: "Kako se AI nauči prepoznavati mačke na slikah?",
    options: [
      "Nekdo mu pove, kaj je mačka",
      "Pogleda tisoče slik mačk in se nauči vzorcev",
      "Prebere knjigo o mačkah",
      "AI ne more prepoznati mačk",
    ],
    correct: 1,
    explanation: "AI se uči iz velikega števila primerov. Čim več slik mačk vidi, bolje jih prepozna!",
    byteReaction: "Bravo! AI potrebuje veliko primerov za učenje -- prav kot ti!",
  },
]

export function LandingDemoGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState<"playing" | "answered" | "finished">("playing")

  const question = DEMO_QUESTIONS[currentQuestion]
  const isCorrect = selectedAnswer === question?.correct

  const handleAnswer = (index: number) => {
    if (gameState === "answered") return
    setSelectedAnswer(index)
    setGameState("answered")
    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion + 1 >= DEMO_QUESTIONS.length) {
      setGameState("finished")
    } else {
      setCurrentQuestion((c) => c + 1)
      setSelectedAnswer(null)
      setGameState("playing")
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setGameState("playing")
  }

  if (gameState === "finished") {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 rounded-3xl border-[#E2E8F0] shadow-xl text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-[#7C3AED]/20">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt="Byte"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#2D2A3D] mb-3">
              {score === DEMO_QUESTIONS.length
                ? "Bravo! Vse pravilno!"
                : score >= 2
                  ? "Odlično! Skoraj vse pravilno!"
                  : "Super poskus!"}
            </h3>
            <p className="text-lg text-[#64748B] mb-2">
              Tvoj rezultat: {score}/{DEMO_QUESTIONS.length}
            </p>
            <p className="text-base text-[#64748B] mb-8 max-w-md mx-auto">
              To je bil samo mali predokus! Registriraj se in odkleni vse igre, {"tečaje"} in izzive z Byte-om.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white hover:scale-105 transition-all"
                >
                  {"Začni brezplačno"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={handleRestart}
                className="text-lg px-8 py-6 rounded-full border-[#E2E8F0] text-[#64748B] hover:text-[#2D2A3D]"
              >
                Igraj znova
              </Button>
            </div>
            <p className="text-sm text-[#64748B] mt-4">
              Brez kreditne kartice. Brez obveznosti.
            </p>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
            Preizkusi
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-[#2D2A3D]">
            Preizkusi AI kviz
          </h2>
          <p className="text-lg text-[#64748B]">
            Odgovori na 3 {"vprašanja"} in odkrij, koliko {"že veš"} o umetni inteligenci!
          </p>
        </div>

        <Card className="p-6 md:p-8 rounded-3xl border-[#E2E8F0] shadow-xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-[#64748B]">
              {"Vprašanje"} {currentQuestion + 1} / {DEMO_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {DEMO_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full transition-colors ${
                    i < currentQuestion
                      ? "bg-[#7C3AED]"
                      : i === currentQuestion
                        ? "bg-[#7C3AED]/50"
                        : "bg-[#E2E8F0]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Byte avatar + question */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#7C3AED]/20">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt="Byte"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-[#F3E8FF] rounded-2xl rounded-tl-sm px-5 py-3">
              <p className="text-base font-semibold text-[#2D2A3D]">{question.question}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, i) => {
              let borderColor = "border-[#E2E8F0] hover:border-[#7C3AED]/40"
              let bgColor = "bg-white hover:bg-[#F5F3FF]"
              let icon = null

              if (gameState === "answered") {
                if (i === question.correct) {
                  borderColor = "border-[#10B981]"
                  bgColor = "bg-[#ECFDF5]"
                  icon = <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                } else if (i === selectedAnswer && !isCorrect) {
                  borderColor = "border-[#EF4444]"
                  bgColor = "bg-[#FEF2F2]"
                  icon = <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
                }
              } else if (selectedAnswer === i) {
                borderColor = "border-[#7C3AED]"
                bgColor = "bg-[#F5F3FF]"
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={gameState === "answered"}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 ${borderColor} ${bgColor} transition-all text-left ${
                    gameState !== "answered" ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-sm font-bold text-[#7C3AED] flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[#2D2A3D] font-medium flex-1">{option}</span>
                  {icon}
                </button>
              )
            })}
          </div>

          {/* Feedback + Next */}
          {gameState === "answered" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F3FF]">
                <Sparkles className="w-5 h-5 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#7C3AED] text-sm mb-1">
                    {isCorrect ? question.byteReaction : "Ni čisto prav, a ni problema!"}
                  </p>
                  <p className="text-sm text-[#64748B]">{question.explanation}</p>
                </div>
              </div>
              <Button
                onClick={handleNext}
                className="w-full py-6 rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white text-base font-semibold"
              >
                {currentQuestion + 1 >= DEMO_QUESTIONS.length ? "Poglej rezultat" : "Naslednje vprašanje"}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
