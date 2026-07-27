import type React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Učni paketi - Kids Learning AI Platforma",
  description:
    "Izberite popoln paket za vašega otroka. 7 dni brezplačno preskusno obdobje. Premium paket od €7,90/mesec z dostopom do vseh AI učnih iger, dejavnosti in sledenja napredka.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
