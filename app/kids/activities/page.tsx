"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSubscription } from "@/hooks/use-subscription"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { hasPremium, loading } = useSubscription()
  const router = useRouter()

  const activities = [
    {
      id: "ai-detective",
      title: "AI Detective Game",
      description: "Discover which items use AI technology!",
      category: "games",
      difficulty: "Beginner",
      icon: "🕵️",
      color: "from-blue-500 to-cyan-500",
      href: "/kids/games/ai-detective",
      isPremium: false,
    },
    {
      id: "pattern-training",
      title: "Pattern Training",
      description: "Train AI to recognize patterns!",
      category: "learning",
      difficulty: "Intermediate",
      icon: "🧠",
      color: "from-green-500 to-emerald-500",
      href: "/kids/games/pattern-training",
      isPremium: true,
    },
    {
      id: "ai-friend",
      title: "AI Friend Creator",
      description: "Design your own AI companion!",
      category: "creative",
      difficulty: "Beginner",
      icon: "🤖",
      color: "from-purple-500 to-pink-500",
      href: "/kids/ai-friend",
      isPremium: true,
    },
    {
      id: "ai-quiz",
      title: "AI Quiz Challenge",
      description: "Test your AI knowledge!",
      category: "games",
      difficulty: "All Levels",
      icon: "🎯",
      color: "from-orange-500 to-red-500",
      href: "/kids/games/ai-quiz",
      isPremium: false,
    },
    {
      id: "math-adventure",
      title: "Math Adventure",
      description: "Solve math problems and level up!",
      category: "learning",
      difficulty: "All Levels",
      icon: "🧮",
      color: "from-green-500 to-blue-500",
      href: "/kids/games/math-adventure",
      isPremium: false,
    },
    {
      id: "word-builder",
      title: "Word Builder",
      description: "Build vocabulary with spelling games!",
      category: "learning",
      difficulty: "All Levels",
      icon: "📚",
      color: "from-yellow-500 to-orange-500",
      href: "/kids/games/word-builder",
      isPremium: false,
    },
    {
      id: "memory-match",
      title: "Memory Match",
      description: "Find matching pairs of AI cards!",
      category: "games",
      difficulty: "All Levels",
      icon: "🎴",
      color: "from-pink-500 to-purple-500",
      href: "/kids/games/memory-match",
      isPremium: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Activities", icon: "🌟" },
    { id: "games", name: "Games", icon: "🎮" },
    { id: "learning", name: "Learning", icon: "📖" },
    { id: "creative", name: "Creative", icon: "🎨" },
  ]

  const filteredActivities =
    selectedCategory === "all" ? activities : activities.filter((activity) => activity.category === selectedCategory)

  const handleActivityClick = (activity: (typeof activities)[0]) => {
    if (activity.isPremium && !hasPremium) {
      router.push("/pricing")
    } else {
      router.push(activity.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Learning Activities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore interactive AI experiences designed to make learning fun and engaging!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-200"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`h-32 bg-gradient-to-r ${activity.color} flex items-center justify-center relative`}>
                <span className="text-6xl">{activity.icon}</span>
                {activity.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-0">Premium</Badge>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {activity.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">{activity.category}</span>
                </div>

                {activity.isPremium && !hasPremium ? (
                  <Button
                    onClick={() => handleActivityClick(activity)}
                    className="w-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Upgrade to Access
                  </Button>
                ) : (
                  <Link
                    href={activity.href}
                    className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                  >
                    Start Activity
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/kids/home"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium border border-purple-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
