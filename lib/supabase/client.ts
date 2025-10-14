import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client to prevent build failures
    if (typeof window === "undefined") {
      console.warn("Supabase environment variables not found during build")
      return null as any
    }
    throw new Error("Missing Supabase environment variables")
  }

  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

export function createClient() {
  return createBrowserClient()
}
