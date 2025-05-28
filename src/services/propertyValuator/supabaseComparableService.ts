
import { supabase } from "@/integrations/supabase/client";
import { ComparableProperty, PropertyInfo } from "./types";
import { findZoneByName } from "./zoneMappingService";

// Interface for Idealista Valladolid table data
interface IdealistaProperty {
  "Descripción": string;
  "Precio": string;
  "URL_ingresadas": string;
  "URL": string;
  "Titulo": string;
  "Timestamp": string;
  "Característica_3": string;
  "Característica_2": string;
  "Característica_1": string;
}

// Function to extract numeric value from price string
function extractPrice(priceString: string): number {
  console.log(`💰 Procesando precio: "${priceString}"`);
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  const normalizedPrice = cleanPrice.replace(',', '.');
  const price = parseFloat(normalizedPrice) || 0;
  console.log(`💰 Precio extraído: ${price}`);
  return price;
}

// Function to extract surface area from characteristics
function extractSurfaceArea(characteristics: string[]): number {
  console.log(`📏 Buscando superficie en: ${JSON.stringify(characteristics)}`);
  for (const char of characteristics) {
    const match = char.match(/(\d+)\s*m²/i);
    if (match) {
      const surface = parseInt(match[1], 10);
      console.log(`📏 Superficie encontrada: ${surface}m²`);
      return surface;
    }
  }
  console.log(`📏 No se encontró superficie`);
  return 0;
}

// Function to extract number of rooms from characteristics
function extractRooms(characteristics: string[]): number {
  for (const char of characteristics) {
    const match = char.match(/(\d+)\s*(habitación|dormitorio|hab\.)/i);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  return 0;
}

// Function to determine if property has elevator from characteristics
function hasElevator(characteristics: string[]): boolean {
  return characteristics.some(char => 
    char.toLowerCase().includes('ascensor') || 
    char.toLowerCase().includes('elevador')
  );
}

// Function to determine if property is exterior from characteristics
function isExterior(characteristics: string[]): boolean {
  return characteristics.some(char => 
    char.toLowerCase().includes('exterior') || 
    char.toLowerCase().includes('luminoso')
  );
}

// NUEVA FUNCIÓN: Extraer zona de Idealista desde múltiples fuentes
function extractZone(property: IdealistaProperty): string | null {
  const textToSearch = [
    property["Descripción"] || "",
    property["Titulo"] || "",
    property["Característica_1"] || "",
    property["Característica_2"] || "",
    property["Característica_3"] || ""
  ].join(" ");
  
  console.log(`🏙️ EXTRACTOR DE ZONA: Analizando propiedad con título: "${property["Titulo"]}"`);
  console.log(`🏙️ Descripción: "${property["Descripción"]?.substring(0, 100)}..."`);
  
  // Buscar por nombres de zonas en título y descripción
  const zone = findZoneByName(textToSearch);
  if (zone) {
    console.log(`🏙️ ✅ ÉXITO - Zona encontrada: ${zone}`);
    return zone;
  }
  
  console.log(`🏙️ ❌ FALLO - No se pudo extraer zona`);
  return null;
}

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

    // Log muestra de datos para debugging
    console.log("📋 === MUESTRA DE DATOS ===");
    properties.slice(0, 5).forEach((prop, index) => {
      console.log(`📋 Propiedad ${index + 1}:`);
      console.log(`    Título: "${prop["Titulo"]}"`);
      console.log(`    Precio: "${prop["Precio"]}"`);
      console.log(`    Características: [${prop["Característica_1"]}, ${prop["Característica_2"]}, ${prop["Característica_3"]}]`);
    });

    // Procesar y filtrar propiedades
    console.log("\n🏠 === PROCESANDO PROPIEDADES POR ZONA ===");
    
    let validadas = 0;
    let rechazadas_precio = 0;
    let rechazadas_superficie = 0;
    let rechazadas_zona = 0;
    
    const comparables: ComparableProperty[] = properties
      .map((property: IdealistaProperty, index: number) => {
        console.log(`\n🏠 [${index + 1}/${properties.length}] Procesando: "${property["Titulo"]}"`);
        
        const characteristics = [
          property["Característica_1"] || "",
          property["Característica_2"] || "",
          property["Característica_3"] || ""
        ].filter(char => char.trim() !== "");

        const price = extractPrice(property["Precio"]);
        const surface = extractSurfaceArea(characteristics);
        const rooms = extractRooms(characteristics);
        const extractedZone = extractZone(property);

        // Validaciones paso a paso
        if (price === 0) {
          console.log(`❌ [${index + 1}] RECHAZADA: precio inválido (${property["Precio"]})`);
          rechazadas_precio++;
          return null;
        }

        if (surface === 0) {
          console.log(`❌ [${index + 1}] RECHAZADA: superficie inválida`);
          rechazadas_superficie++;
          return null;
        }

        if (extractedZone !== propertyInfo.zona_idealista) {
          console.log(`❌ [${index + 1}] RECHAZADA: Zona "${extractedZone}" ≠ "${propertyInfo.zona_idealista}"`);
          rechazadas_zona++;
          return null;
        }

        console.log(`✅ [${index + 1}] VALIDADA: Zona ${extractedZone}, €${price}, ${surface}m²`);
        validadas++;

        return {
          fuente: "idealista.com",
          url: property["URL"] || property["URL_ingresadas"] || "#",
          zona_idealista: extractedZone,
          distrito: extractedZone, // Usamos la zona como distrito temporalmente
          superficie_m2: surface,
          habitaciones: rooms || 1,
          precio: price,
          precio_m2: Math.round(price / surface),
          ascensor: hasElevator(characteristics),
          exterior: isExterior(characteristics),
          estado_conservacion: "buen-estado",
          planta: "intermedia"
        };
      })
      .filter((comparable): comparable is ComparableProperty => comparable !== null);

    // Estadísticas finales
    console.log("\n📊 === ESTADÍSTICAS FINALES ===");
    console.log(`📊 Propiedades procesadas: ${properties.length}`);
    console.log(`✅ Validadas: ${validadas}`);
    console.log(`❌ Rechazadas por precio: ${rechazadas_precio}`);
    console.log(`❌ Rechazadas por superficie: ${rechazadas_superficie}`);
    console.log(`❌ Rechazadas por zona: ${rechazadas_zona}`);
    console.log(`🎯 RESULTADO PARA ZONA ${propertyInfo.zona_idealista}: ${comparables.length} propiedades`);
    
    if (comparables.length === 0) {
      console.log(`⚠️ === DIAGNÓSTICO: NO HAY COMPARABLES ===`);
      console.log(`⚠️ Zona objetivo: ${propertyInfo.zona_idealista}`);
      
      // Analizar qué zonas SÍ están disponibles
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
      
      return [];
    }

    // Filtrar precios extremos
    const filteredComparables = comparables.filter(comparable => {
      const validPrice = comparable.precio_m2 >= 500 && comparable.precio_m2 <= 20000;
      if (!validPrice) {
        console.log(`🔧 Filtrada por precio extremo: €${comparable.precio_m2}/m²`);
      }
      return validPrice;
    });

    console.log(`🔧 Después de filtrar precios extremos: ${filteredComparables.length} propiedades`);
    
    // Ordenar y limitar resultado
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
