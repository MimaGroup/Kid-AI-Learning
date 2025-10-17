import type React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Pricing Plans - AI Kids Learning Platform",
  description:
    "Choose the perfect plan for your child. Free tier available. Premium plans start at $9.99/month with full access to AI learning games, activities, and progress tracking.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
