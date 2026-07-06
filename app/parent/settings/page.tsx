"use client"

import { useState } from "react"
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
import { User, Bell, Shield, CreditCard, Trash2 } from 'lucide-react'

export default function ParentSettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [achievementAlerts, setAchievementAlerts] = useState(true)

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to save notification preferences
      await new Promise((resolve) => setTimeout(resolve, 1000))
      success("Your notification preferences have been updated.")
    } catch (err) {
      error("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">⚙️</div>
      <div className="absolute top-40 right-20 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🔒</div>
      <div className="absolute bottom-32 left-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>👨‍👩‍👧‍👦</div>

      {/* Gradient blobs */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />

      <AppNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <Breadcrumbs />

        <div className="mt-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account preferences and settings</p>
          </div>

          {/* Account Information */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>Your account details and profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled />
                <p className="text-xs text-muted-foreground">Contact support to change your email address</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Password</Label>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/forgot-password")}
                    className="w-full sm:w-auto"
                  >
                    Change Password
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Update your password to keep your account secure</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your child's progress</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-reports">Weekly Progress Reports</Label>
                  <p className="text-sm text-muted-foreground">Get a weekly summary of learning activities</p>
                </div>
                <Switch id="weekly-reports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your child earns new badges</p>
                </div>
                <Switch id="achievement-alerts" checked={achievementAlerts} onCheckedChange={setAchievementAlerts} />
              </div>
              <div className="pt-4">
                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>Manage your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data Privacy</Label>
                <p className="text-sm text-muted-foreground">
                  Review our privacy policy and manage your data preferences
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => router.push("/privacy-policy")}>
                    Privacy Policy
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/terms-of-service")}>
                    Terms of Service
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle>Subscription</CardTitle>
              </div>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" onClick={() => router.push("/parent/subscription")}>
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                <Button variant="destructive" disabled>
                  Delete Account (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
