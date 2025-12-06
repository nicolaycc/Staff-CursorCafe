"use client"

import { Button } from "@/components/ui/button"

interface NavigationProps {
  userRole: "empresa" | "empleado" | null
  onLogout: () => void
  currentView: "feed" | "dashboard" | "profile"
  onViewChange: (view: "feed" | "dashboard" | "profile") => void
}

export function Navigation({ userRole, onLogout, currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SJ</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">StaffJobs</h1>
          </div>

          <div className="hidden md:flex gap-2">
            <Button
              onClick={() => onViewChange("feed")}
              variant={currentView === "feed" ? "default" : "ghost"}
              className="text-sm"
            >
              Feed
            </Button>
            {userRole === "empresa" && (
              <Button
                onClick={() => onViewChange("dashboard")}
                variant={currentView === "dashboard" ? "default" : "ghost"}
                className="text-sm"
              >
                Dashboard
              </Button>
            )}
            {userRole === "empleado" && (
              <Button
                onClick={() => onViewChange("profile")}
                variant={currentView === "profile" ? "default" : "ghost"}
                className="text-sm"
              >
                Mi Perfil
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{userRole === "empresa" ? "👔 Empresa" : "👤 Empleado"}</span>
          <Button onClick={onLogout} className="bg-muted hover:bg-muted/90 text-muted-foreground">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </nav>
  )
}
