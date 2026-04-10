"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { lazy, Suspense } from "react"
import { Sparkles, Shield, Zap, BookOpen, Gamepad2, ArrowRight, Check, Monitor, Rocket, MessageCircle, Users, Quote } from "lucide-react"
import { SocialProofCounter } from "@/components/social-proof-counter"
import { ConversionTracker } from "@/components/conversion-tracker"

import { DemoVideoSection } from "@/components/demo-video-section"
import { StatsSection } from "@/components/stats-section"
import { LandingDemoGame } from "@/components/landing-demo-game"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import { trackLead } from "@/lib/fbpixel"

const TrustBadges = lazy(() => import("@/components/trust-badges").then((mod) => ({ default: mod.TrustBadges })))

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Suspense fallback={null}>
        <ConversionTracker />
      </Suspense>

      {/* Nav - fully localized to Slovenian */}
      <nav className="border-b border-border/40 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">
                KidsLearnAI
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/courses"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {"Tečaji"}
              </Link>
              <Link
                href="/pricing"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Cene
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                O nas
              </Link>
              <Link
                href="/faq"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {"Pogosta vprašanja"}
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg" className="rounded-full font-medium">
                  Prijava
                </Button>
              </Link>
              <Link href="/auth/sign-up" onClick={() => trackLead()}>
                <Button
                  size="lg"
                  className="rounded-full font-medium soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                >
                  {"Začni brezplačno"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

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

              <div className="pt-2">
                <SocialProofCounter />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/sign-up" onClick={() => trackLead()}>
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                  >
{"Začni brezplačno — 7 dni"}
                  </Button>
                </Link>
                <Link href="#demo-game">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-[#F5F3FF] text-[#7C3AED] font-semibold border border-[#E2E8F0]"
                  >
                    {"Preizkusi brezplačno igro"}
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
              <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Monitor className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">Produktivni zaslon</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Gamepad2 className="w-5 h-5 text-[#6CD4C3]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">{"Igre, ki učijo"}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Rocket className="w-5 h-5 text-[#F59E0B]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">AI znanje za jutri</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Shield className="w-5 h-5 text-[#EF4444]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">Varno okolje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - real feature counts */}
      <StatsSection />

      {/* Features section */}
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

      {/* Courses Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              {"Tečaji"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
              {"Izberite tečaj za vašega otroka"}
            </h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              {"Z enim Pro naročnino dostopate do vseh tečajev — že od €7.90/mesec"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course 1 - AI varnost in etika */}
            <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/courses/ai-safety.jpg"
                  alt="AI varnost in etika"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                    {"Začetnik"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {"AI varnost in etika"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                  {"Otrok spozna varno in odgovorno uporabo AI."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    8 lekcij
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    6-12 let
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7C3AED] font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {"Vključeno v Pro"}
                </div>
                <Link href="/auth/sign-up" onClick={() => trackLead()} className="w-full block">
                  <Button className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white">
                    {"Preizkusi 7 dni brezplačno"}
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Course 2 - AI umetniški studio */}
            <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/courses/ai-art.jpg"
                  alt="AI umetniški studio"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                    {"Začetnik"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {"AI umetniški studio"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                  {"Ustvarjanje z umetno inteligenco skozi igro in kreativnost."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    9 lekcij
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    5-10 let
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7C3AED] font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {"Vključeno v Pro"}
                </div>
                <Link href="/auth/sign-up" onClick={() => trackLead()} className="w-full block">
                  <Button className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white">
                    {"Preizkusi 7 dni brezplačno"}
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Course 3 - AI osnove za otroke */}
            <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/courses/ai-basics.jpg"
                  alt="AI osnove za otroke"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                    {"Začetnik"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {"AI osnove za otroke"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                  {"Prvi koraki v svet umetne inteligence na zabaven način."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    12 lekcij
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    6-12 let
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7C3AED] font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {"Vključeno v Pro"}
                </div>
                <Link href="/auth/sign-up" onClick={() => trackLead()} className="w-full block">
                  <Button className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white">
                    {"Preizkusi 7 dni brezplačno"}
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Course 4 - Programiranje z AI */}
            <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/courses/coding-ai.jpg"
                  alt="Programiranje z AI"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-semibold">
                    {"Srednji"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {"Programiranje z AI"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                  {"Osnove programiranja s pomočjo AI orodij in izzivov."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    20 lekcij
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    8-14 let
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7C3AED] font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {"Vključeno v Pro"}
                </div>
                <Link href="/auth/sign-up" onClick={() => trackLead()} className="w-full block">
                  <Button className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white">
                    {"Preizkusi 7 dni brezplačno"}
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Course 5 - Robotika in AI */}
            <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-[#7C3AED]/20 hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/courses/robotics-ai.jpg"
                  alt="Robotika in AI"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-rose-100 text-rose-800 border border-rose-200 px-3 py-1 text-xs font-semibold">
                    {"Napreden"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-lg text-[#2D2A3D] mb-2 group-hover:text-[#7C3AED] transition-colors">
                  {"Robotika in AI"}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
                  {"Napredni izzivi s roboti in umetno inteligenco."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#94A3B8] mb-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    25 lekcij
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    10-16 let
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#7C3AED] font-medium mb-4">
                  <Check className="w-4 h-4" />
                  {"Vključeno v Pro"}
                </div>
                <Link href="/auth/sign-up" onClick={() => trackLead()} className="w-full block">
                  <Button className="w-full rounded-full bg-[#7C3AED] hover:bg-[#6B2FD6] text-white">
                    {"Preizkusi 7 dni brezplačno"}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Inline demo game - try before signup */}
      <div id="demo-game">
        <LandingDemoGame />
      </div>

      {/* Meet Byte Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] via-[#FAF5FF] to-[#F0FDFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              AI Prijatelj
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
              Spoznaj Byte-a
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              {BYTE_CHARACTER.marketing.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#6CD4C3]/20 rounded-[3rem] blur-2xl" />
                <div className="relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-[#E2E8F0]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-[#7C3AED]/20">
                      <Image
                        src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                        alt={BYTE_CHARACTER.fullName}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-[#2D2A3D]">{BYTE_CHARACTER.fullName}</h3>
                      <p className="text-sm text-[#7C3AED] font-medium">{BYTE_CHARACTER.tagline}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#7C3AED]/20">
                        <Image
                          src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                          alt="Byte"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="bg-[#F3E8FF] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
                        <p className="text-sm text-[#2D2A3D]">{"Zdravo! Jaz sem Byte! Danes bova skupaj raziskovala, kako deluje umetna inteligenca."}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-[#6CD4C3] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">A</div>
                      <div className="bg-[#E0F2FE] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[280px]">
                        <p className="text-sm text-[#2D2A3D]">Kaj je AI?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#7C3AED]/20">
                        <Image
                          src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                          alt="Byte"
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="bg-[#F3E8FF] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
                        <p className="text-sm text-[#2D2A3D]">{"Odlično vprašanje! AI je kot pameten pomočnik, ki se uči iz primerov. Igrajva igro, da ti pokažem!"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Osebni AI tutor</h3>
                  <p className="text-[#64748B]">{"Byte se pogovarja z vsakim otrokom posebej, odgovarja na vprašanja in razlaga koncepte na zabaven način."}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">{"Vodič skozi igre"}</h3>
                  <p className="text-[#64748B]">{"Byte otroka vodi skozi vsako igro, daje namige in spodbuja pri učenju novih stvari."}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Spodbuda in nagrade</h3>
                  <p className="text-[#64748B]">{"Byte praznuje vsak uspeh, deli značke in motivira otroka, da nadaljuje z učenjem."}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Varno in nadzorovano</h3>
                  <p className="text-[#64748B]">{"Vsi pogovori so moderirani in starosti primerni. Starši imajo vedno pregled nad vsebino."}</p>
                </div>
              </div>

              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="mt-4 text-lg px-8 py-6 rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                >
                  Spoznaj Byte-a
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl">
              <div className="text-6xl text-[#7C3AED] font-serif leading-none mb-4">"</div>
              <p className="text-[#2D2A3D] leading-relaxed mb-6 text-lg">
                {"Moj sin je po prvem tednu sam prosil za več lekcij. Tega prej ni nikoli naredil z nobeno šolsko nalogo."}
              </p>
              <div className="border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#2D2A3D]">Maja K.</p>
                <p className="text-sm text-[#64748B]">Mama 9-letnega Luka</p>
              </div>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl">
              <div className="text-6xl text-[#7C3AED] font-serif leading-none mb-4">"</div>
              <p className="text-[#2D2A3D] leading-relaxed mb-6 text-lg">
                {"Končno platforma, ki je resnično varna za otroke in hkrati moderna. Byte je postal Zarin najljubši učitelj."}
              </p>
              <div className="border-t border-[#E2E8F0] pt-4">
                <p className="font-semibold text-[#2D2A3D]">Andrej P.</p>
                <p className="text-sm text-[#64748B]">Oče 7-letne Zare</p>
              </div>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all rounded-3xl">
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

      {/* How it works */}
      <DemoVideoSection />

      {/* Final CTA - simplified, single button */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#2D2A3D] text-balance">
            {"Dajte svojemu otroku znanje prihodnosti — še danes."}
          </h2>
          <p className="text-xl mb-10 text-[#64748B] max-w-2xl mx-auto">
            {"Pridružite se prvim slovenskim družinam na KidsLearnAI. Prvih 7 dni je popolnoma brezplačnih. Nobene kreditne kartice ni potrebno."}
          </p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="text-lg px-12 py-7 rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
            >
              {"Začni brezplačno zdaj"}
            </Button>
          </Link>
          <p className="text-sm text-[#64748B] mt-4">
            {"Brez kreditne kartice. Brez obveznosti."}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2A3D] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                    {"Tečaji"}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Cene
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    O nas
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                    {"Pogosta vprašanja"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Podpora</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/getting-started" className="text-gray-400 hover:text-white transition-colors">
                    {"Začetek uporabe"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Pravno</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Politika zasebnosti
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                    Pogoji uporabe
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{"Poveži se"}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    {"Pošlji email"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#7C3AED]/30">
                <Image
                  src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                  alt={BYTE_CHARACTER.fullName}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-heading font-bold text-2xl">KidsLearnAI</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300 italic mb-1">
                Umetna inteligenca za vsako slovensko otroško sobo.
              </p>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} KidsLearnAI. Vse pravice {"pridržane"}.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
