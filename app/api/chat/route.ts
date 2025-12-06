import { NextRequest, NextResponse } from "next/server"

// Esta API route maneja las solicitudes de chat con el LLM
// Para producción, integra con servicios como OpenAI, Anthropic Claude, etc.

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatRequest {
  messages: Message[]
  applicantName?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { messages, applicantName = "Usuario" } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron mensajes" },
        { status: 400 }
      )
    }

    // Obtener el último mensaje del usuario
    const lastUserMessage = messages[messages.length - 1]

    // OPCIÓN 1: Integración con OpenAI (descomentar y configurar API key)
    /*
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Eres un asistente virtual de Staff-CursorCafe, una plataforma de gestión de personal para eventos.

            Tu rol es ayudar a los postulantes con:
            - Información sobre eventos disponibles
            - Estado de sus postulaciones
            - Requisitos y condiciones de trabajo
            - Dudas sobre pagos y horarios
            - Cualquier otra consulta relacionada con la plataforma

            Sé profesional, amable y conciso en tus respuestas.
            El usuario se llama ${applicantName}.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error("Error al comunicarse con OpenAI")
    }

    const openaiData = await openaiResponse.json()
    const assistantMessage = openaiData.choices[0].message.content

    return NextResponse.json({
      message: assistantMessage,
      model: "gpt-4",
    })
    */

    // OPCIÓN 2: Integración con Anthropic Claude (descomentar y configurar API key)
    /*
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        system: `Eres un asistente virtual de Staff-CursorCafe, una plataforma de gestión de personal para eventos.

        Tu rol es ayudar a los postulantes con:
        - Información sobre eventos disponibles
        - Estado de sus postulaciones
        - Requisitos y condiciones de trabajo
        - Dudas sobre pagos y horarios
        - Cualquier otra consulta relacionada con la plataforma

        Sé profesional, amable y conciso en tus respuestas.
        El usuario se llama ${applicantName}.`,
        messages: messages.map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        })),
      }),
    })

    if (!anthropicResponse.ok) {
      throw new Error("Error al comunicarse con Claude")
    }

    const anthropicData = await anthropicResponse.json()
    const assistantMessage = anthropicData.content[0].text

    return NextResponse.json({
      message: assistantMessage,
      model: "claude-3-sonnet",
    })
    */

    // OPCIÓN 3: Respuestas locales inteligentes (implementación actual)
    const assistantMessage = generateLocalResponse(lastUserMessage.content, applicantName)

    return NextResponse.json({
      message: assistantMessage,
      model: "local",
      note: "Usando respuestas locales. Configura OPENAI_API_KEY o ANTHROPIC_API_KEY para usar un LLM real.",
    })
  } catch (error) {
    console.error("Error en API de chat:", error)
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        message: "Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo.",
      },
      { status: 500 }
    )
  }
}

