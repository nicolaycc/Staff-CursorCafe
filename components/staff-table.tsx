"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Star, Trash2, Edit } from "lucide-react"

export function StaffTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const staff = [
    {
      id: 1,
      name: "María García",
      role: "Promotora",
      email: "maria@email.com",
      phone: "+34 612 345 678",
      events: 5,
      rating: 4.8,
      status: "Activo",
    },
    {
      id: 2,
      name: "Juan López",
      role: "Embajador",
      email: "juan@email.com",
      phone: "+34 623 456 789",
      events: 8,
      rating: 4.9,
      status: "Activo",
    },
    {
      id: 3,
      name: "Sofia Rodríguez",
      role: "Modelo",
      email: "sofia@email.com",
      phone: "+34 634 567 890",
      events: 3,
      rating: 5.0,
      status: "Activo",
    },
    {
      id: 4,
      name: "Carlos Martínez",
      role: "Promotor",
      email: "carlos@email.com",
      phone: "+34 645 678 901",
      events: 2,
      rating: 4.5,
      status: "Inactivo",
    },
  ]

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Personal</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Añadir Personal
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar personal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Eventos</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.email}</td>
                  <td className="px-6 py-4 text-sm font-medium">{member.events}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{member.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        member.status === "Activo" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
