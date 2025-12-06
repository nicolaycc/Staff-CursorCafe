"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, X, MessageCircle } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ApplicantChatProps {
  applicantName?: string
  onClose?: () => void
}

export function ApplicantChat({ applicantName = "Usuario", onClose }: ApplicantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `¡Hola ${applicantName}! 👋 Soy tu asistente virtual de Staff-CursorCafe. Estoy aquí para ayudarte con:\n\n• Información sobre eventos disponibles\n• Estado de tus postulaciones\n• Requisitos y condiciones de trabajo\n• Dudas sobre pagos y horarios\n• Cualquier otra consulta\n\n¿En qué puedo ayudarte hoy?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Llamada a la API del LLM
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          applicantName,
        }),
      })

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || getLocalResponse(inputValue.trim()),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error al enviar mensaje:", error)

      // Fallback a respuestas locales si falla la API
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getLocalResponse(inputValue.trim()),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      toast.error("No se pudo conectar con el asistente. Usando respuestas locales.")
    } finally {
      setIsLoading(false)
    }
  }

  // Respuestas locales de fallback basadas en palabras clave
  const getLocalResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("evento") || lowerInput.includes("trabajo") || lowerInput.includes("disponible")) {
      return `Actualmente tenemos varios eventos disponibles:\n\n📍 **Lanzamiento Nike** - Centro Comercial Downtown\n- Fecha: 15 Dic 2025\n- Posiciones: Promotor (€25/h), Modelo (€40/h), Embajador (€35/h)\n\n📍 **Evento Corporativo XYZ** - Hotel Grand Plaza\n- Fecha: 18 Dic 2025\n- Posiciones: Personal de Soporte (€18/h)\n\n¿Te gustaría más información sobre algún evento específico?`
    }

    if (lowerInput.includes("postulación") || lowerInput.includes("aplicación") || lowerInput.includes("estado")) {
      return `Para consultar el estado de tus postulaciones, puedes:\n\n1. Revisar tu perfil en la sección "Mis Aplicaciones"\n2. Verificar tu correo electrónico - enviamos notificaciones\n3. Las empresas suelen responder en 24-48 horas\n\nLos estados posibles son:\n• ⏳ Pendiente - En revisión\n• ✅ Aprobado - Fuiste seleccionado\n• ❌ Rechazado - No fuiste seleccionado esta vez\n• 🎉 Completado - Trabajo finalizado\n\n¿Necesitas ayuda con algo más?`
    }

    if (lowerInput.includes("pago") || lowerInput.includes("cobrar") || lowerInput.includes("dinero") || lowerInput.includes("salario")) {
      return `Información sobre pagos:\n\n💰 **Método de pago:**\n- Transferencia bancaria directa\n- Procesamiento dentro de 7-10 días tras completar el trabajo\n\n📋 **Requisitos:**\n- Completar todas las horas asignadas\n- Recibir confirmación de la empresa\n- Tener datos bancarios actualizados en tu perfil\n\n📊 **Consultar pagos:**\n- Revisa la sección "Mis Pagos" en tu perfil\n- Recibirás un comprobante por email\n\n¿Tienes alguna duda específica sobre pagos?`
    }

    if (lowerInput.includes("requisito") || lowerInput.includes("condición") || lowerInput.includes("necesito")) {
      return `Requisitos generales para postularte:\n\n✅ **Básicos:**\n- Ser mayor de 18 años\n- Tener documento de identidad válido\n- Disponibilidad en las fechas del evento\n\n📱 **Documentación:**\n- Perfil completo con foto\n- Datos de contacto actualizados\n- Referencias (opcional pero recomendado)\n\n👔 **Por posición:**\n- Promotor: Buena comunicación, energía\n- Modelo: Portfolio, medidas específicas\n- Embajador: Experiencia en ventas/marketing\n\n¿Quieres saber los requisitos de un puesto específico?`
    }

    if (lowerInput.includes("horario") || lowerInput.includes("hora") || lowerInput.includes("cuándo")) {
      return `Información sobre horarios:\n\n🕐 **Jornadas típicas:**\n- Eventos: 4-8 horas por día\n- Flexibilidad según el evento\n- Turnos mañana, tarde o completos\n\n📅 **Programación:**\n- Te notificamos con 48h de anticipación\n- Puedes ver el calendario en tu perfil\n- Confirma tu asistencia 24h antes\n\n⏰ **Puntualidad:**\n- Llegar 15 min antes del inicio\n- La impuntualidad afecta tu rating\n\n¿Necesitas información sobre un evento específico?`
    }

    if (lowerInput.includes("ayuda") || lowerInput.includes("help") || lowerInput.includes("soporte")) {
      return `Estoy aquí para ayudarte con:\n\n🎯 **Consultas frecuentes:**\n- Eventos disponibles y postulaciones\n- Estado de tus aplicaciones\n- Información sobre pagos\n- Requisitos y condiciones\n- Horarios y calendario\n\n📧 **Contacto directo:**\n- Email: soporte@staffcursorcafe.com\n- WhatsApp: +34 600 123 456\n- Horario: Lun-Vie 9:00-18:00\n\n¿En qué te puedo asistir específicamente?`
    }

    if (
      lowerInput.includes("gracias") ||
      lowerInput.includes("thanks") ||
      lowerInput.includes("ok") ||
      lowerInput.includes("vale")
    ) {
      return `¡De nada! 😊 Estoy aquí para ayudarte siempre que lo necesites.\n\nNo dudes en escribirme si tienes más preguntas. ¡Mucha suerte con tus postulaciones!`
    }

    // Respuesta general
    return `Entiendo tu consulta. Te puedo ayudar con:\n\n• 📋 Eventos disponibles y cómo postularte\n• 📊 Estado de tus postulaciones\n• 💰 Información sobre pagos\n• ⏰ Horarios y disponibilidad\n• 📝 Requisitos para diferentes posiciones\n\n¿Podrías darme más detalles sobre lo que necesitas saber?`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Chat de Soporte</h3>
            <p className="text-xs text-muted-foreground">Asistente Virtual • Siempre disponible</p>
          </div>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} max-w-[70%]`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()} size="icon" className="bg-primary hover:bg-primary/90">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Presiona Enter para enviar • Shift + Enter para nueva línea
        </p>
      </div>
    </Card>
  )
}
