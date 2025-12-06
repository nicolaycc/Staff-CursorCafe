"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface PaymentRecord {
  id: number
  workerName: string
  amount: number
  date: string
  method: string
  status: "Completado" | "Fallido" | "Reembolsado"
  transactionId: string
}

export function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: 1,
      workerName: "María García",
      amount: 1000,
      date: "2024-12-05",
      method: "Transferencia Bancaria",
      status: "Completado",
      transactionId: "TRX-2024-001234",
    },
    {
      id: 2,
      workerName: "Juan López",
      amount: 560,
      date: "2024-12-03",
      method: "Tarjeta de Débito",
      status: "Completado",
      transactionId: "TRX-2024-001233",
    },
    {
      id: 3,
      workerName: "Sofia Rodríguez",
      amount: 480,
      date: "2024-12-01",
      method: "Transferencia Bancaria",
      status: "Completado",
      transactionId: "TRX-2024-001232",
    },
    {
      id: 4,
      workerName: "Carlos Martínez",
      amount: 320,
      date: "2024-11-28",
      method: "Billetera Digital",
      status: "Fallido",
      transactionId: "TRX-2024-001231",
    },
    {
      id: 5,
      workerName: "Elena Fernández",
      amount: 200,
      date: "2024-11-25",
      method: "Transferencia Bancaria",
      status: "Reembolsado",
      transactionId: "TRX-2024-001230",
    },
  ])

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || p.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: payments.reduce((sum, p) => sum + (p.status === "Completado" ? p.amount : 0), 0),
    completed: payments.filter((p) => p.status === "Completado").length,
    failed: payments.filter((p) => p.status === "Fallido").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Pagado</p>
          <p className="text-3xl font-bold mt-2 text-green-500">${stats.total.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Transacciones Exitosas</p>
          <p className="text-3xl font-bold mt-2">{stats.completed}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Transacciones Fallidas</p>
          <p className="text-3xl font-bold mt-2 text-destructive">{stats.failed}</p>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por trabajador o ID de transacción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-input border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todos los Estados</option>
          <option value="Completado">Completado</option>
          <option value="Fallido">Fallido</option>
          <option value="Reembolsado">Reembolsado</option>
        </select>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Trabajador</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Monto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Método</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">ID Transacción</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{payment.workerName}</td>
                  <td className="px-6 py-4 font-semibold text-accent">${payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{payment.method}</td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{payment.transactionId}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        payment.status === "Completado"
                          ? "bg-green-500/20 text-green-500"
                          : payment.status === "Fallido"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {payment.status}
                    </span>
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
