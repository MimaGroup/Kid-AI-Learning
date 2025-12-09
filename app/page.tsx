import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { lazy } from "react"
import { Sparkles, Shield, Zap, BookOpen, Gamepad2, ArrowRight, Check, Monitor, Rocket } from "lucide-react"

const TrustBadges = lazy(() => import("@/components/trust-badges").then((mod) => ({ default: mod.TrustBadges })))

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
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
              <Link href="/getting-started">
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/getting-started">
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

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center mb-4">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Produktivni zaslon</h3>
                <p className="text-sm text-[#64748B]">Manj krivde glede "screen time"</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6CD4C3] to-[#4FACAB] flex items-center justify-center mb-4">
                  <Gamepad2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Igre, ki učijo</h3>
                <p className="text-sm text-[#64748B]">Zabavno in učinkovito</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center mb-4">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Priprava na prihodnost</h3>
                <p className="text-sm text-[#64748B]">AI znanje za jutri</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur border-[#E2E8F0] hover:shadow-lg transition-all hover:scale-105 rounded-2xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF9980] to-[#EF4444] flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-[#2D2A3D]">Varno okolje</h3>
                <p className="text-sm text-[#64748B]">Starševski nadzor</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#7C3AED]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">10K+</div>
              <div className="text-lg font-medium opacity-90">Aktivnih učencev</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">50+</div>
              <div className="text-lg font-medium opacity-90">Učnih aktivnosti</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">98%</div>
              <div className="text-lg font-medium opacity-90">Zadovoljnih staršev</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-heading font-bold">24/7</div>
              <div className="text-lg font-medium opacity-90">Dostop do učenja</div>
            </div>
          </div>
        </div>
      </section>

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
                Skladno s COPPA z robustnimi starševskimi kontrolami, filtriranjem vsebine in spremljanjem v realnem
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
            <Link href="/getting-started">
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
                className="text-lg px-10 py-7 w-full sm:w-auto rounded-full soft-shadow-lg hover:scale-105 transition-all bg-white hover:bg-gray-50 text-[#7C3AED]"
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
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7C3AED]" />
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
