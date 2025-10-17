"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Beaker, Sparkles, Trophy, ArrowLeft } from "lucide-react"

interface Experiment {
  id: string
  title: string
  description: string
  steps: string[]
  question: string
  options: string[]
  correct: number
  funFact: string
}

export default function ScienceLabPage() {
  const [currentExperiment, setCurrentExperiment] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  const experiments: Experiment[] = [
    {
      id: "color-mixing",
      title: "AI Color Mixing",
      description: "Learn how AI recognizes and mixes colors!",
      steps: [
        "AI cameras can see millions of colors",
        "Computers store colors as numbers (RGB)",
        "AI learns to identify colors by seeing many examples",
        "Let's test your color knowledge!",
      ],
      question: "What happens when you mix red and blue?",
      options: ["Green", "Purple", "Orange", "Yellow"],
      correct: 1,
      funFact: "AI uses color recognition to help self-driving cars see traffic lights!",
    },
    {
      id: "sound-waves",
      title: "Sound Recognition",
      description: "Discover how AI hears and understands sounds!",
      steps: [
        "Sound travels in waves through the air",
        "AI converts sound waves into patterns",
        "Voice assistants use AI to understand speech",
        "Let's test what you learned!",
      ],
      question: "How does AI understand your voice?",
      options: ["By reading your mind", "By analyzing sound patterns", "By guessing", "By magic"],
      correct: 1,
      funFact: "AI can recognize over 100 different languages and accents!",
    },
    {
      id: "plant-growth",
      title: "Smart Farming",
      description: "See how AI helps plants grow better!",
      steps: [
        "Plants need water, sunlight, and nutrients",
        "AI sensors monitor soil moisture and temperature",
        "Smart systems water plants at the perfect time",
        "Time to test your knowledge!",
      ],
      question: "How does AI help farmers?",
      options: [
        "By doing all the work",
        "By monitoring and optimizing plant care",
        "By making plants grow instantly",
        "By talking to plants",
      ],
      correct: 1,
      funFact: "AI-powered farms can use 90% less water than traditional farming!",
    },
  ]

  const experiment = experiments[currentExperiment]

  const handleNextStep = () => {
    if (currentStep < experiment.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    if (selectedAnswer === experiment.correct) {
      setScore(score + 1)
    }
  }

  const handleNextExperiment = () => {
    if (currentExperiment < experiments.length - 1) {
      setCurrentExperiment(currentExperiment + 1)
      setCurrentStep(0)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentExperiment(0)
    setCurrentStep(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setGameComplete(false)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardHeader>
              <div className="text-6xl mb-4">🏆</div>
              <CardTitle className="text-3xl text-green-600">Science Lab Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-green-600">
                {score}/{experiments.length}
              </div>
              <p className="text-xl text-gray-700">
                {score === experiments.length
                  ? "Perfect score! You're a science superstar!"
                  : score >= experiments.length / 2
                    ? "Great job! You're learning so much!"
                    : "Good effort! Try again to learn more!"}
              </p>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-blue-900">What You Learned:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>✓ How AI recognizes colors and patterns</li>
                  <li>✓ How voice assistants understand speech</li>
                  <li>✓ How AI helps in smart farming</li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} className="bg-green-600 hover:bg-green-700">
                  Try Again
                </Button>
                <Link href="/kids/home">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Beaker className="w-8 h-8 text-green-600" />
                <CardTitle className="text-2xl text-green-600">AI Science Lab</CardTitle>
              </div>
              <Badge variant="secondary">
                Experiment {currentExperiment + 1}/{experiments.length}
              </Badge>
            </div>
            <Progress value={((currentExperiment + 1) / experiments.length) * 100} className="h-2" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">{experiment.title}</h2>
              </div>
              <p className="text-gray-700 text-lg">{experiment.description}</p>
            </div>

            {currentStep < experiment.steps.length - 1 ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                      {currentStep + 1}
                    </div>
                    <h3 className="font-bold text-lg">Step {currentStep + 1}</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{experiment.steps[currentStep]}</p>
                </div>

                <div className="flex justify-between">
                  <Button onClick={handlePreviousStep} disabled={currentStep === 0} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={handleNextStep} className="bg-green-600 hover:bg-green-700">
                    Next Step
                  </Button>
                </div>
              </div>
            ) : !showResult ? (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">{experiment.question}</h3>
                  <div className="space-y-3">
                    {experiment.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-4 rounded-lg text-left transition-all ${
                          selectedAnswer === index
                            ? "bg-green-600 text-white border-2 border-green-700"
                            : "bg-white hover:bg-green-50 border-2 border-gray-200"
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-lg ${
                    selectedAnswer === experiment.correct
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                  }`}
                >
                  <div className="text-4xl mb-3">{selectedAnswer === experiment.correct ? "🎉" : "💡"}</div>
                  <h3 className="font-bold text-xl mb-2">
                    {selectedAnswer === experiment.correct ? "Correct!" : "Not quite!"}
                  </h3>
                  <p className="text-gray-700">
                    {selectedAnswer === experiment.correct
                      ? "Great job! You got it right!"
                      : `The correct answer is: ${experiment.options[experiment.correct]}`}
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-900">Fun Fact!</h4>
                  </div>
                  <p className="text-gray-700">{experiment.funFact}</p>
                </div>

                <Button onClick={handleNextExperiment} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  {currentExperiment < experiments.length - 1 ? "Next Experiment" : "See Results"}
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4" />
              <span>
                Score: {score}/{currentExperiment + (showResult ? 1 : 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
