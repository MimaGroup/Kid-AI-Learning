import Link from "next/link"
import { stripe } from "@/lib/stripe"

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams
  const spaceStyle = { background: "radial-gradient(ellipse at 50% 30%, #0a2010 0%, #0a0a1a 80%)" }

  // No session_id — someone navigated directly, redirect them
  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center max-w-md w-full">
          <div className="text-8xl mb-6">🛸</div>
          <h1 className="text-2xl font-extrabold text-white mb-3">Napačna stran</h1>
          <p className="text-white/50 mb-8 text-sm">Ta stran je dostopna samo po uspešnem plačilu.</p>
          <Link
            href="/parent/dashboard"
            className="inline-block px-7 py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            Na starševsko ploščo →
          </Link>
        </div>
      </div>
    )
  }

  // Verify with Stripe
  let verified = false
  let isTrial = false
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    verified = session.status === "complete"
    isTrial = session.subscription != null
  } catch {
    // Invalid session_id
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center max-w-md w-full">
          <div className="text-8xl mb-6">⚠️</div>
          <h1 className="text-2xl font-extrabold text-white mb-3">Plačilo ni bilo potrjeno</h1>
          <p className="text-white/50 mb-2 text-sm leading-relaxed">
            Nismo mogli potrditi vaše naročnine. Preverite e-pošto ali poskusite znova.
          </p>
          <p className="text-white/30 text-xs mb-8">Če ste bili zaračunani in vidite to sporočilo, nas kontaktirajte.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/subscribe"
              className="inline-block px-7 py-3 rounded-2xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              Poskusi znova
            </Link>
            <Link
              href="/parent/dashboard"
              className="inline-block px-7 py-3 rounded-2xl font-bold transition-all active:scale-95"
              style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Na ploščo →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
      <div className="text-center max-w-md w-full">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          {isTrial ? "Preskus aktiviran!" : "Naročnina aktivirana!"}
        </h1>
        <p className="text-white/60 mb-2 text-sm leading-relaxed">
          {isTrial
            ? "Vaš 14-dnevni brezplačni preskus se je začel. Po preskusu vas bo Stripe samodejno zaračunal."
            : "Vaša naročnina je aktivna. Dostop do vseh vsebin je zagotovljen."}
        </p>
        <p className="text-white/40 text-xs mb-10">Potrditev ste prejeli na vaš e-poštni naslov.</p>
        <Link
          href="/parent/dashboard"
          className="inline-block px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg,#15803d,#22c55e)" }}
        >
          Na starševsko ploščo →
        </Link>
      </div>
    </div>
  )
}
