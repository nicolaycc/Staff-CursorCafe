"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreateEventModal } from "@/components/create-event-modal"
import { PositionsBoard } from "@/components/positions-board"

interface EventWithPositions {
  id: number
  name: string
  date: string
  location: string
  budget: number
  status: "Planificación" | "Reclutamiento" | "En Progreso" | "Completado"
  positions: Position[]
}

export interface Position {
  id: number
  title: string
  count: number
  filled: number
  rate: number
  status: "Activa" | "Cubierta" | "Cancelada"
}

export function EventManagement() {
  const [events, setEvents] = useState<EventWithPositions[]>([
    {
      id: 1,
      name: "Lanzamiento Nike",
      date: "15 Dic 2025",
      location: "Centro Comercial Downtown",
      budget: 8500,
      status: "En Progreso",
      positions: [
        { id: 1, title: "Promotor", count: 5, filled: 5, rate: 25, status: "Cubierta" },
        { id: 2, title: "Modelo", count: 3, filled: 2, rate: 40, status: "Activa" },
        { id: 3, title: "Embajador", count: 2, filled: 1, rate: 35, status: "Activa" },
      ],
    },
    {
      id: 2,
      name: "Evento Corporativo XYZ",
      date: "18 Dic 2025",
      location: "Hotel Grand Plaza",
      budget: 3200,
      status: "Planificación",
      positions: [{ id: 4, title: "Personal de Soporte", count: 8, filled: 3, rate: 18, status: "Activa" }],
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventWithPositions | null>(null)

  const handleCreateEvent = (eventData: any) => {
    const newEvent: EventWithPositions = {
      id: events.length + 1,
      ...eventData,
      positions: [],
    }
    setEvents([...events, newEvent])
    setShowCreateModal(false)
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const handleUpdatePositions = (eventId: number, positions: Position[]) => {
    setEvents(events.map((e) => (e.id === eventId ? { ...e, positions } : e)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Eventos y Posiciones</h2>
        <Button onClick={() => setShowCreateModal(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Crear Evento
        </Button>
      </div>

      {selectedEvent ? (
        <PositionsBoard
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
          onUpdatePositions={(positions) => handleUpdatePositions(selectedEvent.id, positions)}
        />
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{event.name}</h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
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
                    <p className="text-sm text-muted-foreground">📍 {event.location}</p>
                    <p className="text-sm text-muted-foreground">📅 {event.date}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Presupuesto</p>
                    <p className="text-2xl font-bold">${event.budget.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {event.positions.map((pos) => (
                      <div key={pos.id} className="bg-card/50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">{pos.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1">
                            <div className="bg-border rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full transition-all"
                                style={{ width: `${(pos.filled / pos.count) * 100}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold">
                            {pos.filled}/{pos.count}
                          </span>
                        </div>
                        <p className="text-xs text-accent mt-2">€{pos.rate}/hora</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => setSelectedEvent(event)} variant="outline" className="flex-1">
                      Gestionar Posiciones
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateEventModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleCreateEvent} />
    </div>
  )
}
