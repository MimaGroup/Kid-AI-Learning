import { NextResponse } from "next/server"
import { checkAdminAuth } from "@/lib/admin-auth"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  const { isAdmin, error } = await checkAdminAuth()

  if (!isAdmin) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 401 })
  }

  const health = {
    database: { status: "healthy", message: "Connected" },
    stripe: { status: "healthy", message: "API keys configured" },
    email: { status: "healthy", message: "Resend configured" },
  }

  try {
    // Check database
    const supabase = await createServiceRoleClient()
    const { error: dbError } = await supabase.from("profiles").select("id").limit(1)

    if (dbError) {
      health.database = { status: "error", message: dbError.message }
    }

    // Check Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      health.stripe = { status: "error", message: "API key not configured" }
    }

    // Check Email
    if (!process.env.RESEND_API_KEY) {
      health.email = { status: "error", message: "API key not configured" }
    }

    return NextResponse.json(health)
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        database: { status: "error", message: "Failed to check" },
        stripe: { status: "unknown", message: "Failed to check" },
        email: { status: "unknown", message: "Failed to check" },
      },
      { status: 500 },
    )
  }
}
