"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

const STARS = [
  {x:5,y:8},{x:15,y:20},{x:28,y:6},{x:42,y:15},{x:55,y:5},{x:68,y:18},{x:78,y:8},{x:90,y:14},
  {x:8,y:40},{x:20,y:55},{x:35,y:48},{x:50,y:60},{x:65,y:45},{x:80,y:58},{x:92,y:42},
  {x:3,y:72},{x:18,y:80},{x:32,y:88},{x:48,y:75},{x:62,y:85},{x:75,y:72},{x:88,y:82},
]

export default function CertificatePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [courseTitle, setCourseTitle] = useState("")
  const [userName, setUserName] = useState("")
  const [completedAt, setCompletedAt] = useState("")
  const [averageScore, setAverageScore] = useState<number | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    fetch(`/api/courses/${slug}/certificate`)
      .then(async r => {
        if (r.status === 401) { router.push("/auth/login"); return }
        const data = await r.json()
        if (r.ok) {
          setIsValid(true)
          setUserName(data.studentName ?? "Učenec")
          setCourseTitle(data.courseTitle ?? "")
          setCompletedAt(new Date(data.completionDate).toLocaleDateString("sl-SI", {
            day: "numeric", month: "long", year: "numeric",
          }))
          setAverageScore(data.averageScore ?? null)
        }
      })
      .catch(() => {})
      .finally(() => setPageLoading(false))
  }, [user, slug, router])

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-5xl animate-bounce">🏆</div>
      </div>
    )
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={spaceStyle}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-5">🔒</div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Certifikat ni na voljo</h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Certifikat bo na voljo ko zaključiš vse lekcije tega tečaja.
          </p>
          <Link href={`/kids/courses/${slug}`}
            className="px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}>
            ← Nazaj na tečaj
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .cert-wrap { padding: 0 !important; background: white !important; }
          .cert-card {
            box-shadow: none !important;
            border: 3px solid #7c3aed !important;
            background: white !important;
            page-break-inside: avoid;
          }
          .cert-star { display: none !important; }
          .cert-title { color: #1a1a2e !important; }
          .cert-name  { color: #7c3aed !important; -webkit-text-fill-color: #7c3aed !important; }
          .cert-sub   { color: #4b5563 !important; }
          .cert-date  { color: #6b7280 !important; }
          .cert-badge { background: #f3e8ff !important; border-color: #a855f7 !important; }
          .cert-divider { background: #7c3aed !important; }
          .cert-footer { color: #9ca3af !important; }
        }
      `}</style>

      <div className="min-h-screen cert-wrap" style={spaceStyle}>
        {/* Stars background */}
        <div className="fixed inset-0 pointer-events-none cert-star">
          {STARS.map((s, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, opacity: 0.15 + (i % 4) * 0.08 }} />
          ))}
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">

          {/* Nav */}
          <div className="no-print w-full max-w-2xl flex items-center justify-between mb-8">
            <Link href={`/kids/courses/${slug}`} className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              ← Nazaj na tečaj
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 4px 16px rgba(168,85,247,0.4)" }}
            >
              🖨️ Natisni / Shrani PDF
            </button>
          </div>

          {/* Certificate card */}
          <div
            className="cert-card w-full max-w-2xl rounded-3xl overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #0d0d2b 0%, #1a0a3a 50%, #0d0d2b 100%)",
              border: "2px solid rgba(168,85,247,0.4)",
              boxShadow: "0 0 80px rgba(168,85,247,0.25), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Top accent bar */}
            <div className="h-1.5 cert-divider" style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #a855f7, #7c3aed)" }} />

            <div className="px-10 py-12 text-center">
              {/* Logo / issuer */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-3xl">🚀</span>
                <span className="cert-footer font-bold text-lg" style={{ color: "rgba(192,132,252,0.7)" }}>Kids Learning AI</span>
              </div>

              {/* Title */}
              <p className="cert-sub text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(168,85,247,0.7)", letterSpacing: "0.2em" }}>
                Potrdilo o opravljenem tečaju
              </p>

              <h1 className="cert-title text-2xl font-bold mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                S ponosom podeljujemo ta certifikat
              </h1>

              {/* Name */}
              <div className="mb-6">
                <p
                  className="cert-name font-black"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                    background: "linear-gradient(135deg, #c084fc, #e879f9, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.1,
                  }}
                >
                  {userName}
                </p>
                <div className="mx-auto mt-3 h-px w-48" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)" }} />
              </div>

              <p className="cert-sub text-base mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                je uspešno zaključil/a tečaj
              </p>

              {/* Course title */}
              <div
                className="cert-badge inline-block px-6 py-3 rounded-2xl mb-8"
                style={{
                  background: "rgba(168,85,247,0.15)",
                  border: "1px solid rgba(168,85,247,0.4)",
                }}
              >
                <p className="text-white font-extrabold text-xl">{courseTitle}</p>
              </div>

              {/* Stars decoration */}
              <div className="flex justify-center gap-2 mb-8 cert-star">
                {["⭐","🌟","✨","🌟","⭐"].map((s, i) => (
                  <span key={i} style={{ fontSize: i === 2 ? 28 : 20, opacity: i === 2 ? 1 : 0.6 }}>{s}</span>
                ))}
              </div>

              {/* Divider */}
              <div className="cert-divider mx-auto mb-8 h-px w-64" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />

              {/* Footer info */}
              <div className={`grid gap-6 ${averageScore !== null ? "grid-cols-3" : "grid-cols-2"}`}>
                <div>
                  <p className="cert-date text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                    Datum
                  </p>
                  <p className="cert-sub text-sm font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>{completedAt}</p>
                </div>
                {averageScore !== null && (
                  <div>
                    <p className="cert-date text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                      Povprečna ocena
                    </p>
                    <p className="cert-sub text-sm font-semibold" style={{ color: "rgba(168,85,247,0.9)" }}>{averageScore}%</p>
                  </div>
                )}
                <div>
                  <p className="cert-date text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                    Platforma
                  </p>
                  <p className="cert-sub text-sm font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>kids-learning-ai.com</p>
                </div>
              </div>

              {/* Byte mascot */}
              <div className="mt-8 cert-star">
                <span className="text-5xl">🤖</span>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Byte potrjuje tvoj dosežek!</p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1.5 cert-divider" style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #a855f7, #7c3aed)" }} />
          </div>

          {/* Share hint */}
          <p className="no-print mt-6 text-white/25 text-sm text-center">
            Klikni "Natisni / Shrani PDF" da shranite certifikat ali ga delite s starši 🎉
          </p>
        </div>
      </div>
    </>
  )
}
