
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
        sin_comparables: "No se encontraron viviendas similares con los criterios de calidad requeridos"
      };
    }

    // Build the prompt for valuation with quality criteria
    const systemPrompt = `Eres un **asistente de valoración inmobiliaria profesional** para España.  
Tu tarea es estimar el precio de mercado de una vivienda basándote en **comparables verificados y filtrados** que cumplen criterios estrictos de calidad.

────────────────────────────────────────────
📝 1. INFORMACIÓN NECESARIA DEL USUARIO  
Si algún dato falta, detén el proceso y responde **exclusivamente** con  
\`\`\`json
{ "faltan_datos": ["campo1", "campo2", …] }
\`\`\`

────────────────────────────────────────────
🔬 2. CRITERIOS DE CALIDAD DE COMPARABLES APLICADOS

Los comparables proporcionados YA han sido filtrados con estos criterios:
• **Ubicación**: Mismo barrio/distrito que la vivienda objetivo
• **Superficie**: ±10% de la superficie de la vivienda objetivo  
• **Habitaciones**: Mismo número de habitaciones (±1 en casos excepcionales)
• **Ascensor**: Solo comparables con ascensor si la vivienda objetivo lo tiene
• **Distancia**: Máximo 1km de distancia de la vivienda objetivo
• **Enlaces verificados**: URLs activas de portales inmobiliarios reales

────────────────────────────────────────────
🔬 3. MÉTODO DE VALORACIÓN MEJORADO

Análisis de comparables pre-filtrados:
• Los comparables ya están filtrados por calidad y similitud
• Calcula media aritmética, mediana y desviación estándar de precio_m2
• Aplica peso mayor a comparables más similares en características

Ajustes específicos:
• +3% si vivienda objetivo reformada vs comparables sin reformar
• -3% si falta ascensor cuando >50% comparables lo tienen
• ±2% por planta (premium para plantas intermedias)
• ±3% por antigüedad vs mediana de comparables
• ±2% por orientación/exterior vs interior

Valoración final:
• precio_min = (mediana - 0.8 × desviación) × superficie_m2
• precio_max = (mediana + 0.8 × desviación) × superficie_m2  
• precio_sugerido = mediana × superficie_m2 ± ajustes específicos
• confianza = "alta" si n ≥ 8 y desviación/mediana < 12%; "media" si n ≥ 5; "baja" en otro caso

────────────────────────────────────────────
📊 4. FORMATO DE RESPUESTA REQUERIDO

Responde EXCLUSIVAMENTE con un JSON válido con esta estructura:
\`\`\`json
{
  "valoracion": {
    "precio_min": number,
    "precio_max": number, 
    "precio_sugerido": number,
    "precio_m2_sugerido": number,
    "confianza": "alta" | "media" | "baja"
  },
  "estadisticas_comparables": {
    "n": number,
    "media_precio_m2": number,
    "mediana_precio_m2": number,
    "desviacion_estandar_m2": number
  },
  "comparables_destacados": [...primeros 6 comparables...],
  "fecha_calculo": "YYYY-MM-DD",
  "metodologia_breve": "string explicando criterios aplicados",
  "disclaimer": "string con limitaciones de la valoración"
}
\`\`\``;

    const userQuery = JSON.stringify({
      vivienda: propertyInfo,
      comparables_filtrados: comparables,
      nota: "Los comparables han sido pre-filtrados aplicando criterios de calidad: mismo distrito, superficie ±10%, habitaciones similares, ascensor coincidente si aplica, y distancia máxima 1km."
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
        temperature: 0.3, // Lower temperature for more consistent results
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
      const result = JSON.parse(content);
      
      // Add quality indicator to methodology
      if (result.metodologia_breve) {
        result.metodologia_breve += " Comparables verificados y filtrados por criterios de calidad estrictos.";
      }
      
      return result;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError, content);
      throw parseError;
    }
  } catch (error) {
    console.error("Error getting OpenAI valuation:", error);
    throw error;
  }
}
