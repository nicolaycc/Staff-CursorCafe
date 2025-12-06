"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface UserData {
  name: string
  email: string
  phone: string
  bio: string
  profileImage: string
  overallRating: number
  totalReviews: number
  jobsCompleted: number
  memberSince: string
}

interface ReviewFromCompany {
  id: string
  companyName: string
  rating: number
  comment: string
  campaignTitle: string
  date: string
}

export function UserProfile() {
  const [user] = useState<UserData>({
    name: "Juan Perez",
    email: "juan.perez@example.com",
    phone: "+34 612 345 678",
    bio: "Promotor experimentado con 3 años en el sector. Dinámico, comunicativo y con excelentes habilidades de ventas.",
    profileImage: "/professional-profile.png",
    overallRating: 4.7,
    totalReviews: 12,
    jobsCompleted: 18,
    memberSince: "Enero 2022",
  })

  const [reviews] = useState<ReviewFromCompany[]>([
    {
      id: "1",
      companyName: "Tech Events Co",
      rating: 5,
      comment: "Excelente promotor, muy energético y comprometido con los objetivos.",
      campaignTitle: "Lanzamiento Nike - Modelo",
      date: "15 dic, 2024",
    },
    {
      id: "2",
      companyName: "Brand Activation Inc",
      rating: 4,
      comment: "Buen desempeño general, falta un poco más de iniciativa.",
      campaignTitle: "Campaña Sostenibilidad",
      date: "10 dic, 2024",
    },
  ])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-secondary"></div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
            <div className="relative">
              <img
                src={user.profileImage || "/placeholder.svg"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>

            <div className="flex-1 pt-8">
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-muted-foreground mb-4">{user.bio}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Rating General</p>
                  <p className="text-2xl font-bold text-yellow-500">⭐ {user.overallRating}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Evaluaciones</p>
                  <p className="text-2xl font-bold text-primary">{user.totalReviews}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Trabajos Completados</p>
                  <p className="text-2xl font-bold text-green-600">{user.jobsCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Miembro Desde</p>
                  <p className="text-sm font-semibold text-foreground">{user.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Editar Perfil</Button>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Mis Aplicaciones</Button>
            <Button className="bg-muted hover:bg-muted/90 text-muted-foreground">Historial</Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Evaluaciones de Empresas</h2>

        {reviews.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Aún no tienes evaluaciones de empresas.</p>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{review.companyName}</h3>
                  <p className="text-sm text-muted-foreground">{review.campaignTitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-500">⭐ {review.rating}/5</div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-foreground">{review.comment}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
