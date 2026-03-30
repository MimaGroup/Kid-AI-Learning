import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import PricingPageClient from "./_components/PricingPageClient"

export const metadata: Metadata = createMetadata({
  title: "Cenik - Preprosta cena, vse vključeno | KidsLearnAI",
  description:
    "Začnite brezplačno — brez kreditne kartice. Nadgradite kadarkoli. KidsLearnAI Pro že od €4.92/mesec z letnim paketom.",
  path: "/pricing",
})

export default function PricingPage() {
  return <PricingPageClient />
}
