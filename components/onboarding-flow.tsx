"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface OnboardingStep {
  title: string
  description: string
  icon: string
  action?: {
    label: string
    href: string
  }
}

const PARENT_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Welcome to AI Kids Learning!",
    description:
      "We're excited to help your child learn with AI-powered activities. Let's get you started with a quick tour.",
    icon: "👋",
  },
  {
    title: "Create Child Profiles",
    description: "Add your children's profiles to track their progress and customize their learning experience.",
    icon: "👶",
    action: {
      label: "Add Child Profile",
      href: "/parent/dashboard",
    },
  },
  {
    title: "Explore Activities",
    description:
      "We offer quizzes, games, storytelling, and more! Each activity is designed to make learning fun and engaging.",
    icon: "🎮",
  },
  {
    title: "Track Progress",
    description: "Monitor your child's learning journey with detailed progress reports, achievements, and insights.",
    icon: "📊",
  },
  {
    title: "Upgrade for More",
    description:
      "Get unlimited access to all activities, advanced features, and personalized learning paths with Premium.",
    icon: "⭐",
    action: {
      label: "View Plans",
      href: "/pricing",
    },
  },
]

export function OnboardingFlow({ userType = "parent" }: { userType?: "parent" | "child" }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const steps = userType === "parent" ? PARENT_ONBOARDING_STEPS : PARENT_ONBOARDING_STEPS

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(`onboarding_completed_${userType}`)
    if (!hasCompletedOnboarding) {
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [userType])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem(`onboarding_completed_${userType}`, "true")
    setIsVisible(false)
  }

  const handleComplete = () => {
    localStorage.setItem(`onboarding_completed_${userType}`, "true")
    setIsVisible(false)
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full animate-in zoom-in-95">
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
            <div className="text-center py-8">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">{step.description}</p>
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
