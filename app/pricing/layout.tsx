import type React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Ucni paketi - KidsLearnAI Platforma",
  description:
    "Izberite popoln paket za vasega otroka. 7-dnevni brezplacni preizkus. Premium paketi od 9,99EUR/mesec z dostopom do vseh AI ucnih iger, aktivnosti in sledenja napredka.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
