import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import PricingPageClient from "./_components/PricingPageClient"

export const metadata: Metadata = createMetadata({
  title: "Cenik - Izberite ucni paket | KidsLearnAI",
  description:
    "Odklenite poln potencial AI ucenja za vasega otroka. 7-dnevni brezplacni preizkus. Izbirajte med Brezplacnim, Premium Mesecnim ali Premium Letnim paketom.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingPageClient />
}