// Función de respuestas locales inteligentes
function generateLocalResponse(input: string, applicantName: string): string {
  const lowerInput = input.toLowerCase()

  // Contexto de la plataforma
  const platformContext = {
    events: [
      {
        name: "Lanzamiento Nike",
        location: "Centro Comercial Downtown",
        date: "15 Dic 2025",
        positions: [
          { title: "Promotor", rate: 25 },
          { title: "Modelo", rate: 40 },
          { title: "Embajador", rate: 35 },
        ],
      },
      {
        name: "Evento Corporativo XYZ",
        location: "Hotel Grand Plaza",
        date: "18 Dic 2025",
        positions: [{ title: "Personal de Soporte", rate: 18 }],
      },
    ],
  }

  // Respuestas basadas en palabras clave
  if (lowerInput.includes("hola") || lowerInput.includes("buenos") || lowerInput.includes("saludos")) {
    return `¡Hola ${applicantName}! 👋 Bienvenido/a al chat de soporte de Staff-CursorCafe. Estoy aquí para ayudarte con cualquier consulta sobre eventos, postulaciones, pagos y más. ¿En qué puedo asistirte hoy?`
  }

  if (lowerInput.includes("evento") || lowerInput.includes("trabajo") || lowerInput.includes("disponible")) {
    const eventsList = platformContext.events
      .map(
        (event) =>
          `\n📍 **${event.name}**\n- Ubicación: ${event.location}\n- Fecha: ${event.date}\n- Posiciones: ${event.positions.map((p) => `${p.title} (€${p.rate}/h)`).join(", ")}`
      )
      .join("\n")

    return `Actualmente tenemos estos eventos disponibles:${eventsList}\n\n¿Te interesa algún evento en particular? Puedo darte más detalles sobre cualquiera de ellos.`
  }

  if (
    lowerInput.includes("postulación") ||
    lowerInput.includes("postularme") ||
    lowerInput.includes("aplicación") ||
    lowerInput.includes("aplicar")
  ) {
    return `Para postularte a un evento:\n\n1. **Completa tu perfil** con toda tu información\n2. **Busca eventos** en la sección de trabajos disponibles\n3. **Haz clic en "Postularse"** en el evento que te interese\n4. **Espera la respuesta** de la empresa (24-48 horas)\n\n¿Necesitas ayuda con algún paso específico del proceso?`
  }

  if (lowerInput.includes("estado") || lowerInput.includes("status") || lowerInput.includes("seguimiento")) {
    return `Para revisar el estado de tus postulaciones:\n\n📊 **Estados posibles:**\n• ⏳ **Pendiente** - La empresa está revisando tu perfil\n• ✅ **Aprobado** - ¡Felicitaciones! Fuiste seleccionado/a\n• ❌ **Rechazado** - No fuiste seleccionado/a esta vez\n• 🎉 **Completado** - Trabajo finalizado exitosamente\n\nPuedes ver todas tus postulaciones en tu perfil, sección "Mis Aplicaciones". ¿Te gustaría que te explique algo más?`
  }

  if (lowerInput.includes("pago") || lowerInput.includes("cobrar") || lowerInput.includes("dinero") || lowerInput.includes("salario")) {
    return `Información sobre pagos:\n\n💰 **Sistema de pagos:**\n- Los pagos se procesan **7-10 días** después de completar el trabajo\n- Transferencia bancaria directa a tu cuenta\n- Debes tener tus datos bancarios actualizados\n\n📋 **Para recibir tu pago:**\n1. Completa todas las horas asignadas\n2. Espera la confirmación de la empresa\n3. El pago se procesará automáticamente\n\n💳 **Consultar pagos:**\nRevisa la sección "Mis Pagos" en tu perfil para ver el historial completo.\n\n¿Tienes alguna consulta específica sobre un pago?`
  }

  if (lowerInput.includes("requisito") || lowerInput.includes("necesito") || lowerInput.includes("condición")) {
    return `Requisitos generales para trabajar con nosotros:\n\n✅ **Requisitos básicos:**\n• Mayor de 18 años\n• Documento de identidad válido\n• Disponibilidad en las fechas del evento\n• Actitud profesional y responsable\n\n📱 **Documentación:**\n• Perfil completo con foto reciente\n• Datos de contacto actualizados\n• Referencias laborales (opcional pero recomendado)\n\n👔 **Requisitos por posición:**\n• **Promotor:** Buena comunicación, energía, carisma\n• **Modelo:** Portfolio profesional, medidas específicas\n• **Embajador:** Experiencia en ventas/marketing\n• **Personal de Soporte:** Experiencia en eventos\n\n¿Necesitas información sobre alguna posición específica?`
  }

  if (lowerInput.includes("horario") || lowerInput.includes("hora") || lowerInput.includes("cuándo") || lowerInput.includes("tiempo")) {
    return `Información sobre horarios:\n\n🕐 **Jornadas de trabajo:**\n- Típicamente entre **4-8 horas** por evento\n- Turnos mañana, tarde o jornada completa\n- Horarios flexibles según el evento\n\n📅 **Programación:**\n- Recibes notificación con **48 horas** de anticipación\n- Debes confirmar asistencia **24 horas antes**\n- Puedes ver tu calendario en el perfil\n\n⏰ **Puntualidad:**\n- Llega **15 minutos antes** del inicio\n- La impuntualidad afecta tu calificación\n- Avisar con anticipación si hay algún imprevisto\n\n¿Necesitas saber los horarios de un evento específico?`
  }

  if (
    lowerInput.includes("cancelar") ||
    lowerInput.includes("no puedo") ||
    lowerInput.includes("imprevisto") ||
    lowerInput.includes("problema")
  ) {
    return `Si tienes un imprevisto:\n\n⚠️ **Cancelación de postulación:**\n- Contacta a la empresa **lo antes posible**\n- Usa el chat del evento o el teléfono de contacto\n- Las cancelaciones de último momento afectan tu rating\n\n📞 **Canales de comunicación:**\n- Chat interno de la plataforma\n- Email: soporte@staffcursorcafe.com\n- WhatsApp: +34 600 123 456\n\n💡 **Recomendación:**\nSiempre es mejor avisar con anticipación. Tu profesionalismo es tu mejor carta de presentación.\n\n¿Necesitas ayuda con algo más?`
  }

  if (
    lowerInput.includes("perfil") ||
    lowerInput.includes("cuenta") ||
    lowerInput.includes("información") ||
    lowerInput.includes("datos")
  ) {
    return `Gestión de tu perfil:\n\n👤 **Completar perfil:**\n- Foto profesional reciente\n- Información de contacto actualizada\n- Experiencia laboral\n- Habilidades y certificaciones\n- Referencias (opcional)\n\n✏️ **Editar perfil:**\n1. Ve a tu perfil de usuario\n2. Haz clic en "Editar perfil"\n3. Actualiza la información necesaria\n4. Guarda los cambios\n\n⭐ **Mejora tu perfil:**\n- Añade experiencia relevante\n- Sube fotos profesionales\n- Mantén tus datos actualizados\n- Acumula buenas evaluaciones\n\n¿Necesitas ayuda para completar alguna sección?`
  }

  if (
    lowerInput.includes("evaluación") ||
    lowerInput.includes("rating") ||
    lowerInput.includes("calificación") ||
    lowerInput.includes("reseña")
  ) {
    return `Sistema de evaluaciones:\n\n⭐ **Cómo funcionan:**\n- Las empresas te evalúan después de cada trabajo\n- Escala de 1 a 5 estrellas\n- Incluyen comentarios sobre tu desempeño\n\n📊 **Tu rating:**\n- Visible en tu perfil público\n- Promedio de todas tus evaluaciones\n- Mejora tus oportunidades laborales\n\n✅ **Obtener buenas evaluaciones:**\n• Puntualidad\n• Profesionalismo\n• Buena actitud\n• Cumplir con todas las tareas\n• Seguir instrucciones\n\nTu rating actual aparece en tu perfil. ¡Sigue trabajando bien para mantenerlo alto!`
  }

  if (lowerInput.includes("contacto") || lowerInput.includes("ayuda") || lowerInput.includes("soporte")) {
    return `Canales de soporte:\n\n📧 **Email:**\nsoporte@staffcursorcafe.com\n(Respuesta en 24-48 horas)\n\n📱 **WhatsApp:**\n+34 600 123 456\n(Lun-Vie 9:00-18:00)\n\n💬 **Chat en vivo:**\nEstás usando el chat ahora mismo\n(Disponible 24/7)\n\n🌐 **Redes sociales:**\n- Instagram: @staffcursorcafe\n- LinkedIn: Staff CursorCafe\n\n¿Hay algo específico en lo que pueda ayudarte ahora?`
  }

  if (lowerInput.includes("gracias") || lowerInput.includes("thanks") || lowerInput.includes("ok") || lowerInput.includes("vale") || lowerInput.includes("bien")) {
    return `¡De nada, ${applicantName}! 😊 Ha sido un placer ayudarte.\n\nRecuerda que estoy disponible 24/7 para cualquier consulta que tengas. ¡Mucha suerte con tus postulaciones!\n\n¿Hay algo más en lo que pueda asistirte?`
  }

  // Respuesta general para consultas no categorizadas
  return `Entiendo tu consulta, ${applicantName}. Puedo ayudarte con:\n\n📋 **Temas principales:**\n• Eventos disponibles y cómo postularte\n• Estado de tus postulaciones\n• Información sobre pagos y facturación\n• Requisitos para diferentes posiciones\n• Horarios y calendario de eventos\n• Gestión de tu perfil\n• Sistema de evaluaciones\n\n¿Podrías darme más detalles sobre lo que necesitas? Así podré brindarte una respuesta más específica.`
}

// Endpoint GET para verificar que la API está funcionando
export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "Staff-CursorCafe Chat API",
    version: "1.0.0",
    message: "API de chat funcionando correctamente",
  })
}
