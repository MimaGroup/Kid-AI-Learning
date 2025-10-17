"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../hooks/use-auth"
import { trackEvent, trackError } from "@/lib/analytics"

export default function LoginPageClient() {
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
      await login(email, password)
      trackEvent("user_login", {
        email_domain: email.split("@")[1],
        timestamp: Date.now(),
      })
      router.push("/parent/dashboard")
    } catch (err) {
      trackError(err instanceof Error ? err : new Error("Login failed"), "login")
      console.error("Login failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"></div>
  )
}
