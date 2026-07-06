"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }
const inputStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Napaka pri pošiljanju e-pošte za ponastavitev")
        setLoading(false)
        return
      }

      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError("Napaka pri pošiljanju e-pošte. Poskusi znova.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={spaceStyle}>
      <div className="max-w-md w-full rounded-3xl p-8"
        style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 60px rgba(168,85,247,0.1)" }}>

        <div className="text-center mb-7">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-white mb-1">Pozabljeno geslo?</h1>
          <p className="text-white/50 text-sm">Vnesite e-pošto za ponastavitev gesla</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="rounded-2xl px-4 py-4 mb-6"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}>
              <p className="text-sm leading-relaxed">
                Če račun s to e-pošto obstaja, boste kmalu prejeli povezavo za ponastavitev gesla. Preverite svojo e-pošto.
              </p>
            </div>
            <Link href="/auth/login"
              className="inline-block py-3 px-6 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              ← Nazaj na prijavo
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-2xl text-sm"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white/60 mb-2">E-pošta</label>
              <input id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
                style={inputStyle}
                placeholder="vasa@email.com"
                required />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              {loading ? "Pošiljanje..." : "Pošlji povezavo"}
            </button>

            <div className="text-center">
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                ← Nazaj na prijavo
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
