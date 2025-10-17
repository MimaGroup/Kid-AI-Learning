"use client"

import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function PricingComparison() {
  const [mobileView, setMobileView] = useState<"free" | "monthly" | "yearly">("monthly")

  const features = [
    { name: "Number of Games", free: "4 basic games", monthly: "All 7 games", yearly: "All 7 games" },
    { name: "AI Friend Creator", free: false, monthly: true, yearly: true },
    { name: "Pattern Training", free: false, monthly: true, yearly: true },
    { name: "Content Library", free: "Limited", monthly: "Full access", yearly: "Full access" },
    { name: "Progress Analytics", free: "Basic", monthly: "Advanced", yearly: "Advanced" },
    { name: "Support", free: "Community", monthly: "Priority", yearly: "Priority" },
    { name: "New Activities", free: false, monthly: "Monthly", yearly: "Monthly + Early access" },
    { name: "Offline Mode", free: false, monthly: true, yearly: true },
    { name: "Family Sharing", free: "1 child", monthly: "1 child", yearly: "Up to 3 kids" },
    { name: "Exclusive Badges", free: false, monthly: false, yearly: true },
  ]

  return (
    <Card className="overflow-hidden">
      <div className="md:hidden p-4 bg-muted border-b">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={mobileView === "free" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("free")}
            className="text-xs"
          >
            Free
          </Button>
          <Button
            variant={mobileView === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("monthly")}
            className="text-xs"
          >
            Monthly
          </Button>
          <Button
            variant={mobileView === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setMobileView("yearly")}
            className="text-xs"
          >
            Yearly
          </Button>
        </div>
      </div>
      {/* </CHANGE> */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-semibold">Feature</th>
              <th className="text-center p-4 font-semibold">Free</th>
              <th className="text-center p-4 font-semibold bg-primary/5">Premium Monthly</th>
              <th className="text-center p-4 font-semibold bg-primary/10">Premium Yearly</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-t">
                <td className="p-4 font-medium">{feature.name}</td>
                <td className="p-4 text-center">
                  {typeof feature.free === "boolean" ? (
                    feature.free ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">{feature.free}</span>
                  )}
                </td>
                <td className="p-4 text-center bg-primary/5">
                  {typeof feature.monthly === "boolean" ? (
                    feature.monthly ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium">{feature.monthly}</span>
                  )}
                </td>
                <td className="p-4 text-center bg-primary/10">
                  {typeof feature.yearly === "boolean" ? (
                    feature.yearly ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm font-medium">{feature.yearly}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </CHANGE> */}

      <div className="md:hidden">
        <div className="p-4 space-y-3">
          {features.map((feature, index) => {
            const value = feature[mobileView]
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="font-medium text-sm">{feature.name}</span>
                <span className="text-sm">
                  {typeof value === "boolean" ? (
                    value ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300" />
                    )
                  ) : (
                    <span className="text-muted-foreground">{value}</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      {/* </CHANGE> */}
    </Card>
  )
}
