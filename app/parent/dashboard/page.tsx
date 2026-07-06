"use client"

import React, { useState } from "react"
import { useAuth } from "../../../hooks/use-auth"
import { useChildren } from "../../../hooks/use-children"
import { useSubscription } from "../../../hooks/use-subscription"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AddChildDialog } from "../../../components/add-child-dialog"
import { ChildCard } from "../../../components/child-card"
import { ChildProgressCard } from "../../../components/child-progress-card"
import type { Child } from "../../../types/child"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { trackEvent } from "@/lib/analytics"
import { Footer } from "@/components/footer"
import { DashboardSkeleton, ProgressCardSkeleton } from "@/components/skeleton-screens"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { ActivityFeed } from "@/components/activity-feed"
import { ProgressOverviewCard } from "@/components/progress-overview-card"
import { SkillProgressChart } from "@/components/skill-progress-chart"
import { WeeklyActivityChart } from "@/components/weekly-activity-chart"
import { LearningRecommendations } from "@/components/learning-recommendations"
import { DownloadReportButton } from "@/components/download-report-button"
import { AppNavigation } from "@/components/app-navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ReferralWidget } from "@/components/referral-widget"
import { ReferralShareCard } from "@/components/referral-share-card"
import { Clock, Gift } from "lucide-react"

