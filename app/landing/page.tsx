"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shield, Zap, BookOpen, Gamepad2, Check, Clock, Gift, Users } from "lucide-react"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { trackLead } from "@/lib/fbpixel"

export default function AdLandingPage() {
  useEffect(() => {
    // Fire ViewContent event on page load
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent")
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Minimal Header - Logo only, not clickable */}
      <header className="border-b border-border/40 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">
                KidsLearnAI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA] min-h-[90vh]">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#7C3AED]/10 to-[#6CD4C3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#FFB5DA]/10 to-[#FCD34D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-[#FCD34D] text-[#8B6914] border-0 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
                {"AI učna platforma za otroke 5–12 let"}
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-balance leading-[1.1] tracking-tight">
                <span className="text-[#2D2A3D]">Zaslon, ki uči.</span>
                <br />
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#60A5FA] bg-clip-text text-transparent">
                  Igra, ki razvija.
                </span>
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed text-[#64748B] max-w-xl">
                {"KidsLearnAI je prva slovenska AI učna platforma, ki otrokom od 5 do 12 let pomaga razumeti umetno inteligenco — skozi igro, izzive in osebnega AI tutorja Byte-a. Brez dolgočasnih predavanj. Samo učenje, ki otroke res navdušuje."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/sign-up" onClick={() => trackLead()}>
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                  >
                    {"Začni brezplačno — 7 dni"}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>Brez kreditne kartice</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>Varno za otroke</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-5 h-5 text-[#7C3AED]" />
                  <span>{"Prekliči kadarkoli"}</span>
                </div>
              </div>
            </div>

            {/* Byte Hero Image with speech bubble */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-lg border border-[#E2E8F0] z-10 whitespace-nowrap">
                  <p className="text-base font-semibold text-[#7C3AED]">{BYTE_CHARACTER.phrases.greeting}</p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-[#E2E8F0] rotate-45" />
                </div>
                <div className="mt-8 relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                  <Image
                    src={BYTE_CHARACTER.images.hero || "/placeholder.svg"}
                    alt={BYTE_CHARACTER.fullName}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#7C3AED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Gamepad2 className="w-10 h-10 opacity-90" />
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold">8</div>
              <div className="text-base font-medium opacity-90">AI iger</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <BookOpen className="w-10 h-10 opacity-90" />
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold">5</div>
              <div className="text-base font-medium opacity-90">{"Tečajev"}</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Clock className="w-10 h-10 opacity-90" />
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold">24/7</div>
              <div className="text-base font-medium opacity-90">Dostop</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <Gift className="w-10 h-10 opacity-90" />
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold">0 {"€"}</div>
              <div className="text-base font-medium opacity-90">{"Brezplačno za začetek"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              {"Značilnosti"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
              {"Zakaj starši izbirajo KidsLearnAI?"}
            </h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              {"Celovita platforma, zasnovana z mislijo na izobraževanje in varnost"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#F3E8FF] flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">{"Učenje skozi igro"}</h3>
              <p className="text-[#64748B] leading-relaxed">
                {"Byte, osebni AI tutor, vodi otroka skozi lekcije na zabaven način. Otroci se učijo, ne da bi sploh vedeli, da se učijo."}
              </p>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#E0F2FE] flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#0EA5E9]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">{"Varno in primerno za otroke"}</h3>
              <p className="text-[#64748B] leading-relaxed">
                {"Platforma je zasnovana posebej za otroke. Brez oglasov, brez neprimernih vsebin — samo čisto učenje."}
              </p>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">{"Starši so vedno v sliki"}</h3>
              <p className="text-[#64748B] leading-relaxed">
                {"Tedenska poročila o napredku, ki jih prejmete direktno na email. Vedno veste, kaj se je vaš otrok naučil."}
              </p>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">{"Primerno za vsako starost"}</h3>
              <p className="text-[#64748B] leading-relaxed">
                {"Tečaji so prilagojeni starosti — od prvih korakov z AI pri 5 letih do naprednih izzivov pri 12 letih."}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#F0FDFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              Mnenja staršev
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
              {"Kaj pravijo starši?"}
            </h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              {"Zgodbe družin, ki so že preizkusile KidsLearnAI"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl bg-white">
              <div className="text-6xl text-[#7C3AED] font-serif leading-none mb-4">"</div>
              <p className="text-[#2D2A3D] leading-relaxed mb-6 text-lg">
                {"Moj sin je po prvem tednu sam prosil za več lekcij. Tega prej ni nikoli naredil z nobeno šolsko nalogo."}
              </p>
              <div className="border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#2D2A3D]">Maja K.</p>
                <p className="text-sm text-[#64748B]">Mama 9-letnega Luka</p>
              </div>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl bg-white">
              <div className="text-6xl text-[#7C3AED] font-serif leading-none mb-4">"</div>
              <p className="text-[#2D2A3D] leading-relaxed mb-6 text-lg">
                {"Končno platforma, ki je resnično varna za otroke in hkrati moderna. Byte je postal Zarin najljubši učitelj."}
              </p>
              <div className="border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#2D2A3D]">Andrej P.</p>
                <p className="text-sm text-[#64748B]">Oče 7-letne Zare</p>
              </div>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl bg-white">
              <div className="text-6xl text-[#7C3AED] font-serif leading-none mb-4">"</div>
              <p className="text-[#2D2A3D] leading-relaxed mb-6 text-lg">
                {"V šoli so začeli govoriti o AI. Hvala bogu, da je naš otrok že korak naprej — in to na zabaven način."}
              </p>
              <div className="border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#2D2A3D]">Nina M.</p>
                <p className="text-sm text-[#64748B]">Mama 11-letne Eve</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#2D2A3D] text-balance">
            {"Dajte svojemu otroku znanje prihodnosti — še danes."}
          </h2>
          <p className="text-xl mb-10 text-[#64748B] max-w-2xl mx-auto">
            {"Pridružite se prvim slovenskim družinam na KidsLearnAI. Prvih 7 dni je popolnoma brezplačnih. Nobene kreditne kartice ni potrebno."}
          </p>
          <Link href="/auth/sign-up" onClick={() => trackLead()}>
            <Button
              size="lg"
              className="text-lg px-12 py-7 rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
            >
              {"Začni brezplačno — 7 dni"}
            </Button>
          </Link>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Check className="w-5 h-5 text-[#7C3AED]" />
              <span>Brez kreditne kartice</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Check className="w-5 h-5 text-[#7C3AED]" />
              <span>Varno za otroke</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <Check className="w-5 h-5 text-[#7C3AED]" />
              <span>{"Prekliči kadarkoli"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
