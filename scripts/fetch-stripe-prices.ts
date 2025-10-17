import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

async function fetchPrices() {
  try {
    console.log("[v0] Fetching Stripe prices...\n")

    // Fetch all prices
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    })

    console.log("[v0] Found", prices.data.length, "active prices:\n")

    for (const price of prices.data) {
      const product = price.product as Stripe.Product
      const amount = price.unit_amount ? (price.unit_amount / 100).toFixed(2) : "N/A"
      const currency = price.currency.toUpperCase()
      const interval = price.recurring?.interval || "one-time"

      console.log("---")
      console.log("Product:", product.name)
      console.log("Price ID:", price.id)
      console.log("Amount:", `${currency} ${amount}`)
      console.log("Billing:", interval)
      console.log("---\n")
    }

    // Find monthly and yearly prices
    const monthlyPrice = prices.data.find((p) => {
      const product = p.product as Stripe.Product
      return product.name?.toLowerCase().includes("monthly") && p.recurring?.interval === "month"
    })

    const yearlyPrice = prices.data.find((p) => {
      const product = p.product as Stripe.Product
      return product.name?.toLowerCase().includes("yearly") && p.recurring?.interval === "year"
    })

    console.log("\n=== ENVIRONMENT VARIABLES ===\n")
    if (monthlyPrice) {
      console.log("NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=", monthlyPrice.id)
    } else {
      console.log("⚠️  No monthly price found")
    }

    if (yearlyPrice) {
      console.log("NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=", yearlyPrice.id)
    } else {
      console.log("⚠️  No yearly price found")
    }

    console.log("\n=============================\n")
  } catch (error) {
    console.error("[v0] Error fetching prices:", error)
  }
}

fetchPrices()
