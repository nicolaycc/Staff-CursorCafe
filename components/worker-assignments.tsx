"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"

interface Assignment {
  id: number
  workerName: string
  event: string
  position: string
  date: string
  startTime: string
  endTime: string
  hourlyRate: number
  status: "Confirmada" | "Pendiente" | "Completada"
}

export function WorkerAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      workerName: "María García",
      event: "Lanzamiento Nike",
      position: "Promotora",
      date: "2024-12-15",
      startTime: "10:00",
      endTime: "18:00",
      hourlyRate: 25,
      status: "Confirmada",
    },
    {
      id: 2,
      workerName: "Juan López",
      event: "Lanzamiento Nike",
      position: "Embajador",
      date: "2024-12-15",
      startTime: "10:00",
      endTime: "20:00",
      hourlyRate: 35,
      status: "Pendiente",
    },
    {
      id: 3,
      workerName: "Sofia Rodríguez",
      event: "Festival de Música",
      position: "Modelo",
      date: "2024-12-22",
      startTime: "14:00",
      endTime: "22:00",
      hourlyRate: 40,
      status: "Confirmada",
    },
  ])

  const calculateHours = (start: string, end: string) => {
    const [startH] = start.split(":")
    const [endH] = end.split(":")
    return Number.parseInt(endH) - Number.parseInt(startH)
  }

  const calculateCost = (rate: number, hours: number) => {
    return rate * hours
  }

  const handleConfirm = (id: number) => {
    setAssignments(assignments.map((a) => (a.id === id ? { ...a, status: "Confirmada" } : a)))
  }

  const stats = {
    total: assignments.length,
    confirmed: assignments.filter((a) => a.status === "Confirmada").length,
    pending: assignments.filter((a) => a.status === "Pendiente").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Asignaciones Totales</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Confirmadas</p>
          <p className="text-3xl font-bold mt-2 text-green-500">{stats.confirmed}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pendientes</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{stats.pending}</p>
        </Card>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => {
          const hours = calculateHours(assignment.startTime, assignment.endTime)
          const cost = calculateCost(assignment.hourlyRate, hours)

          return (
            <Card key={assignment.id} className="p-6 hover:border-primary/30 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                <div>
                  <h3 className="font-semibold">{assignment.workerName}</h3>
                  <p className="text-sm text-accent">{assignment.position}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase">Evento</p>
                  <p className="text-sm font-medium mt-1">{assignment.event}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Fecha
                  </p>
                  <p className="text-sm font-medium mt-1">{new Date(assignment.date).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase">Horario</p>
                  <p className="text-sm font-medium mt-1">
                    {assignment.startTime} - {assignment.endTime}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase">Duración</p>
                  <p className="font-bold mt-1">{hours}h</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase">Costo</p>
                  <p className="font-bold mt-1 text-accent">${cost}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full text-center ${
                      assignment.status === "Confirmada"
                        ? "bg-green-500/20 text-green-500"
                        : assignment.status === "Pendiente"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-primary/20 text-primary"
                    }`}
                  >
                    {assignment.status}
                  </span>
                  {assignment.status === "Pendiente" && (
                    <Button
                      onClick={() => handleConfirm(assignment.id)}
                      size="sm"
                      className="h-7 bg-green-500/20 hover:bg-green-500/30 text-green-500"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
