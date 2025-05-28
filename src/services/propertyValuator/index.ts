import { PropertyInfo, PropertyValuation } from "./types";
import { getComparableProperties } from "./comparableService";
import { getOpenAIValuation } from "./openaiService";
import { generateFallbackValuation } from "./fallbackService";
import { isValidZone } from "./zoneMappingService";
import { toast } from "sonner";

// Main function to get property valuation
export async function getPropertyValuation(
  propertyInfo: PropertyInfo
): Promise<PropertyValuation> {
  try {
    console.log("🏠 =================================");
    console.log("🏠 VALORACIÓN CON ZONAS IDEALISTA");
    console.log("🏠 =================================");
    console.log("🏠 Datos de entrada:", JSON.stringify(propertyInfo, null, 2));
    
    // Validar zona antes de proceder
    if (!isValidZone(propertyInfo.zona_idealista)) {
      console.log(`❌ Zona no válida: ${propertyInfo.zona_idealista}`);
      const message = `La zona ${propertyInfo.zona_idealista} no es válida o no está en nuestra base de datos de zonas de Idealista Valladolid`;
      toast.error(message);
      return {
        status: "faltan_datos",
        faltan_datos: [message],
        disclaimer: "Por favor, selecciona una zona válida de Valladolid de las disponibles en el desplegable."
      };
    }

    const ubicacionCompleta = `${propertyInfo.zona_idealista}, ${propertyInfo.localidad}`;
    console.log(`📍 Ubicación completa: ${ubicacionCompleta}`);
    
    // 1. Get ALL comparable properties from same zone
    console.log(`🔍 PASO 1: Buscando propiedades en zona ${propertyInfo.zona_idealista}...`);
    const comparables = await getComparableProperties(propertyInfo);
    console.log(`🔍 PASO 1 COMPLETADO: ${comparables.length} propiedades encontradas`);
    
    // If no comparables, return specific message with debugging info
    if (comparables.length === 0) {
      console.log(`⚠️ ⚠️ ⚠️ NO SE ENCONTRARON PROPIEDADES ⚠️ ⚠️ ⚠️`);
      console.log(`⚠️ Zona buscada: ${propertyInfo.zona_idealista}`);
      console.log(`⚠️ Ubicación: ${ubicacionCompleta}`);
      
      const message = `No se encontraron propiedades en la zona ${propertyInfo.zona_idealista} (${ubicacionCompleta}).

🔍 **¿Qué hemos probado?**
• Búsqueda directa por zona de Idealista (${propertyInfo.zona_idealista})
• Análisis de ${ubicacionCompleta}

📋 **Revisa la consola del navegador (F12)** para ver:
• Qué zonas están disponibles en la base de datos
• Cómo se están extrayendo las zonas de cada propiedad
• Estadísticas detalladas del procesamiento

🎯 **Posibles soluciones:**
• Verifica que la zona ${propertyInfo.zona_idealista} sea correcta
• Prueba con otra zona de Valladolid
• Revisa los logs de la consola para diagnóstico técnico`;

      toast.warning("No se encontraron propiedades comparables");
      
      return {
        status: "ok",
        sin_comparables: message
      };
    }

    console.log(`✅ PASO 1 ÉXITO: ${comparables.length} propiedades encontradas para valoración`);

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
          zona_idealista: propertyInfo.zona_idealista,
          tipo: propertyInfo.tipo_vivienda,
          superficie_m2: propertyInfo.superficie_m2,
          ubicacion_completa: ubicacionCompleta
        },
        valoracion: valuation.valoracion,
        estadisticas_comparables: valuation.estadisticas_comparables,
        comparables_destacados: valuation.comparables_destacados,
        fecha_calculo: valuation.fecha_calculo || new Date().toISOString().split('T')[0],
        metodologia_breve: valuation.metodologia_breve || `Valoración basada en ${comparables.length} propiedades reales de la zona ${propertyInfo.zona_idealista} (${ubicacionCompleta}) obtenidas de Idealista.`,
        disclaimer: valuation.disclaimer || `Estimación basada en ${comparables.length} propiedades de Idealista de la zona ${propertyInfo.zona_idealista} en ${ubicacionCompleta}. No sustituye a una tasación oficial.`
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
export * from "./zoneMappingService";
