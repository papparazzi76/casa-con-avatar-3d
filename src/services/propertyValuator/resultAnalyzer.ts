
import { ComparableProperty } from "./types";
import { extractZone, IdealistaProperty } from "./propertyTransformer";

export interface ProcessingStats {
  validadas: number;
  rechazadas_precio: number;
  rechazadas_superficie: number;
  rechazadas_zona: number;
}

// Function to analyze available zones in the database
export function analyzeAvailableZones(properties: IdealistaProperty[]): Map<string, number> {
  console.log("🔍 Analizando zonas disponibles...");
  const zonesFound = new Map<string, number>();
  
  properties.forEach(prop => {
    const zone = extractZone(prop);
    if (zone) {
      zonesFound.set(zone, (zonesFound.get(zone) || 0) + 1);
    }
  });
  
  console.log("🏙️ Zonas disponibles en BD:");
  Array.from(zonesFound.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([zone, count]) => {
      console.log(`   ${zone}: ${count} propiedades`);
    });
  
  return zonesFound;
}

// Function to filter extreme prices from comparables
export function filterExtremePrices(comparables: ComparableProperty[]): ComparableProperty[] {
  const filteredComparables = comparables.filter(comparable => {
    const validPrice = comparable.precio_m2 >= 500 && comparable.precio_m2 <= 20000;
    if (!validPrice) {
      console.log(`🔧 Filtrada por precio extremo: €${comparable.precio_m2}/m²`);
    }
    return validPrice;
  });

  console.log(`🔧 Después de filtrar precios extremos: ${filteredComparables.length} propiedades`);
  return filteredComparables;
}

// Function to print processing statistics
export function printProcessingStats(
  totalProperties: number,
  stats: ProcessingStats,
  targetZone: string,
  finalCount: number
): void {
  console.log("\n📊 === ESTADÍSTICAS FINALES ===");
  console.log(`📊 Propiedades procesadas: ${totalProperties}`);
  console.log(`✅ Validadas: ${stats.validadas}`);
  console.log(`❌ Rechazadas por precio: ${stats.rechazadas_precio}`);
  console.log(`❌ Rechazadas por superficie: ${stats.rechazadas_superficie}`);
  console.log(`❌ Rechazadas por zona: ${stats.rechazadas_zona}`);
  console.log(`🎯 RESULTADO PARA ZONA ${targetZone}: ${finalCount} propiedades`);
}
