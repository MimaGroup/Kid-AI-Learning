import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import PricingPageClient from "./_components/PricingPageClient"

export const metadata: Metadata = createMetadata({
  title: "Cenik - Preprosta cena, vse vključeno | Kids Learning AI",
  description:
    "Začnite brezplačno — brez kreditne kartice. Nadgradite kadarkoli. Kids Learning AI Pro že od €4.92/mesec z letnim paketom.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingPageClient />
}
