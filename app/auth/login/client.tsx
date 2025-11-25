"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "../../../hooks/use-auth"
import Link from "next/link"
import { trackEvent, trackError } from "@/lib/analytics"

export function LoginPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, error, clearError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    try {
      console.log("[v0] Login attempt for:", email)
      await login(email, password)
      console.log("[v0] Login successful, waiting for auth state to sync...")
      
      trackEvent("user_login", {
        email_domain: email.split("@")[1],
        timestamp: Date.now(),
      })
      
      console.log("[v0] Refreshing router to sync server session...")
      router.refresh()
      
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log("[v0] Redirecting to /kids/home")
      router.push("/kids/home")
    } catch (err) {
      trackError(err instanceof Error ? err : new Error("Login failed"), "login")
      console.error("[v0] Login failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div className="absolute top-20 left-10 text-5xl opacity-15 animate-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))' }}>🤖</div>
      <div className="absolute top-40 right-20 text-4xl opacity-15 animate-pulse delay-100" style={{ filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))' }}>🧠</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-15 animate-bounce delay-200" style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}>💻</div>
      
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-purple-200 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your AI Kids Learning account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
