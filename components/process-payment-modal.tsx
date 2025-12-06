"use client"

import type React from "react"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface ProcessPaymentModalProps {
  open: boolean
  onClose: () => void
  worker: any
  onProcess: (workerId: number, amount: number, method: string) => void
}

export function ProcessPaymentModal({ open, onClose, worker, onProcess }: ProcessPaymentModalProps) {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("bank_transfer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (worker && amount) {
      onProcess(worker.id, Number.parseFloat(amount), method)
      setAmount("")
      setMethod("bank_transfer")
    }
  }

  if (!open || !worker) return null

  const paymentMethods = [
    { id: "bank_transfer", label: "Transferencia Bancaria", icon: "🏦" },
    { id: "card", label: "Tarjeta de Débito", icon: "💳" },
    { id: "wallet", label: "Billetera Digital", icon: "👛" },
    { id: "check", label: "Cheque", icon: "📄" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Procesar Pago</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-card/50 p-4 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground">Trabajador</p>
          <p className="font-semibold">{worker.workerName}</p>
          <p className="text-xs text-muted-foreground mt-1">{worker.email}</p>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Cantidad Pendiente</p>
            <p className="text-2xl font-bold text-accent">${worker.pendingAmount}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Monto a Pagar</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-muted-foreground">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                max={worker.pendingAmount}
                step="0.01"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Máximo: ${worker.pendingAmount.toFixed(2)}</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Método de Pago</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    method === pm.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={pm.id}
                    checked={method === pm.id}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm">{pm.icon}</p>
                    <p className="text-xs text-muted-foreground">{pm.label}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex gap-2 items-start">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-500">Pago Seguro</p>
                <p className="text-xs text-green-500/80 mt-1">Los datos se transmitirán de forma segura y encriptada</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!amount}
              className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-500 disabled:opacity-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Procesar Pago
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
