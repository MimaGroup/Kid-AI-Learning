"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "./users-management"
import { SubscriptionsManagement } from "./subscriptions-management"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { SystemHealth } from "./system-health"
import { SupportTickets } from "./support-tickets"
import { MonitoringDashboard } from "./monitoring-dashboard"
import { ContentValidationDashboard } from "./content-validation-dashboard"
import { RecentActivity } from "./recent-activity"
import { Users, CreditCard, BarChart3, Activity, Headphones, Shield, CheckCircle, Megaphone, LayoutGrid } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("recent")



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 text-5xl opacity-15 animate-float" style={{ filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))' }}>🤖</div>
      <div className="absolute top-40 right-20 text-4xl opacity-15 animate-pulse delay-100" style={{ filter: 'drop-shadow(0 4px 8px rgba(147, 51, 234, 0.3))' }}>📊</div>
      <div className="absolute bottom-40 left-1/4 text-4xl opacity-15 animate-bounce delay-200" style={{ filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))' }}>⚙️</div>
      
      <div className="container mx-auto py-6 px-4 max-w-7xl relative z-10">
        <div className="mb-6 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Upravljajte svojo KidsLearnAI platformo</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/admin/canvas">
                  <LayoutGrid className="h-4 w-4" />
                  Canvas
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/admin/marketing">
                  <Megaphone className="h-4 w-4" />
                  Marketing
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="w-full overflow-x-auto p-2 shadow-lg" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '12px' }}>
            <TabsList className="inline-flex w-auto min-w-full bg-secondary rounded-2xl">
              <TabsTrigger value="recent" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <Activity className="h-4 w-4" />
                <span>Nedavna aktivnost</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <BarChart3 className="h-4 w-4" />
                <span>Analitika</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <Users className="h-4 w-4" />
                <span>Uporabniki</span>
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <CreditCard className="h-4 w-4" />
                <span>Narocnine</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <Activity className="h-4 w-4" />
                <span>Sistem</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <Headphones className="h-4 w-4" />
                <span>Podpora</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <Shield className="h-4 w-4" />
                <span>Nadzor</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-2 flex-shrink-0 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                <CheckCircle className="h-4 w-4" />
                <span>Vsebina</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="recent" className="space-y-4">
            <RecentActivity />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <SubscriptionsManagement />
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <SupportTickets />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentValidationDashboard />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <MonitoringDashboard />
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <SystemHealth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
