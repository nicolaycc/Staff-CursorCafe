"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LoginPageProps {
  onLogin: (role: "empresa" | "empleado") => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<"empresa" | "empleado" | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleRoleSelect = (role: "empresa" | "empleado") => {
    setSelectedRole(role)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRole) {
      onLogin(selectedRole)
    }
  }

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">StaffJobs</h1>
            <p className="text-muted-foreground text-lg">Conecta empresas con talento temporal</p>
          </div>

          <div className="space-y-4">
            <div
              onClick={() => handleRoleSelect("empresa")}
              className="p-6 bg-white rounded-lg border-2 border-border hover:border-primary hover:shadow-lg cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Soy Empresa</h3>
                  <p className="text-sm text-muted-foreground">Publicar ofertas y contratar</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleSelect("empleado")}
              className="p-6 bg-white rounded-lg border-2 border-border hover:border-primary hover:shadow-lg cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Soy Empleado</h3>
                  <p className="text-sm text-muted-foreground">Buscar y aplicar a ofertas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">StaffJobs</h1>
          <p className="text-muted-foreground">
            {selectedRole === "empresa" ? "Acceso para Empresas" : "Acceso para Empleados"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-border p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </div>

          <div className="space-y-3">
            <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Iniciar Sesión
            </Button>

            <Button
              type="button"
              onClick={() => {
                setShowForm(false)
                setSelectedRole(null)
              }}
              className="w-full bg-muted hover:bg-muted/90 text-muted-foreground"
            >
              Cambiar Rol
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            ¿Primera vez? <span className="text-primary font-medium cursor-pointer">Registrarse</span>
          </div>
        </form>
      </div>
    </div>
  )
}
