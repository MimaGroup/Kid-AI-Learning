import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { lazy, Suspense } from "react"
import { Sparkles, Shield, Zap, BookOpen, Gamepad2, ArrowRight, Check, Monitor, Rocket, MessageCircle } from "lucide-react"
import { SocialProofCounter } from "@/components/social-proof-counter"
import { ConversionTracker } from "@/components/conversion-tracker"
import { ReferralHeroSection } from "@/components/referral-hero-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DemoVideoSection } from "@/components/demo-video-section"
import { StatsSection } from "@/components/stats-section"
import { BYTE_CHARACTER } from "@/lib/byte-character"

const TrustBadges = lazy(() => import("@/components/trust-badges").then((mod) => ({ default: mod.TrustBadges })))

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Suspense fallback={null}>
        <ConversionTracker />
      </Suspense>

      <nav className="border-b border-border/40 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6CD4C3] flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl bg-gradient-to-r from-[#7C3AED] to-[#6CD4C3] bg-clip-text text-transparent">
                AI Kids Learning
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/pricing"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg" className="rounded-full font-medium">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="rounded-full font-medium soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                >
                  Start Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FDFA] min-h-[90vh]">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#7C3AED]/10 to-[#6CD4C3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#FFB5DA]/10 to-[#FCD34D]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Hero content */}
            <div className="space-y-8">
              <Badge className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-[#FCD34D] text-[#8B6914] border-0 hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
                AI učna platforma za otroke 5-12 let
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-balance leading-[1.1] tracking-tight">
                <span className="text-[#2D2A3D]">Zaslon, ki uči.</span>
                <br />
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#60A5FA] bg-clip-text text-transparent">
                  Igra, ki razvija.
                </span>
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed text-[#64748B] max-w-xl">
                KidsLearnAI je zabavna in pametna AI učna platforma, ki otrokom od 5–12 let pomaga hitreje in lažje
                učiti — preko iger, izzivov in osebnega AI tutorja.
              </p>

              <div className="pt-2">
                <SocialProofCounter />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
                  >
                    Začni brezplačno →
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-gray-50 text-[#7C3AED] font-semibold"
                  >
                    Poglej cene
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
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
                  <span>Prekliči kadarkoli</span>
                </div>
              </div>
            </div>

            {/* Byte Hero Image with speech bubble */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative">
                {/* Speech bubble */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-lg border border-[#E2E8F0] z-10 whitespace-nowrap">
                  <p className="text-base font-semibold text-[#7C3AED]">{BYTE_CHARACTER.phrases.greeting}</p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-[#E2E8F0] rotate-45" />
                </div>
                {/* Byte image */}
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
              {/* Feature pills below Byte */}
              <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Monitor className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">Produktivni zaslon</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-4 py-2.5 shadow-sm border border-[#E2E8F0]">
                  <Gamepad2 className="w-5 h-5 text-[#6CD4C3]" />
                  <span className="text-sm font-medium text-[#2D2A3D]">Igre, ki ucijo</span>
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

      <StatsSection />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-[#7C3AED] text-[#7C3AED]">
              Značilnosti
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#2D2A3D]">
              Zakaj starši izberejo nas
            </h2>
            <p className="text-xl text-[#64748B] max-w-3xl mx-auto">
              Celovita platforma, zasnovana z mislijo na izobraževanje in varnost
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#F3E8FF] flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#7C3AED]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Izobraževalne vsebine</h3>
              <p className="text-[#64748B] leading-relaxed">
                Lekcije, ki uvajajo koncepte umetne inteligence skozi privlačne, starosti primerne aktivnosti in zgodbe.
              </p>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#E0F2FE] flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#0EA5E9]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Varno okolje</h3>
              <p className="text-[#64748B] leading-relaxed">
                Skladno s COPPA z robustnimi starševskimi kontrolami, filtririranjem vsebine in spremljanjem v realnem
                času.
              </p>
            </Card>

            <Card className="p-10 border-[#E2E8F0] hover:shadow-xl transition-all hover:scale-105 rounded-3xl">
              <div className="w-16 h-16 rounded-2xl bg-[#FEF3C7] flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-[#2D2A3D]">Prilagodljivo učenje</h3>
              <p className="text-[#64748B] leading-relaxed">
                AI-poganjana personalizacija se prilagaja tempu in učnemu slogu vašega otroka za optimalno vključenost.
              </p>
            </Card>
          </div>
        </div>
      </section>

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
            {/* Byte character showcase */}
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
                  {/* Simulated chat conversation */}
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
                        <p className="text-sm text-[#2D2A3D]">Zdravo! Jaz sem Byte! Danes bova skupaj raziskovala, kako deluje umetna inteligenca.</p>
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
                        <p className="text-sm text-[#2D2A3D]">Odlicno vprasanje! AI je kot pameten pomocnik, ki se uci iz primerov. Igrajva igro, da ti pokazem!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Byte features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Osebni AI tutor</h3>
                  <p className="text-[#64748B]">Byte se pogovarja z vsakim otrokom posebej, odgovarja na vprasanja in razlaga koncepte na zabaven nacin.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Vodic skozi igre</h3>
                  <p className="text-[#64748B]">Byte otroka vodi skozi vsako igro, daje namige in spodbuja pri ucenju novih stvari.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Spodbuda in nagrade</h3>
                  <p className="text-[#64748B]">Byte praznuje vsak uspeh, deli znacke in motivira otroka, da nadaljuje z ucenjem.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#2D2A3D] mb-1">Varno in nadzorovano</h3>
                  <p className="text-[#64748B]">Vsi pogovori so moderirani in starosti primerni. Starsi imajo vedno pregled nad vsebino.</p>
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

      <TestimonialsSection />

      <DemoVideoSection />

      <ReferralHeroSection />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 px-6 py-3 rounded-full font-semibold">
            Omejena ponudba
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#2D2A3D]">
            Pripravljeni začeti AI potovanje vašega otroka?
          </h2>
          <p className="text-xl mb-10 text-[#64748B] max-w-2xl mx-auto">
            Pridružite se tisočim družinam, ki svojim otrokom dajejo prednost v dobi umetne inteligence. Začnite
            brezplačno preizkusno obdobje še danes — brez kreditne kartice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-[#7C3AED] hover:bg-[#6B2FD6] text-white"
              >
                Začni brezplačno
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-gray-50 text-[#7C3AED] font-semibold"
              >
                Poglej pakete
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#2D2A3D] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <ul className="space-y-3 text-sm">
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
                    Pogosta vprašanja
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
                    Začetek uporabe
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
              <h4 className="font-semibold mb-4">Poveži se</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Pošlji email
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
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} KidsLearnAI. Vse pravice pridržane.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
