"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsDashboard } from "@/components/payments-dashboard"
import { WorkerPayments } from "@/components/worker-payments"
import { PaymentHistory } from "@/components/payment-history"

export function PaymentsSystem() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sistema de Pagos y Transacciones</h2>
        <p className="text-muted-foreground">Gestiona pagos a trabajadores y transacciones de eventos</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="workers">Pagos Trabajadores</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <PaymentsDashboard />
        </TabsContent>

        <TabsContent value="workers" className="space-y-4">
          <WorkerPayments />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
