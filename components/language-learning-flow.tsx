"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Volume2, X } from 'lucide-react'
import Link from "next/link"

type Screen = "intro" | "why-matters" | "topic-intro" | "lesson-content" | "worksheet" | "completion"

const languageTopics = [
  {
    id: "greetings",
    title: "Greetings & Introductions",
    category: "Basic Vocabulary",
  },
  {
    id: "colors",
    title: "Colors & Shapes", 
    category: "Basic Vocabulary",
  },
  {
    id: "family",
    title: "Family Members",
    category: "Relationships",
  },
]

export function LanguageLearningFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("intro")
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null)

  const readText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  if (currentScreen === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-[#FCD34D] rounded-full opacity-10 blur-2xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#6CD4C3] rounded-full opacity-10 blur-2xl" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              AI Language Learning
            </h1>
            <p className="text-xl text-white/80">
              Learn new languages with the help of AI - it's fun and interactive!
            </p>
          </div>

          {/* Subject card selection */}
          <div className="grid gap-6">
            {languageTopics.map((topic) => (
              <Card
                key={topic.id}
                className="p-8 bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                onClick={() => setCurrentScreen("why-matters")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-[#FCD34D] text-[#8B6914] mb-3">{topic.category}</Badge>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                      {topic.title}
                    </h3>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full bg-[#FCD34D] text-[#8B6914] hover:bg-[#F59E0B] font-bold px-8"
                  >
                    START
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-white/80">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "why-matters") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Close button */}
          <button
            onClick={() => setCurrentScreen("intro")}
            className="fixed top-8 right-8 w-14 h-14 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] flex items-center justify-center transition-all z-50"
          >
            <X className="w-6 h-6 text-[#0369A1]" />
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-white/60 text-lg mb-2">Greetings & Introductions (vocabulary)</p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
              Pick a job expert to see why learning this matters.
            </h1>
          </div>

          {/* Expert cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Translator */}
            <Card
              className="p-0 bg-gradient-to-br from-[#6CD4C3]/20 to-[#4FACAB]/10 border-[#6CD4C3]/40 hover:scale-105 transition-all cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedExpert("translator")
                setCurrentScreen("topic-intro")
              }}
            >
              <div className="aspect-square relative bg-gradient-to-br from-[#6CD4C3]/30 to-[#4FACAB]/20 flex items-center justify-center">
                <div className="text-9xl">🌍</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-heading text-3xl font-bold text-white">Translator</h3>
              </div>
            </Card>

            {/* Travel Guide */}
            <Card
              className="p-0 bg-gradient-to-br from-[#FCD34D]/20 to-[#F59E0B]/10 border-[#FCD34D]/40 hover:scale-105 transition-all cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedExpert("guide")
                setCurrentScreen("topic-intro")
              }}
            >
              <div className="aspect-square relative bg-gradient-to-br from-[#FCD34D]/30 to-[#F59E0B]/20 flex items-center justify-center">
                <div className="text-9xl">✈️</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-heading text-3xl font-bold text-white">Travel Guide</h3>
              </div>
            </Card>

            {/* Teacher */}
            <Card
              className="p-0 bg-gradient-to-br from-[#A78BFA]/20 to-[#7C3AED]/10 border-[#A78BFA]/40 hover:scale-105 transition-all cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedExpert("teacher")
                setCurrentScreen("topic-intro")
              }}
            >
              <div className="aspect-square relative bg-gradient-to-br from-[#A78BFA]/30 to-[#7C3AED]/20 flex items-center justify-center">
                <div className="text-9xl">👩‍🏫</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-heading text-3xl font-bold text-white">Teacher</h3>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "topic-intro") {
    const expertContent = {
      translator: "If you want to be a translator, learning greetings is super important! Greetings help you make friends in different countries and understand how people say hello. A translator needs to know how to greet people politely in many languages. This helps people from different countries talk to each other and work together!",
      guide: "Travel guides help people explore new places around the world! When you're a travel guide, you meet people from many countries. Knowing how to say hello, goodbye, and introduce yourself in different languages makes everyone feel welcome. Learning greetings helps you become an amazing travel guide who can help tourists feel comfortable anywhere they go!",
      teacher: "As a language teacher, I teach kids and adults how to speak new languages! Greetings are the first thing you learn because they help you make friends. When you can say 'hello' and 'nice to meet you' in another language, you can connect with people everywhere. Learning greetings helps teachers share the joy of languages with everyone!",
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Close button */}
          <button
            onClick={() => setCurrentScreen("why-matters")}
            className="fixed top-8 right-8 w-14 h-14 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] flex items-center justify-center transition-all z-50"
          >
            <X className="w-6 h-6 text-[#0369A1]" />
          </button>

          {/* Read to me button */}
          <button
            onClick={() => readText(expertContent[selectedExpert as keyof typeof expertContent])}
            className="fixed top-8 right-28 w-24 h-24 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all z-50 shadow-lg"
          >
            <Volume2 className="w-8 h-8 text-[#8B6914] mb-1" />
            <span className="text-xs font-bold text-[#8B6914]">READ<br />TO ME</span>
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-white/60 text-lg mb-2">Greetings & Introductions (vocabulary)</p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white">
              Why It Matters
            </h1>
          </div>

          {/* Content section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Character */}
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center">
                <div className="text-9xl">
                  {selectedExpert === "translator" ? "🌍" : selectedExpert === "guide" ? "✈️" : "👩‍🏫"}
                </div>
              </div>
            </div>

            {/* Speech bubble */}
            <div className="relative">
              <Card className="p-8 bg-white rounded-3xl shadow-2xl relative">
                {/* Speech bubble tail */}
                <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-r-[24px] border-r-white border-b-[20px] border-b-transparent" />
                
                <p className="text-[#2D2A3D] text-lg leading-relaxed">
                  {expertContent[selectedExpert as keyof typeof expertContent]}
                </p>
              </Card>
            </div>
          </div>

          {/* Next button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setCurrentScreen("lesson-content")}
              className="rounded-full bg-[#FCD34D] text-[#8B6914] hover:bg-[#F59E0B] font-bold px-12 py-8 text-2xl border-4 border-[#8B6914]/30"
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "lesson-content") {
    const lessonText = `Have you ever met someone from another country? Learning how to greet people in different languages is like having a superpower! 

In this lesson, we'll learn how to say hello, goodbye, and introduce ourselves in multiple languages. The way you greet someone shows respect and makes them feel welcome. Different cultures have different ways of greeting - some people shake hands, some bow, and some say special words!

We'll explore greetings from around the world and you'll learn how to make friends no matter where you go. By the end, you'll be able to greet people in at least 5 different languages! Let's start our language adventure together! 🌎✨`

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
          {/* Close button */}
          <button
            onClick={() => setCurrentScreen("topic-intro")}
            className="fixed top-8 right-8 w-14 h-14 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] flex items-center justify-center transition-all z-50"
          >
            <X className="w-6 h-6 text-[#0369A1]" />
          </button>

          {/* Read to me button */}
          <button
            onClick={() => readText(lessonText)}
            className="fixed top-8 right-28 w-24 h-24 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all z-50 shadow-lg"
          >
            <Volume2 className="w-8 h-8 text-[#8B6914] mb-1" />
            <span className="text-xs font-bold text-[#8B6914]">READ<br />TO ME</span>
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-white/60 text-lg mb-2">Greetings & Introductions (vocabulary)</p>
            <h1 className="font-heading text-5xl font-bold text-white mb-8">
              Topic Intro
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6 mb-12">
            <div className="text-white text-lg leading-relaxed space-y-4">
              <p className="flex items-start gap-3">
                <span className="text-3xl">🌟</span>
                <span>Have you ever met someone from another country? Learning how to greet people in different languages is like having a superpower!</span>
              </p>
              
              <p className="flex items-start gap-3">
                <span className="text-3xl">🧠</span>
                <span>In this lesson, we'll learn how to say hello, goodbye, and introduce ourselves in multiple languages. The way you greet someone shows respect and makes them feel welcome.</span>
              </p>
              
              <p className="flex items-start gap-3">
                <span className="text-3xl">📚</span>
                <span>We'll explore greetings from around the world and you'll learn how to make friends no matter where you go. By the end, you'll be able to greet people in at least 5 different languages!</span>
              </p>
              
              <p className="flex items-start gap-3">
                <span className="text-3xl">✍️</span>
                <span>Let's start our language adventure together! 🌎✨</span>
              </p>
            </div>

            {/* Copy button */}
            <Button
              variant="outline"
              className="bg-[#6CD4C3] text-white border-0 hover:bg-[#4FACAB] font-bold"
              onClick={() => {
                navigator.clipboard.writeText(lessonText)
              }}
            >
              Copy
            </Button>
          </div>

          {/* Character mascot */}
          <div className="flex justify-center mb-12">
            <div className="w-48 h-48 rounded-full bg-white border-8 border-[#6CD4C3] flex items-center justify-center shadow-2xl">
              <div className="text-8xl">🤖</div>
            </div>
          </div>

          {/* Next button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setCurrentScreen("worksheet")}
              className="rounded-full bg-[#FCD34D] text-[#8B6914] hover:bg-[#F59E0B] font-bold px-12 py-8 text-2xl border-4 border-[#8B6914]/30"
            >
              NEXT
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "worksheet") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-4xl font-bold text-white">Work Sheet</h1>
            <Button
              onClick={() => setCurrentScreen("worksheet")}
              className="bg-[#60A5FA] text-white hover:bg-[#3B82F6] rounded-full"
            >
              Give me one more
            </Button>
          </div>

          <h2 className="font-heading text-3xl font-bold text-white text-center mb-8">
            Greetings & Introductions
          </h2>

          {/* Questions */}
          <div className="space-y-6">
            {/* Question 1 */}
            <Card className="p-6 bg-white rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg mb-4">
                    <strong>Learning to greet people in different languages helps you __________ around the world.</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your answer.."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7C3AED] focus:outline-none"
                  />
                </div>
                <button
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all"
                  onClick={() => readText("Learning to greet people in different languages helps you make friends around the world.")}
                >
                  <Volume2 className="w-6 h-6 text-[#8B6914]" />
                  <span className="text-[8px] font-bold text-[#8B6914] mt-1">READ</span>
                </button>
              </div>
            </Card>

            {/* Question 2 */}
            <Card className="p-6 bg-white rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg mb-4"><strong>What is an example of a greeting?</strong></p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input type="radio" name="greeting" value="a" className="w-5 h-5" />
                      <span>A. Eating lunch</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input type="radio" name="greeting" value="b" className="w-5 h-5" />
                      <span>B. Saying "Hello, nice to meet you!" 👋</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input type="radio" name="greeting" value="c" className="w-5 h-5" />
                      <span>C. Playing a video game 🎮</span>
                    </label>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all"
                  onClick={() => readText("What is an example of a greeting?")}
                >
                  <Volume2 className="w-6 h-6 text-[#8B6914]" />
                  <span className="text-[8px] font-bold text-[#8B6914] mt-1">READ</span>
                </button>
              </div>
            </Card>

            {/* Question 3 */}
            <Card className="p-6 bg-white rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg mb-4">
                    <strong>List three ways people greet each other in different cultures! 🌍</strong>
                  </p>
                  <textarea
                    placeholder="Type your answer.."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#7C3AED] focus:outline-none resize-none"
                  />
                </div>
                <button
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all"
                  onClick={() => readText("List three ways people greet each other in different cultures")}
                >
                  <Volume2 className="w-6 h-6 text-[#8B6914]" />
                  <span className="text-[8px] font-bold text-[#8B6914] mt-1">READ</span>
                </button>
              </div>
            </Card>

            {/* Question 4 */}
            <Card className="p-6 bg-white rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg mb-4">
                    <strong>Greetings can help you make friends in different countries. True or False? 🤔</strong>
                  </p>
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-6 text-lg font-semibold">
                      True
                    </Button>
                    <Button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 py-6 text-lg font-semibold">
                      False
                    </Button>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FCD34D] hover:bg-[#F59E0B] flex flex-col items-center justify-center transition-all"
                  onClick={() => readText("Greetings can help you make friends in different countries. True or False?")}
                >
                  <Volume2 className="w-6 h-6 text-[#8B6914]" />
                  <span className="text-[8px] font-bold text-[#8B6914] mt-1">READ</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Show Answers button */}
          <div className="text-center mt-8">
            <Button
              size="lg"
              onClick={() => setCurrentScreen("completion")}
              className="rounded-full bg-[#FCD34D] text-[#8B6914] hover:bg-[#F59E0B] font-bold px-12 py-6 text-xl"
            >
              Show Answers
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "completion") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D2A3D] via-[#1a1825] to-[#0f0d15] relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Great job mastering Greetings & Introductions! 
            </h1>
            <p className="text-xl text-white/80">
              Now you can try a fun project — write a story or creative piece, create art, or build a STEM activity to show what you learned!
            </p>
          </div>

          {/* Project cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Write with AI */}
            <Card className="p-0 bg-white border-0 hover:scale-105 transition-all cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-square relative bg-gradient-to-br from-[#FFF8DC] to-[#FFDAB9] flex items-center justify-center">
                <div className="text-9xl">📝</div>
              </div>
              <div className="p-6 text-center bg-white">
                <div className="inline-block px-6 py-2 bg-white border-2 border-dashed border-gray-300 rounded-full mb-4">
                  <span className="font-heading text-xl font-bold text-gray-900">WRITE WITH AI</span>
                </div>
              </div>
            </Card>

            {/* Magic Art */}
            <Card className="p-0 bg-white border-0 hover:scale-105 transition-all cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-square relative bg-gradient-to-br from-[#0D5C63] to-[#1A8B92] flex items-center justify-center">
                <div className="text-9xl">🎨</div>
              </div>
              <div className="p-6 text-center bg-white">
                <div className="inline-block px-6 py-2 bg-white border-2 border-dashed border-gray-300 rounded-full mb-4">
                  <span className="font-heading text-xl font-bold text-gray-900">MAGIC ART</span>
                </div>
              </div>
            </Card>

            {/* STEM with AI */}
            <Card className="p-0 bg-white border-0 hover:scale-105 transition-all cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-square relative bg-gradient-to-br from-[#FFF4E6] to-[#FFE4B5] flex items-center justify-center">
                <div className="text-9xl">🔬</div>
              </div>
              <div className="p-6 text-center bg-white">
                <div className="inline-block px-6 py-2 bg-white border-2 border-dashed border-gray-300 rounded-full mb-4">
                  <span className="font-heading text-xl font-bold text-gray-900">STEM WITH AI</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Back to home button */}
          <div className="text-center">
            <Link href="/">
              <Button
                size="lg"
                className="rounded-full bg-white text-[#7C3AED] hover:bg-gray-100 font-bold px-12 py-6 text-xl"
              >
                Back to Learning Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
