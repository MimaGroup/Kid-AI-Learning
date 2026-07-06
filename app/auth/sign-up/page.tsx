// cache-bust-2026-04-03
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
        <div className="min-h-screen flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
          <div className="text-center">
            <div className="inline-block w-10 h-10 rounded-full animate-spin"
              style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }} />
          </div>
        </div>
      }
    >
      <SignUpPageClient />
    </Suspense>
  )
}
