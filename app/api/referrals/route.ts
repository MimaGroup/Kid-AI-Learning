import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Get user's referral info and stats
export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's profile with referral code
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("referral_code, referral_count, referred_by")
      .eq("id", user.id)
      .single()

    if (profileError) {
      // If profile doesn't exist or no referral code, generate one
      const referralCode = generateReferralCode()
      const { data: newProfile, error: updateError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          referral_code: referralCode,
          referral_count: 0,
        })
        .select("referral_code, referral_count, referred_by")
        .single()

      if (updateError) {
        return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 })
      }

      return NextResponse.json({
        referralCode: newProfile.referral_code,
        referralCount: newProfile.referral_count || 0,
        referredBy: newProfile.referred_by,
        invitations: [],
        rewards: [],
      })
    }

    // Get sent invitations
    const { data: invitations } = await supabase
      .from("referral_invitations")
      .select("*")
      .eq("referrer_id", user.id)
      .order("created_at", { ascending: false })

    // Get rewards
    const { data: rewards } = await supabase
      .from("referral_rewards")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    return NextResponse.json({
      referralCode: profile.referral_code,
      referralCount: profile.referral_count || 0,
      referredBy: profile.referred_by,
      invitations: invitations || [],
      rewards: rewards || [],
    })
  } catch (error) {
    console.error("Referral fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Send a referral invitation
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "This email is already registered" }, { status: 400 })
    }

    // Check if invitation already sent
    const { data: existingInvitation } = await supabase
      .from("referral_invitations")
      .select("id")
      .eq("referrer_id", user.id)
      .eq("invitee_email", email.toLowerCase())
      .eq("status", "pending")
      .single()

    if (existingInvitation) {
      return NextResponse.json({ error: "Invitation already sent to this email" }, { status: 400 })
    }

    // Get referrer's referral code
    const { data: profile } = await supabase.from("profiles").select("referral_code").eq("id", user.id).single()

    if (!profile?.referral_code) {
      return NextResponse.json({ error: "Referral code not found" }, { status: 400 })
    }

    // Create invitation
    const { data: invitation, error: inviteError } = await supabase
      .from("referral_invitations")
      .insert({
        referrer_id: user.id,
        invitee_email: email.toLowerCase(),
        invitee_name: name || null,
        referral_code: profile.referral_code,
        status: "pending",
      })
      .select()
      .single()

    if (inviteError) {
      console.error("Invitation error:", inviteError)
      return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 })
    }

    // Send referral email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/send-referral-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          inviteeName: name,
          referrerEmail: user.email,
          referralCode: profile.referral_code,
        }),
      })
    } catch (emailError) {
      console.error("Failed to send referral email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      invitation,
      message: "Invitation sent successfully!",
    })
  } catch (error) {
    console.error("Referral send error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
