"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { AddReviewModal } from "@/components/add-review-modal"
import { Search, Filter } from "lucide-react"
import { toast } from "sonner"

interface Campaign {
  id: string
  title: string
  status: "active" | "completed" | "cancelled"
  image: string
  positionsFilled: number
  totalPositions: number
  prospects: number
  applications: number
  averageRating: number
}

interface Review {
  id: string
  workerId: string
  workerName: string
  rating: number
  comment: string
  campaignTitle: string
  date: string
}

interface Applicant {
  id: string
  name: string
  role: string
  campaignId: string
  campaignTitle: string
  status: "pending" | "approved" | "rejected" | "completed"
  appliedDate: string
  avatar: string
  rating?: number
}

export function EnterpriseCompanyDashboard() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "reviews" | "applicants">("campaigns")
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedCampaignForReview, setSelectedCampaignForReview] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    type: "approve" | "reject" | "complete" | null
    applicantId: string | null
    applicantName: string
  }>({
    open: false,
    type: null,
    applicantId: null,
    applicantName: "",
  })

  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Lanzamiento Nike - Modelo",
      status: "active",
      image: "/nike-product-launch.jpg",
      positionsFilled: 5,
      totalPositions: 5,
      prospects: 12,
      applications: 8,
      averageRating: 4.5,
    },
    {
      id: "2",
      title: "Campaña Sostenibilidad - Embajador",
      status: "completed",
      image: "/sustainability-campaign.jpg",
      positionsFilled: 8,
      totalPositions: 8,
      prospects: 25,
      applications: 18,
      averageRating: 4.8,
    },
  ])

  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: "a1",
      name: "Carlos Martínez",
      role: "Modelo",
      campaignId: "1",
      campaignTitle: "Lanzamiento Nike - Modelo",
      status: "approved",
      appliedDate: "10 dic, 2024",
      avatar: "C",
      rating: 5,
    },
    {
      id: "a2",
      name: "Ana García",
      role: "Modelo",
      campaignId: "1",
      campaignTitle: "Lanzamiento Nike - Modelo",
      status: "approved",
      appliedDate: "11 dic, 2024",
      avatar: "A",
      rating: 4,
    },
    {
      id: "a3",
      name: "Juan López",
      role: "Embajador",
      campaignId: "2",
      campaignTitle: "Campaña Sostenibilidad - Embajador",
      status: "completed",
      appliedDate: "05 dic, 2024",
      avatar: "J",
      rating: 5,
    },
    {
      id: "a4",
      name: "María Rodríguez",
      role: "Modelo",
      campaignId: "1",
      campaignTitle: "Lanzamiento Nike - Modelo",
      status: "pending",
      appliedDate: "12 dic, 2024",
      avatar: "M",
    },
    {
      id: "a5",
      name: "Pedro Sánchez",
      role: "Embajador",
      campaignId: "2",
      campaignTitle: "Campaña Sostenibilidad - Embajador",
      status: "rejected",
      appliedDate: "08 dic, 2024",
      avatar: "P",
    },
  ])

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      workerId: "w1",
      workerName: "Carlos Martínez",
      rating: 5,
      comment: "Excelente desempeño, muy profesional y puntual.",
      campaignTitle: "Lanzamiento Nike - Modelo",
      date: "15 dic, 2024",
    },
    {
      id: "2",
      workerId: "w2",
      workerName: "Ana García",
      rating: 4,
      comment: "Buena actitud, pero necesita mejorar algunos detalles.",
      campaignTitle: "Lanzamiento Nike - Modelo",
      date: "14 dic, 2024",
    },
  ])

  const handleApprove = (id: string) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a)))
    const applicant = applicants.find((a) => a.id === id)
    toast.success("Candidato aprobado", {
      description: `${applicant?.name} ha sido aprobado/a para ${applicant?.role}`,
    })
    setConfirmDialog({ open: false, type: null, applicantId: null, applicantName: "" })
  }

  const handleReject = (id: string) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a)))
    const applicant = applicants.find((a) => a.id === id)
    toast.error("Candidato rechazado", {
      description: `${applicant?.name} ha sido rechazado/a para ${applicant?.role}`,
    })
    setConfirmDialog({ open: false, type: null, applicantId: null, applicantName: "" })
  }

  const handleComplete = (id: string) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status: "completed" as const } : a)))
    const applicant = applicants.find((a) => a.id === id)
    toast.success("Trabajo completado", {
      description: `${applicant?.name} ha completado el trabajo`,
    })
    setConfirmDialog({ open: false, type: null, applicantId: null, applicantName: "" })
  }

  const openConfirmDialog = (
    type: "approve" | "reject" | "complete",
    id: string,
    name: string
  ) => {
    setConfirmDialog({ open: true, type, applicantId: id, applicantName: name })
  }

  const handleConfirm = () => {
    if (confirmDialog.applicantId) {
      if (confirmDialog.type === "approve") {
        handleApprove(confirmDialog.applicantId)
      } else if (confirmDialog.type === "reject") {
        handleReject(confirmDialog.applicantId)
      } else if (confirmDialog.type === "complete") {
        handleComplete(confirmDialog.applicantId)
      }
    }
  }

  // Filtrar candidatos
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || applicant.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddReview = (reviewData: {
    workerId: string
    workerName: string
    rating: number
    comment: string
    campaignTitle: string
  }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      workerId: reviewData.workerId,
      workerName: reviewData.workerName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      campaignTitle: reviewData.campaignTitle,
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }
    setReviews([newReview, ...reviews])
    setShowReviewModal(false)
  }

  const getApplicantsByCampaign = (campaignId: string) => {
    return applicants.filter((app) => app.campaignId === campaignId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobado"
      case "pending":
        return "Pendiente"
      case "rejected":
        return "Rechazado"
      case "completed":
        return "Completado"
      default:
        return status
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard de Empresa</h1>

      <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-3 px-4 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "campaigns"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Campañas
        </button>
        <button
          onClick={() => setActiveTab("applicants")}
          className={`pb-3 px-4 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "applicants"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Candidatos
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 px-4 font-semibold transition-colors whitespace-nowrap ${
            activeTab === "reviews"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Evaluaciones
        </button>
      </div>

      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden bg-muted">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        campaign.status === "active"
                          ? "bg-green-500"
                          : campaign.status === "completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    >
                      {campaign.status === "active"
                        ? "Activa"
                        : campaign.status === "completed"
                          ? "Completada"
                          : "Cancelada"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-foreground mb-4">{campaign.title}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Posiciones</p>
                      <p className="text-xl font-bold text-primary">
                        {campaign.positionsFilled}/{campaign.totalPositions}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Solicitudes</p>
                      <p className="text-xl font-bold text-green-600">{campaign.applications}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Prospectos</p>
                      <p className="text-xl font-bold text-purple-600">{campaign.prospects}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground font-semibold mb-1">Rating Promedio</p>
                      <p className="text-xl font-bold text-yellow-600">⭐ {campaign.averageRating}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Detalles
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "applicants" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Historial de Candidatos</h2>
            <div className="text-sm text-muted-foreground">Total: {applicants.length} candidatos</div>
          </div>

          {/* Búsqueda y Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Candidatos List */}
          <div className="grid gap-4">
            {filteredApplicants.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No se encontraron candidatos que coincidan con los filtros
                </p>
              </Card>
            ) : (
              filteredApplicants.map((applicant) => (
                <Card key={applicant.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {applicant.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{applicant.name}</h3>
                        <p className="text-sm text-muted-foreground">{applicant.campaignTitle}</p>
                        <p className="text-xs text-muted-foreground mt-1">Rol: {applicant.role}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(applicant.status)}`}
                      >
                        {getStatusLabel(applicant.status)}
                      </span>
                      <p className="text-xs text-muted-foreground">{applicant.appliedDate}</p>
                      {applicant.rating && (
                        <p className="text-sm font-semibold text-yellow-500">⭐ {applicant.rating}/5</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {applicant.status === "pending" && (
                      <>
                        <Button
                          onClick={() => openConfirmDialog("approve", applicant.id, applicant.name)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                        >
                          Aprobar
                        </Button>
                        <Button
                          onClick={() => openConfirmDialog("reject", applicant.id, applicant.name)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                    {applicant.status === "approved" && (
                      <Button
                        onClick={() => openConfirmDialog("complete", applicant.id, applicant.name)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        Marcar Completado
                      </Button>
                    )}
                    {applicant.status === "completed" && (
                      <Button
                        onClick={() => {
                          setSelectedCampaignForReview(applicant.campaignId)
                          setShowReviewModal(true)
                        }}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                      >
                        Evaluar
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Evaluaciones Realizadas</h2>
            <Button
              onClick={() => {
                setSelectedCampaignForReview(null)
                setShowReviewModal(true)
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              + Agregar Evaluación
            </Button>
          </div>

          {reviews.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No hay evaluaciones registradas aún</p>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {review.workerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{review.workerName}</h3>
                      <p className="text-sm text-muted-foreground">{review.campaignTitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-500">⭐ {review.rating}/5</div>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <p className="text-foreground/80 bg-muted/30 p-3 rounded-lg">{review.comment}</p>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-muted hover:bg-muted/90 text-muted-foreground text-sm">Editar</Button>
                  <Button className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm">Eliminar</Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          !open && setConfirmDialog({ open: false, type: null, applicantId: null, applicantName: "" })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === "approve"
                ? "¿Aprobar candidato?"
                : confirmDialog.type === "reject"
                  ? "¿Rechazar candidato?"
                  : "¿Marcar como completado?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === "approve"
                ? `¿Estás seguro de que deseas aprobar a ${confirmDialog.applicantName}? El candidato será notificado.`
                : confirmDialog.type === "reject"
                  ? `¿Estás seguro de que deseas rechazar a ${confirmDialog.applicantName}? Esta acción no se puede deshacer fácilmente.`
                  : `¿Confirmas que ${confirmDialog.applicantName} ha completado el trabajo? Esto permitirá agregar una evaluación.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                confirmDialog.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : confirmDialog.type === "reject"
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {confirmDialog.type === "approve"
                ? "Aprobar"
                : confirmDialog.type === "reject"
                  ? "Rechazar"
                  : "Marcar Completado"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onAddReview={handleAddReview}
        selectedCampaignId={selectedCampaignForReview}
        applicants={applicants}
      />
    </div>
  )
}
