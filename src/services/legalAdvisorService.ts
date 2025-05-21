
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

// API key constante (permanente)
const API_KEY = "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";

// Las funciones getApiKey y saveApiKey se mantienen por compatibilidad,
// pero ahora usaremos la API key constante
const getApiKey = (): string => {
  return API_KEY;
};

export const saveApiKey = (key: string): void => {
  // Esta función ya no almacena la clave en localStorage, pero se mantiene
  // para compatibilidad con el código existente
  toast.success("API key configurada correctamente.");
};

// Siempre retornamos true ya que tenemos una API key permanente
export const hasApiKey = (): boolean => {
  return true;
};

export async function getLegalAdvice(
  questionData: LegalQuestion
): Promise<LegalAnswer> {
  try {
    // Obtenemos la API key constante
    const apiKey = getApiKey();

    // The system prompt is provided in the first message, then the user query follows
    const systemPrompt = `Eres un **asistente jurídico-inmobiliario** especializado en el ordenamiento español.  
Tu cometido exclusivo es responder, con rigor y lenguaje claro, cualquier consulta legal relacionada con el sector inmobiliario (compraventa, arrendamientos, propiedad horizontal, urbanismo, fiscalidad inmobiliaria, registral, hipotecario, etc.) conforme a la legislación **vigente en España** y la última jurisprudencia relevante.

────────────────────────────
🔎 1. PROCEDIMIENTO GENERAL  
1. **Comprende la pregunta** y detecta si necesitas más contexto (-> inmueble, comunidad autónoma, fechas, valores, situación procesal, etc.).  
2. Si falta información esencial para una respuesta precisa, **detén la contestación** y responde **solo** con \`"faltan_datos": [ …campos ]\`.  
3. Cuando dispongas de datos suficientes, elabora la respuesta siguiendo el esquema del punto 2.

────────────────────────────
📑 2. FORMATO DE RESPUESTA (JSON)  
Devuelve SIEMPRE un único objeto JSON con la siguiente estructura:

{
  "status": "ok",                // o "faltan_datos"
  "question": "<pregunta original del usuario>",
  "answer": {
    "resumen": "<respuesta breve, 2-5 frases>",
    "analisis_detallado": "<explicación extensa y razonada>",
    "normativa_aplicable": [
      {
        "norma": "Ley / Real Decreto / Código Civil…",
        "articulo": "Art. ___",
        "publicacion": "BOE n.º ___, dd-mm-aaaa",
        "enlace_boe": "https://boe.es/…"
      }
      // uno o varios objetos
    ],
    "jurisprudencia_destacada": [
      {
        "sentencia": "STS n.º ___/aaaa, Sala ___",
        "fecha": "dd-mm-aaaa",
        "resumen_fallo": "…",
        "enlace_cendoj": "https://…"
      }
      // opcional
    ],
    "pasos_practicos": [
      "Paso 1…",
      "Paso 2…"
    ]
  },
  "fecha_actualizacion": "aaaa-mm-dd",
  "disclaimer": "Este contenido tiene carácter meramente informativo y no constituye asesoramiento jurídico profesional."
}

Reglas de formato:
- Usa comillas dobles y números sin separadores de miles.
- No incluyas Markdown ni HTML.
- Omite claves vacías.
- En enlace_boe y enlace_cendoj proporciona URLs oficiales cuando existan; si no, omítelas.

────────────────────────────
🗂️ 3. CRITERIOS DE ELABORACIÓN
• Basar la respuesta en normas estatales, autonómicas y europeas vigentes a la fecha de cálculo.
• Si la regulación difiere por comunidad autónoma, indicarlo.
• Referenciar siempre artículos concretos; no resumas leyes sin citar.
• Integrar los criterios doctrinales o jurisprudenciales más recientes cuando sean relevantes.
• Explicar términos técnicos en lenguaje accesible.
• Ser neutral: no tomar partido ni prometer resultados en procedimientos.
• Cerrar con la advertencia de que se recomienda contrastar la información con un profesional colegiado.`;

    const userQuery = JSON.stringify(questionData, null, 2);

    // Make API call to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
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
    
    try {
      // Parse the JSON response
      return JSON.parse(content);
    } catch (parseError) {
      console.error("Error al parsear la respuesta JSON:", parseError, content);
      throw new Error("La respuesta no tiene el formato JSON esperado");
    }
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
