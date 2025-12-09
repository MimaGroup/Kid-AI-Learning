import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"
import SignUpPageClient from "./sign-up-client"
import { Suspense } from "react"

export const metadata: Metadata = createMetadata({
  title: "Sign Up - Create Your Free Account",
  description:
    "Create a free AI Kids Learning account to start your child's AI education journey. Get access to interactive games, progress tracking, and more.",
  path: "/auth/sign-up",
  noIndex: true, // Don't index auth pages
})

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <SignUpPageClient />
    </Suspense>
  )
}
