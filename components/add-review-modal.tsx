"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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

interface AddReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onAddReview: (reviewData: {
    workerId: string
    workerName: string
    rating: number
    comment: string
    campaignTitle: string
  }) => void
  selectedCampaignId: string | null
  applicants: Applicant[]
}

export function AddReviewModal({ isOpen, onClose, onAddReview, selectedCampaignId, applicants }: AddReviewModalProps) {
  const [selectedWorker, setSelectedWorker] = useState<string>("")
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState<string>("")

  const completedApplicants = applicants.filter((app) => app.status === "completed")
  const filteredApplicants = selectedCampaignId
    ? completedApplicants.filter((app) => app.campaignId === selectedCampaignId)
    : completedApplicants

  const selectedApplicant = applicants.find((app) => app.id === selectedWorker)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedWorker || !comment.trim()) {
      alert("Por favor completa todos los campos")
      return
    }

    const applicant = applicants.find((app) => app.id === selectedWorker)
    if (applicant) {
      onAddReview({
        workerId: applicant.id,
        workerName: applicant.name,
        rating,
        comment,
        campaignTitle: applicant.campaignTitle,
      })
      setSelectedWorker("")
      setRating(5)
      setComment("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Agregar Evaluación</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trabajador */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Seleccionar Trabajador</label>
            <select
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Selecciona un trabajador completado --</option>
              {filteredApplicants.map((applicant) => (
                <option key={applicant.id} value={applicant.id}>
                  {applicant.name} - {applicant.role} ({applicant.campaignTitle})
                </option>
              ))}
            </select>
            {selectedApplicant && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">{selectedApplicant.name}</span>
                  <span className="text-muted-foreground ml-2">• {selectedApplicant.role}</span>
                </p>
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-transform hover:scale-110 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{rating} de 5 estrellas</p>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Comentario</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu evaluación del desempeño del trabajador..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
            />
            <p className="text-xs text-muted-foreground mt-1">{comment.length}/500 caracteres</p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onClose} className="flex-1 bg-muted hover:bg-muted/90 text-muted-foreground">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!selectedWorker || !comment.trim()}
            >
              Guardar Evaluación
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
