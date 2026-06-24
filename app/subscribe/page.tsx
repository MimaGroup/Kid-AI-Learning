"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const PLANS = [
  {
    id: "monthly",
    label: "Mesečni paket",
    price: "€7,90",
    period: "/ mesec",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!,
    features: ["14-dnevni brezplačni preskus", "Preklic kadarkoli", "Vse dejavnosti vključene"],
    highlight: false,
  },
  {
    id: "yearly",
    label: "Letni paket",
    price: "€79,00",
    period: "/ leto",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY!,
    features: ["14-dnevni brezplačni preskus", "Prihraniš ~2 meseca", "Vse dejavnosti vključene"],
    highlight: true,
    badge: "Prihrani 17%",
  },
]

export default function SubscribePage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleSubscribe = async (priceId: string, planId: string) => {
    setLoading(planId)
    setError("")
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })
      if (res.status === 401) {
        router.push("/auth/sign-up?redirect=/subscribe")
        return
      }
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || "Napaka pri preusmerjanju na plačilo.")
      }
    } catch {
      setError("Napaka pri vzpostavljanju povezave.")
    } finally {
      setLoading(null)
    }
  }

  const spaceStyle = { background: "radial-gradient(ellipse at 50% 20%, #1a0a40 0%, #0a0a1a 80%)" }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={spaceStyle}>
      {/* Stars */}
      {[{x:5,y:10},{x:20,y:80},{x:40,y:20},{x:60,y:70},{x:80,y:15},{x:92,y:55},{x:15,y:45},{x:70,y:90}].map((s,i) => (
        <div key={i} className="fixed rounded-full bg-white pointer-events-none"
          style={{ left:`${s.x}%`, top:`${s.y}%`, width:2, height:2, opacity: 0.15 }} />
      ))}

      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-white/40 hover:text-white/70 text-sm transition-colors">
            <span>🚀</span> Kids Learning AI
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-3">Izberi plan</h1>
          <p className="text-white/50 text-sm">14-dnevni preskus. Preklic kadarkoli. Vse cene v EUR.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="rounded-3xl p-7 flex flex-col relative"
              style={{
                background: plan.highlight ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)",
                border: plan.highlight ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: plan.highlight ? "0 0 40px rgba(168,85,247,0.15)" : "none",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white" }}
                >
                  {plan.badge}
                </div>
              )}

              <p className="text-white/60 text-sm font-semibold mb-1">{plan.label}</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-2 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.priceId, plan.id)}
                disabled={!!loading}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-base transition-all disabled:opacity-50 active:scale-95"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                    : "rgba(255,255,255,0.1)",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {loading === plan.id ? "Preusmerjanje..." : "Začni 14-dnevni preskus"}
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-center text-red-400 text-sm mb-4">{error}</p>
        )}

        <p className="text-center text-white/25 text-xs">
          Po preskusu se samodejno zaračuna izbrani plan. Prekliči kadarkoli v nastavitvah računa.
        </p>

        <p className="text-center mt-6">
          <Link href="/parent/dashboard" className="text-purple-400 hover:text-purple-300 text-sm">
            ← Nazaj na ploščo
          </Link>
        </p>
      </div>
    </div>
  )
}
