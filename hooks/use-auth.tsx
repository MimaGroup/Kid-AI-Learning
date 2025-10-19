"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "../lib/supabase/client"
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("[v0] Error getting session:", error)
        // Gracefully handle fetch failures - treat as logged out
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        try {
          subscription.unsubscribe()
        } catch (error) {
          console.error("[v0] Error unsubscribing from auth state:", error)
        }
      }
    } catch (error) {
      console.error("[v0] Error setting up auth state listener:", error)
      setLoading(false)
      return () => {} // Return empty cleanup function
    }
  }, [supabase])

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        throw error
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to connect to authentication service"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        throw error
      }

      if (data.user) {
        try {
          await fetch("/api/send-welcome-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.user.email,
              name: email.split("@")[0],
            }),
          })

          console.log("[v0] Welcome email queued for", data.user.email)
        } catch (error) {
          console.error("[v0] Error sending welcome email:", error)
          // Don't throw - registration was successful even if email fails
        }
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to connect to authentication service"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
        throw error
      }
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to sign out"
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
