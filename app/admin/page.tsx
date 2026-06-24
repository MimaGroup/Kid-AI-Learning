"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const ADMIN_EMAIL = "danijel.milovanovic88@gmail.com"

interface CourseStats { id: string; title: string; slug: string; lessonsTotal: number; lessonsCompleted: number }
interface Stats {
  users: {
    total: number
    recent: { id: string; email: string; created_at: string }[]
    neverActive: number
    neverActiveList: { id: string; email: string; created_at: string }[]
    registeredNoSub: number
  }
  subscriptions: {
    total: number; active: number; trialing: number; pastDue: number; canceled: number
    monthly: number; yearly: number; mrr: string; conversionRate: number
    trialsExpiringSoon: { userId: string; expiresAt: string }[]
    pastDueList: { userId: string; since: string }[]
  }
  activity: { lessonsCompleted: number; badgesEarned: number }
  courses: CourseStats[]
}

interface User {
  id: string; email: string; createdAt: string
  subscription: { status: string; plan_type: string; current_period_end: string } | null
  lessonsCompleted: number; badgesEarned: number
}

const STATUS_COLOR: Record<string, string> = {
  active: "#4ade80", trialing: "#60a5fa", past_due: "#f87171", canceled: "#6b7280",
}
const STATUS_LABEL: Record<string, string> = {
  active: "Aktivna", trialing: "Preskus", past_due: "Zamuda", canceled: "Preklicana",
}

type Tab = "overview" | "alerts" | "courses" | "users"

