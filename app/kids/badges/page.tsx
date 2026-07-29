"use client"

import { BadgeShowcase } from "@/components/badge-showcase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #0f0f23 0%, #070710 100%)" }

export default function BadgesPage() {
  return (
    <div className="min-h-screen p-4 md:p-8" style={spaceStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/kids/home">
            <Button variant="outline" className="bg-transparent border-white/15 text-white hover:bg-white/10 hover:text-white">
              ← Nazaj na domačo stran
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Tvoja zbirka značk</h1>
          <p className="text-white/50">Zbiraj značke z opravljanjem dejavnosti in doseganjem mejnikov!</p>
        </div>

        <BadgeShowcase />
      </div>
    </div>
  )
}
