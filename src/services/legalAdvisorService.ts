
import { toast } from "sonner";

export interface LegalQuestion {
  question: string;
  context?: string;
}

export interface LegalAnswer {
  status: "ok" | "faltan_datos";
  question: string;
  answer?: {
    resumen: string;
    analisis_detallado: string;
    normativa_aplicable: {
      norma: string;
      articulo: string;
      publicacion: string;
      enlace_boe?: string;
    }[];
    jurisprudencia_destacada?: {
      sentencia: string;
      fecha: string;
      resumen_fallo: string;
      enlace_cendoj?: string;
    }[];
    pasos_practicos: string[];
  };
  faltan_datos?: string[];
  fecha_actualizacion: string;
  disclaimer: string;
}

export async function getLegalAdvice(
  questionData: LegalQuestion
): Promise<LegalAnswer> {
  try {
    // The system prompt is provided in the first message, then the user query follows
    const systemPrompt = `Eres un **asistente jurídico-inmobiliario** especializado en el ordenamiento español.  
Tu cometido exclusivo es responder, con rigor y lenguaje claro, cualquier consulta legal relacionada con el sector inmobiliario (compraventa, arrendamientos, propiedad horizontal, urbanismo, fiscalidad inmobiliaria, registral, hipotecario, etc.) conforme a la legislación **vigente en España** y la última jurisprudencia relevante.`;

    const userQuery = JSON.stringify(questionData, null, 2);

    // Make API call to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ""}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userQuery
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al procesar la consulta legal");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al procesar la consulta legal:", error);
    toast.error("Hubo un error al procesar tu consulta legal. Por favor, inténtalo de nuevo.");
    
    // Return a formatted error
    return {
      status: "faltan_datos",
      question: questionData.question,
      faltan_datos: ["Error en el servidor: no se pudo procesar la consulta"],
      fecha_actualizacion: new Date().toISOString().split('T')[0],
      disclaimer: "Este contenido tiene carácter meramente informativo y no constituye asesoramiento jurídico profesional."
    };
  }
}
