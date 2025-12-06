"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"

export function PaymentsDashboard() {
  const stats = [
    {
      title: "Pagos Totales",
      value: "$45,250",
      change: "+12%",
      icon: TrendingUp,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Pendientes de Procesar",
      value: "$12,450",
      description: "Esta semana",
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      title: "Pagados",
      value: "$32,800",
      change: "+8%",
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Disputas",
      value: "2",
      description: "Requieren atención",
      icon: AlertCircle,
      color: "bg-destructive/10 text-destructive",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                {stat.change && <p className="text-xs text-green-500 mt-2">{stat.change}</p>}
                {stat.description && <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>}
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
