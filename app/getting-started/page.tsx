"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gamepad2, Trophy, BookOpen, Users, Sparkles, Target } from 'lucide-react'
import Image from "next/image"
import { BYTE_CHARACTER } from "@/lib/byte-character"

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      {/* Floating AI-themed decorative elements */}
      <div className="absolute top-20 left-10 text-7xl opacity-25 animate-float">🤖</div>
      <div className="absolute top-40 right-16 text-6xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>💻</div>
      <div className="absolute top-64 left-1/3 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🧠</div>
      <div className="absolute bottom-32 right-1/4 text-6xl opacity-25 animate-float" style={{ animationDelay: '1s' }}>⚙️</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2.5s' }}>📚</div>

      {/* Gradient blobs */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 w-28 h-28">
            <Image
              src={BYTE_CHARACTER.images.waving || "/placeholder.svg"}
              alt={BYTE_CHARACTER.fullName}
              width={112}
              height={112}
              className="rounded-full ring-4 ring-purple-200 shadow-xl mx-auto"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 text-balance">Prvi koraki s Kids Learning AI</h1>
          <p className="text-xl text-gray-600">Byte te bo popeljal skozi vse, kar moraš vedeti!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-purple-200 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Za otroke</h2>
            <p className="text-gray-600 mb-6">
              Začni svojo pot učenja o AI z zabavnimi igrami, izzivi in nagradami!
            </p>
            <Link href="/parent/login?redirect=/kids/home">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-full" size="lg">
                Začni učenje <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-pink-200 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Za starše</h2>
            <p className="text-gray-600 mb-6">Spremljajte napredek svojih otrok in upravljajte njihovo učno izkušnjo.</p>
            <Link href="/parent/login?redirect=/parent/dashboard">
              <Button className="w-full bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full" size="lg" variant="outline">
                Odpri nadzorno ploščo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ključne funkcije</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interaktivne igre</h3>
              <p className="text-gray-600">7+ izobraževalnih iger, ki pokrivajo AI, matematiko, besedišče in spomin.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Igrifikacija</h3>
              <p className="text-gray-600">Zbiraj točke, napreduj po nivojih, odkleni značke in ohranjaj učni niz!</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dnevni izzivi</h3>
              <p className="text-gray-600">Vsak dan zaključi posebne izzive za dodatne nagrade in dosežke.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Knjižnica vsebin</h3>
              <p className="text-gray-600">Dostop do izobraževalnih videov, interaktivnih zgodb in učnih gradiv.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI prijatelji</h3>
              <p className="text-gray-600">Ustvari in klepetaj s prilagojenimi AI sopotniki, ki ti pomagajo pri učenju.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Starševska nadzorna plošča</h3>
              <p className="text-gray-600">Spremljaj napredek, si oglej analitiko in upravljaj več profilov otrok.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Vodnik za hiter začetek</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Izberi vmesnik</h3>
                <p className="text-purple-100">V stranski vrstici izberi Kids Learning aplikacijo ali Starševsko nadzorno ploščo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Razišči dejavnosti</h3>
                <p className="text-purple-100">Preizkusi različne igre in dejavnosti ter odkrij, kaj ti je najbolj všeč.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Zasluži nagrade</h3>
                <p className="text-purple-100">
                  Zaključuj dejavnosti za točke, napredovanje po nivojih ter odklepanje značk in dosežkov.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Spremljaj napredek</h3>
                <p className="text-purple-100">
                  Starši lahko spremljajo učni napredek in dosežke prek nadzorne plošče.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/parent/login?redirect=/kids/home">
            <Button size="lg" className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all">
              Začni svojo pot učenja <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
