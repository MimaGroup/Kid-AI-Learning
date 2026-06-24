import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Niste prijavljeni" }, { status: 401 })
    }

    const admin = createAdminClient()
    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", session.user.id)
      .single()

    if (!sub?.stripe_customer_id) {
      return NextResponse.json({ error: "Ni aktivne naročnine" }, { status: 404 })
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/parent/dashboard`,
    })

    return NextResponse.json({ url: portal.url })
  } catch (err) {
    console.error("Portal error:", err)
    return NextResponse.json({ error: "Napaka" }, { status: 500 })
  }
}
