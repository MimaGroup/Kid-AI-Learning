import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// POST - Validate and apply a referral code during registration
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    const { referralCode, newUserId, newUserEmail } = await request.json()

    if (!referralCode || !newUserId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find the referrer by referral code
    const { data: referrer, error: referrerError } = await supabase
      .from("profiles")
      .select("id, email, referral_count")
      .eq("referral_code", referralCode.toUpperCase())
      .single()

    if (referrerError || !referrer) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    // Prevent self-referral
    if (referrer.id === newUserId) {
      return NextResponse.json({ error: "Cannot use your own referral code" }, { status: 400 })
    }

    // Update new user's profile with referred_by
    const { error: updateNewUserError } = await supabase
      .from("profiles")
      .update({ referred_by: referrer.id })
      .eq("id", newUserId)

    if (updateNewUserError) {
      console.error("Failed to update new user:", updateNewUserError)
    }

    // Update referrer's count
    const { error: updateReferrerError } = await supabase
      .from("profiles")
      .update({ referral_count: (referrer.referral_count || 0) + 1 })
      .eq("id", referrer.id)

    if (updateReferrerError) {
      console.error("Failed to update referrer count:", updateReferrerError)
    }

    // Update invitation status if exists
    const { error: invitationError } = await supabase
      .from("referral_invitations")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
        invitee_id: newUserId,
      })
      .eq("referral_code", referralCode.toUpperCase())
      .eq("invitee_email", newUserEmail?.toLowerCase())
      .eq("status", "pending")

    // Create rewards for both users
    // Reward for new user: Extended trial (14 days instead of 7)
    await supabase.from("referral_rewards").insert({
      user_id: newUserId,
      reward_type: "extended_trial",
      reward_value: "14_days",
      source: "referral_received",
      status: "pending",
    })

    // Reward for referrer: Free month when new user subscribes
    await supabase.from("referral_rewards").insert({
      user_id: referrer.id,
      reward_type: "free_month",
      reward_value: "1_month",
      source: "referral_sent",
      status: "pending",
    })

    return NextResponse.json({
      success: true,
      message: "Referral code applied! You get an extended 14-day trial.",
    })
  } catch (error) {
    console.error("Referral validation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
