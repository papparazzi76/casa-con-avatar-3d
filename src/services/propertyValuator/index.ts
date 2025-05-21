import { PropertyInfo, PropertyValuation } from "./types";
import { getComparableProperties } from "./comparableService";
import { getOpenAIValuation } from "./openaiService";
import { generateFallbackValuation } from "./fallbackService";
import { toast } from "sonner";

// Main function to get property valuation
export async function getPropertyValuation(
  propertyInfo: PropertyInfo
): Promise<PropertyValuation> {
  try {
    // 1. Get comparable properties (in a real version, this would be a scraper or API)
    const comparables = await getComparableProperties(propertyInfo);
    
    // If no comparables, return specific message
    if (comparables.length === 0) {
      return {
        status: "ok",
        sin_comparables: "No se encontraron viviendas similares"
      };
    }

    // 2. Get valuation from OpenAI
    try {
      const valuation = await getOpenAIValuation(propertyInfo, comparables);
      
      // If missing data, return directly
      if (valuation.faltan_datos) {
        return {
          status: "faltan_datos",
          faltan_datos: valuation.faltan_datos
        };
      }
      
      // If no comparables, return message
      if (valuation.sin_comparables) {
        return {
          status: "ok",
          sin_comparables: valuation.sin_comparables
        };
      }
      
      // Otherwise, return the complete valuation
      return {
        status: "ok",
        vivienda_objetivo: {
          direccion: propertyInfo.direccion || "No especificada",
          distrito: propertyInfo.distrito,
          tipo: propertyInfo.tipo_vivienda,
          superficie_m2: propertyInfo.superficie_m2
        },
        valoracion: valuation.valoracion,
        estadisticas_comparables: valuation.estadisticas_comparables,
        comparables_destacados: valuation.comparables_destacados,
        fecha_calculo: valuation.fecha_calculo || new Date().toISOString().split('T')[0],
        metodologia_breve: valuation.metodologia_breve || "Media y mediana de precio/m² en anuncios activos con ajustes de estado, planta y antigüedad.",
        disclaimer: valuation.disclaimer || "Estimación orientativa basada en ofertas publicadas. No sustituye a una tasación oficial."
      };
    } catch (parseError) {
      console.error("Error with OpenAI valuation:", parseError);
      
      // If there's an error with OpenAI, use the fallback valuation
      return generateFallbackValuation(propertyInfo, comparables);
    }
  } catch (error) {
    console.error("Error valuing property:", error);
    toast.error("Hubo un error al valorar la propiedad. Por favor, inténtalo de nuevo.");
    
    // Return an error format
    return {
      status: "faltan_datos",
      faltan_datos: ["Error en el servidor: no se pudo procesar la valoración"],
      disclaimer: "Este contenido tiene carácter meramente informativo y no constituye asesoramiento profesional."
    };
  }
}

// Re-export types for use elsewhere
export * from "./types";
