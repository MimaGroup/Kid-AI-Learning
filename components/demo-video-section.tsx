"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import {
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Trophy,
  BarChart3,
  Layout,
  Star,
  Brain,
  Shield,
  Sparkles,
} from "lucide-react"

interface DemoStep {
  id: number
  title: string
  byteSpeech: string
  byteImage: string
  description: string
  icon: React.ReactNode
  color: string
  bgGradient: string
  mockup: React.ReactNode
}

// --- Mockup sub-components ---

function KidsDashboardMockup() {
  const games = [
    { name: "AI Kviz", icon: <Brain className="w-5 h-5 text-[#7C3AED]" />, color: "bg-[#F3E8FF]", progress: 65 },
    { name: "Spomin", icon: <Gamepad2 className="w-5 h-5 text-[#0EA5E9]" />, color: "bg-[#E0F2FE]", progress: 40 },
    { name: "Besede", icon: <Sparkles className="w-5 h-5 text-[#F59E0B]" />, color: "bg-[#FEF3C7]", progress: 80 },
    { name: "Vzorci", icon: <Star className="w-5 h-5 text-[#10B981]" />, color: "bg-[#ECFDF5]", progress: 25 },
  ]

  return (
    <div className="bg-white rounded-2xl p-5 shadow-inner border border-[#E2E8F0] h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-[#F3E8FF] flex items-center justify-center">
          <span className="text-sm font-bold text-[#7C3AED]">A</span>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2D2A3D]">Zdravo, Ana!</p>
          <p className="text-xs text-[#64748B]">Nivo 3 - Raziskovalec</p>
        </div>
        <div className="ml-auto flex items-center gap-1 bg-[#FEF3C7] px-2.5 py-1 rounded-full">
          <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-xs font-bold text-[#92400E]">250</span>
        </div>
      </div>
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">Izberi igro</p>
      <div className="grid grid-cols-2 gap-2.5">
        {games.map((game) => (
          <div
            key={game.name}
            className="rounded-xl border border-[#E2E8F0] p-3 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-lg ${game.color} flex items-center justify-center mb-2`}>
              {game.icon}
            </div>
            <p className="text-xs font-bold text-[#2D2A3D] mb-1.5">{game.name}</p>
            <div className="w-full h-1.5 rounded-full bg-[#F1F5F9]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3]"
                style={{ width: `${game.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GamePlayMockup() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-inner border border-[#E2E8F0] h-full">
      <div className="flex items-center justify-between mb-3">
        <Badge className="bg-[#F3E8FF] text-[#7C3AED] border-0 text-xs">Vprasanje 3/10</Badge>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
          ))}
          {[4, 5].map((i) => (
            <Star key={i} className="w-3.5 h-3.5 text-[#E2E8F0]" />
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA] rounded-xl p-4 mb-4">
        <p className="text-sm font-bold text-[#2D2A3D] text-center">
          Kaj pomeni AI?
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { text: "Umetna inteligenca", correct: true },
          { text: "Avtomatski internet", correct: false },
          { text: "Aktivna igra", correct: false },
        ].map((answer, i) => (
          <button
            key={i}
            onClick={() => setSelectedAnswer(i)}
            className={`w-full text-left p-3 rounded-xl border-2 transition-all text-xs font-medium ${
              selectedAnswer === i
                ? answer.correct
                  ? "border-[#10B981] bg-[#ECFDF5] text-[#065F46]"
                  : "border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]"
                : "border-[#E2E8F0] hover:border-[#7C3AED]/40 text-[#2D2A3D]"
            }`}
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#F1F5F9] text-[10px] font-bold mr-2 text-[#64748B]">
              {String.fromCharCode(65 + i)}
            </span>
            {answer.text}
          </button>
        ))}
      </div>
      {selectedAnswer === 0 && (
        <div className="mt-3 text-center">
          <p className="text-xs font-bold text-[#10B981]">Pravilno! +10 tock</p>
        </div>
      )}
    </div>
  )
}

function BadgesMockup() {
  const badges = [
    { name: "AI Raziskovalec", icon: <Brain className="w-5 h-5 text-white" />, bg: "bg-[#7C3AED]", earned: true },
    { name: "Kviz Zvezda", icon: <Star className="w-5 h-5 text-white" />, bg: "bg-[#F59E0B]", earned: true },
    { name: "Kod Genij", icon: <Sparkles className="w-5 h-5 text-white" />, bg: "bg-[#0EA5E9]", earned: true },
    { name: "Super Ucenec", icon: <Trophy className="w-5 h-5 text-white" />, bg: "bg-[#10B981]", earned: false },
  ]

  return (
    <div className="bg-white rounded-2xl p-5 shadow-inner border border-[#E2E8F0] h-full">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-[#FEF3C7] px-3 py-1.5 rounded-full mb-3">
          <Trophy className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs font-bold text-[#92400E]">3 od 4 znack</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#F1F5F9] mb-1">
          <div className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] w-[75%] transition-all" />
        </div>
        <p className="text-[10px] text-[#64748B]">Se 1 znacka do naslednjega nivoja!</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.name}
            className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
              badge.earned
                ? "border-[#E2E8F0] bg-white shadow-sm"
                : "border-dashed border-[#CBD5E1] bg-[#F8FAFC] opacity-50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center mb-2 ${
              badge.earned ? "shadow-md" : "grayscale"
            }`}>
              {badge.icon}
            </div>
            <p className="text-[10px] font-bold text-[#2D2A3D] text-center leading-tight">{badge.name}</p>
            {badge.earned && (
              <span className="text-[9px] text-[#10B981] font-semibold mt-0.5">Osvojeno!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ParentDashboardMockup() {
  const weekData = [
    { day: "Pon", value: 45 },
    { day: "Tor", value: 60 },
    { day: "Sre", value: 30 },
    { day: "Cet", value: 75 },
    { day: "Pet", value: 90 },
    { day: "Sob", value: 50 },
    { day: "Ned", value: 40 },
  ]

  return (
    <div className="bg-white rounded-2xl p-5 shadow-inner border border-[#E2E8F0] h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-[#2D2A3D]">Starsevski pregled</p>
          <p className="text-xs text-[#64748B]">Tedensko porocilo</p>
        </div>
        <Shield className="w-5 h-5 text-[#10B981]" />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#F3E8FF] rounded-xl p-2.5 text-center">
          <p className="text-lg font-bold text-[#7C3AED]">4.5h</p>
          <p className="text-[10px] text-[#64748B]">Cas ucenja</p>
        </div>
        <div className="bg-[#ECFDF5] rounded-xl p-2.5 text-center">
          <p className="text-lg font-bold text-[#10B981]">12</p>
          <p className="text-[10px] text-[#64748B]">Aktivnosti</p>
        </div>
        <div className="bg-[#FEF3C7] rounded-xl p-2.5 text-center">
          <p className="text-lg font-bold text-[#F59E0B]">85%</p>
          <p className="text-[10px] text-[#64748B]">Tocnost</p>
        </div>
      </div>
      <p className="text-xs font-semibold text-[#64748B] mb-2">Tedenska aktivnost</p>
      <div className="flex items-end justify-between gap-1.5 h-16">
        {weekData.map((d) => (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-[#7C3AED] to-[#A78BFA] transition-all"
              style={{ height: `${d.value}%` }}
            />
            <span className="text-[9px] text-[#64748B] font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Main Component ---

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "Otroska nadzorna plosca",
    byteSpeech: "Tukaj izberes svojo igro! Vsaka te nauci nekaj novega o AI.",
    byteImage: BYTE_CHARACTER.images.waving,
    description: "Otrok dobi svoj profil z igrami, izzivi in napakom prilagojenim ucenjem.",
    icon: <Layout className="w-5 h-5" />,
    color: "#7C3AED",
    bgGradient: "from-[#F5F3FF] to-[#EDE9FE]",
    mockup: <KidsDashboardMockup />,
  },
  {
    id: 2,
    title: "Igranje AI iger",
    byteSpeech: "Skupaj se uciva! Odgovori na vprasanje in zasluzis tocke!",
    byteImage: BYTE_CHARACTER.images.teaching,
    description: "Interaktivne igre, ki otroke ucijo osnov umetne inteligence na zabaven nacin.",
    icon: <Gamepad2 className="w-5 h-5" />,
    color: "#0EA5E9",
    bgGradient: "from-[#F0F9FF] to-[#E0F2FE]",
    mockup: <GamePlayMockup />,
  },
  {
    id: 3,
    title: "Zasluzene znacke",
    byteSpeech: "Bravo! Zasluzil si novo znacko! Se naprej tako!",
    byteImage: BYTE_CHARACTER.images.celebrating,
    description: "Otroci zbirajo znacke, trofeje in tocke, ki jih motivirajo za nadaljnje ucenje.",
    icon: <Trophy className="w-5 h-5" />,
    color: "#F59E0B",
    bgGradient: "from-[#FFFBEB] to-[#FEF3C7]",
    mockup: <BadgesMockup />,
  },
  {
    id: 4,
    title: "Starsevski nadzor",
    byteSpeech: "Starsi vidijo tvoj napredek! Lahko so ponosni nate.",
    byteImage: BYTE_CHARACTER.images.thinking,
    description: "Starsi spremljajo napredek, cas ucenja in dosezke svojega otroka.",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "#10B981",
    bgGradient: "from-[#ECFDF5] to-[#D1FAE5]",
    mockup: <ParentDashboardMockup />,
  },
]

export function DemoVideoSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [byteAnimating, setByteAnimating] = useState(false)

  const goToStep = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeStep) return
      setIsTransitioning(true)
      setByteAnimating(true)
      setTimeout(() => {
        setActiveStep(index)
        setIsTransitioning(false)
      }, 300)
      setTimeout(() => {
        setByteAnimating(false)
      }, 800)
    },
    [isTransitioning, activeStep],
  )

  const nextStep = useCallback(() => {
    goToStep((activeStep + 1) % DEMO_STEPS.length)
  }, [activeStep, goToStep])

  const prevStep = useCallback(() => {
    goToStep((activeStep - 1 + DEMO_STEPS.length) % DEMO_STEPS.length)
  }, [activeStep, goToStep])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") nextStep()
      if (e.key === "ArrowLeft") prevStep()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextStep, prevStep])

  const currentStep = DEMO_STEPS[activeStep]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
            Oglejte si v akciji
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
            Kako deluje KidsLearnAI
          </h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
            Kliknite skozi korake in odkrijte, kako Byte vodi vase otroke skozi zabavno ucenje AI
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {DEMO_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => goToStep(i)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full transition-all font-medium text-sm ${
                i === activeStep
                  ? "text-white shadow-lg"
                  : "bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#7C3AED]/30 hover:text-[#7C3AED]"
              }`}
              style={
                i === activeStep
                  ? { backgroundColor: step.color }
                  : undefined
              }
              aria-label={`Korak ${i + 1}: ${step.title}`}
              aria-current={i === activeStep ? "step" : undefined}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                i === activeStep ? "bg-white/20" : "bg-[#F1F5F9] group-hover:bg-[#F3E8FF]"
              }`}>
                {i + 1}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Main demo area */}
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${currentStep.bgGradient} border border-[#E2E8F0]`}>
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left side: Byte + info */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              {/* Step badge */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
                  style={{ backgroundColor: currentStep.color }}
                >
                  {currentStep.icon}
                  Korak {activeStep + 1} od {DEMO_STEPS.length}
                </div>

                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-[#2D2A3D] mb-3">
                  {currentStep.title}
                </h3>
                <p className="text-[#64748B] text-base leading-relaxed mb-6">
                  {currentStep.description}
                </p>
              </div>

              {/* Byte with speech bubble */}
              <div className="flex items-end gap-4">
                <div className={`relative flex-shrink-0 transition-transform duration-500 ${byteAnimating ? "scale-95" : "scale-100"}`}>
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    <Image
                      src={currentStep.byteImage || "/placeholder.svg"}
                      alt={BYTE_CHARACTER.fullName}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
                </div>
                <div
                  className={`relative bg-white rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-lg border border-[#E2E8F0] max-w-[280px] transition-all duration-300 ${
                    isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#2D2A3D]">{currentStep.byteSpeech}</p>
                  <span className="text-xs text-[#7C3AED] font-medium mt-1 block">
                    -- {BYTE_CHARACTER.name}
                  </span>
                  {/* Speech bubble tail */}
                  <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white border-l border-b border-[#E2E8F0] rotate-45" />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="rounded-full border-[#E2E8F0] hover:bg-white text-[#64748B] bg-transparent"
                  aria-label="Prejsnji korak"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Nazaj
                </Button>
                <div className="flex gap-1.5">
                  {DEMO_STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToStep(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeStep ? "w-6 bg-[#7C3AED]" : "bg-[#CBD5E1] hover:bg-[#94A3B8]"
                      }`}
                      aria-label={`Korak ${i + 1}`}
                    />
                  ))}
                </div>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="rounded-full text-white"
                  style={{ backgroundColor: currentStep.color }}
                  aria-label="Naslednji korak"
                >
                  Naprej
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Right side: Mockup screen */}
            <div className="p-6 lg:p-10 flex items-center justify-center bg-white/40 backdrop-blur-sm">
              {/* Phone frame */}
              <div className="relative w-full max-w-[300px]">
                {/* Phone bezel */}
                <div className="bg-[#2D2A3D] rounded-[2.5rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="flex justify-center mb-2">
                    <div className="w-24 h-5 bg-[#1a1829] rounded-full" />
                  </div>
                  {/* Screen */}
                  <div
                    className={`bg-[#F8FAFC] rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
                      isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 py-2 bg-white">
                      <span className="text-[10px] font-semibold text-[#2D2A3D]">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3.5 h-2 border border-[#2D2A3D] rounded-sm relative">
                          <div className="absolute inset-0.5 bg-[#10B981] rounded-[1px]" />
                        </div>
                      </div>
                    </div>
                    {/* App header */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-[#F1F5F9]">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-bold bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">
                        KidsLearnAI
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-3 min-h-[320px]">
                      {currentStep.mockup}
                    </div>
                  </div>
                  {/* Home indicator */}
                  <div className="flex justify-center mt-2">
                    <div className="w-28 h-1 bg-[#64748B] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {DEMO_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => goToStep(i)}
              className={`text-center p-4 rounded-2xl transition-all cursor-pointer border ${
                i === activeStep
                  ? "bg-white shadow-lg border-[#E2E8F0] scale-105"
                  : "bg-transparent border-transparent hover:bg-white/60"
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <div style={{ color: step.color }}>{step.icon}</div>
              </div>
              <div className="text-sm font-bold text-[#2D2A3D]">{step.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
