"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, TrendingUp, Users, DollarSign, Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EventResult {
  id: number
  name: string
  date: string
  location: string
  budget: number
  totalSpent: number
  status: "Completado"
  positions: PositionResult[]
  performance: {
    totalHours: number
    averageRating: number
    attendanceRate: number
    completionRate: number
  }
  workers: WorkerPerformance[]
}

interface PositionResult {
  id: number
  title: string
  count: number
  filled: number
  rate: number
  totalCost: number
  averageRating: number
}

interface WorkerPerformance {
  id: string
  name: string
  position: string
  hoursWorked: number
  rating: number
  earnings: number
  punctuality: "Excelente" | "Buena" | "Regular"
  avatar: string
}

interface EventResultsProps {
  eventId?: number
  onBack?: () => void
}

export function EventResults({ eventId, onBack }: EventResultsProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("1")

  // Datos de ejemplo de resultados de eventos
  const [eventResults] = useState<EventResult[]>([
    {
      id: 1,
      name: "Lanzamiento Nike",
      date: "15 Dic 2025",
      location: "Centro Comercial Downtown",
      budget: 8500,
      totalSpent: 7850,
      status: "Completado",
      positions: [
        { id: 1, title: "Promotor", count: 5, filled: 5, rate: 25, totalCost: 3000, averageRating: 4.8 },
        { id: 2, title: "Modelo", count: 3, filled: 3, rate: 40, totalCost: 2880, averageRating: 4.5 },
        { id: 3, title: "Embajador", count: 2, filled: 2, rate: 35, totalCost: 1970, averageRating: 4.9 },
      ],
      performance: {
        totalHours: 312,
        averageRating: 4.7,
        attendanceRate: 98,
        completionRate: 100,
      },
      workers: [
        {
          id: "1",
          name: "Carlos Martínez",
          position: "Promotor",
          hoursWorked: 40,
          rating: 5,
          earnings: 1000,
          punctuality: "Excelente",
          avatar: "C",
        },
        {
          id: "2",
          name: "Ana García",
          position: "Modelo",
          hoursWorked: 32,
          rating: 4.5,
          earnings: 1280,
          punctuality: "Excelente",
          avatar: "A",
        },
        {
          id: "3",
          name: "Juan López",
          position: "Embajador",
          hoursWorked: 35,
          rating: 5,
          earnings: 1225,
          punctuality: "Buena",
          avatar: "J",
        },
        {
          id: "4",
          name: "María Rodríguez",
          position: "Promotor",
          hoursWorked: 38,
          rating: 4.8,
          earnings: 950,
          punctuality: "Excelente",
          avatar: "M",
        },
        {
          id: "5",
          name: "Pedro Sánchez",
          position: "Modelo",
          hoursWorked: 30,
          rating: 4.2,
          earnings: 1200,
          punctuality: "Regular",
          avatar: "P",
        },
      ],
    },
    {
      id: 2,
      name: "Campaña Sostenibilidad",
      date: "10 Dic 2025",
      location: "Parque Central",
      budget: 6500,
      totalSpent: 6200,
      status: "Completado",
      positions: [
        { id: 4, title: "Embajador", count: 8, filled: 8, rate: 30, totalCost: 5760, averageRating: 4.6 },
        { id: 5, title: "Coordinador", count: 2, filled: 2, rate: 22, totalCost: 440, averageRating: 4.8 },
      ],
      performance: {
        totalHours: 260,
        averageRating: 4.65,
        attendanceRate: 96,
        completionRate: 100,
      },
      workers: [
        {
          id: "6",
          name: "Laura Fernández",
          position: "Embajador",
          hoursWorked: 30,
          rating: 4.7,
          earnings: 900,
          punctuality: "Excelente",
          avatar: "L",
        },
        {
          id: "7",
          name: "Diego Ruiz",
          position: "Coordinador",
          hoursWorked: 20,
          rating: 4.9,
          earnings: 440,
          punctuality: "Excelente",
          avatar: "D",
        },
      ],
    },
  ])

  const currentEvent = eventResults.find((e) => e.id.toString() === selectedEvent) || eventResults[0]
  const budgetUtilization = ((currentEvent.totalSpent / currentEvent.budget) * 100).toFixed(1)
  const budgetSaved = currentEvent.budget - currentEvent.totalSpent

  const handleExportResults = () => {
    // Aquí se implementaría la exportación a PDF/Excel
    const data = {
      event: currentEvent.name,
      date: new Date().toISOString(),
      results: currentEvent,
    }
    console.log("Exportando resultados:", data)
    // Simular descarga
    alert("Resultados exportados correctamente")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {onBack && (
          <Button onClick={onBack} variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        )}
        <h2 className="text-2xl font-bold">Resultados del Evento</h2>
        <div className="flex gap-2">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Seleccionar evento" />
            </SelectTrigger>
            <SelectContent>
              {eventResults.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.name} - {event.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExportResults} className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Información General del Evento */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">{currentEvent.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">📍 {currentEvent.location}</p>
            <p className="text-sm text-muted-foreground mb-1">📅 {currentEvent.date}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
              {currentEvent.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Presupuesto</p>
              <p className="text-2xl font-bold text-primary">${currentEvent.budget.toLocaleString()}</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Gastado</p>
              <p className="text-2xl font-bold text-green-500">${currentEvent.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-accent/10 p-4 rounded-lg col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Ahorro</p>
              <p className="text-2xl font-bold text-accent">${budgetSaved.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Utilización: {budgetUtilization}% del presupuesto
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* KPIs de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Horas Totales</p>
              <p className="text-2xl font-bold">{currentEvent.performance.totalHours}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rating Promedio</p>
              <p className="text-2xl font-bold">{currentEvent.performance.averageRating}/5</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Asistencia</p>
              <p className="text-2xl font-bold">{currentEvent.performance.attendanceRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completado</p>
              <p className="text-2xl font-bold">{currentEvent.performance.completionRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Resultados por Posición */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Resultados por Posición</h3>
        <div className="space-y-4">
          {currentEvent.positions.map((position) => (
            <div key={position.id} className="border border-border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <h4 className="font-bold">{position.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {position.filled}/{position.count} posiciones cubiertas
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tarifa</p>
                  <p className="text-lg font-bold text-primary">€{position.rate}/h</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Costo Total</p>
                  <p className="text-lg font-bold text-green-500">${position.totalCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rating Promedio</p>
                  <p className="text-lg font-bold text-yellow-500">⭐ {position.averageRating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance de Trabajadores */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Performance de Trabajadores</h3>
        <div className="space-y-3">
          {currentEvent.workers.map((worker) => (
            <div key={worker.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {worker.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{worker.name}</h4>
                  <p className="text-sm text-muted-foreground">{worker.position}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Horas</p>
                  <p className="text-lg font-bold">{worker.hoursWorked}h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="text-lg font-bold text-yellow-500">⭐ {worker.rating}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Ganado</p>
                  <p className="text-lg font-bold text-green-500">${worker.earnings}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Puntualidad</p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      worker.punctuality === "Excelente"
                        ? "bg-green-500/20 text-green-500"
                        : worker.punctuality === "Buena"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {worker.punctuality}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Resumen y Conclusiones */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="text-lg font-bold mb-4">Resumen Ejecutivo</h3>
        <div className="space-y-2 text-sm">
          <p>
            ✅ El evento <strong>{currentEvent.name}</strong> se completó exitosamente con un {currentEvent.performance.completionRate}% de tasa de finalización.
          </p>
          <p>
            💰 Se utilizó el {budgetUtilization}% del presupuesto asignado, ahorrando ${budgetSaved.toLocaleString()}.
          </p>
          <p>
            ⭐ El rating promedio del personal fue de {currentEvent.performance.averageRating}/5, indicando un alto nivel de satisfacción.
          </p>
          <p>
            📊 La tasa de asistencia fue del {currentEvent.performance.attendanceRate}%, demostrando alta confiabilidad del equipo.
          </p>
        </div>
      </Card>
    </div>
  )
}
