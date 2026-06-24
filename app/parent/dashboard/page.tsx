"use client"

import React, { useState } from "react"
import { useAuth } from "../../../hooks/use-auth"
import { useChildren } from "../../../hooks/use-children"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AddChildDialog } from "../../../components/add-child-dialog"
import { ChildCard } from "../../../components/child-card"
import { ChildProgressCard } from "../../../components/child-progress-card"
import type { Child } from "../../../types/child"
import { createClient } from "../../../lib/supabase/client"
import { useSubscription } from "../../../hooks/use-subscription"

const STARS = [
  {x:3,y:8},{x:14,y:72},{x:22,y:25},{x:34,y:58},{x:44,y:6},
  {x:54,y:78},{x:64,y:38},{x:74,y:88},{x:86,y:16},{x:94,y:52},
  {x:8,y:46},{x:48,y:42},{x:80,y:62},{x:28,y:82},{x:70,y:12},
  {x:18,y:94},{x:58,y:92},{x:38,y:90},
]

const QUICK_LINKS = [
  {
    icon: "🗺️",
    title: "Vesoljski zemljevid",
    desc: "Poglej, kaj otrok odkriva — planeti, dejavnosti, Byte.",
    href: "/kids/home",
    accent: "#a855f7",
    label: "Odpri zemljevid",
  },
  {
    icon: "🎮",
    title: "AI Dejavnosti",
    desc: "Predogled vseh iger in nalog, ki jih otrok rešuje.",
    href: "/kids/activities",
    accent: "#3b82f6",
    label: "Razišči dejavnosti",
  },
]

