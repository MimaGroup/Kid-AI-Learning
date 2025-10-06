"use client"

import { useAuth } from "../hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/parent/dashboard")
      } else {
        router.push("/auth/login")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">AI Kids Learning Platform</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null
}
