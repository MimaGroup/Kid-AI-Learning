"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TourStep {
  target: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
}

interface TutorialTourProps {
  tourId: string
  steps: TourStep[]
  onComplete?: () => void
}

export function TutorialTour({ tourId, steps, onComplete }: TutorialTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem(`tour_completed_${tourId}`)
    if (!hasCompletedTour) {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [tourId])

  useEffect(() => {
    if (isVisible && steps[currentStep]) {
      const targetElement = document.querySelector(steps[currentStep].target)
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        let top = 0
        let left = 0

        switch (steps[currentStep].position) {
          case "bottom":
            top = rect.bottom + scrollTop + 10
            left = rect.left + scrollLeft + rect.width / 2
            break
          case "top":
            top = rect.top + scrollTop - 10
            left = rect.left + scrollLeft + rect.width / 2
            break
          case "left":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.left + scrollLeft - 10
            break
          case "right":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.right + scrollLeft + 10
            break
        }

        setPosition({ top, left })

        targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
        targetElement.classList.add("tour-highlight")

        return () => {
          targetElement.classList.remove("tour-highlight")
        }
      }
    }
  }, [currentStep, isVisible, steps])

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
    localStorage.setItem(`tour_completed_${tourId}`, "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleComplete = () => {
    localStorage.setItem(`tour_completed_${tourId}`, "true")
    setIsVisible(false)
    onComplete?.()
  }

  if (!isVisible) return null

  const step = steps[currentStep]

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleSkip} />
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl p-6 max-w-md transform -translate-x-1/2"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <button onClick={handleSkip} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.content}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <Button onClick={handleNext}>{currentStep < steps.length - 1 ? "Next" : "Finish"}</Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.5);
          border-radius: 8px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(139, 92, 246, 0.3);
          }
        }
      `}</style>
    </>
  )
}
