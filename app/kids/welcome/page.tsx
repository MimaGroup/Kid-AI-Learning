"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { Button } from "@/components/ui/button"
import { Sparkles, Gamepad2, Trophy, ArrowRight, Brain, Rocket } from "lucide-react"

const STEPS = [
  {
    id: "welcome",
    badge: "Dobrodosli!",
    title: "Zdravo, jaz sem Byte!",
    description:
      "Tvoj novi AI prijatelj. Skupaj bova raziskovala svet umetne inteligence skozi zabavne igre in izzive.",
    image: "waving",
    icon: Sparkles,
    color: "from-[hsl(263,84%,58%)] to-[hsl(263,84%,45%)]",
  },
  {
    id: "games",
    badge: "Igre",
    title: "Ucenje skozi igro",
    description:
      "Resuj uganke, igraj kvize in odkrivaj kako deluje AI. Vsaka igra te nauci nekaj novega -- in prinese tocke!",
    image: "excited",
    icon: Gamepad2,
    color: "from-[hsl(170,48%,53%)] to-[hsl(170,48%,40%)]",
  },
  {
    id: "rewards",
    badge: "Nagrade",
    title: "Zasluzi si znacke",
    description:
      "Za vsako dokoncano igro dobis tocke in napredovanje. Zberi vse znacke in postani AI prvak!",
    image: "celebrating",
    icon: Trophy,
    color: "from-[hsl(14,100%,65%)] to-[hsl(14,100%,55%)]",
  },
]

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const step = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1
  const Icon = step.icon

  const handleNext = () => {
    if (isLastStep) {
      // Mark onboarding as complete
      localStorage.setItem("onboarding_completed", "true")
      // Go straight to the first game
      router.push("/kids/games/ai-quiz")
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("onboarding_completed", "true")
    router.push("/kids/home")
  }

  return (
    <div className="min-h-screen bg-[hsl(30,25%,96%)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[hsl(263,84%,58%)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[hsl(170,48%,63%)]/5 rounded-full blur-3xl" />
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm text-[hsl(268,8%,50%)] hover:text-[hsl(252,20%,20%)] transition-colors z-10"
      >
        Preskoci
      </button>

      {/* Main card */}
      <div className="max-w-lg w-full relative z-10">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-8 bg-[hsl(263,84%,58%)]"
                  : i < currentStep
                    ? "w-2 bg-[hsl(263,84%,58%)]/40"
                    : "w-2 bg-[hsl(30,16%,88%)]"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-[hsl(30,16%,88%)] overflow-hidden">
          {/* Top colored section */}
          <div className={`bg-gradient-to-br ${step.color} p-8 pb-12 text-white text-center relative`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Icon className="w-3.5 h-3.5" />
              {step.badge}
            </div>

            {/* Byte character */}
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={
                  BYTE_CHARACTER.images[step.image as keyof typeof BYTE_CHARACTER.images] ||
                  BYTE_CHARACTER.images.waving ||
                  "/placeholder.svg"
                }
                alt={BYTE_CHARACTER.fullName}
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center -mt-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(30,16%,88%)]">
              <h1 className="text-2xl font-bold text-[hsl(252,20%,20%)] mb-3">
                {step.title}
              </h1>
              <p className="text-[hsl(268,8%,50%)] leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <Button
                onClick={handleNext}
                size="lg"
                className={`w-full bg-gradient-to-r ${step.color} hover:opacity-90 text-white rounded-xl h-14 text-base font-semibold gap-2 shadow-md`}
              >
                {isLastStep ? (
                  <>
                    <Rocket className="w-5 h-5" />
                    Igraj prvo igro!
                  </>
                ) : (
                  <>
                    Naprej
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              {isLastStep && (
                <button
                  onClick={handleSkip}
                  className="text-sm text-[hsl(268,8%,50%)] hover:text-[hsl(252,20%,20%)] transition-colors"
                >
                  Preskok na nadzorno plosco
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom encouragement */}
        <p className="text-center text-sm text-[hsl(268,8%,50%)] mt-6 flex items-center justify-center gap-1.5">
          <Brain className="w-4 h-4" />
          {currentStep === 0 && "Pripravljeni na pustolovscino?"}
          {currentStep === 1 && "8 razlicnih iger te caka!"}
          {currentStep === 2 && "Zberi vse znacke in postani prvak!"}
        </p>
      </div>
    </div>
  )
}
