import type React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Učni paketi - KidsLearnAI Platforma",
  description:
    "Izberite popoln paket za vašega otroka. 7-dnevni brezplačni preizkus. Premium paketi od 7,90€/mesec z dostopom do vseh AI učnih iger, aktivnosti in sledenja napredka.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
