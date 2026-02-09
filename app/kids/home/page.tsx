"use client"
import Link from "next/link"
import { RecommendedActivities } from "@/components/recommended-activities"
import { GamificationDisplay } from "@/components/gamification-display"
import { DailyChallenges } from "@/components/daily-challenges"
import { Button } from "@/components/ui/button"
import { TutorialTour } from "@/components/tutorial-tour"
import { AppNavigation } from "@/components/app-navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import Image from "next/image"

export default function KidsHome() {
  const kidsTourSteps = [
    {
      target: ".gamification-display",
      title: "Welcome to AI Kids Learning! 🎉",
      content: "This shows your points, level, and badges. Complete activities to level up and earn rewards!",
      position: "bottom" as const,
    },
    {
      target: ".daily-challenges",
      title: "Daily Challenges 🎯",
      content: "Complete these special challenges each day to earn bonus points and unlock achievements!",
      position: "bottom" as const,
    },
    {
      target: ".activities-grid",
      title: "Learning Games 🎮",
      content:
        "Choose from fun games to learn about AI, math, words, and more. Each game helps you learn something new!",
      position: "top" as const,
    },
    {
      target: ".library-link",
      title: "Learning Library 📚",
      content: "Watch educational videos, read stories, and explore fun facts about AI and technology!",
      position: "top" as const,
    },
  ]

  const activities = [
    {
      id: "detective",
      title: "AI Detective Game",
      description: "Discover which items use AI technology!",
      icon: "🕵️",
      color: "from-blue-400 to-blue-600",
      href: "/kids/games/ai-detective",
    },
    {
      id: "friend-creator",
      title: "AI Friend Creator",
      description: "Design your own AI companion!",
      icon: "🤖",
      color: "from-purple-400 to-purple-600",
      href: "/kids/ai-friend",
    },
    {
      id: "my-friends",
      title: "My Friends",
      description: "Connect and learn with friends!",
      icon: "👥",
      color: "from-pink-400 to-pink-600",
      href: "/friends",
    },
    {
      id: "pattern-training",
      title: "Pattern Training",
      description: "Train AI to recognize patterns!",
      icon: "🧠",
      color: "from-green-400 to-green-600",
      href: "/kids/games/pattern-training",
    },
    {
      id: "ai-quiz",
      title: "AI Quiz",
      description: "Test your AI knowledge!",
      icon: "🎯",
      color: "from-orange-400 to-orange-600",
      href: "/kids/games/ai-quiz",
    },
    {
      id: "math-adventure",
      title: "Math Adventure",
      description: "Solve math problems and level up!",
      icon: "🧮",
      color: "from-red-400 to-red-600",
      href: "/kids/games/math-adventure",
    },
    {
      id: "word-builder",
      title: "Word Builder",
      description: "Build your vocabulary!",
      icon: "📝",
      color: "from-yellow-400 to-yellow-600",
      href: "/kids/games/word-builder",
    },
    {
      id: "memory-match",
      title: "Memory Match",
      description: "Test your memory skills!",
      icon: "🧠",
      color: "from-teal-400 to-teal-600",
      href: "/kids/games/memory-match",
    },
    {
      id: "library",
      title: "Learning Library",
      description: "Videos, stories, and resources!",
      icon: "📚",
      color: "from-indigo-400 to-indigo-600",
      href: "/kids/library",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div className="absolute top-20 left-10 text-6xl opacity-25 animate-bounce" style={{ filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.4))' }}>🤖</div>
      <div className="absolute top-40 right-20 text-5xl opacity-25 animate-pulse" style={{ filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.4))' }}>🧠</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-25 animate-bounce delay-100" style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.4))' }}>💻</div>
      <div className="absolute bottom-60 right-1/3 text-5xl opacity-20 animate-pulse delay-200" style={{ filter: 'drop-shadow(0 4px 8px rgba(245, 158, 11, 0.4))' }}>⚙️</div>
      <div className="absolute top-1/2 right-10 text-4xl opacity-25 animate-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))' }}>📚</div>

      <TutorialTour tourId="kids-home" steps={kidsTourSteps} />

      <AppNavigation />
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="relative bg-gradient-to-r from-purple-500 via-purple-600 to-teal-500 text-white p-8 rounded-3xl mb-8 shadow-2xl overflow-hidden">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-90 hidden md:block">
            <Image
              src={BYTE_CHARACTER.images.waving || "/placeholder.svg"}
              alt={BYTE_CHARACTER.fullName}
              width={120}
              height={120}
              className="rounded-full ring-4 ring-white/20"
            />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="md:hidden flex-shrink-0">
              <Image
                src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                alt={BYTE_CHARACTER.fullName}
                width={64}
                height={64}
                className="rounded-full ring-2 ring-white/30"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">AI Learning Games</h2>
              <p className="text-purple-100 text-lg">Byte te vabi na ucno pustolovscino!</p>
            </div>
          </div>
        </div>

        <div className="mb-8 gamification-display">
          <GamificationDisplay />
        </div>

        <div className="mb-8 daily-challenges">
          <DailyChallenges />
        </div>

        <div className="mb-8">
          <RecommendedActivities />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">All Activities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 activities-grid">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={activity.href}
              className={`bg-gradient-to-r ${activity.color} text-white p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer block ${
                activity.id === "library" ? "library-link" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{activity.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{activity.title}</h3>
                  <p className="text-white/90 text-sm">{activity.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Your Learning Progress</h3>
            <Link href="/kids/badges">
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                View All Badges
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-200 hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-lg font-semibold text-blue-900">5 Badges</div>
              <div className="text-sm text-blue-700">Earned</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border-2 border-green-200 hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-lg font-semibold text-green-900">3 Day</div>
              <div className="text-sm text-green-700">Streak</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl border-2 border-purple-200 hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-lg font-semibold text-purple-900">Level 4</div>
              <div className="text-sm text-purple-700">AI Explorer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-24 mt-12">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C240,108 480,108 720,64 C960,20 1200,20 1440,64 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}
