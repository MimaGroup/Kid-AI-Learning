import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import { LoginPageClient } from "./client"

export const metadata: Metadata = createMetadata({
  title: "Prijava — Kids Learning AI",
  description:
    "Prijavite se v svoj račun Kids Learning AI za dostop do starševske nadzorne plošče in spremljanje otrokovega napredka.",
  path: "/auth/login",
  noIndex: true, // Don't index auth pages
})

export default function LoginPage() {
  return <LoginPageClient />
}
