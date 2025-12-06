"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { JobPost } from "@/components/job-post"
import { CreateJobModal } from "@/components/create-job-modal"

interface JobFeedProps {
  userRole: "empresa" | "empleado" | null
}

interface Job {
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

export function JobFeed({ userRole }: JobFeedProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      company: "Tech Events Co",
      companyLogo: "/tech-company-logo.jpg",
      title: "Evento Lanzamiento Producto - Nike",
      description:
        "Buscamos promotores y modelos para evento de lanzamiento de producto en el centro comercial. Evento presencial, 1 día.",
      image: "/product-launch-event-with-models-and-promoters.jpg",
      roles: [
        { name: "Promotor", quantity: 5, salary: "$25/hr" },
        { name: "Modelo", quantity: 2, salary: "$30/hr" },
      ],
      location: "Centro Comercial Premium, Madrid",
      date: "15 de Diciembre, 2024",
      applied: false,
    },
    {
      id: "2",
      company: "Brand Activation Inc",
      companyLogo: "/brand-agency-logo.jpg",
      title: "Embajadores para Campaña de Sostenibilidad",
      description:
        "Representantes de marca para campaña ambiental. Se requiere gente carismática y comprometida con valores ecológicos.",
      image: "/sustainability-campaign-with-brand-ambassadors.jpg",
      roles: [
        { name: "Embajador", quantity: 8, salary: "$28/hr" },
        { name: "Coordinator", quantity: 1, salary: "$35/hr" },
      ],
      location: "Barcelona, Múltiples ubicaciones",
      date: "10 de Diciembre - 20 de Diciembre",
      applied: false,
    },
  ])

  const handleCreateJob = (jobData: any) => {
    const newJob: Job = {
      id: String(jobs.length + 1),
      company: "Mi Empresa",
      companyLogo: "/generic-company-logo.png",
      title: jobData.title,
      description: jobData.description,
      image: jobData.image || "/event-job-posting.jpg",
      roles: jobData.roles,
      location: jobData.location,
      date: new Date().toLocaleDateString("es-ES"),
      applied: false,
    }
    setJobs([newJob, ...jobs])
    setShowCreateModal(false)
  }

  const handleApply = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, applied: true } : job)))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {userRole === "empresa" && (
        <div className="mb-8">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
          >
            + Crear Nueva Oferta de Trabajo
          </Button>
        </div>
      )}

      {showCreateModal && <CreateJobModal onClose={() => setShowCreateModal(false)} onCreateJob={handleCreateJob} />}

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobPost key={job.id} job={job} userRole={userRole} onApply={() => handleApply(job.id)} />
        ))}
      </div>
    </div>
  )
}
