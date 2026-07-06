"use client"

import { BadgeShowcase } from "@/components/badge-showcase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Badge Collection</h1>
          <p className="text-gray-600">Collect badges by completing activities and reaching milestones!</p>
        </div>

        <BadgeShowcase />
      </div>
    </div>
  )
}
