import { createClient } from "../../../lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  // A freshly confirmed parent has no child profile yet, and /kids/* pages
  // require one (ActiveChildGuard bounces to /kids/select-profile, which
  // dead-ends into "no profiles yet, go to the dashboard" if there's none).
  // Send them to create their first child; the dashboard redirects to the
  // /kids/welcome intro carousel once that's done.
  const next = searchParams.get("next") ?? "/parent/dashboard"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      // Trigger email onboarding sequence (non-blocking)
      try {
        await fetch(`${origin}/api/trial/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: data.user.id, 
            email: data.user.email 
          })
        })
      } catch (emailError) {
        // Don't block signup if email sequence fails
        console.error('[v0] Email sequence trigger failed:', emailError)
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login`)
}
