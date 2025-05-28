
import { supabase } from "@/integrations/supabase/client";
import { ComparableProperty, PropertyInfo } from "./types";
import { findPostalCodeByNeighborhood } from "./neighborhoodMappingService";

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
  // Remove all non-numeric characters except dots and commas
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  // Replace comma with dot for decimal parsing
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

// NUEVA FUNCIÓN MEJORADA: Extraer código postal desde múltiples fuentes
function extractPostalCode(property: IdealistaProperty): string | null {
  const textToSearch = [
    property["Descripción"] || "",
    property["Titulo"] || "",
    property["Característica_1"] || "",
    property["Característica_2"] || "",
    property["Característica_3"] || ""
  ].join(" ");
  
  console.log(`📮 NUEVO EXTRACTOR: Analizando propiedad con título: "${property["Titulo"]}"`);
  console.log(`📮 Descripción: "${property["Descripción"]?.substring(0, 100)}..."`);
  
  // ESTRATEGIA 1: Buscar códigos postales explícitos (47001-47017, 47153)
  const postalCodeMatch = textToSearch.match(/\b(47001|47002|47003|47004|47005|47006|47007|47008|47009|47010|47011|47012|47013|47014|47015|47016|47017|47153)\b/);
  if (postalCodeMatch) {
    console.log(`📮 ✅ ÉXITO - Código postal explícito encontrado: ${postalCodeMatch[1]}`);
    return postalCodeMatch[1];
  }
  
  // ESTRATEGIA 2: Buscar por nombres de barrios en título y descripción
  const neighborhoodCode = findPostalCodeByNeighborhood(textToSearch);
  if (neighborhoodCode) {
    console.log(`📮 ✅ ÉXITO - Código postal por barrio: ${neighborhoodCode}`);
    return neighborhoodCode;
  }
  
  console.log(`📮 ❌ FALLO - No se pudo extraer código postal`);
  return null;
}

// Function to get real comparable properties from Supabase - filtered by postal code
export async function getRealComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  try {
    console.log("🔗 ==========================================");
    console.log("🔗 INICIANDO BÚSQUEDA MEJORADA EN SUPABASE");
    console.log("🔗 ==========================================");
    console.log("🔍 Código postal objetivo:", propertyInfo.codigo_postal);
    
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
    console.log("\n🏠 === PROCESANDO PROPIEDADES ===");
    
    let validadas = 0;
    let rechazadas_precio = 0;
    let rechazadas_superficie = 0;
    let rechazadas_cp = 0;
    
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
        const extractedPostalCode = extractPostalCode(property);

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

        if (extractedPostalCode !== propertyInfo.codigo_postal) {
          console.log(`❌ [${index + 1}] RECHAZADA: CP "${extractedPostalCode}" ≠ "${propertyInfo.codigo_postal}"`);
          rechazadas_cp++;
          return null;
        }

        console.log(`✅ [${index + 1}] VALIDADA: CP ${extractedPostalCode}, €${price}, ${surface}m²`);
        validadas++;

        return {
          fuente: "idealista.com",
          url: property["URL"] || property["URL_ingresadas"] || "#",
          codigo_postal: extractedPostalCode,
          distrito: propertyInfo.distrito,
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
    console.log(`❌ Rechazadas por código postal: ${rechazadas_cp}`);
    console.log(`🎯 RESULTADO PARA CP ${propertyInfo.codigo_postal}: ${comparables.length} propiedades`);
    
    if (comparables.length === 0) {
      console.log(`⚠️ === DIAGNÓSTICO: NO HAY COMPARABLES ===`);
      console.log(`⚠️ CP objetivo: ${propertyInfo.codigo_postal}`);
      
      // Analizar qué códigos postales SÍ están disponibles
      console.log("🔍 Analizando códigos postales disponibles...");
      const postalCodesFound = new Map<string, number>();
      
      properties.forEach(prop => {
        const cp = extractPostalCode(prop);
        if (cp) {
          postalCodesFound.set(cp, (postalCodesFound.get(cp) || 0) + 1);
        }
      });
      
      console.log("📍 Códigos postales disponibles en BD:");
      Array.from(postalCodesFound.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([cp, count]) => {
          console.log(`   ${cp}: ${count} propiedades`);
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

    console.log(`🏆 RESULTADO DEFINITIVO: ${finalResult.length} propiedades para valoración en CP ${propertyInfo.codigo_postal}`);
    
    return finalResult;

  } catch (error) {
    console.error("💥 ERROR CRÍTICO en getRealComparableProperties:", error);
    return [];
  }
}