export default function ParentDashboard() {
  const { user, logout, loading: authLoading } = useAuth()
  const { children, loading: childrenLoading, createChild, deleteChild } = useChildren()
  const { subscription, loading: subLoading, hasAccess, trialDaysLeft } = useSubscription()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"profiles" | "progress">("profiles")

  const openPortal = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [savingPassword, setSavingPassword] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMsg(null)
    if (newPassword.length < 6) { setPasswordMsg({ text: "Geslo mora imeti vsaj 6 znakov.", ok: false }); return }
    if (newPassword !== confirmPassword) { setPasswordMsg({ text: "Gesli se ne ujemata.", ok: false }); return }
    setSavingPassword(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) setPasswordMsg({ text: error.message, ok: false })
      else { setPasswordMsg({ text: "Geslo uspešno posodobljeno!", ok: true }); setNewPassword(""); setConfirmPassword("") }
    } finally {
      setSavingPassword(false)
    }
  }

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const spaceStyle = { background: "radial-gradient(ellipse at 40% 20%, #0f0a30 0%, #0a0a1a 75%)" }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">🛸</div>
          <p className="text-purple-300 font-semibold">Nalaganje...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative p-4 md:p-8 pb-12" style={spaceStyle}>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: 2, height: 2, opacity: 0.1 + (i % 4) * 0.07 }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🛸</span>
              <h1 className="text-2xl font-bold text-white">Starševska nadzorna plošča</h1>
            </div>
            <p className="text-white/40 text-sm pl-9">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-300 transition-all hover:bg-red-500/15 active:scale-95"
            style={{ border: "1px solid rgba(239,68,68,0.45)", background: "rgba(239,68,68,0.08)" }}
          >
            <span>↩</span> Odjava
          </button>
        </div>

        {/* Subscription banner */}
        {!subLoading && (() => {
          const status = subscription?.status ?? "none"

          if (status === "active") return (
            <div
              className="rounded-2xl px-5 py-3 mb-6 flex items-center justify-between gap-3"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <div>
                <p className="text-green-400 text-sm font-semibold">✓ Naročnina aktivna</p>
                {subscription?.cancelAtPeriodEnd && subscription.currentPeriodEnd && (
                  <p className="text-white/40 text-xs mt-0.5">
                    Poteče {new Date(subscription.currentPeriodEnd).toLocaleDateString("sl-SI")}
                  </p>
                )}
              </div>
              <button
                onClick={openPortal}
                className="text-xs text-green-400 hover:text-green-300 underline transition-colors"
              >
                Upravljaj naročnino →
              </button>
            </div>
          )

          if (status === "trialing") return (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}
            >
              <div>
                <p className="text-blue-300 font-bold text-sm">🔵 Preskusna naročnina aktivna</p>
                <p className="text-white/50 text-xs mt-0.5">Preskusno obdobje poteče kmalu — dostop do vseh vsebin je zagotovljen.</p>
              </div>
              <button
                onClick={openPortal}
                className="flex-shrink-0 text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Upravljaj →
              </button>
            </div>
          )

          if (status === "past_due") return (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              <div>
                <p className="text-red-400 font-bold text-sm">⚠️ Plačilo neuspešno</p>
                <p className="text-white/50 text-xs mt-0.5">Posodobite plačilno metodo za neprekinjen dostop.</p>
              </div>
              <button
                onClick={openPortal}
                className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#b91c1c,#ef4444)" }}
              >
                Posodobi plačilo →
              </button>
            </div>
          )

          if (status === "canceled") return (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ background: "rgba(107,114,128,0.12)", border: "1px solid rgba(107,114,128,0.3)" }}
            >
              <div>
                <p className="text-gray-300 font-bold text-sm">Naročnina preklicana</p>
                <p className="text-white/50 text-xs mt-0.5">Obnovite naročnino za ponovni dostop.</p>
              </div>
              <Link
                href="/subscribe"
                className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Obnovi naročnino →
              </Link>
            </div>
          )

          // status === "none" — free trial
          return (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}
            >
              <div>
                <p className="text-yellow-300 font-bold text-sm">
                  ⏳ Brezplačno preskusno obdobje — še {trialDaysLeft} {trialDaysLeft === 1 ? "dan" : "dni"}
                </p>
                <p className="text-white/50 text-xs mt-0.5">Po preskusu aktivirajte naročnino za neprekinjen dostop.</p>
              </div>
              <Link
                href="/subscribe"
                className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#b45309,#f59e0b)" }}
              >
                Aktiviraj naročnino →
              </Link>
            </div>
          )
        })()}

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-2xl mb-6 w-fit"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {[
            { id: "profiles", label: "Profili otrok", icon: "👧" },
            { id: "progress", label: "Učni napredek",  icon: "📈" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "profiles" | "progress")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "transparent",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.45)",
                boxShadow: activeTab === tab.id ? "0 0 16px rgba(168,85,247,0.35)" : "none",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Profiles */}
        {activeTab === "profiles" && (
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-white">Upravljanje otrok</h2>
              <AddChildDialog onAdd={createChild} />
            </div>

            {childrenLoading ? (
              <p className="text-white/40 text-center py-8">Nalaganje otrok...</p>
            ) : children.length === 0 ? (
              <div
                className="text-center py-12 rounded-2xl"
                style={{ background: "rgba(168,85,247,0.07)", border: "1px dashed rgba(168,85,247,0.25)" }}
              >
                <div className="text-4xl mb-3">👧</div>
                <p className="text-white/60 mb-1">Še ni profilov otrok</p>
                <p className="text-white/30 text-sm">Dodajte prvi profil za sledenje napredku</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children.map((child) => (
                  <ChildCard
                    key={child.id}
                    child={child}
                    onDelete={deleteChild}
                    onEdit={setSelectedChild}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Progress */}
        {activeTab === "progress" && (
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h2 className="text-lg font-bold text-white mb-5">Učni napredek</h2>

            {childrenLoading ? (
              <p className="text-white/40 text-center py-8">Nalaganje napredka...</p>
            ) : children.length === 0 ? (
              <div
                className="text-center py-12 rounded-2xl"
                style={{ background: "rgba(59,130,246,0.07)", border: "1px dashed rgba(59,130,246,0.25)" }}
              >
                <div className="text-4xl mb-3">📈</div>
                <p className="text-white/60 mb-1">Ni otrok za sledenje</p>
                <p className="text-white/30 text-sm">Dodajte profile otrok za ogled napredka</p>
              </div>
            ) : (
              <div className="space-y-4">
                {children.map((child) => (
                  <ChildProgressCard key={child.id} child={child} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {QUICK_LINKS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: `${item.accent}12`,
                border: `1px solid ${item.accent}30`,
              }}
            >
              <span className="text-4xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white mb-0.5">{item.title}</p>
                <p className="text-white/45 text-xs leading-snug">{item.desc}</p>
              </div>
              <Link href={item.href}>
                <button
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95 whitespace-nowrap"
                  style={{ background: `linear-gradient(135deg, ${item.accent}cc, ${item.accent})` }}
                >
                  {item.label}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Settings toggle */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-all hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <span className="font-semibold text-white">Nastavitve računa</span>
            </div>
            <span className="text-white/40 text-sm">{showSettings ? "▲ Zapri" : "▼ Odpri"}</span>
          </button>

          {showSettings && (
            <div
              className="px-6 pb-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                <div>
                  <label className="block text-white/50 text-xs font-bold mb-2 tracking-wider">E-POŠTNI NASLOV</label>
                  <input
                    type="email"
                    value={user?.email ?? ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl text-white/50 cursor-not-allowed focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </div>

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <label className="block text-white/50 text-xs font-bold tracking-wider">SPREMEMBA GESLA</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Novo geslo"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Potrdi novo geslo"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                  />
                  {passwordMsg && (
                    <p className={`text-sm font-medium ${passwordMsg.ok ? "text-green-400" : "text-red-400"}`}>
                      {passwordMsg.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-40 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #15803d, #22c55e)" }}
                  >
                    {savingPassword ? "Shranjevanje..." : "Posodobi geslo"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
