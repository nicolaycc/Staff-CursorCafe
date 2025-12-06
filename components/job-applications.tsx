"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

interface Application {
  id: number
  candidateName: string
  position: string
  event: string
  appliedDate: string
  status: "Pendiente" | "Aceptada" | "Rechazada"
  hourlyRate: number
}

export function JobApplications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      candidateName: "María García",
      position: "Promotora",
      event: "Lanzamiento Nike",
      appliedDate: "2024-12-10",
      status: "Aceptada",
      hourlyRate: 25,
    },
    {
      id: 2,
      candidateName: "Juan López",
      position: "Embajador",
      event: "Lanzamiento Nike",
      appliedDate: "2024-12-09",
      status: "Pendiente",
      hourlyRate: 35,
    },
    {
      id: 3,
      candidateName: "Sofia Rodríguez",
      position: "Modelo",
      event: "Lanzamiento Nike",
      appliedDate: "2024-12-10",
      status: "Pendiente",
      hourlyRate: 40,
    },
    {
      id: 4,
      candidateName: "Carlos Martínez",
      position: "Promotor",
      event: "Festival de Música",
      appliedDate: "2024-12-08",
      status: "Rechazada",
      hourlyRate: 25,
    },
  ])

  const handleApprove = (id: number) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status: "Aceptada" } : a)))
  }

  const handleReject = (id: number) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status: "Rechazada" } : a)))
  }

  const stats = {
    pending: applications.filter((a) => a.status === "Pendiente").length,
    approved: applications.filter((a) => a.status === "Aceptada").length,
    rejected: applications.filter((a) => a.status === "Rechazada").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pendientes</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{stats.pending}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Aceptadas</p>
          <p className="text-3xl font-bold mt-2 text-green-500">{stats.approved}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Rechazadas</p>
          <p className="text-3xl font-bold mt-2 text-destructive">{stats.rejected}</p>
        </Card>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <Card key={app.id} className="p-6 hover:border-primary/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div>
                <h3 className="font-semibold">{app.candidateName}</h3>
                <p className="text-sm text-muted-foreground">{app.position}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Evento</p>
                <p className="font-medium text-sm mt-1">{app.event}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Fecha de Solicitud</p>
                <p className="font-medium text-sm mt-1">{new Date(app.appliedDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Tarifa</p>
                <p className="font-bold mt-1">${app.hourlyRate}/h</p>
              </div>

              <div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                    app.status === "Aceptada"
                      ? "bg-green-500/20 text-green-500"
                      : app.status === "Pendiente"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {app.status === "Pendiente" && (
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleApprove(app.id)}
                    size="icon"
                    className="h-8 w-8 bg-green-500/20 hover:bg-green-500/30 text-green-500"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleReject(app.id)}
                    size="icon"
                    className="h-8 w-8 bg-destructive/20 hover:bg-destructive/30 text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
