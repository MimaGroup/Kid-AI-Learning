"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/use-auth"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { trackEvent, trackError } from "@/lib/analytics"
import { LoadingOverlay } from "@/components/loading-overlay"
import { Gift, Check } from "lucide-react"

function SignUpPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralValid, setReferralValid] = useState<boolean | null>(null)
  const { register } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) {
      setReferralCode(ref.toUpperCase())
      setReferralValid(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      await register(email, password)
      trackEvent("user_signup", {
        email_domain: email.split("@")[1],
        timestamp: Date.now(),
        has_referral: !!referralCode,
      })

      if (referralCode) {
        try {
          await fetch("/api/referrals/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              referralCode,
              newUserEmail: email,
            }),
          })
        } catch (refError) {
          console.error("Failed to apply referral:", refError)
        }
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed"
      setError(errorMessage)
      trackError(err instanceof Error ? err : new Error(errorMessage), "signup")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 text-5xl opacity-20 animate-bounce">✨</div>
        <div className="absolute top-40 right-20 text-4xl opacity-20 animate-pulse">🎉</div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95 border-2 border-green-200 relative z-10">
          <div className="text-6xl mb-4">✉️</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Check Your Email!
          </h1>
          <p className="text-gray-600 mb-6">
            We've sent you a confirmation link. Please check your email and click the link to activate your account.
          </p>
          {referralCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-green-700 flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                Referral bonus applied! You'll get a 14-day free trial.
              </p>
            </div>
          )}
          <Link
            href="/auth/login"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute top-20 left-10 text-5xl opacity-15 animate-float"
        style={{ filter: "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))" }}
      >
        🤖
      </div>
      <div
        className="absolute top-40 right-20 text-4xl opacity-15 animate-pulse delay-100"
        style={{ filter: "drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))" }}
      >
        🎨
      </div>
      <div
        className="absolute bottom-40 left-1/4 text-4xl opacity-15 animate-bounce delay-200"
        style={{ filter: "drop-shadow(0 4px 8px rgba(244, 114, 182, 0.3))" }}
      >
        ✨
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative border-2 border-purple-200 z-10">
        {isLoading && <LoadingOverlay message="Creating your account..." />}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join AI Kids Learning Platform</p>

          {referralCode && (
            <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-200">
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Referral Bonus Active!</span>
              </div>
              <p className="text-xs text-purple-600 mt-1">You'll get a 14-day free trial instead of 7 days</p>
            </div>
          )}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a password (min 6 characters)"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Confirm your password"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
              Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono uppercase"
                placeholder="Enter referral code"
                maxLength={8}
              />
              {referralCode && referralValid && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {referralCode && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <Gift className="w-3 h-3" />
                You'll get a 14-day free trial!
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-in slide-in-from-top">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-purple-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPageClient
