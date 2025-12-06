"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Check, X, Search, Filter } from "lucide-react"
import { toast } from "sonner"

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

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    type: "approve" | "reject" | null
    applicationId: number | null
    candidateName: string
  }>({
    open: false,
    type: null,
    applicationId: null,
    candidateName: "",
  })

  const handleApprove = (id: number) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status: "Aceptada" } : a)))
    const app = applications.find((a) => a.id === id)
    toast.success(`Aplicación aprobada`, {
      description: `${app?.candidateName} ha sido aceptado/a para ${app?.position}`,
    })
    setConfirmDialog({ open: false, type: null, applicationId: null, candidateName: "" })
  }

  const handleReject = (id: number) => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status: "Rechazada" } : a)))
    const app = applications.find((a) => a.id === id)
    toast.error(`Aplicación rechazada`, {
      description: `${app?.candidateName} ha sido rechazado/a para ${app?.position}`,
    })
    setConfirmDialog({ open: false, type: null, applicationId: null, candidateName: "" })
  }

  const openConfirmDialog = (type: "approve" | "reject", id: number, name: string) => {
    setConfirmDialog({ open: true, type, applicationId: id, candidateName: name })
  }

  const handleConfirm = () => {
    if (confirmDialog.applicationId) {
      if (confirmDialog.type === "approve") {
        handleApprove(confirmDialog.applicationId)
      } else if (confirmDialog.type === "reject") {
        handleReject(confirmDialog.applicationId)
      }
    }
  }

  // Filtrar aplicaciones
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    pending: applications.filter((a) => a.status === "Pendiente").length,
    approved: applications.filter((a) => a.status === "Aceptada").length,
    rejected: applications.filter((a) => a.status === "Rechazada").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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

      {/* Búsqueda y Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nombre de candidato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="sm:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Aceptada">Aceptada</SelectItem>
              <SelectItem value="Rechazada">Rechazada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApplications.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No se encontraron aplicaciones que coincidan con los filtros
            </p>
          </Card>
        ) : (
          filteredApplications.map((app) => (
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
                      onClick={() => openConfirmDialog("approve", app.id, app.candidateName)}
                      size="icon"
                      className="h-8 w-8 bg-green-500/20 hover:bg-green-500/30 text-green-500"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => openConfirmDialog("reject", app.id, app.candidateName)}
                      size="icon"
                      className="h-8 w-8 bg-destructive/20 hover:bg-destructive/30 text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ open: false, type: null, applicationId: null, candidateName: "" })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === "approve" ? "¿Aceptar aplicación?" : "¿Rechazar aplicación?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === "approve"
                ? `¿Estás seguro de que deseas aceptar la aplicación de ${confirmDialog.candidateName}? Esta acción confirmará al candidato.`
                : `¿Estás seguro de que deseas rechazar la aplicación de ${confirmDialog.candidateName}? Esta acción no se puede deshacer fácilmente.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                confirmDialog.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-destructive hover:bg-destructive/90"
              }
            >
              {confirmDialog.type === "approve" ? "Aceptar" : "Rechazar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
