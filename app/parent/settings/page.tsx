"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { AppNavigation } from "@/components/app-navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { User, Bell, Shield, CreditCard, Trash2, Download } from 'lucide-react'

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #0f0f23 0%, #070710 100%)" }

export default function ParentSettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [achievementAlerts, setAchievementAlerts] = useState(true)

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const res = await fetch("/api/account/preferences")
        if (res.ok) {
          const data = await res.json()
          setEmailNotifications(data.emailNotifications)
          setWeeklyReports(data.weeklyReports)
          setAchievementAlerts(data.achievementAlerts)
        }
      } catch (err) {
        console.error("Failed to load notification preferences:", err)
      }
    }
    loadPreferences()
  }, [])

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/account/preferences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailNotifications,
          weeklyReports,
          achievementAlerts,
        }),
      })
      if (!res.ok) throw new Error("Save failed")
      success("Vaše nastavitve obvestil so bile posodobljene.")
    } catch (err) {
      error("Shranjevanje nastavitev ni uspelo. Poskusite znova.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const res = await fetch("/api/account/export")
      if (!res.ok) throw new Error("Export failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "kids-learning-ai-podatki.json"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      success("Vaši podatki so bili preneseni.")
    } catch (err) {
      error("Izvoz podatkov ni uspel. Poskusite znova ali kontaktirajte podporo.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "IZBRIŠI") return
    setIsDeleting(true)
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: deleteConfirmText }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Delete failed")
      }
      await logout()
      router.push("/")
    } catch (err) {
      error("Izbris računa ni v celoti uspel. Kontaktirajte podporo na support@kids-learning-ai.com.")
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen" style={spaceStyle}>
      <AppNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <Breadcrumbs />

        <div className="mt-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Nastavitve računa</h1>
            <p className="text-white/50 mt-2">Upravljajte nastavitve in preference svojega računa</p>
          </div>

          {/* Account Information */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Podatki o računu</CardTitle>
              </div>
              <CardDescription>Podatki o vašem računu in profilu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-poštni naslov</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled />
                <p className="text-xs text-muted-foreground">Za spremembo e-poštnega naslova kontaktirajte podporo</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Geslo</Label>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/forgot-password")}
                    className="w-full sm:w-auto"
                  >
                    Spremeni geslo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Posodobite geslo za varnost vašega računa</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Nastavitve obvestil</CardTitle>
              </div>
              <CardDescription>Izberite, katera obvestila želite prejemati</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-poštna obvestila</Label>
                  <p className="text-sm text-muted-foreground">Prejemajte e-poštne posodobitve o napredku otroka</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-reports">Tedenska poročila o napredku</Label>
                  <p className="text-sm text-muted-foreground">Prejemajte tedenski povzetek učnih dejavnosti</p>
                </div>
                <Switch id="weekly-reports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement-alerts">Obvestila o dosežkih</Label>
                  <p className="text-sm text-muted-foreground">Bodite obveščeni, ko otrok osvoji novo značko</p>
                </div>
                <Switch id="achievement-alerts" checked={achievementAlerts} onCheckedChange={setAchievementAlerts} />
              </div>
              <div className="pt-4">
                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  {isLoading ? "Shranjevanje ..." : "Shrani nastavitve"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Zasebnost in varnost</CardTitle>
              </div>
              <CardDescription>Upravljajte svoje nastavitve zasebnosti in varnosti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Zasebnost podatkov</Label>
                <p className="text-sm text-muted-foreground">
                  Preglejte našo politiko zasebnosti in upravljajte svoje podatkovne nastavitve
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" onClick={() => router.push("/privacy")}>
                    Politika zasebnosti
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/terms")}>
                    Pogoji uporabe
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Izvoz podatkov</Label>
                <p className="text-sm text-muted-foreground">
                  Prenesite kopijo vseh podatkov, ki jih hranimo o vas in vaših otrocih, v strojno berljivi obliki
                  (pravica do prenosljivosti podatkov po GDPR).
                </p>
                <Button variant="outline" onClick={handleExportData} disabled={isExporting} className="gap-2">
                  <Download className="w-4 h-4" />
                  {isExporting ? "Pripravljanje ..." : "Izvozi svoje podatke"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle>Naročnina</CardTitle>
              </div>
              <CardDescription>Upravljajte svojo naročnino in zaračunavanje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => router.push("/parent/subscription")}>
                Upravljaj naročnino
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-destructive" />
                <CardTitle className="text-destructive">Nevarno območje</CardTitle>
              </div>
              <CardDescription>Nepovratna dejanja za vaš račun</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Izbriši račun</Label>
                <p className="text-sm text-muted-foreground">
                  Trajno izbriše vaš račun ter vse podatke o vas in vaših otrocih (napredek, dosežki, profili). Tega
                  dejanja ni mogoče razveljaviti.
                </p>
                {!showDeleteConfirm ? (
                  <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                    Izbriši račun
                  </Button>
                ) : (
                  <div className="space-y-3 p-4 border-2 border-destructive/30 rounded-2xl bg-destructive/5">
                    <p className="text-sm font-medium">
                      Za potrditev vnesite besedo <strong>IZBRIŠI</strong> spodaj:
                    </p>
                    <Input
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="IZBRIŠI"
                      className="max-w-xs"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        disabled={deleteConfirmText !== "IZBRIŠI" || isDeleting}
                        onClick={handleDeleteAccount}
                      >
                        {isDeleting ? "Brisanje ..." : "Trajno izbriši račun"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowDeleteConfirm(false)
                          setDeleteConfirmText("")
                        }}
                      >
                        Prekliči
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
