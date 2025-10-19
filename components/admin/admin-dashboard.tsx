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
import { Users, CreditCard, BarChart3, Activity, Headphones, Shield, CheckCircle } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")

  useEffect(() => {
    console.log("[v0] AdminDashboard mounted with 7 tabs")
    console.log("[v0] Active tab:", activeTab)
  }, [activeTab])

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your AI Kids Learning platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex w-auto min-w-full">
            <TabsTrigger value="analytics" className="gap-2 flex-shrink-0">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 flex-shrink-0">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2 flex-shrink-0">
              <CreditCard className="h-4 w-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2 flex-shrink-0">
              <Activity className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2 flex-shrink-0">
              <Headphones className="h-4 w-4" />
              <span>Support</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="gap-2 flex-shrink-0">
              <Shield className="h-4 w-4" />
              <span>Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2 flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
          </TabsList>
        </div>

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
  )
}
