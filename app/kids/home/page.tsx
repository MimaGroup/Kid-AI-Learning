"use client"
import Link from "next/link"
import { RecommendedActivities } from "@/components/recommended-activities"
import { GamificationDisplay } from "@/components/gamification-display"
import { DailyChallenges } from "@/components/daily-challenges"
import { Button } from "@/components/ui/button"
import { TutorialTour } from "@/components/tutorial-tour"
import { AppNavigation } from "@/components/app-navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <TutorialTour tourId="kids-home" steps={kidsTourSteps} />

      <AppNavigation />
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-2xl mb-8">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🎮</div>
            <div>
              <h2 className="text-2xl font-bold">AI Learning Games</h2>
              <p className="text-pink-100">Interactive AI games and activities for kids!</p>
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
              className={`bg-gradient-to-r ${activity.color} text-white p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer block ${
                activity.id === "library" ? "library-link" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{activity.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{activity.title}</h3>
                  <p className="text-white/90">{activity.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Your Learning Progress</h3>
            <Link href="/kids/badges">
              <Button variant="outline" size="sm">
                View All Badges
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-lg font-semibold text-blue-900">5 Badges</div>
              <div className="text-sm text-blue-700">Earned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-lg font-semibold text-green-900">3 Day</div>
              <div className="text-sm text-green-700">Streak</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-lg font-semibold text-purple-900">Level 4</div>
              <div className="text-sm text-purple-700">AI Explorer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
