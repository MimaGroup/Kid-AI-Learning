"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }}>
      <div className="max-w-md w-full rounded-3xl p-8 text-center"
        style={{ background: "rgba(8,8,30,0.92)", border: "1px solid rgba(239,68,68,0.3)", boxShadow: "0 0 60px rgba(239,68,68,0.08)" }}>
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">Prišlo je do napake!</h1>
        <p className="text-white/55 mb-5 text-sm leading-relaxed">Prišlo je do nepričakovane napake. Poskusite znova.</p>

        {error.message && (
          <div className="px-4 py-3 rounded-2xl mb-5 text-left"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
            <p className="text-xs font-mono text-red-300 break-all">{error.message}</p>
          </div>
        )}

        <div className="space-y-3">
          <button onClick={reset}
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}>
            Poskusi znova
          </button>
          <button onClick={() => (window.location.href = "/")}
            className="w-full py-3.5 rounded-2xl font-bold transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}>
            Na začetno stran
          </button>
        </div>
      </div>
    </div>
  )
}
