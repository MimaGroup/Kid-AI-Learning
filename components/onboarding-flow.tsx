"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { trackOnboarding } from "@/lib/analytics"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import Image from "next/image"

interface OnboardingStep {
  title: string
  description: string
  byteImage: string
  byteSays?: string
  action?: {
    label: string
    href: string
  }
}

const PARENT_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Dobrodosli v AI Kids Learning!",
    description:
      "Veseli smo, da ste tu! Byte, nas prijazen robotek, bo vasega otroka vodil skozi zabavno ucenje o umetni inteligenci.",
    byteImage: BYTE_CHARACTER.images.waving,
    byteSays: "Zdravo! Jaz sem Byte in komaj cakam, da zaenemo!",
  },
  {
    title: "Ustvarite profil otroka",
    description: "Dodajte profil vasega otroka, da lahko prilagodimo ucno izkusnjo njegovi starosti in znanju.",
    byteImage: BYTE_CHARACTER.images.teaching,
    byteSays: "Ko bom vedel vec o tvojem otroku, mu bom lahko se bolje pomagal!",
    action: {
      label: "Dodaj profil otroka",
      href: "/parent/dashboard",
    },
  },
  {
    title: "Razisite aktivnosti",
    description:
      "Ponujamo kvize, igre, zgodbe in se vec! Vsaka aktivnost je zasnovana tako, da je ucenje zabavno in ucinkovito.",
    byteImage: BYTE_CHARACTER.images.hero,
    byteSays: "Imam toliko iger za pokazat! Katero bova najprej poskusila?",
  },
  {
    title: "Spremljajte napredek",
    description: "Spremljajte ucno pot vasega otroka s podrobnimi porocili, dosezki in vpogledi.",
    byteImage: BYTE_CHARACTER.images.celebrating,
    byteSays: "Skupaj bomo praznovali vsak uspeh!",
  },
  {
    title: "Odklenite vse moznosti",
    description:
      "S Premium nacrtom dobite neomejen dostop do vseh aktivnosti, naprednih funkcij in prilagojenih ucnih poti.",
    byteImage: BYTE_CHARACTER.images.thinking,
    byteSays: "S Premium paketom ti lahko pokazem se vec neverjetnih stvari!",
    action: {
      label: "Poglej pakete",
      href: "/pricing",
    },
  },
]

export function OnboardingFlow({
  userType = "parent",
  onComplete,
}: { userType?: "parent" | "child"; onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const steps = userType === "parent" ? PARENT_ONBOARDING_STEPS : PARENT_ONBOARDING_STEPS

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch(`/api/onboarding/progress?userType=${userType}`)
        const data = await response.json()

        if (!data.progress || !data.progress.completed) {
          setTimeout(() => {
            setIsVisible(true)
            trackOnboarding("started", 1, steps.length)
          }, 500)
        }
      } catch (error) {
        // Fallback to localStorage if API fails
        const hasCompletedOnboarding = localStorage.getItem(`onboarding_completed_${userType}`)
        if (!hasCompletedOnboarding) {
          setTimeout(() => {
            setIsVisible(true)
            trackOnboarding("started", 1, steps.length)
          }, 500)
        }
      }
    }

    checkOnboardingStatus()
  }, [userType, steps.length])

  const updateProgress = async (step: number, completed: boolean) => {
    try {
      await fetch("/api/onboarding/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          currentStep: step,
          totalSteps: steps.length,
          completed,
          metadata: {
            lastStepViewed: steps[step]?.title,
          },
        }),
      })
    } catch (error) {
      console.error("[v0] Error updating onboarding progress:", error)
    }
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      await updateProgress(nextStep, false)
      trackOnboarding("started", nextStep + 1, steps.length)
    } else {
      await handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = async () => {
    await updateProgress(currentStep, false)
    trackOnboarding("abandoned", currentStep + 1, steps.length)
    localStorage.setItem(`onboarding_completed_${userType}`, "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleComplete = async () => {
    await updateProgress(steps.length - 1, true)
    trackOnboarding("completed", steps.length, steps.length)
    localStorage.setItem(`onboarding_completed_${userType}`, "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleAction = (href: string) => {
    handleComplete()
    router.push(href)
  }

  if (!isVisible) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <>
      <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full animate-in zoom-in-95 bg-white">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl">Getting Started</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleSkip}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={step.byteImage || "/placeholder.svg"}
                  alt={BYTE_CHARACTER.fullName}
                  fill
                  className="object-cover rounded-full ring-4 ring-purple-200 shadow-lg"
                />
              </div>
              {step.byteSays && (
                <div className="inline-block bg-purple-50 border border-purple-200 rounded-2xl px-5 py-3 mb-4 max-w-sm">
                  <p className="text-sm text-purple-800 italic">{`"${step.byteSays}"`}</p>
                  <p className="text-xs text-purple-500 font-semibold mt-1">- Byte</p>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">{step.description}</p>
            </div>

            {step.action && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={() => handleAction(step.action!.href)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {step.action.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                  {currentStep < steps.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Get Started
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
