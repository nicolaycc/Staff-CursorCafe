"use client"

import { useState } from "react"
import { Search, Filter, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProcessPaymentModal } from "@/components/process-payment-modal"

interface WorkerPayment {
  id: number
  workerName: string
  email: string
  completedShifts: number
  totalHours: number
  totalEarnings: number
  pendingAmount: number
  bankAccount: string
  status: "Pagado" | "Pendiente" | "Procesando"
  lastPaymentDate?: string
}

export function WorkerPayments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showProcessModal, setShowProcessModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<WorkerPayment | null>(null)
  const [workers, setWorkers] = useState<WorkerPayment[]>([
    {
      id: 1,
      workerName: "María García",
      email: "maria@email.com",
      completedShifts: 5,
      totalHours: 40,
      totalEarnings: 1000,
      pendingAmount: 0,
      bankAccount: "****3456",
      status: "Pagado",
      lastPaymentDate: "2024-12-05",
    },
    {
      id: 2,
      workerName: "Juan López",
      email: "juan@email.com",
      completedShifts: 8,
      totalHours: 64,
      totalEarnings: 2240,
      pendingAmount: 560,
      bankAccount: "****7890",
      status: "Pendiente",
    },
    {
      id: 3,
      workerName: "Sofia Rodríguez",
      email: "sofia@email.com",
      completedShifts: 3,
      totalHours: 24,
      totalEarnings: 960,
      pendingAmount: 960,
      bankAccount: "****1234",
      status: "Pendiente",
    },
    {
      id: 4,
      workerName: "Carlos Martínez",
      email: "carlos@email.com",
      completedShifts: 2,
      totalHours: 16,
      totalEarnings: 400,
      pendingAmount: 400,
      bankAccount: "****5678",
      status: "Pendiente",
    },
  ])

  const filtered = workers.filter(
    (w) =>
      w.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleProcessPayment = (workerId: number, amount: number, method: string) => {
    setWorkers(
      workers.map((w) =>
        w.id === workerId
          ? {
              ...w,
              status: "Procesando",
              pendingAmount: Math.max(0, w.pendingAmount - amount),
            }
          : w,
      ),
    )
    setShowProcessModal(false)
  }

  const totalPending = workers.reduce((sum, w) => sum + w.pendingAmount, 0)
  const totalProcessing = workers.filter((w) => w.status === "Procesando").length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Pendiente</p>
          <p className="text-3xl font-bold mt-2 text-yellow-500">${totalPending.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Procesando</p>
          <p className="text-3xl font-bold mt-2 text-blue-500">{totalProcessing}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Trabajadores Activos</p>
          <p className="text-3xl font-bold mt-2">{workers.length}</p>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar trabajador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Pagar Todo
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((worker) => (
          <Card key={worker.id} className="p-6 hover:border-primary/30 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              <div>
                <h3 className="font-semibold">{worker.workerName}</h3>
                <p className="text-sm text-muted-foreground">{worker.email}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Turnos</p>
                <p className="font-bold mt-1">{worker.completedShifts}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Horas</p>
                <p className="font-bold mt-1">{worker.totalHours}h</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Total Ganado</p>
                <p className="font-bold mt-1 text-accent">${worker.totalEarnings}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase">Pendiente</p>
                <p className="font-bold mt-1 text-yellow-500">${worker.pendingAmount}</p>
              </div>

              <div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${
                    worker.status === "Pagado"
                      ? "bg-green-500/20 text-green-500"
                      : worker.status === "Pendiente"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-primary/20 text-primary"
                  }`}
                >
                  {worker.status}
                </span>
              </div>

              <div>
                <Button
                  onClick={() => {
                    setSelectedWorker(worker)
                    setShowProcessModal(true)
                  }}
                  disabled={worker.pendingAmount === 0}
                  className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-500 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Pagar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ProcessPaymentModal
        open={showProcessModal}
        onClose={() => {
          setShowProcessModal(false)
          setSelectedWorker(null)
        }}
        worker={selectedWorker}
        onProcess={handleProcessPayment}
      />
    </div>
  )
}
