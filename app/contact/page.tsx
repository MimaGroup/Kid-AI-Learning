import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import ContactClient from "./ContactClient"

export const metadata: Metadata = createMetadata({
  title: "Contact Us - Get in Touch | AI Kids Learning",
  description:
    "Have questions about AI Kids Learning Platform? Contact our support team. We typically respond within 24-48 hours. Premium members get priority support.",
  path: "/contact",
})

export default function ContactPage() {
  return <ContactClient />
}
