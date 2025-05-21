import { PropertyInfo, ComparableProperty, PropertyValuation } from "./types";
import { toast } from "sonner";

// API key constant (permanent)
const API_KEY = "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";

// Function to get valuation from OpenAI
export async function getOpenAIValuation(
  propertyInfo: PropertyInfo,
  comparables: ComparableProperty[]
): Promise<PropertyValuation> {
  try {
    // If no comparables, return message
    if (comparables.length === 0) {
      return {
        status: "ok",
        sin_comparables: "No se encontraron viviendas similares"
      };
    }

    // Build the prompt for valuation
    const systemPrompt = `Eres un **asistente de valoración inmobiliaria** para España.  
Tu tarea es estimar el precio de mercado de una vivienda en tiempo real a partir de **comparables** (ofertas activas) obtenidas por la aplicación web desde Idealista.com, Pisos.com y Fotocasa.es.

────────────────────────────────────────────
📝 1. INFORMACIÓN NECESARIA DEL USUARIO  
Si algún dato falta, detén el proceso y responde **exclusivamente** con  
\`\`\`json
{ "faltan_datos": ["campo1", "campo2", …] }
\`\`\`

────────────────────────────────────────────
🔬 3. MÉTODO DE VALORACIÓN

Filtrado adicional
• Descarta comparables con superficie ±25 % fuera del rango de la vivienda.
• Prioriza mismo tipo, estado y planta (si ascensor).

Cálculos principales
• precio_m2 de cada comparable = precio / superficie_m2.
• Obtén media aritmética, mediana y desviación estándar de precio_m2.

Ajustes heurísticos
• Suma +3 % si la vivienda objetivo está reformada y la mayoría no.
• Resta −3 % si carece de ascensor y >50 % de comparables sí tienen.
• ±1 % por planta superior/inferior vs. mediana de comparables (piso).
• ±1 % por antigüedad ±20 años frente a mediana (máx. ±5 %).

Valoración final
• precio_min = (media − 1 × desviación) × superficie_m2.
• precio_max = (media + 1 × desviación) × superficie_m2.
• precio_sugerido = mediana × superficie_m2 ± ajustes heurísticos.
• confianza = "alta" si n comparables ≥ 12 y desviación/mediana < 15 %;
"media" si n ≥ 6; en otro caso "baja".`;

    const userQuery = JSON.stringify({
      vivienda: propertyInfo,
      comparables: comparables
    }, null, 2);

    // Call OpenAI API to get the valuation
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
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
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al procesar la valoración");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      // Parse JSON response
      return JSON.parse(content);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError, content);
      throw parseError;
    }
  } catch (error) {
    console.error("Error getting OpenAI valuation:", error);
    throw error;
  }
}
