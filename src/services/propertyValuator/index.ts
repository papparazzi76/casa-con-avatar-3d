
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
    console.log("🏠 Iniciando valoración para:", propertyInfo);
    
    // Validar código postal antes de proceder
    if (!isValidPostalCode(propertyInfo.codigo_postal)) {
      console.log(`❌ Código postal no válido: ${propertyInfo.codigo_postal}`);
      return {
        status: "faltan_datos",
        faltan_datos: [`El código postal ${propertyInfo.codigo_postal} no es válido o no está en nuestra base de datos de Valladolid`],
        disclaimer: "Por favor, verifica que el código postal sea de Valladolid (47001-47017, 47153)."
      };
    }

    // Obtener información del código postal
    const postalCodeInfo = getPostalCodeInfo(propertyInfo.codigo_postal);
    const ubicacionCompleta = postalCodeInfo 
      ? `${postalCodeInfo.localidad}, ${postalCodeInfo.distrito || postalCodeInfo.provincia}, ${postalCodeInfo.comunidad_autonoma}`
      : `${propertyInfo.localidad}, ${propertyInfo.distrito}`;
    
    console.log(`📍 Ubicación completa: ${ubicacionCompleta}`);
    
    // 1. Get ALL comparable properties from same postal code
    console.log(`🔍 Buscando propiedades comparables en CP ${propertyInfo.codigo_postal}...`);
    const comparables = await getComparableProperties(propertyInfo);
    
    // If no comparables, return specific message with debugging info
    if (comparables.length === 0) {
      console.log(`⚠️ No se encontraron propiedades en CP ${propertyInfo.codigo_postal}`);
      return {
        status: "ok",
        sin_comparables: `No se encontraron propiedades en el código postal ${propertyInfo.codigo_postal} (${ubicacionCompleta}) en nuestra base de datos de Idealista. 
        
Esto puede deberse a:
- No hay propiedades registradas para este código postal en la base de datos
- Las propiedades no tienen información suficiente (precio o superficie)
- El código postal no coincide exactamente con los datos de Idealista

Por favor, verifica el código postal o prueba con uno diferente de Valladolid.`
      };
    }

    console.log(`✅ Encontradas ${comparables.length} propiedades en ${ubicacionCompleta} para la valoración`);

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
        metodologia_breve: valuation.metodologia_breve || `Valoración basada en ${comparables.length} propiedades reales del código postal ${propertyInfo.codigo_postal} (${ubicacionCompleta}) obtenidas de Idealista.`,
        disclaimer: valuation.disclaimer || `Estimación basada en ${comparables.length} propiedades de Idealista del código postal ${propertyInfo.codigo_postal} en ${ubicacionCompleta}. No sustituye a una tasación oficial.`
      };
    } catch (parseError) {
      console.error("❌ Error with OpenAI valuation:", parseError);
      
      // If there's an error with OpenAI, use the fallback valuation
      return generateFallbackValuation(propertyInfo, comparables);
    }
  } catch (error) {
    console.error("💥 Error valuing property:", error);
    toast.error("Hubo un error al valorar la propiedad. Por favor, inténtalo de nuevo.");
    
    // Return an error format
    return {
      status: "faltan_datos",
      faltan_datos: ["Error en el servidor: no se pudo procesar la valoración. Revisa la consola del navegador para más detalles."],
      disclaimer: "Este contenido tiene carácter meramente informativo y no constituye asesoramiento profesional."
    };
  }
}

// Re-export types for use elsewhere
export * from "./types";
export * from "./postalCodeService";
