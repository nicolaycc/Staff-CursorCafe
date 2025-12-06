"use client"

import { Button } from "@/components/ui/button"

interface JobPostProps {
  job: {
    id: string
    company: string
    companyLogo: string
    title: string
    description: string
    image: string
    roles: { name: string; quantity: number; salary: string }[]
    location: string
    date: string
    applied?: boolean
  }
  userRole: "empresa" | "empleado" | null
  onApply: () => void
}

export function JobPost({ job, userRole, onApply }: JobPostProps) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <img
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img
                src={job.companyLogo || "/placeholder.svg"}
                alt={job.company}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <h2 className="text-2xl font-bold text-foreground">{job.title}</h2>
            </div>
          </div>
          {userRole === "empresa" && (
            <Button className="bg-muted hover:bg-muted/90 text-muted-foreground">Editar</Button>
          )}
        </div>

        <p className="text-foreground/80 mb-4 leading-relaxed">{job.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {job.date}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">Roles Necesarios:</p>
          <div className="space-y-2">
            {job.roles.map((role, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium">{role.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{role.quantity} posiciones</span>
                  <span className="text-sm font-semibold text-primary">{role.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {userRole === "empleado" && (
          <Button
            onClick={onApply}
            disabled={job.applied}
            className={`w-full py-3 font-semibold transition-all ${
              job.applied
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            {job.applied ? "✓ Ya aplicaste" : "Aplicar Ahora"}
          </Button>
        )}

        {userRole === "empresa" && (
          <div className="flex gap-3">
            <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Ver Aplicantes
            </Button>
            <Button className="flex-1 bg-muted hover:bg-muted/90 text-muted-foreground">Eliminar</Button>
          </div>
        )}
      </div>
    </div>
  )
}
