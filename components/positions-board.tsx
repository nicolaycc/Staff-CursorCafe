"use client"

import { useState } from "react"
import { Plus, Trash2, ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { EventWithPositions, Position } from "@/components/event-management"

interface PositionsBoardProps {
  event: EventWithPositions
  onBack: () => void
  onUpdatePositions: (positions: Position[]) => void
}

export function PositionsBoard({ event, onBack, onUpdatePositions }: PositionsBoardProps) {
  const [positions, setPositions] = useState<Position[]>(event.positions)
  const [newPosition, setNewPosition] = useState({ title: "", count: "", rate: "" })
  const [hasChanges, setHasChanges] = useState(false)

  const handleAddPosition = () => {
    if (newPosition.title && newPosition.count && newPosition.rate) {
      const position: Position = {
        id: Math.max(...positions.map((p) => p.id), 0) + 1,
        title: newPosition.title,
        count: Number.parseInt(newPosition.count),
        filled: 0,
        rate: Number.parseFloat(newPosition.rate),
        status: "Activa",
      }
      setPositions([...positions, position])
      setNewPosition({ title: "", count: "", rate: "" })
      setHasChanges(true)
    }
  }

  const handleRemovePosition = (id: number) => {
    setPositions(positions.filter((p) => p.id !== id))
    setHasChanges(true)
  }

  const handleUpdateFilled = (id: number, filled: number) => {
    setPositions(
      positions.map((p) =>
        p.id === id
          ? {
              ...p,
              filled: Math.min(filled, p.count),
              status: Math.min(filled, p.count) === p.count ? "Cubierta" : "Activa",
            }
          : p,
      ),
    )
    setHasChanges(true)
  }

  const handleSave = () => {
    onUpdatePositions(positions)
    setHasChanges(false)
  }

  const totalVacancies = positions.reduce((sum, p) => sum + (p.count - p.filled), 0)
  const totalFilled = positions.reduce((sum, p) => sum + p.filled, 0)
  const totalBudgetPositions = positions.reduce((sum, p) => sum + p.count * p.rate * 8, 0) // Assume 8-hour shifts

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold">{event.name}</h2>
          <p className="text-sm text-muted-foreground">
            {event.date} • {event.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Vacantes Totales</p>
          <p className="text-3xl font-bold mt-2">{totalVacancies}</p>
          <p className="text-xs text-muted-foreground mt-2">Posiciones sin llenar</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Personal Contratado</p>
          <p className="text-3xl font-bold mt-2">{totalFilled}</p>
          <p className="text-xs text-muted-foreground mt-2">Personas asignadas</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Presupuesto Estimado</p>
          <p className="text-3xl font-bold mt-2">${totalBudgetPositions.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">Costo total de roles</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Crear Nueva Posición</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Nombre del Rol</label>
            <Input
              placeholder="Ej: Promotor"
              value={newPosition.title}
              onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Cantidad</label>
            <Input
              type="number"
              placeholder="0"
              value={newPosition.count}
              onChange={(e) => setNewPosition({ ...newPosition, count: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tarifa Horaria ($)</label>
            <Input
              type="number"
              placeholder="0"
              value={newPosition.rate}
              onChange={(e) => setNewPosition({ ...newPosition, rate: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddPosition} className="w-full bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Añadir
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Posiciones del Evento</h3>
        {positions.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            No hay posiciones creadas. Añade una para comenzar.
          </Card>
        ) : (
          positions.map((pos) => (
            <Card key={pos.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="font-semibold">{pos.title}</p>
                  <p className="text-sm text-muted-foreground">€{pos.rate}/hora</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Cantidad Total</p>
                  <Input type="number" value={pos.count} disabled className="bg-muted" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Contratados</p>
                  <Input
                    type="number"
                    max={pos.count}
                    value={pos.filled}
                    onChange={(e) => handleUpdateFilled(pos.id, Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${(pos.filled / pos.count) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {Math.round((pos.filled / pos.count) * 100)}%
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                      pos.status === "Cubierta"
                        ? "bg-green-500/20 text-green-500"
                        : pos.status === "Activa"
                          ? "bg-primary/20 text-primary"
                          : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {pos.status}
                  </span>
                  <Button
                    onClick={() => handleRemovePosition(pos.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Posiciones
        </Button>
      </div>
    </div>
  )
}
