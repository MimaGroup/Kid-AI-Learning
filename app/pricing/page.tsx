import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import PricingPageClient from "./_components/PricingPageClient"

export const metadata: Metadata = createMetadata({
  title: "Pricing - Choose Your Learning Plan | AI Kids Learning",
  description:
    "Unlock the full potential of AI learning for your child. Choose from our Free, Premium Monthly, or Premium Yearly plans. Save 17% with annual billing.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingPageClient />
}
