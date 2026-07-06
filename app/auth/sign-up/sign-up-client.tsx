"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/use-auth"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { trackEvent, trackError } from "@/lib/analytics"
import { trackCompleteRegistration } from "@/lib/fbpixel"
import { LoadingOverlay } from "@/components/loading-overlay"
import { Gift, Check } from "lucide-react"
import { BYTE_CHARACTER } from "@/lib/byte-character"
import Image from "next/image"

function SignUpPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralValid, setReferralValid] = useState<boolean | null>(null)
  const { register } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get("ref")
    if (ref) {
      setReferralCode(ref.toUpperCase())
      setReferralValid(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Gesli se ne ujemata")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Geslo mora imeti vsaj 6 znakov")
      setIsLoading(false)
      return
    }

    try {
      await register(email, password)
      trackEvent("user_signup", {
        email_domain: email.split("@")[1],
        timestamp: Date.now(),
        has_referral: !!referralCode,
      })

      if (referralCode) {
        try {
          await fetch("/api/referrals/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              referralCode,
              newUserEmail: email,
            }),
          })
        } catch (refError) {
          console.error("Failed to apply referral:", refError)
        }
      }

      setSuccess(true)
      console.log('[v0] CompleteRegistration firing', { fbqExists: typeof window !== 'undefined' && typeof window.fbq === 'function' })
      trackCompleteRegistration()

      // Trigger welcome email sequence
      try {
        await fetch("/api/email/welcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            firstName: "starš",
          }),
        })
      } catch (emailError) {
        // Don't block registration if email fails
        console.error("Failed to send welcome email:", emailError)
      }

      setIsLoading(false)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registracija ni uspela"
      setError(errorMessage)
      trackError(err instanceof Error ? err : new Error(errorMessage), "signup")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
        <div className="absolute top-20 left-10 text-5xl opacity-10 animate-bounce">✨</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-pulse">🎉</div>

        <div className="max-w-md w-full rounded-3xl shadow-2xl p-8 text-center relative z-10"
          style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(34,197,94,0.35)", boxShadow: "0 0 60px rgba(34,197,94,0.1)" }}>
          <div className="text-6xl mb-4">✉️</div>
          <h1 className="text-3xl font-bold text-white mb-4">Preverite svojo e-pošto!</h1>
          <p className="text-white/55 mb-6 text-sm leading-relaxed">
            Poslali smo vam potrditveno povezavo. Preverite svojo e-pošto in kliknite povezavo za aktivacijo računa.
          </p>
          {referralCode && (
            <div className="rounded-2xl p-3 mb-6 flex items-center justify-center gap-2 text-sm"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
              <Gift className="w-4 h-4 flex-shrink-0" />
              Priporočilni bonus aktiviran! Dobili boste 14-dnevni brezplačni preizkus.
            </div>
          )}
          <Link
            href="/parent/dashboard"
            className="inline-block py-3 px-6 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}
          >
            Pojdi na nadzorno ploščo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
      {/* Stars */}
      {[{x:5,y:8},{x:18,y:82},{x:28,y:22},{x:38,y:58},{x:48,y:12},{x:58,y:72},{x:68,y:38},{x:78,y:88},{x:88,y:18},{x:94,y:52},{x:12,y:48},{x:52,y:42},{x:82,y:62},{x:32,y:78},{x:72,y:8}].map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.08 + (i % 4) * 0.05 }} />
      ))}
      <div className="absolute top-20 left-10 text-5xl opacity-10 animate-bounce">🤖</div>
      <div className="absolute top-40 right-20 text-4xl opacity-10 animate-pulse">🎨</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-10 animate-bounce delay-200">✨</div>

      <div className="max-w-md w-full rounded-3xl shadow-2xl p-8 relative z-10"
        style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 60px rgba(168,85,247,0.1)" }}>
        {isLoading && <LoadingOverlay message="Ustvarjanje vašega računa..." />}

        <div className="text-center mb-7">
          {/* Byte avatar with speech bubble */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative mb-3">
              <div className="rounded-2xl px-5 py-3 max-w-[260px]"
                style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <p className="text-sm text-purple-300 font-medium">
                  Zdravo! Jaz sem Byte — komaj čakam, da se skupaj učiva!
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
                style={{ background: "rgba(168,85,247,0.12)", borderBottom: "1px solid rgba(168,85,247,0.3)", borderRight: "1px solid rgba(168,85,247,0.3)" }} />
            </div>
            <div className="relative w-20 h-20 mt-1">
              <Image
                src={BYTE_CHARACTER.images.waving || "/placeholder.svg"}
                alt={BYTE_CHARACTER.fullName}
                fill
                className="object-cover rounded-full shadow-lg"
                style={{ ring: "none", boxShadow: "0 0 0 3px rgba(168,85,247,0.4)" }}
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 rounded-full animate-pulse"
                style={{ borderColor: "#0a0a1a" }} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">Ustvari račun</h1>
          <p className="text-white/50 text-sm">Pridruži se KidsLearnAI platformi</p>

          {referralCode && (
            <div className="mt-4 rounded-2xl p-3"
              style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)" }}>
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Priporočilni bonus aktiviran!</span>
              </div>
              <p className="text-xs text-purple-400 mt-1">14-dnevni brezplačni preizkus namesto 7 dni</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white/60 mb-2">E-pošta</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
              placeholder="Vnesite svojo e-pošto" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-white/60 mb-2">Geslo</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
              placeholder="Ustvarite geslo (najmanj 6 znakov)" required minLength={6} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-white/60 mb-2">Potrdi geslo</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
              placeholder="Potrdite svoje geslo" required minLength={6} />
          </div>

          <div>
            <label htmlFor="referralCode" className="block text-xs font-semibold text-white/60 mb-2">
              Priporočilna koda <span className="text-white/30 font-normal">(Neobvezno)</span>
            </label>
            <div className="relative">
              <input id="referralCode" type="text" value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none font-mono uppercase"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}
                placeholder="Vnesite priporočilno kodo" maxLength={8} />
              {referralCode && referralValid && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
              )}
            </div>
            {referralCode && (
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <Gift className="w-3 h-3" /> Dobili boste 14-dnevni brezplačni preizkus!
              </p>
            )}
          </div>

          {error && (
            <div className="px-4 py-3 rounded-2xl text-sm"
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)", boxShadow: "0 2px 16px rgba(168,85,247,0.3)" }}>
            {isLoading ? "Ustvarjanje računa..." : "Ustvari račun"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-white/40 text-sm">
            Že imate račun?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Prijavite se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPageClient
