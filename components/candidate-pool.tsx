"use client"

import { useState } from "react"
import { Search, Filter, Plus, MessageSquare, Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AddCandidateModal } from "@/components/add-candidate-modal"

interface Candidate {
  id: number
  name: string
  role: string
  email: string
  phone: string
  rating: number
  reviews: number
  joinDate: string
  completedEvents: number
  status: "Activo" | "Inactivo" | "Suspendido"
}

export function CandidatePool() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "María García",
      role: "Promotora",
      email: "maria@email.com",
      phone: "+34 612 345 678",
      rating: 4.8,
      reviews: 24,
      joinDate: "2024-01-15",
      completedEvents: 12,
      status: "Activo",
    },
    {
      id: 2,
      name: "Juan López",
      role: "Embajador",
      email: "juan@email.com",
      phone: "+34 623 456 789",
      rating: 4.9,
      reviews: 31,
      joinDate: "2023-11-20",
      completedEvents: 18,
      status: "Activo",
    },
    {
      id: 3,
      name: "Sofia Rodríguez",
      role: "Modelo",
      email: "sofia@email.com",
      phone: "+34 634 567 890",
      rating: 5.0,
      reviews: 15,
      joinDate: "2024-02-10",
      completedEvents: 8,
      status: "Activo",
    },
    {
      id: 4,
      name: "Carlos Martínez",
      role: "Promotor",
      email: "carlos@email.com",
      phone: "+34 645 678 901",
      rating: 4.5,
      reviews: 12,
      joinDate: "2024-03-05",
      completedEvents: 5,
      status: "Activo",
    },
    {
      id: 5,
      name: "Elena Fernández",
      role: "Staff de Ventas",
      email: "elena@email.com",
      phone: "+34 656 789 012",
      rating: 4.6,
      reviews: 8,
      joinDate: "2024-04-12",
      completedEvents: 3,
      status: "Inactivo",
    },
  ])

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCandidate = (newCandidate: any) => {
    setCandidates([
      ...candidates,
      {
        ...newCandidate,
        id: Math.max(...candidates.map((c) => c.id), 0) + 1,
      },
    ])
    setShowAddModal(false)
  }

  const handleStatusChange = (id: number, status: string) => {
    setCandidates(candidates.map((c) => (c.id === id ? { ...c, status: status as any } : c)))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar candidatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Añadir Candidato
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((candidate) => (
          <Card key={candidate.id} className="p-6 hover:border-primary/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div>
                <h3 className="font-semibold">{candidate.name}</h3>
                <p className="text-sm text-accent font-medium">{candidate.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{candidate.email}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Rating</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-bold">{candidate.rating}</span>
                  <span className="text-xs text-muted-foreground">({candidate.reviews})</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Eventos</p>
                <p className="font-bold mt-1">{candidate.completedEvents}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Miembro Desde</p>
                <p className="font-medium text-sm mt-1">{new Date(candidate.joinDate).toLocaleDateString()}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Estado</p>
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                  className={`mt-1 px-3 py-1 rounded-full text-xs font-medium border-0 bg-transparent cursor-pointer ${
                    candidate.status === "Activo"
                      ? "text-green-500"
                      : candidate.status === "Inactivo"
                        ? "text-gray-500"
                        : "text-destructive"
                  }`}
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Suspendido</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:text-green-500">
                  <Check className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddCandidateModal open={showAddModal} onClose={() => setShowAddModal(false)} onCreate={handleAddCandidate} />
    </div>
  )
}
