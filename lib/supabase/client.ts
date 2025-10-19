import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

function createMockClient() {
  console.warn("[v0] Using mock Supabase client")
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: { message: "Mock client - authentication disabled in preview" },
      }),
      signUp: async () => ({
        data: { user: null, session: null },
        error: { message: "Mock client - authentication disabled in preview" },
      }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      eq: function () {
        return this
      },
      single: () => Promise.resolve({ data: null, error: null }),
    }),
  } as any
}

export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not found. Using mock client for preview.")
    return createMockClient()
  }

  try {
    const client = createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          if (typeof document === "undefined") return undefined
          const value = `; ${document.cookie}`
          const parts = value.split(`; ${name}=`)
          if (parts.length === 2) return parts.pop()?.split(";").shift()
        },
        set(name: string, value: string, options: any) {
          if (typeof document === "undefined") return
          let cookie = `${name}=${value}`
          if (options?.maxAge) cookie += `; max-age=${options.maxAge}`
          if (options?.path) cookie += `; path=${options.path}`
          document.cookie = cookie
        },
        remove(name: string, options: any) {
          if (typeof document === "undefined") return
          document.cookie = `${name}=; max-age=0; path=${options?.path || "/"}`
        },
      },
    })

    // If this fails, we'll catch it and return mock client
    return client
  } catch (error) {
    console.error("[v0] Error creating Supabase client:", error)
    console.warn("[v0] Falling back to mock client")
    return createMockClient()
  }
}

export function createClient() {
  return createBrowserClient()
}
