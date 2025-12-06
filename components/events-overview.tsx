"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock, Users, DollarSign } from "lucide-react"

interface EventsOverviewProps {
  showFull?: boolean
}

export function EventsOverview({ showFull }: EventsOverviewProps) {
  const events = [
    {
      id: 1,
      name: "Lanzamiento Nike",
      date: "15 Dic 2025",
      roles: ["Promotor", "Modelo", "Embajador"],
      status: "En Progreso",
      staff: 12,
      budget: "$8,500",
    },
    {
      id: 2,
      name: "Evento Corporativo XYZ",
      date: "18 Dic 2025",
      roles: ["Personal de Soporte"],
      status: "Planificación",
      staff: 8,
      budget: "$3,200",
    },
    {
      id: 3,
      name: "Festival de Música",
      date: "22 Dic 2025",
      roles: ["Promotor", "Seguridad", "Staff de Ventas"],
      status: "Reclutamiento",
      staff: 24,
      budget: "$12,000",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Eventos</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      <div className="grid gap-4">
        {events.slice(0, showFull ? events.length : 3).map((event) => (
          <Card key={event.id} className="p-6 hover:border-primary/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div>
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {event.date}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Roles</p>
                <p className="text-sm font-medium">{event.roles.length} posiciones</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Personal</p>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{event.staff}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Presupuesto</p>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-accent" />
                  <span className="font-medium">{event.budget}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    event.status === "En Progreso"
                      ? "bg-primary/20 text-primary"
                      : event.status === "Planificación"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
