"use client"

import { useAuth } from "../../../hooks/use-auth"
import { useChildren } from "../../../hooks/use-children"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AddChildDialog } from "../../../components/add-child-dialog"
import { ChildCard } from "../../../components/child-card"
import { ChildProgressCard } from "../../../components/child-progress-card"
import { useState } from "react"
import type { Child } from "../../../types/child"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #0f0f23 0%, #070710 100%)" }

export default function ParentDashboard() {
  const { user, logout, loading: authLoading } = useAuth()
  const { children, loading: childrenLoading, createChild, deleteChild } = useChildren()
  const router = useRouter()
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)

  const handleSignOut = async () => {
    await logout()
    router.push("/auth/login")
  }

  const handleAddChild = async (input: any) => {
    await createChild(input)
  }

  const handleDeleteChild = async (id: string) => {
    await deleteChild(id)
  }

  const handleEditChild = (child: Child) => {
    setSelectedChild(child)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={spaceStyle}>
        <div className="text-center">
          <div className="inline-block w-10 h-10 rounded-full animate-spin mb-3"
            style={{ border: "3px solid rgba(168,85,247,0.2)", borderTopColor: "#a855f7" }} />
          <p className="text-white/50 text-sm">Nalaganje...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={spaceStyle}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Starševska nadzorna plošča</h1>
            <p className="text-white/50 mt-1 text-sm">Dobrodošli, {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
          >
            Odjava
          </button>
        </div>

        {/* Main panel */}
        <div className="rounded-3xl p-6 md:p-8 mb-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <Tabs defaultValue="profiles">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6"
              style={{ background: "rgba(255,255,255,0.06)" }}>
              <TabsTrigger value="profiles"
                className="data-[state=active]:text-white data-[state=active]:bg-purple-700/50 text-white/60">
                Profili otrok
              </TabsTrigger>
              <TabsTrigger value="progress"
                className="data-[state=active]:text-white data-[state=active]:bg-purple-700/50 text-white/60">
                Učni napredek
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profiles">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-white">Upravljanje otrok</h2>
                <AddChildDialog onAdd={handleAddChild} />
              </div>

              {childrenLoading ? (
                <div className="text-center py-10 text-white/40">Nalaganje profilov...</div>
              ) : children.length === 0 ? (
                <div className="text-center py-14 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-5xl mb-3">👦</div>
                  <p className="text-white/60 mb-2 font-semibold">Ni profilov otrok</p>
                  <p className="text-sm text-white/30">Dodajte profil otroka za sledenje napredka</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {children.map((child) => (
                    <ChildCard key={child.id} child={child} onDelete={handleDeleteChild} onEdit={handleEditChild} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="progress">
              <h2 className="text-xl font-bold text-white mb-5">Učni napredek</h2>

              {childrenLoading ? (
                <div className="text-center py-10 text-white/40">Nalaganje napredka...</div>
              ) : children.length === 0 ? (
                <div className="text-center py-14 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-5xl mb-3">📊</div>
                  <p className="text-white/60 mb-2 font-semibold">Ni otrok za sledenje</p>
                  <p className="text-sm text-white/30">Dodajte otrokov profil za ogled napredka</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {children.map((child) => (
                    <ChildProgressCard key={child.id} child={child} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(168,85,247,0.2))", border: "1px solid rgba(168,85,247,0.3)" }}>
            <h3 className="text-lg font-bold text-white mb-2">Učni svet</h3>
            <p className="text-purple-200/70 text-sm mb-4">Oglejte si otrokov napredek pri učenju AI</p>
            <Link href="/kids/home"
              className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Odpri →
            </Link>
          </div>

          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.28), rgba(6,182,212,0.18))", border: "1px solid rgba(59,130,246,0.28)" }}>
            <h3 className="text-lg font-bold text-white mb-2">AI Dejavnosti</h3>
            <p className="text-blue-200/70 text-sm mb-4">Interaktivne igre in učna orodja</p>
            <Link href="/kids/activities"
              className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Odpri →
            </Link>
          </div>

          <div className="rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.22), rgba(16,185,129,0.15))", border: "1px solid rgba(34,197,94,0.27)" }}>
            <h3 className="text-lg font-bold text-white mb-2">Naročnina</h3>
            <p className="text-green-200/70 text-sm mb-4">Upravljanje računa in naročnine</p>
            <Link href="/subscribe"
              className="inline-block px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
              Upravljaj →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
