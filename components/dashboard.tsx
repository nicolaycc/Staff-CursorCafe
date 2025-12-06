"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StaffTable } from "@/components/staff-table"
import { EventsOverview } from "@/components/events-overview"
import { MetricsGrid } from "@/components/metrics-grid"
import { EventManagement } from "@/components/event-management"
import { HiringCenter } from "@/components/hiring-center"
import { PaymentsSystem } from "@/components/payments-system"

export function Dashboard() {
  const [currentView, setCurrentView] = useState<"overview" | "staff" | "events" | "payments" | "hiring">("overview")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          {currentView === "overview" && (
            <div className="space-y-6">
              <MetricsGrid />
              <EventsOverview />
            </div>
          )}

          {currentView === "staff" && <StaffTable />}
          {currentView === "events" && <EventManagement />}
          {currentView === "hiring" && <HiringCenter />}
          {currentView === "payments" && <PaymentsSystem />}
        </div>
      </main>
    </div>
  )
}
