"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../hooks/use-auth"
import Link from "next/link"
import { trackEvent, trackError } from "@/lib/analytics"

export function LoginPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, error, clearError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    try {
      await login(email, password)

      trackEvent("user_login", {
        email_domain: email.split("@")[1],
        timestamp: Date.now(),
      })

      router.refresh()
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push("/kids/home")
    } catch (err) {
      trackError(err instanceof Error ? err : new Error("Login failed"), "login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
      {/* Stars */}
      {[{x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},{x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},{x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8}].map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.08 + (i % 4) * 0.05 }} />
      ))}

      {/* Floating decorations */}
      <div className="absolute top-20 left-10 text-5xl opacity-10 animate-bounce">🤖</div>
      <div className="absolute top-40 right-20 text-4xl opacity-10 animate-pulse">🧠</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-10 animate-bounce delay-200">💻</div>

      <div className="max-w-md w-full rounded-3xl shadow-2xl p-8 relative z-10"
        style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 60px rgba(168,85,247,0.1)" }}>

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h1 className="text-3xl font-bold text-white mb-2">Dobrodošli nazaj</h1>
          <p className="text-white/50 text-sm">Prijavite se v svoj KidsLearnAI račun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white/60 mb-2">E-pošta</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
              placeholder="Vnesite svojo e-pošto"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-xs font-semibold text-white/60">Geslo</label>
              <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                Pozabljeno geslo?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
              placeholder="Vnesite svoje geslo"
              required
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-2xl text-sm"
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)", boxShadow: "0 2px 16px rgba(168,85,247,0.3)" }}
          >
            {isLoading ? "Prijavljanje..." : "Prijava"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/40 text-sm">
            Še nimate računa?{" "}
            <Link href="/auth/sign-up" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Registrirajte se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
