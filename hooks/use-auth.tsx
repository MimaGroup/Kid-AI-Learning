'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '../lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()
      
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setIsLoading(false)
      }

      getUser()

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setIsLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    } catch (err) {
      setError('Failed to initialize authentication')
      setIsLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return { data, error }
    } catch (err) {
      return { data: null, error: { message: 'Authentication service unavailable' } }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (err) {
      return { data: null, error: { message: 'Authentication service unavailable' } }
    }
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
