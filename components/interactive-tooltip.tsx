"use client"

import { useState, useEffect } from "react"
import { X, Lightbulb } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface TooltipStep {
  id: string
  target: string
  title: string
  content: string
  position?: "top" | "bottom" | "left" | "right"
}

interface InteractiveTooltipProps {
  steps: TooltipStep[]
  onComplete?: () => void
  storageKey: string
}

export function InteractiveTooltip({ steps, onComplete, storageKey }: InteractiveTooltipProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    // Check if user has already seen these tooltips
    const hasSeenTooltips = localStorage.getItem(storageKey)
    if (!hasSeenTooltips && steps.length > 0) {
      setIsVisible(true)
      positionTooltip()
    }
  }, [storageKey, steps])

  useEffect(() => {
    if (isVisible && steps[currentStep]) {
      positionTooltip()
    }
  }, [currentStep, isVisible, steps])

  const positionTooltip = () => {
    const step = steps[currentStep]
    if (!step) return

    const targetElement = document.querySelector(step.target)
    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const tooltipWidth = 320
    const tooltipHeight = 200

    let top = 0
    let left = 0

    switch (step.position || "bottom") {
      case "top":
        top = rect.top - tooltipHeight - 10
        left = rect.left + rect.width / 2 - tooltipWidth / 2
        break
      case "bottom":
        top = rect.bottom + 10
        left = rect.left + rect.width / 2 - tooltipWidth / 2
        break
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2
        left = rect.left - tooltipWidth - 10
        break
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2
        left = rect.right + 10
        break
    }

    setPosition({ top, left })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem(storageKey, "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleComplete = () => {
    localStorage.setItem(storageKey, "true")
    setIsVisible(false)
    onComplete?.()
  }

  if (!isVisible || !steps[currentStep]) return null

  const step = steps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleSkip} />

      {/* Tooltip */}
      <Card
        className="fixed z-50 w-80 shadow-2xl border-2 border-primary"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">{step.title}</h3>
            </div>
            <button onClick={handleSkip} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{step.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Skip
              </Button>
              <Button size="sm" onClick={handleNext}>
                {currentStep < steps.length - 1 ? "Next" : "Got it!"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
