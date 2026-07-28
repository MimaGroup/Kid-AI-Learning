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
import { Users, CreditCard, BarChart3, Activity, Headphones, Shield, CheckCircle, LayoutGrid, Tag } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

const spaceStyle = { background: "radial-gradient(ellipse at 40% 30%, #0f0f23 0%, #070710 100%)" }

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("recent")



  return (
    <div className="min-h-screen p-4 md:p-8" style={spaceStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 rounded-3xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/50 mt-1 text-sm">Upravljajte svojo Kids Learning AI platformo</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-2 bg-transparent border-white/15 text-white hover:bg-white/10 hover:text-white">
                <Link href="/admin/canvas">
                  <LayoutGrid className="h-4 w-4" />
                  Canvas
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 bg-transparent border-white/15 text-white hover:bg-white/10 hover:text-white">
                <Link href="/admin/stripe-prices">
                  <Tag className="h-4 w-4" />
                  Stripe cene
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="w-full overflow-x-auto p-2 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <TabsList className="inline-flex w-auto min-w-full rounded-xl bg-transparent gap-1">
              <TabsTrigger value="recent" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <Activity className="h-4 w-4" />
                <span>Nedavna aktivnost</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <BarChart3 className="h-4 w-4" />
                <span>Analitika</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <Users className="h-4 w-4" />
                <span>Uporabniki</span>
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <CreditCard className="h-4 w-4" />
                <span>Narocnine</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <Activity className="h-4 w-4" />
                <span>Sistem</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <Headphones className="h-4 w-4" />
                <span>Podpora</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
                <Shield className="h-4 w-4" />
                <span>Nadzor</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-2 flex-shrink-0 rounded-xl text-white/60 data-[state=active]:text-white data-[state=active]:bg-purple-700/50 transition-all">
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
