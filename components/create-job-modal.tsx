"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CreateJobModalProps {
  onClose: () => void
  onCreateJob: (jobData: any) => void
}

export function CreateJobModal({ onClose, onCreateJob }: CreateJobModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    roles: [{ name: "", quantity: 1, salary: "$20/hr" }],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateJob(formData)
  }

  const handleRoleChange = (idx: number, field: string, value: any) => {
    const newRoles = [...formData.roles]
    newRoles[idx] = { ...newRoles[idx], [field]: value }
    setFormData({ ...formData, roles: newRoles })
  }

  const addRole = () => {
    setFormData({
      ...formData,
      roles: [...formData.roles, { name: "", quantity: 1, salary: "$20/hr" }],
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Crear Nueva Oferta</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Título del Evento/Oferta</label>
            <input
              type="text"
              placeholder="Ej: Evento Lanzamiento Producto"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
            <textarea
              placeholder="Describe el evento y qué esperas de los candidatos..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">URL de Imagen del Evento</label>
            <input
              type="text"
              placeholder="Ej: https://example.com/event-image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            {formData.image && (
              <div className="mt-3 rounded-lg overflow-hidden h-32 bg-muted">
                <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Ubicación</label>
            <input
              type="text"
              placeholder="Ej: Centro Comercial, Madrid"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-foreground">Roles Necesarios</label>
              <button
                type="button"
                onClick={addRole}
                className="text-sm text-primary hover:text-primary/90 font-medium"
              >
                + Añadir Rol
              </button>
            </div>

            <div className="space-y-3">
              {formData.roles.map((role, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Ej: Promotor"
                    value={role.name}
                    onChange={(e) => handleRoleChange(idx, "name", e.target.value)}
                    required
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                  />
                  <input
                    type="number"
                    min="1"
                    value={role.quantity}
                    onChange={(e) => handleRoleChange(idx, "quantity", Number.parseInt(e.target.value))}
                    required
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="$20/hr"
                    value={role.salary}
                    onChange={(e) => handleRoleChange(idx, "salary", e.target.value)}
                    required
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="button" onClick={onClose} className="flex-1 bg-muted hover:bg-muted/90 text-muted-foreground">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Publicar Oferta
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
