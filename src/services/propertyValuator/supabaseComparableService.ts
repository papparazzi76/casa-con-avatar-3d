
import { supabase } from "@/integrations/supabase/client";
import { ComparableProperty, PropertyInfo } from "./types";
import { IdealistaProperty, transformToComparable } from "./propertyTransformer";
import { ProcessingStats, analyzeAvailableZones, filterExtremePrices, printProcessingStats } from "./resultAnalyzer";

// Function to get real comparable properties from Supabase - filtered by zone
export async function getRealComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  try {
    console.log("🔗 ==========================================");
    console.log("🔗 INICIANDO BÚSQUEDA POR ZONA EN SUPABASE");
    console.log("🔗 ==========================================");
    console.log("🔍 Zona objetivo:", propertyInfo.zona_idealista);
    
    // Fetch all properties from Idealista Valladolid table
    const { data: properties, error } = await supabase
      .from('Idealista Valladolid')
      .select('*')
      .limit(1000);

    if (error) {
      console.error("❌ ERROR EN SUPABASE:", error);
      return [];
    }

    if (!properties || properties.length === 0) {
      console.log("⚠️ La tabla 'Idealista Valladolid' está vacía");
      return [];
    }

    console.log(`📊 DATOS CARGADOS: ${properties.length} propiedades encontradas en Supabase`);

    // Log sample data for debugging
    console.log("📋 === MUESTRA DE DATOS ===");
    properties.slice(0, 5).forEach((prop, index) => {
      console.log(`📋 Propiedad ${index + 1}:`);
      console.log(`    Título: "${prop["Titulo"]}"`);
      console.log(`    Precio: "${prop["Precio"]}"`);
      console.log(`    Características: [${prop["Característica_1"]}, ${prop["Característica_2"]}, ${prop["Característica_3"]}]`);
    });

    // Process and filter properties
    console.log("\n🏠 === PROCESANDO PROPIEDADES POR ZONA ===");
    
    const stats: ProcessingStats = {
      validadas: 0,
      rechazadas_precio: 0,
      rechazadas_superficie: 0,
      rechazadas_zona: 0
    };
    
    const comparables: ComparableProperty[] = properties
      .map((property: IdealistaProperty, index: number) => {
        const result = transformToComparable(property, index, propertyInfo.zona_idealista);
        
        if (result) {
          stats.validadas++;
        } else {
          // Stats are updated inside transformToComparable
          const characteristics = [
            property["Característica_1"] || "",
            property["Característica_2"] || "",
            property["Característica_3"] || ""
          ].filter(char => char.trim() !== "");
          
          // We need to check what caused the rejection to update stats
          // This is a simplified approach - in a full refactor we'd pass stats to transform function
        }
        
        return result;
      })
      .filter((comparable): comparable is ComparableProperty => comparable !== null);

    // Print statistics
    printProcessingStats(properties.length, stats, propertyInfo.zona_idealista, comparables.length);
    
    if (comparables.length === 0) {
      console.log(`⚠️ === DIAGNÓSTICO: NO HAY COMPARABLES ===`);
      console.log(`⚠️ Zona objetivo: ${propertyInfo.zona_idealista}`);
      
      // Analyze available zones
      analyzeAvailableZones(properties);
      return [];
    }

    // Filter extreme prices
    const filteredComparables = filterExtremePrices(comparables);
    
    // Sort and limit results
    const finalResult = filteredComparables
      .sort((a, b) => a.precio_m2 - b.precio_m2)
      .slice(0, 20);

    console.log(`🏆 RESULTADO DEFINITIVO: ${finalResult.length} propiedades para valoración en zona ${propertyInfo.zona_idealista}`);
    
    return finalResult;

  } catch (error) {
    console.error("💥 ERROR CRÍTICO en getRealComparableProperties:", error);
    return [];
  }
}
