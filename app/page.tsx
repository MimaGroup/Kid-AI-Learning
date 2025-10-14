"use client"

import { useAuth } from "../hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/parent/dashboard")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold mb-4">AI Kids Learning Platform</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center max-w-2xl px-4">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">AI Kids Learning Platform</h1>
          <p className="text-xl text-gray-600 mb-8">Where Young Minds Meet Artificial Intelligence!</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/getting-started">
              <Button size="lg" className="text-lg px-8">
                Getting Started Guide
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-bold text-lg mb-2">Fun Games</h3>
              <p className="text-gray-600 text-sm">Interactive learning through play</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm">Points, badges, and achievements</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Learn AI</h3>
              <p className="text-gray-600 text-sm">Educational content for kids</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