export default function ParentDashboard() {
  const { user, logout, loading: authLoading } = useAuth()
  const { children, loading: childrenLoading, createChild, deleteChild } = useChildren()
  const { hasPremium, loading: subscriptionLoading, trialDaysRemaining, hasExtendedTrial } = useSubscription()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"profiles" | "progress">("profiles")

  const openPortal = async () => {
    const res = await fetch("/api/stripe/portal", { method: "POST" })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [selectedProfileId, setSelectedProfileId] = useState<string>("all")
  const [analyticsChildId, setAnalyticsChildId] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const handleAddChild = async (input: any) => {
    await createChild(input)
    trackEvent("child_profile_created", {
      child_age: input.age,
      total_children: children.length + 1,
    })
  }

  const handleDeleteChild = async (id: string) => {
    await deleteChild(id)
    if (selectedProfileId === id) {
      setSelectedProfileId("all")
    }
  }

  const handleEditChild = (child: Child) => {
    setSelectedChild(child)
  }

  const displayedChildren =
    selectedProfileId === "all" ? children : children.filter((child) => child.id === selectedProfileId)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <DashboardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 flex flex-col relative overflow-hidden">
      {/* AI-themed floating decorative emojis */}
      <div
        className="absolute top-20 left-10 text-6xl opacity-20 animate-float"
        style={{ filter: "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))" }}
      >
        🤖
      </div>
      <div
        className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse delay-100"
        style={{ filter: "drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))" }}
      >
        🧠
      </div>
      <div
        className="absolute bottom-40 left-1/4 text-4xl opacity-20 animate-bounce delay-200"
        style={{ filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))" }}
      >
        💻
      </div>
      <div
        className="absolute top-60 right-1/3 text-5xl opacity-15 animate-float delay-300"
        style={{ filter: "drop-shadow(0 4px 8px rgba(245, 158, 11, 0.3))" }}
      >
        ⚙️
      </div>
      <div
        className="absolute bottom-60 right-10 text-4xl opacity-20 animate-pulse delay-400"
        style={{ filter: "drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))" }}
      >
        📚
      </div>

      <AppNavigation />
      <Breadcrumbs />

      {showOnboarding && <OnboardingFlow userType="parent" onComplete={() => setShowOnboarding(false)} />}

      <div className="flex-1 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-purple-200">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                Nadzorna plošča za starše
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Dobrodošli nazaj, {user?.email}</p>
            </div>

            {!subscriptionLoading && hasPremium && trialDaysRemaining !== null && trialDaysRemaining > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-amber-900">
                        {hasExtendedTrial ? "Podaljšan preizkus aktiven" : "Brezplačni preizkus aktiven"}
                      </h3>
                      {hasExtendedTrial && (
                        <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs font-medium rounded-full flex items-center gap-1">
                          <Gift className="w-3 h-3" /> Priporočilni bonus
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-amber-700">
                      {trialDaysRemaining === 1
                        ? "Vaš preizkus se konča jutri! Naročite se zdaj za ohranitev dostopa do vseh premium funkcij."
                        : `Še ${trialDaysRemaining} dni vašega preizkusa. Naročite se za nadaljevanje uživanja premium funkcij.`}
                    </p>
                  </div>
                  <a
                    href="/pricing"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-md whitespace-nowrap"
                  >
                    Naroči se zdaj
                  </a>
                </div>
              </div>
            )}

            <Tabs defaultValue="profiles" className="mb-8">
              <TabsList className="flex flex-wrap w-full justify-center gap-2 h-auto p-2 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl">
                <TabsTrigger
                  value="profiles"
                  className="px-4 py-2.5 text-sm flex-1 min-w-[120px] rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
                >
                  👨‍👩‍👧 Profili otrok
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="px-4 py-2.5 text-sm flex-1 min-w-[120px] rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
                >
                  📊 Učni napredek
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="px-4 py-2.5 text-sm flex-1 min-w-[120px] rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all"
                >
                  📈 Napredna analitika
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profiles" className="mt-6">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Upravljanje otrok</h2>
                    <div className="add-child-button w-full sm:w-auto">
                      <AddChildDialog onAdd={handleAddChild} />
                    </div>
                  </div>

                  {children.length > 1 && (
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2">Poglej profil otroka</label>
                      <select
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                        value={selectedProfileId}
                        onChange={(e) => setSelectedProfileId(e.target.value)}
                      >
                        <option value="all">Vsi otroci ({children.length})</option>
                        {children.map((child) => (
                          <option key={child.id} value={child.id}>
                            {child.name} ({child.age} let)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {childrenLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <ProgressCardSkeleton key={i} />
                    ))}
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">Še ni profilov otrok</p>
                    <p className="text-sm text-muted-foreground">
                      Dodajte svoj prvi profil otroka za sledenje učnemu napredku
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedChildren.map((child) => (
                      <ChildCard key={child.id} child={child} onDelete={handleDeleteChild} onEdit={handleEditChild} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Učni napredek</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    {childrenLoading ? (
                      <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                          <ProgressCardSkeleton key={i} />
                        ))}
                      </div>
                    ) : children.length === 0 ? (
                      <div className="text-center py-12 bg-muted rounded-lg">
                        <p className="text-muted-foreground mb-4">Ni otrok za sledenje</p>
                        <p className="text-sm text-muted-foreground">Dodajte profile otrok za ogled učnega napredka</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {children.map((child) => (
                          <ChildProgressCard key={child.id} child={child} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <ActivityFeed />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Napredna analitika</h2>
                  {analyticsChildId && (
                    <DownloadReportButton
                      childId={analyticsChildId}
                      childName={children.find((c) => c.id === analyticsChildId)?.name || "Otrok"}
                    />
                  )}
                </div>

                {children.length === 0 ? (
                  <div className="text-center py-12 bg-muted rounded-lg">
                    <p className="text-muted-foreground mb-4">Ni otrok za analizo</p>
                    <p className="text-sm text-muted-foreground">Dodajte profile otrok za podrobno analitiko</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Izberite otroka</label>
                      <select
                        className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-background"
                        value={analyticsChildId || ""}
                        onChange={(e) => setAnalyticsChildId(e.target.value)}
                      >
                        <option value="">Izberite otroka...</option>
                        {children.map((child) => (
                          <option key={child.id} value={child.id}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {analyticsChildId ? (
                      <AnalyticsView childId={analyticsChildId} />
                    ) : (
                      <div className="text-center py-12 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Izberite otroka za ogled podrobne analitike</p>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>

            <div className="mb-8">
              <ReferralWidget />
            </div>

            <div className="mb-8">
              <ReferralShareCard />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-8 border-t-2 border-purple-100">
              <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🎮</div>
                <h3 className="text-xl font-semibold mb-2">Učenje otrok</h3>
                <p className="text-white/90 mb-4 text-sm">Spremljajte AI učni napredek vašega otroka</p>
                <Link
                  href="/kids/home"
                  className="inline-block bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 transition-colors font-medium shadow-md text-sm"
                >
                  Ogled napredka →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-semibold mb-2">AI aktivnosti</h3>
                <p className="text-white/90 mb-4 text-sm">Interaktivne AI igre in učna orodja</p>
                <Link
                  href="/kids/activities"
                  className="inline-block bg-white text-pink-600 px-4 py-2 rounded-full hover:bg-pink-50 transition-colors font-medium shadow-md text-sm"
                >
                  Razišči aktivnosti →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="text-xl font-semibold mb-2">Naročnina</h3>
                <p className="text-white/90 mb-4 text-sm">Nadgradite na premium za poln dostop</p>
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-orange-600 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors font-medium shadow-md text-sm"
                >
                  Ogled paketov →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="text-xl font-semibold mb-2">Nastavitve</h3>
                <p className="text-white/90 mb-4 text-sm">Upravljajte račun in nastavitve</p>
                <Link
                  href="/parent/subscription"
                  className="inline-block bg-white text-teal-600 px-4 py-2 rounded-full hover:bg-teal-50 transition-colors font-medium shadow-md text-sm"
                >
                  Upravljaj nastavitve →
                </Link>
              </div>
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

      <div className="relative h-24">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C240,20 480,20 720,64 C960,108 1200,108 1440,64 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>

      <Footer />
    </div>
  )
}

function AnalyticsView({ childId }: { childId: string }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/children/${childId}/progress`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  })

  if (loading) {
    return <div className="text-center py-12">Nalaganje analitike...</div>
  }

  if (!data) {
    return <div className="text-center py-12 text-muted-foreground">Ni razpoložljivih podatkov</div>
  }

  const totalTimeSpent = data.progress?.reduce((sum: number, p: any) => sum + (p.time_spent || 0), 0) || 0
  const lastWeekActivities =
    data.progress?.filter((p: any) => {
      const date = new Date(p.completed_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    }).length || 0
  const prevWeekActivities =
    data.progress?.filter((p: any) => {
      const date = new Date(p.completed_at)
      const twoWeeksAgo = new Date()
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= twoWeeksAgo && date < weekAgo
    }).length || 0
  const weeklyGrowth =
    prevWeekActivities > 0 ? Math.round(((lastWeekActivities - prevWeekActivities) / prevWeekActivities) * 100) : 0

  return (
    <div className="space-y-6">
      <ProgressOverviewCard
        totalActivities={data.stats?.totalActivities || 0}
        totalTimeSpent={totalTimeSpent}
        weeklyGrowth={weeklyGrowth}
        currentStreak={data.gamification?.streakDays || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart data={data.progress || []} />
        <SkillProgressChart data={data.progress || []} />
      </div>

      <LearningRecommendations childId={childId} />
    </div>
  )
}
