
import { PropertyInfo, PropertyValuation } from "./types";
import { getComparableProperties } from "./comparableService";
import { getOpenAIValuation } from "./openaiService";
import { generateFallbackValuation } from "./fallbackService";
import { getPostalCodeInfo, isValidPostalCode } from "./postalCodeService";
import { toast } from "sonner";

// Main function to get property valuation
export async function getPropertyValuation(
  propertyInfo: PropertyInfo
): Promise<PropertyValuation> {
  try {
    console.log("Iniciando valoración para:", propertyInfo);
    
    // Validar código postal antes de proceder
    if (!isValidPostalCode(propertyInfo.codigo_postal)) {
      return {
        status: "faltan_datos",
        faltan_datos: [`El código postal ${propertyInfo.codigo_postal} no es válido o no está en nuestra base de datos`],
        disclaimer: "Por favor, verifica que el código postal sea correcto."
      };
    }

    // Obtener información del código postal
    const postalCodeInfo = getPostalCodeInfo(propertyInfo.codigo_postal);
    const ubicacionCompleta = postalCodeInfo 
      ? `${postalCodeInfo.localidad}, ${postalCodeInfo.distrito || postalCodeInfo.provincia}, ${postalCodeInfo.comunidad_autonoma}`
      : `${propertyInfo.localidad}, ${propertyInfo.distrito}`;
    
    // 1. Get comparable properties with strict criteria
    const comparables = await getComparableProperties(propertyInfo);
    
    // If no comparables, return specific message
    if (comparables.length === 0) {
      return {
        status: "ok",
        sin_comparables: `No se encontraron viviendas similares en el código postal ${propertyInfo.codigo_postal} (${ubicacionCompleta}) con las características exactas requeridas (mismo distrito, superficie ±10%, ${propertyInfo.habitaciones} habitaciones, ${propertyInfo.ascensor ? 'con' : 'sin'} ascensor).`
      };
    }

    console.log(`Encontrados ${comparables.length} comparables válidos en ${ubicacionCompleta}`);

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
          codigo_postal: propertyInfo.codigo_postal,
          tipo: propertyInfo.tipo_vivienda,
          superficie_m2: propertyInfo.superficie_m2,
          ubicacion_completa: ubicacionCompleta
        },
        valoracion: valuation.valoracion,
        estadisticas_comparables: valuation.estadisticas_comparables,
        comparables_destacados: valuation.comparables_destacados,
        fecha_calculo: valuation.fecha_calculo || new Date().toISOString().split('T')[0],
        metodologia_breve: valuation.metodologia_breve || `Valoración basada en ${comparables.length} comparables reales del código postal ${propertyInfo.codigo_postal} (${ubicacionCompleta}), mismo distrito, superficie ±10%, mismas habitaciones (${propertyInfo.habitaciones}) y mismo ascensor (${propertyInfo.ascensor ? 'Sí' : 'No'}).`,
        disclaimer: valuation.disclaimer || `Estimación basada en comparables reales verificados del código postal ${propertyInfo.codigo_postal} en ${ubicacionCompleta}. No sustituye a una tasación oficial.`
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
export * from "./postalCodeService";
