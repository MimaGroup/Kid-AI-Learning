import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import ContactClient from "./ContactClient"

export const metadata: Metadata = createMetadata({
  title: "Kontakt — Kids Learning AI",
  description:
    "Imate vprašanja o platformi Kids Learning AI? Kontaktirajte našo podporo. Običajno odgovorimo v 24-48 urah. Naročniki Pro paketa imajo prednostno podporo.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactClient />
}
