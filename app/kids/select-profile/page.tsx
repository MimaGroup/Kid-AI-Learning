"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useChildren } from "@/hooks/use-children"
import { useActiveChild } from "@/hooks/use-active-child"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #1a1060 0%, #0a0a1a 75%)" }

const AVATAR_EMOJI = ["🧑‍🚀", "🦸", "🧑‍🎨", "🧙", "🥷", "🧑‍🔬"]

export default function SelectProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { children, loading } = useChildren()
  const { setActiveChild } = useActiveChild()
  const [redirecting, setRedirecting] = useState(false)

  const nextPath = searchParams.get("next") || "/kids/home"

  useEffect(() => {
    // If there's exactly one profile, skip the picker entirely — nothing to choose between.
    if (!loading && children.length === 1 && !redirecting) {
      setRedirecting(true)
      setActiveChild(children[0].id, children[0].name)
      router.replace(nextPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, children])

  const handleSelect = (id: string, name: string) => {
    setActiveChild(id, name)
    router.push(nextPath)
  }

  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🚀</div>
          <p className="text-purple-300 font-semibold">Nalaganje ...</p>
        </div>
      </div>
    )
  }

  if (children.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={spaceStyle}>
        <div className="max-w-sm w-full rounded-3xl p-8 text-center"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(168,85,247,0.35)" }}>
          <div className="text-6xl mb-4">👨‍👩‍👧</div>
          <h1 className="text-2xl font-bold text-white mb-3">Še ni profilov otrok</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Preden začnete, dodajte profil otroka v starševski nadzorni plošči.
          </p>
          <Link
            href="/parent/dashboard"
            className="inline-block w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #7C3AED, #a855f7)" }}
          >
            Pojdi na nadzorno ploščo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={spaceStyle}>
      <div className="max-w-2xl w-full text-center">
        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Kdo igra?</h1>
        <p className="text-white/50 mb-10">Izberi svoj profil, da se prikaže tvoj napredek</p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {children.map((child, i) => (
            <button
              key={child.id}
              onClick={() => handleSelect(child.id, child.name)}
              className="flex flex-col items-center gap-3 group active:scale-95 transition-all"
            >
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center text-5xl transition-all group-hover:scale-105 group-hover:ring-4"
                style={{
                  backgroundColor: child.avatar_color || "#4F46E5",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                }}
              >
                {AVATAR_EMOJI[i % AVATAR_EMOJI.length]}
              </div>
              <span className="text-white font-bold text-lg">{child.name}</span>
            </button>
          ))}
        </div>

        <Link href="/parent/dashboard" className="inline-block mt-12 text-white/40 hover:text-white/70 text-sm transition-colors">
          ← Nazaj na starševsko nadzorno ploščo
        </Link>
      </div>
    </div>
  )
}
