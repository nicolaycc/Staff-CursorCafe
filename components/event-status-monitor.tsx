"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Clock,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Activity,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

interface EventStatus {
  id: number
  name: string
  date: string
  location: string
  status: "Planificación" | "Reclutamiento" | "En Progreso" | "Completado"
  startTime: string
  currentTime: string
  positions: PositionStatus[]
  realTimeMetrics: {
    activeWorkers: number
    totalWorkers: number
    checkInsCompleted: number
    pendingCheckIns: number
    currentBudgetSpent: number
    totalBudget: number
    averagePerformance: number
    incidentsReported: number
  }
  recentActivity: Activity[]
}

interface PositionStatus {
  id: number
  title: string
  assigned: number
  checkedIn: number
  active: number
  total: number
  status: "success" | "warning" | "error"
}

interface Activity {
  id: string
  type: "check-in" | "check-out" | "incident" | "update"
  message: string
  timestamp: Date
  worker?: string
}

interface EventStatusMonitorProps {
  eventId?: number
  onRefresh?: () => void
}

export function EventStatusMonitor({ eventId, onRefresh }: EventStatusMonitorProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>("1")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Datos de ejemplo de eventos en tiempo real
  const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([
    {
      id: 1,
      name: "Lanzamiento Nike",
      date: "15 Dic 2025",
      location: "Centro Comercial Downtown",
      status: "En Progreso",
      startTime: "09:00",
      currentTime: "14:30",
      positions: [
        { id: 1, title: "Promotor", assigned: 5, checkedIn: 5, active: 5, total: 5, status: "success" },
        { id: 2, title: "Modelo", assigned: 3, checkedIn: 3, active: 2, total: 3, status: "warning" },
        { id: 3, title: "Embajador", assigned: 2, checkedIn: 2, active: 2, total: 2, status: "success" },
      ],
      realTimeMetrics: {
        activeWorkers: 9,
        totalWorkers: 10,
        checkInsCompleted: 10,
        pendingCheckIns: 0,
        currentBudgetSpent: 4250,
        totalBudget: 8500,
        averagePerformance: 92,
        incidentsReported: 1,
      },
      recentActivity: [
        {
          id: "1",
          type: "check-in",
          message: "Carlos Martínez se registró como Promotor",
          timestamp: new Date(Date.now() - 5 * 60000),
          worker: "Carlos Martínez",
        },
        {
          id: "2",
          type: "incident",
          message: "Reporte menor: Falta de material promocional en stand 3",
          timestamp: new Date(Date.now() - 15 * 60000),
        },
        {
          id: "3",
          type: "update",
          message: "Performance actualizada: 92% promedio",
          timestamp: new Date(Date.now() - 30 * 60000),
        },
        {
          id: "4",
          type: "check-in",
          message: "Ana García se registró como Modelo",
          timestamp: new Date(Date.now() - 45 * 60000),
          worker: "Ana García",
        },
      ],
    },
    {
      id: 2,
      name: "Evento Corporativo XYZ",
      date: "18 Dic 2025",
      location: "Hotel Grand Plaza",
      status: "Reclutamiento",
      startTime: "10:00",
      currentTime: "09:45",
      positions: [
        { id: 4, title: "Personal de Soporte", assigned: 6, checkedIn: 0, active: 0, total: 8, status: "warning" },
      ],
      realTimeMetrics: {
        activeWorkers: 0,
        totalWorkers: 6,
        checkInsCompleted: 0,
        pendingCheckIns: 6,
        currentBudgetSpent: 0,
        totalBudget: 3200,
        averagePerformance: 0,
        incidentsReported: 0,
      },
      recentActivity: [
        {
          id: "5",
          type: "update",
          message: "6 de 8 posiciones asignadas",
          timestamp: new Date(Date.now() - 60 * 60000),
        },
        {
          id: "6",
          type: "update",
          message: "Evento programado para mañana a las 10:00",
          timestamp: new Date(Date.now() - 120 * 60000),
        },
      ],
    },
  ])

  const currentEvent = eventStatuses.find((e) => e.id.toString() === selectedEvent) || eventStatuses[0]

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      simulateRealTimeUpdate()
      setLastUpdate(new Date())
    }, 30000) // Actualizar cada 30 segundos

    return () => clearInterval(interval)
  }, [autoRefresh, selectedEvent])

  const simulateRealTimeUpdate = () => {
    setEventStatuses((prev) =>
      prev.map((event) => {
        if (event.id.toString() === selectedEvent && event.status === "En Progreso") {
          // Simular cambios aleatorios en métricas
          const randomChange = Math.random()

          if (randomChange > 0.7) {
            // Simular nueva actividad
            const newActivity: Activity = {
              id: Date.now().toString(),
              type: "update",
              message: "Actualización automática de métricas",
              timestamp: new Date(),
            }

            return {
              ...event,
              recentActivity: [newActivity, ...event.recentActivity.slice(0, 9)],
              realTimeMetrics: {
                ...event.realTimeMetrics,
                averagePerformance: Math.min(100, event.realTimeMetrics.averagePerformance + Math.floor(Math.random() * 3)),
                currentBudgetSpent: event.realTimeMetrics.currentBudgetSpent + Math.floor(Math.random() * 50),
              },
            }
          }
        }
        return event
      })
    )
  }

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    simulateRealTimeUpdate()
    setLastUpdate(new Date())
    toast.success("Estado actualizado correctamente")
    setTimeout(() => setIsRefreshing(false), 1000)
    if (onRefresh) onRefresh()
  }

  const getStatusColor = (status: EventStatus["status"]) => {
    switch (status) {
      case "En Progreso":
        return "bg-green-500"
      case "Reclutamiento":
        return "bg-yellow-500"
      case "Planificación":
        return "bg-blue-500"
      case "Completado":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPositionStatusColor = (status: PositionStatus["status"]) => {
    switch (status) {
      case "success":
        return "text-green-500 bg-green-500/10"
      case "warning":
        return "text-yellow-500 bg-yellow-500/10"
      case "error":
        return "text-red-500 bg-red-500/10"
    }
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "check-in":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "check-out":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "incident":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "update":
        return <Activity className="w-4 h-4 text-primary" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return "Hace unos segundos"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `Hace ${minutes} min`
    const hours = Math.floor(minutes / 60)
    return `Hace ${hours}h`
  }

  const budgetPercentage = ((currentEvent.realTimeMetrics.currentBudgetSpent / currentEvent.realTimeMetrics.totalBudget) * 100).toFixed(1)
  const workerPercentage = ((currentEvent.realTimeMetrics.activeWorkers / currentEvent.realTimeMetrics.totalWorkers) * 100).toFixed(0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Monitor de Evento en Tiempo Real</h2>
        <div className="flex items-center gap-3">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Seleccionar evento" />
            </SelectTrigger>
            <SelectContent>
              {eventStatuses.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.name} - {event.status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleManualRefresh}
            variant="outline"
            size="icon"
            disabled={isRefreshing}
            className={isRefreshing ? "animate-spin" : ""}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Event Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold">{currentEvent.name}</h3>
              <Badge className={`${getStatusColor(currentEvent.status)} text-white`}>
                <Activity className="w-3 h-3 mr-1" />
                {currentEvent.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {currentEvent.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentEvent.date}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Última actualización</p>
            <p className="text-sm font-semibold">{formatTimeAgo(lastUpdate)}</p>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${autoRefresh ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-xs text-muted-foreground">
                {autoRefresh ? "Auto-actualización activa" : "Auto-actualización pausada"}
              </span>
            </div>
          </div>
        </div>

        {currentEvent.status === "En Progreso" && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Tiempo transcurrido:</span>
              <span className="text-primary font-bold">
                {currentEvent.startTime} - {currentEvent.currentTime} (5h 30min)
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Trabajadores Activos</p>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">
            {currentEvent.realTimeMetrics.activeWorkers}/{currentEvent.realTimeMetrics.totalWorkers}
          </p>
          <div className="mt-2 bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${workerPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{workerPercentage}% operativos</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Check-Ins</p>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500">
            {currentEvent.realTimeMetrics.checkInsCompleted}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {currentEvent.realTimeMetrics.pendingCheckIns === 0
              ? "Todos registrados"
              : `${currentEvent.realTimeMetrics.pendingCheckIns} pendientes`}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Presupuesto Usado</p>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-accent">
            ${currentEvent.realTimeMetrics.currentBudgetSpent.toLocaleString()}
          </p>
          <div className="mt-2 bg-border rounded-full h-2 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-500"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{budgetPercentage}% del presupuesto</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Performance Promedio</p>
            <Activity className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-500">
            {currentEvent.realTimeMetrics.averagePerformance}%
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {currentEvent.realTimeMetrics.incidentsReported} incidentes reportados
          </p>
        </Card>
      </div>

      {/* Position Status */}
      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Estado de Posiciones</h3>
        <div className="space-y-3">
          {currentEvent.positions.map((position) => (
            <div key={position.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold">{position.title}</h4>
                  <Badge className={getPositionStatusColor(position.status)}>
                    {position.status === "success"
                      ? "Completo"
                      : position.status === "warning"
                        ? "Atención"
                        : "Crítico"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Asignados</p>
                    <p className="font-semibold">
                      {position.assigned}/{position.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Check-in</p>
                    <p className="font-semibold text-green-500">{position.checkedIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Activos ahora</p>
                    <p className="font-semibold text-primary">{position.active}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 rounded-full border-4 border-border flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {Math.round((position.checkedIn / position.total) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Actividad Reciente</h3>
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            {autoRefresh ? "Pausar" : "Reanudar"} auto-actualización
          </Button>
        </div>
        <div className="space-y-2">
          {currentEvent.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
            >
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
