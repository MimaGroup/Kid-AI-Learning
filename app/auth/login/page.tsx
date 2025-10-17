import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import { LoginPageClient } from "./client"

export const metadata: Metadata = createMetadata({
  title: "Login - Sign In to Your Account",
  description:
    "Sign in to your AI Kids Learning account to access the parent dashboard and track your child's progress.",
  path: "/auth/login",
  noIndex: true, // Don't index auth pages
})

export default function LoginPage() {
  return <LoginPageClient />
}
