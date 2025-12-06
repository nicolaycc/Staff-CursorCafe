"use client"

import { Card } from "@/components/ui/card"
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react"

export function MetricsGrid() {
  const metrics = [
    {
      title: "Personal Activo",
      value: "24",
      description: "Trabajadores disponibles",
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Eventos Este Mes",
      value: "8",
      description: "Contrataciones pendientes",
      icon: Calendar,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Pagos Pendientes",
      value: "$12,450",
      description: "A procesar esta semana",
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Tasa de Retención",
      value: "87%",
      description: "Personal recontratado",
      icon: TrendingUp,
      color: "bg-blue-500/10 text-blue-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
