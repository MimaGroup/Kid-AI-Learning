"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }
const inputStyle = { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(168,85,247,0.25)" }

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Gesli se ne ujemata")
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Geslo mora imeti vsaj 8 znakov")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => router.push("/auth/login"), 2000)
    } catch (err) {
      setError("Napaka pri ponastavitvi gesla. Poskusi znova.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={spaceStyle}>
      <div className="max-w-md w-full rounded-3xl p-8"
        style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(168,85,247,0.3)", boxShadow: "0 0 60px rgba(168,85,247,0.1)" }}>

        <div className="text-center mb-7">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-1">Ponastavi geslo</h1>
          <p className="text-white/50 text-sm">Vnesite novo geslo</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="rounded-2xl px-4 py-4 mb-6"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}>
              <p className="text-sm">Geslo uspešno ponastavljeno! Preusmerjanje na prijavo...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-2xl text-sm"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171" }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-white/60 mb-2">Novo geslo</label>
              <input id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
                style={inputStyle}
                placeholder="Vnesite novo geslo"
                required minLength={8} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-white/60 mb-2">Potrdi geslo</label>
              <input id="confirmPassword" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-white focus:outline-none"
                style={inputStyle}
                placeholder="Potrdite novo geslo"
                required minLength={8} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
              {loading ? "Ponastavljanje..." : "Ponastavi geslo"}
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