export default function AdminPage() {
  const router = useRouter()
  const [authed, setAuthed]   = useState(false)
  const [checking, setChecking] = useState(true)
  const [stats, setStats]     = useState<Stats | null>(null)
  const [users, setUsers]     = useState<User[]>([])
  const [tab, setTab]         = useState<Tab>("overview")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }: { data: { session: { user: { email: string | undefined } } | null } }) => {
      const session = data.session
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.push("/auth/login?redirect=/admin")
      } else {
        setAuthed(true)
      }
      setChecking(false)
    })
  }, [router])

  useEffect(() => {
    if (!authed) return
    Promise.all([
      fetch("/api/admin/stats").then(r => r.json()),
      fetch("/api/admin/users").then(r => r.json()),
    ]).then(([s, u]) => {
      setStats(s)
      setUsers(u.users ?? [])
      setLoading(false)
    })
  }, [authed])

  if (checking || !authed) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white/40 text-sm">Preverjanje dostopa...</div>
    </div>
  )

  const alertCount = stats
    ? stats.subscriptions.trialsExpiringSoon.length +
      stats.subscriptions.pastDueList.length +
      (stats.users.neverActive > 0 ? 1 : 0)
    : 0

  const TABS: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "Pregled" },
    { id: "alerts",   label: "Opozorila", badge: alertCount },
    { id: "courses",  label: "Tečaji" },
    { id: "users",    label: "Uporabniki" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          <div>
            <p className="font-bold text-white text-lg leading-none">Admin</p>
            <p className="text-white/30 text-xs">kids-learning-ai.com</p>
          </div>
        </div>
        <div className="flex gap-2">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
              style={{
                background: tab === t.id ? "rgba(168,85,247,0.25)" : "rgba(255,255,255,0.05)",
                color: tab === t.id ? "#c084fc" : "rgba(255,255,255,0.5)",
              }}>
              {t.label}
              {t.badge != null && t.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "#ef4444", color: "white", fontSize: 10, lineHeight: 1 }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
            ))}
          </div>
        ) : tab === "overview" && stats ? (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Skupaj uporabnikov",   value: stats.users.total,                                             icon: "👥", color: "#a855f7" },
                { label: "Aktivne naročnine",    value: stats.subscriptions.active + stats.subscriptions.trialing,    icon: "✅", color: "#4ade80" },
                { label: "MRR",                  value: `€${stats.subscriptions.mrr}`,                                icon: "💶", color: "#fbbf24" },
                { label: "Conversion rate",      value: `${stats.subscriptions.conversionRate}%`,                     icon: "📈", color: "#f97316" },
              ].map(c => (
                <div key={c.label} className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</div>
                  <div className="text-white/40 text-xs mt-1">{c.label}</div>
                </div>
              ))}
            </div>

            {/* Conversion funnel */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 className="font-bold text-white mb-5">Conversion funnel</h2>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: "Registriranih",   value: stats.users.total,                    color: "#a855f7" },
                  { label: "S naročnino",      value: stats.subscriptions.total,             color: "#60a5fa" },
                  { label: "Aktivnih/trial",   value: stats.subscriptions.active + stats.subscriptions.trialing, color: "#4ade80" },
                  { label: "Plačano (active)", value: stats.subscriptions.active,            color: "#fbbf24" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="text-center">
                      <div className="text-xl font-bold" style={{ color: step.color }}>{step.value}</div>
                      <div className="text-white/40 text-xs">{step.label}</div>
                      {i > 0 && arr[i-1].value > 0 && (
                        <div className="text-white/25 text-xs">
                          {Math.round((step.value / arr[i-1].value) * 100)}%
                        </div>
                      )}
                    </div>
                    {i < arr.length - 1 && <span className="text-white/20 text-lg">→</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Subscription breakdown */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="font-bold text-white mb-4">Naročnine po statusu</h2>
                <div className="space-y-3">
                  {[
                    { label: "Aktivne",           value: stats.subscriptions.active,   color: "#4ade80" },
                    { label: "Preskus (trial)",    value: stats.subscriptions.trialing, color: "#60a5fa" },
                    { label: "Zamuda pri plačilu", value: stats.subscriptions.pastDue,  color: "#f87171" },
                    { label: "Preklicane",         value: stats.subscriptions.canceled, color: "#6b7280" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.color }} />
                        <span className="text-white/60 text-sm">{row.label}</span>
                      </div>
                      <span className="font-bold text-sm" style={{ color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 mt-1 border-t border-white/08 grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-white/30 text-xs">Mesečni</div>
                      <div className="text-purple-400 font-bold">{stats.subscriptions.monthly}</div>
                    </div>
                    <div>
                      <div className="text-white/30 text-xs">Letni</div>
                      <div className="text-orange-400 font-bold">{stats.subscriptions.yearly}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h2 className="font-bold text-white mb-4">Aktivnost platform</h2>
                <div className="space-y-4">
                  {[
                    { label: "Zaključene lekcije skupaj", value: stats.activity.lessonsCompleted, icon: "📖", color: "#60a5fa" },
                    { label: "Badges earned skupaj",      value: stats.activity.badgesEarned,     icon: "🏅", color: "#fbbf24" },
                    { label: "Neaktivni (0 lekcij)",      value: stats.users.neverActive,         icon: "😴", color: "#f87171" },
                    { label: "Brez naročnine",            value: stats.users.registeredNoSub,     icon: "👤", color: "#94a3b8" },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{row.icon}</span>
                        <span className="text-white/60 text-sm">{row.label}</span>
                      </div>
                      <span className="font-bold text-sm" style={{ color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent signups */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 className="font-bold text-white mb-4">Zadnji vpisi</h2>
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {stats.users.recent.map(u => (
                  <div key={u.id} className="py-2.5 flex items-center justify-between">
                    <span className="text-white/70 text-sm">{u.email}</span>
                    <span className="text-white/30 text-xs">{new Date(u.created_at).toLocaleDateString("sl-SI")}</span>
                  </div>
                ))}
              </div>
            </div>
          </>

        ) : tab === "alerts" && stats ? (
          <div className="space-y-6">
            <p className="text-white/40 text-sm">Akcijska opozorila — stranke ki zahtevajo takojšnjo pozornost.</p>

            {/* Trials expiring */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.25)" }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(251,191,36,0.15)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏰</span>
                  <h2 className="font-bold text-yellow-300">Trial poteče v 7 dneh</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-400/20 text-yellow-300">
                  {stats.subscriptions.trialsExpiringSoon.length} uporabnikov
                </span>
              </div>
              {stats.subscriptions.trialsExpiringSoon.length === 0 ? (
                <p className="px-6 py-4 text-white/30 text-sm">Noben trial ne poteče v naslednjih 7 dneh.</p>
              ) : (
                <div className="divide-y" style={{ borderColor: "rgba(251,191,36,0.1)" }}>
                  {stats.subscriptions.trialsExpiringSoon.map(t => (
                    <div key={t.userId} className="px-6 py-3 flex items-center justify-between">
                      <span className="text-white/60 text-sm font-mono">{t.userId.slice(0, 8)}…</span>
                      <span className="text-yellow-300 text-xs font-medium">
                        Poteče: {new Date(t.expiresAt).toLocaleDateString("sl-SI")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-6 py-3" style={{ borderTop: "1px solid rgba(251,191,36,0.1)" }}>
                <p className="text-yellow-400/60 text-xs">💡 Pošlji conversion email: "Tvoj brezplačni preskus se izteka — nadaljuj z učenjem"</p>
              </div>
            </div>

            {/* Past due */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(239,68,68,0.15)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔴</span>
                  <h2 className="font-bold text-red-400">Zamuda pri plačilu</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-400/20 text-red-400">
                  {stats.subscriptions.pastDueList.length} uporabnikov
                </span>
              </div>
              {stats.subscriptions.pastDueList.length === 0 ? (
                <p className="px-6 py-4 text-white/30 text-sm">Ni zamud pri plačilu. ✓</p>
              ) : (
                <div className="divide-y" style={{ borderColor: "rgba(239,68,68,0.1)" }}>
                  {stats.subscriptions.pastDueList.map(u => (
                    <div key={u.userId} className="px-6 py-3 flex items-center justify-between">
                      <span className="text-white/60 text-sm font-mono">{u.userId.slice(0, 8)}…</span>
                      <span className="text-red-400 text-xs">Od: {new Date(u.since).toLocaleDateString("sl-SI")}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-6 py-3" style={{ borderTop: "1px solid rgba(239,68,68,0.1)" }}>
                <p className="text-red-400/60 text-xs">💡 Stripe samodejno pošlje email za neuspelo plačilo — preveri v Stripe dashboard ali so bila obvestila poslana.</p>
              </div>
            </div>

            {/* Never active */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">😴</span>
                  <h2 className="font-bold text-indigo-400">Registrirani — nikoli aktivni</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-400/20 text-indigo-400">
                  {stats.users.neverActive} uporabnikov
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: "rgba(99,102,241,0.1)" }}>
                {stats.users.neverActiveList.slice(0, 10).map(u => (
                  <div key={u.id} className="px-6 py-3 flex items-center justify-between">
                    <span className="text-white/70 text-sm">{u.email}</span>
                    <span className="text-white/30 text-xs">{new Date(u.created_at).toLocaleDateString("sl-SI")}</span>
                  </div>
                ))}
                {stats.users.neverActive > 10 && (
                  <div className="px-6 py-3 text-white/30 text-xs">
                    + {stats.users.neverActive - 10} več…
                  </div>
                )}
              </div>
              <div className="px-6 py-3" style={{ borderTop: "1px solid rgba(99,102,241,0.1)" }}>
                <p className="text-indigo-400/60 text-xs">💡 Re-engagement: "Byte te čaka — tvoja prva misija je pripravljena"</p>
              </div>
            </div>
          </div>

        ) : tab === "courses" && stats ? (
          <div className="space-y-4">
            <p className="text-white/40 text-sm">Popularnost tečajev — skupno število zaključenih lekcij po tečaju.</p>
            {stats.courses.map(c => {
              const pct = c.lessonsTotal > 0 ? Math.min(100, Math.round((c.lessonsCompleted / (c.lessonsTotal * Math.max(1, stats.users.total / 5))) * 100)) : 0
              return (
                <div key={c.id} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-sm">{c.title}</h3>
                    <div className="text-right">
                      <span className="text-purple-400 font-bold">{c.lessonsCompleted}</span>
                      <span className="text-white/30 text-xs"> zaključenih lekcij</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${Math.max(2, pct)}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-white/25 text-xs">{c.lessonsTotal} lekcij skupaj</span>
                    <span className="text-white/25 text-xs">{c.slug}</span>
                  </div>
                </div>
              )
            })}
          </div>

        ) : tab === "users" ? (
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-bold text-white">Vsi uporabniki ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Email", "Registracija", "Naročnina", "Plan", "Lekcije ✓", "Badges"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-white/30 text-xs font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-white/80 text-xs">{u.email}</td>
                      <td className="px-5 py-3 text-white/40 text-xs">{new Date(u.createdAt).toLocaleDateString("sl-SI")}</td>
                      <td className="px-5 py-3">
                        {u.subscription ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: `${STATUS_COLOR[u.subscription.status] ?? "#6b7280"}20`, color: STATUS_COLOR[u.subscription.status] ?? "#6b7280" }}>
                            {STATUS_LABEL[u.subscription.status] ?? u.subscription.status}
                          </span>
                        ) : <span className="text-white/20 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-3 text-white/40 text-xs">
                        {u.subscription?.plan_type === "monthly" ? "Mes." : u.subscription?.plan_type === "yearly" ? "Let." : "—"}
                      </td>
                      <td className="px-5 py-3 text-white/70 text-xs font-medium">{u.lessonsCompleted}</td>
                      <td className="px-5 py-3 text-white/70 text-xs">{u.badgesEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
