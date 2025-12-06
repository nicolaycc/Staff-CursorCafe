"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { JobFeed } from "@/components/job-feed"
import { Navigation } from "@/components/navigation"
import { EnterpriseCompanyDashboard } from "@/components/enterprise-dashboard"
import { UserProfile } from "@/components/user-profile"
import { EventResults } from "@/components/event-results"
import { EventStatusMonitor } from "@/components/event-status-monitor"
import { ApplicantChat } from "@/components/applicant-chat"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<"empresa" | "empleado" | null>(null)
  const [currentView, setCurrentView] = useState<"feed" | "dashboard" | "profile" | "results" | "status" | "chat">("feed")

  const handleLogin = (role: "empresa" | "empleado") => {
    setUserRole(role)
    setIsAuthenticated(true)
    setCurrentView("feed")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setCurrentView("feed")
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={userRole} onLogout={handleLogout} currentView={currentView} onViewChange={setCurrentView} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === "feed" && <JobFeed userRole={userRole} />}
        {currentView === "dashboard" && userRole === "empresa" && <EnterpriseCompanyDashboard />}
        {currentView === "profile" && userRole === "empleado" && <UserProfile />}
        {currentView === "results" && userRole === "empresa" && <EventResults />}
        {currentView === "status" && userRole === "empresa" && <EventStatusMonitor />}
        {currentView === "chat" && userRole === "empleado" && <ApplicantChat applicantName="Usuario" />}
      </div>
    </div>
  )
}
