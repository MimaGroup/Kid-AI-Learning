"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { trackEvent, trackPayment } from "@/lib/analytics"
import { trackStartTrial } from "@/lib/fbpixel"

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get("session_id") ?? null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            trackPayment("success", data.amount, data.currency)
            trackEvent("subscription_started", {
              plan: data.plan_type || "unknown",
              session_id: sessionId,
            })
            trackStartTrial()
            setLoading(false)
          } else {
            setError(data.error || "Preverjanje plačila ni uspelo")
            setLoading(false)
          }
        })
        .catch((err) => {
          setError("Preverjanje plačila ni uspelo")
          setLoading(false)
        })
    } else {
      setError("Manjka ID seje")
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Preverjanje plačila ...</h2>
          <p className="text-gray-600">Prosimo počakajte, medtem ko potrjujemo vašo naročnino.</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Napaka pri plačilu</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/pricing")} className="bg-purple-600 hover:bg-purple-700">
            Nazaj na cenik
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <Card className="p-8 max-w-md text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dobrodošli v Premium!</h2>
        <p className="text-gray-600 mb-6">
          Vaša naročnina je zdaj aktivna. Imate popoln dostop do vseh premium dejavnosti in vsebin.
        </p>

        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Kaj je odklenjeno:</h3>
          <ul className="text-left text-sm text-gray-700 space-y-1">
            <li>✓ Ustvarjalnik AI prijateljev</li>
            <li>✓ Usposabljanje vzorcev</li>
            <li>✓ Polna knjižnica vsebin</li>
            <li>✓ Napredna analitika</li>
            <li>✓ Prednostna podpora</li>
          </ul>
        </div>

        <Button onClick={() => router.push("/kids/home")} className="w-full bg-purple-600 hover:bg-purple-700">
          Začni z učenjem
        </Button>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <Card className="p-8 max-w-md text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nalaganje ...</h2>
          </Card>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
