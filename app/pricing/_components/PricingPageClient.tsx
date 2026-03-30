"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Footer } from "@/components/footer"
import { AppNavigation } from "@/components/app-navigation"
import { trackEvent, trackConversion } from "@/lib/analytics"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Home, GraduationCap, Bot, Trophy, BarChart3, Shield, Rocket } from "lucide-react"
import Link from "next/link"

// Stripe Price IDs
const STRIPE_PRICE_IDS = {
  monthly: "price_1TGcA4L7QSfL4ZRXxh55RJoZ",
  yearly: "price_1TGcBeL7QSfL4ZRXyJIr7pqT",
}

export default function PricingPageClient() {
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setAuthLoading(false)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    trackConversion("pricing_viewed")
  }, [])

  const handleCTAClick = (planType: string) => {
    trackEvent("pricing_cta_clicked", { plan: planType })
    router.push("/auth/sign-up")
  }

  const handleCheckout = async (priceId: string, planType: "monthly" | "yearly") => {
    // If user is not logged in, redirect to sign-up first
    if (!user) {
      trackEvent("pricing_cta_clicked", { plan: planType, action: "redirect_to_signup" })
      router.push("/auth/sign-up")
      return
    }

    setCheckoutLoading(planType)
    trackEvent("pricing_cta_clicked", { plan: planType, action: "checkout" })

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, planType }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Checkout error:", data.error)
        alert("Prišlo je do napake. Prosimo, poskusite znova.")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Prišlo je do napake. Prosimo, poskusite znova.")
    } finally {
      setCheckoutLoading(null)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600">Nalaganje...</div>
        </div>
      </div>
    )
  }

  const freeFeatures = [
    { included: true, text: "Prve 2 lekciji vsakega tečaja" },
    { included: true, text: "Spoznaj Byte-a, tvojega AI tutorja" },
    { included: true, text: "Dostop do vseh tečajev (uvod)" },
    { included: false, text: "Certifikati ob zaključku" },
    { included: false, text: "Napredne lekcije" },
    { included: false, text: "Tedenska poročila za starše" },
  ]

  const monthlyFeatures = [
    { included: true, text: "Vsi tečaji — vse lekcije" },
    { included: true, text: "Certifikati ob zaključku tečaja" },
    { included: true, text: "Tedenska poročila o napredku za starše" },
    { included: true, text: "Novi tečaji takoj ob izidu" },
    { included: true, text: "Byte AI tutor — neomejeno" },
    { included: true, text: "Prednostna podpora" },
  ]

  const yearlyFeatures = [
    { included: true, text: "Vse iz mesečnega paketa" },
    { included: true, text: "Prednostni dostop do novih tečajev" },
    { included: true, text: "Ekskluzivni izzivi in nagrade za otroke" },
    { included: true, text: "Prihranite €35.80 na leto" },
    { included: true, text: "En letni račun — brez mesečnih skrbi" },
  ]

  const whatsIncludedFeatures = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#534AB7]" />,
      title: "Vsi tečaji",
      description: "Popoln dostop do vseh tečajev — sedaj in v prihodnosti",
    },
    {
      icon: <Bot className="w-6 h-6 text-[#534AB7]" />,
      title: "Byte AI tutor",
      description: "Osebni AI učitelj, ki se prilagodi vašemu otroku",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#534AB7]" />,
      title: "Certifikati",
      description: "Uradna potrdila ob zaključku vsakega tečaja",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#534AB7]" />,
      title: "Poročila za starše",
      description: "Tedenski pregled napredka direktno na vaš email",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#534AB7]" />,
      title: "Varno okolje",
      description: "Brez oglasov, brez neprimernih vsebin — samo učenje",
    },
    {
      icon: <Rocket className="w-6 h-6 text-[#534AB7]" />,
      title: "Novi tečaji",
      description: "Vsak nov tečaj takoj dostopen brez doplačila",
    },
  ]

  const faqItems = [
    {
      question: "Ali moram vnesti kreditno kartico za brezplačni račun?",
      answer:
        "Ne. Brezplačni račun ne zahteva nobenih plačilnih podatkov. Začnete takoj, brez obveznosti.",
    },
    {
      question: "Kdaj lahko odpovem naročnino?",
      answer:
        "Kadarkoli, brez kakršnih koli stroškov. Dostop ohranite do konca plačanega obdobja.",
    },
    {
      question: "Koliko otrok lahko uporablja en račun?",
      answer:
        "En račun je namenjen enemu otroku. Za več otrok vas prosimo, da nas kontaktirate za družinski paket.",
    },
    {
      question: "Kaj se zgodi po brezplačnem obdobju?",
      answer:
        "Vaš brezplačni račun ostane aktiven za vedno — dostop do prvih 2 lekcij vsakega tečaja ni nikoli omejen. Za polni dostop izberite Pro paket.",
    },
    {
      question: "Ali so tečaji primerni za moje otroke?",
      answer:
        "Imamo tečaje za otroke od 5 do 16 let, razdeljene po starosti in težavnosti. Byte se prilagodi vsakemu otroku posebej.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col relative overflow-hidden">
      {user ? (
        <AppNavigation />
      ) : (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Home className="w-5 h-5 text-[#534AB7]" />
                <span className="font-bold text-lg">KidsLearnAI</span>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Prijava
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12 px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Preprosta cena. Vse vključeno.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              Začnite brezplačno — brez kreditne kartice. Nadgradite kadarkoli.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-16">
            {/* Free Tier Card */}
            <Card className="relative p-8 bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-3xl hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">
                  Brezplačno
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Začetnik</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">€0</span>
                  <span className="text-gray-500 ml-2">za vedno</span>
                </div>
                <p className="text-sm text-gray-500">Brez kreditne kartice</p>
              </div>

              <Button
                variant="outline"
                className="w-full mb-6 border-2 border-[#534AB7] text-[#534AB7] hover:bg-[#534AB7] hover:text-white font-semibold"
                onClick={() => handleCTAClick("free")}
              >
                Začni brezplačno
              </Button>

              <div className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className={feature.included ? "text-green-500" : "text-gray-300"}>
                      {feature.included ? "✓" : "✗"}
                    </span>
                    <span className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Monthly Pro Card */}
            <Card className="relative p-8 bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-3xl hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <Badge className="bg-[#534AB7]/10 text-[#534AB7] border-[#534AB7]/20 mb-4">
                  Pro mesečno
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">KidsLearnAI Pro</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">€7.90</span>
                  <span className="text-gray-500 ml-2">/mesec</span>
                </div>
                <p className="text-sm text-gray-500">Odpovedi kadarkoli</p>
              </div>

              <Button
                className="w-full mb-6 bg-[#534AB7] hover:bg-[#4339a6] text-white font-semibold"
                onClick={() => handleCheckout(STRIPE_PRICE_IDS.monthly, "monthly")}
                disabled={checkoutLoading === "monthly"}
              >
                {checkoutLoading === "monthly" ? "Nalaganje..." : "Začni Pro"}
              </Button>

              <div className="space-y-3">
                {monthlyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Annual Pro Card - Featured */}
            <Card className="relative p-8 bg-white/90 backdrop-blur-md border-2 border-[#534AB7] rounded-3xl hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="mb-6">
                <Badge className="bg-[#534AB7] text-white border-[#534AB7] mb-4">
                  Najboljša vrednost
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">KidsLearnAI Pro Letno</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">€59</span>
                  <span className="text-gray-500 ml-2">/leto</span>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Samo €4.92/mesec — prihranite €35.80
                </p>
              </div>

              <Button
                className="w-full mb-6 bg-[#534AB7] hover:bg-[#4339a6] text-white font-semibold"
                onClick={() => handleCheckout(STRIPE_PRICE_IDS.yearly, "yearly")}
                disabled={checkoutLoading === "yearly"}
              >
                {checkoutLoading === "yearly" ? "Nalaganje..." : "Začni letni Pro"}
              </Button>

              <p className="text-xs text-center text-gray-500 -mt-4 mb-6">
                Najpogosteje izbrana možnost med slovenskimi starši
              </p>

              <div className="space-y-3">
                {yearlyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* What's Included Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              Kaj je vključeno v Pro?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whatsIncludedFeatures.map((feature, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#534AB7]/10 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              Pogosta vprašanja
            </h2>
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Final CTA Strip */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 sm:p-12 bg-[#EEEDFE] border-0 rounded-3xl text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Dajte svojemu otroku znanje prihodnosti — še danes.
              </h3>
              <p className="text-gray-600 mb-6">
                Začnite brezplačno. Nadgradite, ko boste pripravljeni.
              </p>
              <Button
                className="bg-[#534AB7] hover:bg-[#4339a6] text-white font-semibold px-8 py-3 text-lg"
                onClick={() => handleCTAClick("cta-bottom")}
              >
                Začni brezplačno →
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
