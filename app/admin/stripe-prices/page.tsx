"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Copy, AlertCircle } from "lucide-react"

interface StripePrice {
  id: string
  currency: string
  unit_amount: number | null
  recurring: {
    interval: string
  } | null
  product: {
    name: string
    id: string
  }
}

interface StripeAccount {
  id: string
  email?: string
  businessName?: string
  country?: string
}

export default function StripePricesPage() {
  const [prices, setPrices] = useState<StripePrice[]>([])
  const [account, setAccount] = useState<StripeAccount | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      console.log("[v0] Fetching prices from API...")
      const response = await fetch("/api/stripe/prices")
      const data = await response.json()

      if (data.success) {
        console.log("[v0] Received", data.prices.length, "prices")
        console.log("[v0] Connected account:", data.account)
        setPrices(data.prices)
        setAccount(data.account)
      } else {
        setError(data.error || "Failed to fetch prices")
      }
    } catch (err) {
      console.error("[v0] Error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch prices")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(text)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Find monthly and yearly prices
  const monthlyPrice = prices.find((p) => {
    const nameMatch = p.product.name?.toLowerCase().includes("month")
    const intervalMatch = p.recurring?.interval === "month"
    return nameMatch && intervalMatch
  })

  const yearlyPrice = prices.find((p) => {
    const nameMatch = p.product.name?.toLowerCase().includes("year")
    const intervalMatch = p.recurring?.interval === "year"
    return nameMatch && intervalMatch
  })

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading Stripe prices...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Stripe Price IDs</h1>
      <p className="text-muted-foreground mb-6">
        Copy the correct Price IDs from your Stripe account and update your environment variables
      </p>

      {error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {account && (
            <Card className="border-blue-500">
              <CardHeader>
                <CardTitle>Connected Stripe Account</CardTitle>
                <CardDescription>This is the Stripe account your API keys are connected to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account ID</p>
                    <code className="text-xs">{account.id}</code>
                  </div>
                  {account.email && (
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-mono text-xs">{account.email}</p>
                    </div>
                  )}
                  {account.businessName && (
                    <div>
                      <p className="text-muted-foreground">Business Name</p>
                      <p className="font-mono text-xs">{account.businessName}</p>
                    </div>
                  )}
                  {account.country && (
                    <div>
                      <p className="text-muted-foreground">Country</p>
                      <p className="font-mono text-xs">{account.country}</p>
                    </div>
                  )}
                </div>
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Make sure this matches the Stripe account where you created your products. If it doesn't match, you
                    need to update your STRIPE_SECRET_KEY environment variable.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Environment Variables Section */}
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Copy these values to your Vercel environment variables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyPrice ? (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-semibold">Monthly Price Found</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background p-2 rounded border font-mono text-sm">{monthlyPrice.id}</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(monthlyPrice.id)}>
                      {copiedId === monthlyPrice.id ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Product: {monthlyPrice.product.name} • {monthlyPrice.currency.toUpperCase()}{" "}
                    {monthlyPrice.unit_amount ? (monthlyPrice.unit_amount / 100).toFixed(2) : "N/A"}/month
                  </p>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No monthly price found. Looking for a price with "month" in the product name and monthly billing
                    interval.
                  </AlertDescription>
                </Alert>
              )}

              {yearlyPrice ? (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-semibold">Yearly Price Found</span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background p-2 rounded border font-mono text-sm">{yearlyPrice.id}</code>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(yearlyPrice.id)}>
                      {copiedId === yearlyPrice.id ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Product: {yearlyPrice.product.name} • {yearlyPrice.currency.toUpperCase()}{" "}
                    {yearlyPrice.unit_amount ? (yearlyPrice.unit_amount / 100).toFixed(2) : "N/A"}/year
                  </p>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No yearly price found. Looking for a price with "year" in the product name and yearly billing
                    interval.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* All Prices Section */}
          <Card>
            <CardHeader>
              <CardTitle>All Available Prices ({prices.length})</CardTitle>
              <CardDescription>All active prices in your Stripe account</CardDescription>
            </CardHeader>
            <CardContent>
              {prices.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No active prices found in your Stripe account. Create products and prices in your Stripe Dashboard
                    first.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {prices.map((price) => (
                    <div key={price.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-semibold">{price.product.name}</p>
                          <code className="text-xs text-muted-foreground">{price.id}</code>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(price.id)}>
                          {copiedId === price.id ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>
                          {price.currency.toUpperCase()}{" "}
                          {price.unit_amount ? (price.unit_amount / 100).toFixed(2) : "N/A"}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{price.recurring?.interval || "one-time"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
