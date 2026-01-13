"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function ReferralHeroSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white font-medium mb-4">
            <Gift className="w-5 h-5" />
            Priporočilni program
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Deli in Zaslužij</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Povabi prijatelje in dobite oba nagrade - oni 7 dni brezplačno, ti pa mesec premium!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-white hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Deli svojo kodo</h3>
            <p className="text-white/80">Dobite unikatno priporočilno kodo takoj po registraciji</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-white hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Prijatelj se prijavi</h3>
            <p className="text-white/80">Tvoj prijatelj dobi 7 dni brezplačnega premium dostopa</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-white hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Oba zaslužita</h3>
            <p className="text-white/80">Ko se prijatelj naroči, ti dobiš 1 mesec brezplačno!</p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 font-bold text-lg px-8 py-6">
              Začni deliti zdaj
            </Button>
          </Link>
          <p className="text-white/80 mt-4 text-sm">Neomejeno število priporočil • Neomejeni brezplačni meseci</p>
        </div>
      </div>
    </section>
  )
}
