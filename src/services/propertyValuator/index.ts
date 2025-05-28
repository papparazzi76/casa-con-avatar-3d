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
    console.log("🏠 =================================");
    console.log("🏠 INICIANDO VALORACIÓN COMPLETA");
    console.log("🏠 =================================");
    console.log("🏠 Datos de entrada:", JSON.stringify(propertyInfo, null, 2));
    
    // Validar código postal antes de proceder
    if (!isValidPostalCode(propertyInfo.codigo_postal)) {
      console.log(`❌ Código postal no válido: ${propertyInfo.codigo_postal}`);
      const message = `El código postal ${propertyInfo.codigo_postal} no es válido o no está en nuestra base de datos de Valladolid`;
      toast.error(message);
      return {
        status: "faltan_datos",
        faltan_datos: [message],
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
    console.log(`🔍 PASO 1: Buscando propiedades comparables en CP ${propertyInfo.codigo_postal}...`);
    const comparables = await getComparableProperties(propertyInfo);
    console.log(`🔍 PASO 1 COMPLETADO: ${comparables.length} propiedades encontradas`);
    
    // If no comparables, return specific message with debugging info
    if (comparables.length === 0) {
      console.log(`⚠️ ⚠️ ⚠️ NO SE ENCONTRARON PROPIEDADES ⚠️ ⚠️ ⚠️`);
      console.log(`⚠️ CP buscado: ${propertyInfo.codigo_postal}`);
      console.log(`⚠️ Ubicación: ${ubicacionCompleta}`);
      
      const message = `No se encontraron propiedades en el código postal ${propertyInfo.codigo_postal} (${ubicacionCompleta}) en nuestra base de datos de Idealista.

🔍 Posibles causas:
• No hay propiedades registradas para este código postal
• Las propiedades no tienen información suficiente (precio o superficie)
• Problema de conexión con la base de datos
• El código postal no coincide con los datos de Idealista

Por favor, verifica el código postal o prueba con uno diferente de Valladolid.

📋 Revisa la consola del navegador (F12) para más información técnica.`;

      toast.warning("No se encontraron propiedades comparables");
      
      return {
        status: "ok",
        sin_comparables: message
      };
    }

    console.log(`✅ PASO 1 ÉXITO: Encontradas ${comparables.length} propiedades en ${ubicacionCompleta} para la valoración`);

    // 2. Get valuation from OpenAI
    console.log(`🤖 PASO 2: Enviando a OpenAI para valoración...`);
    try {
      const valuation = await getOpenAIValuation(propertyInfo, comparables);
      console.log(`🤖 PASO 2 COMPLETADO: Valoración de OpenAI recibida`);
      
      // If missing data, return directly
      if (valuation.faltan_datos) {
        console.log(`📋 Faltan datos:`, valuation.faltan_datos);
        return {
          status: "faltan_datos",
          faltan_datos: valuation.faltan_datos
        };
      }
      
      // If no comparables, return message
      if (valuation.sin_comparables) {
        console.log(`📋 Sin comparables:`, valuation.sin_comparables);
        return {
          status: "ok",
          sin_comparables: valuation.sin_comparables
        };
      }
      
      console.log(`🎉 VALORACIÓN COMPLETADA EXITOSAMENTE`);
      console.log(`🎉 Precio sugerido: €${valuation.valoracion?.precio_sugerido}`);
      
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
      console.error("❌ ❌ ❌ ERROR CON OPENAI ❌ ❌ ❌", parseError);
      console.error("❌ Usando valoración de respaldo...");
      
      // If there's an error with OpenAI, use the fallback valuation
      const fallbackResult = generateFallbackValuation(propertyInfo, comparables);
      console.log(`🔄 Valoración de respaldo generada`);
      return fallbackResult;
    }
  } catch (error) {
    console.error("💥 💥 💥 ERROR CRÍTICO EN VALORACIÓN 💥 💥 💥");
    console.error("💥 Error:", error);
    console.error("💥 Tipo:", typeof error);
    console.error("💥 Stack:", error instanceof Error ? error.stack : 'No stack available');
    
    toast.error("Error crítico en el valorador. Revisa la consola para más detalles.");
    
    // Return an error format
    return {
      status: "faltan_datos",
      faltan_datos: ["Error crítico en el servidor. Revisa la consola del navegador (F12) para más información técnica."],
      disclaimer: "Este contenido tiene carácter meramente informativo y no constituye asesoramiento profesional."
    };
  }
}

// Re-export types for use elsewhere
export * from "./types";
export * from "./postalCodeService";
