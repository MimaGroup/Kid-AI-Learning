"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../../../hooks/use-auth"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register } = useAuth()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? ""

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
      setSuccess(true)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registracija ni uspela")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Preverite e-pošto!</h1>
          <p className="text-gray-600 mb-6">
            Poslali smo vam potrditveno povezavo. Preverite e-pošto in kliknite povezavo, da aktivirate račun.
          </p>
          <Link
            href={`/auth/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="inline-block bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Pojdi na prijavo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ustvari račun</h1>
          <p className="text-gray-600">Pridružite se Kids Learning AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-pošta
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Vnesite e-pošto"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Geslo
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ustvarite geslo (vsaj 6 znakov)"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Potrdi geslo
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Potrdite geslo"
              required
              minLength={6}
            />
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Ustvarjanje računa..." : "Ustvari račun"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Že imate račun?{" "}
            <Link
              href={`/auth/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
              className="text-purple-600 hover:underline"
            >
              Prijava
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
