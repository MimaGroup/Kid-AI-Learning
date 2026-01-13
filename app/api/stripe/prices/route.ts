import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {
  try {
    console.log("[v0] Fetching Stripe account info and prices...")

    const account = await stripe.accounts.retrieve()
    console.log("[v0] Connected to Stripe account:", account.id)
    console.log("[v0] Account email:", account.email)
    console.log("[v0] Test mode:", !account.charges_enabled)

    const response = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
      limit: 100,
    })

    console.log("[v0] Found", response.data.length, "prices")

    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        email: account.email,
        businessName: account.business_profile?.name,
        country: account.country,
      },
      prices: response.data,
    })
  } catch (error) {
    console.error("[v0] Error fetching Stripe data:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch data",
      },
      { status: 500 },
    )
  }
}
