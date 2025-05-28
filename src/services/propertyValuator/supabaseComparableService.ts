
import { supabase } from "@/integrations/supabase/client";
import { ComparableProperty, PropertyInfo } from "./types";

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

// Function to extract postal code from description or characteristics
function extractPostalCode(property: IdealistaProperty): string | null {
  const textToSearch = [
    property["Descripción"] || "",
    property["Titulo"] || "",
    property["Característica_1"] || "",
    property["Característica_2"] || "",
    property["Característica_3"] || ""
  ].join(" ");
  
  console.log(`📮 Buscando código postal en: "${textToSearch.substring(0, 100)}..."`);
  
  // Look for Valladolid postal codes (47001-47017, 47153)
  const postalCodeMatch = textToSearch.match(/\b(47001|47002|47003|47004|47005|47006|47007|47008|47009|47010|47011|47012|47013|47014|47015|47016|47017|47153)\b/);
  const extractedCode = postalCodeMatch ? postalCodeMatch[1] : null;
  
  if (extractedCode) {
    console.log(`📮 Código postal extraído: ${extractedCode}`);
  } else {
    console.log(`📮 No se encontró código postal válido`);
  }
  
  return extractedCode;
}

// Function to get real comparable properties from Supabase - filtered by postal code
export async function getRealComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  try {
    console.log("🔗 INICIANDO CONEXIÓN A SUPABASE");
    console.log("🔍 Buscando propiedades en la tabla 'Idealista Valladolid' para CP:", propertyInfo.codigo_postal);
    
    // Test the Supabase connection first
    console.log("🔗 Verificando conexión a Supabase...");
    
    // Fetch all properties from Idealista Valladolid table
    const { data: properties, error } = await supabase
      .from('Idealista Valladolid')
      .select('*')
      .limit(1000); // Increased limit to get more data

    console.log("🔗 Respuesta de Supabase recibida");

    if (error) {
      console.error("❌ ERROR EN SUPABASE:", error);
      console.error("❌ Código de error:", error.code);
      console.error("❌ Mensaje:", error.message);
      console.error("❌ Detalles:", error.details);
      return [];
    }

    if (!properties) {
      console.log("⚠️ Supabase devolvió null en lugar de un array");
      return [];
    }

    if (properties.length === 0) {
      console.log("⚠️ La tabla 'Idealista Valladolid' está vacía");
      return [];
    }

    console.log(`📊 ÉXITO: Encontradas ${properties.length} propiedades en la tabla Supabase`);

    // Log sample of data for debugging
    console.log("📋 Muestra de los primeros 3 registros:");
    properties.slice(0, 3).forEach((prop, index) => {
      console.log(`Registro ${index + 1}:`, {
        precio: prop["Precio"],
        caracteristicas: [prop["Característica_1"], prop["Característica_2"], prop["Característica_3"]],
        descripcion: prop["Descripción"]?.substring(0, 100) + "..."
      });
    });

    // Convert Supabase data to ComparableProperty format and filter by postal code
    const comparables: ComparableProperty[] = properties
      .map((property: IdealistaProperty, index: number) => {
        console.log(`\n🏠 Procesando propiedad ${index + 1}/${properties.length}`);
        
        const characteristics = [
          property["Característica_1"] || "",
          property["Característica_2"] || "",
          property["Característica_3"] || ""
        ].filter(char => char.trim() !== "");

        const price = extractPrice(property["Precio"]);
        const surface = extractSurfaceArea(characteristics);
        const rooms = extractRooms(characteristics);
        const extractedPostalCode = extractPostalCode(property);

        // Only skip properties with completely invalid data
        if (price === 0) {
          console.log(`❌ Propiedad ${index + 1} omitida: precio inválido`);
          return null;
        }

        if (surface === 0) {
          console.log(`❌ Propiedad ${index + 1} omitida: superficie inválida`);
          return null;
        }

        // Only include properties from the same postal code
        if (extractedPostalCode !== propertyInfo.codigo_postal) {
          console.log(`❌ Propiedad ${index + 1} omitida: CP ${extractedPostalCode} no coincide con ${propertyInfo.codigo_postal}`);
          return null;
        }

        console.log(`✅ Propiedad ${index + 1} VÁLIDA: CP ${extractedPostalCode}, €${price}, ${surface}m²`);

        return {
          fuente: "idealista.com",
          url: property["URL"] || property["URL_ingresadas"] || "#",
          codigo_postal: extractedPostalCode,
          distrito: propertyInfo.distrito,
          superficie_m2: surface,
          habitaciones: rooms || 1, // Default to 1 if can't extract
          precio: price,
          precio_m2: Math.round(price / surface),
          ascensor: hasElevator(characteristics),
          exterior: isExterior(characteristics),
          estado_conservacion: "buen-estado", // Default value
          planta: "intermedia" // Default value
        };
      })
      .filter((comparable): comparable is ComparableProperty => comparable !== null);

    console.log(`\n🎯 RESULTADO FINAL: ${comparables.length} propiedades válidas para CP ${propertyInfo.codigo_postal}`);
    
    if (comparables.length === 0) {
      console.log(`⚠️ No se encontraron propiedades válidas para el código postal ${propertyInfo.codigo_postal}`);
      
      // Let's check what postal codes we do have in the database
      console.log("🔍 Analizando códigos postales disponibles en la base de datos...");
      const postalCodesInDB = properties
        .map(prop => extractPostalCode(prop))
        .filter(Boolean)
        .filter((code, index, arr) => arr.indexOf(code) === index)
        .sort();
      
      console.log("📍 Códigos postales encontrados en BD:", postalCodesInDB);
      console.log("📍 Total de códigos postales únicos:", postalCodesInDB.length);
      
      return [];
    }

    // Basic price validation to avoid outliers
    const filteredComparables = comparables.filter(comparable => {
      const validPrice = comparable.precio_m2 >= 500 && comparable.precio_m2 <= 20000;
      if (!validPrice) {
        console.log(`❌ Propiedad filtrada por precio/m² extremo: €${comparable.precio_m2}/m²`);
      }
      return validPrice;
    });

    console.log(`✨ Después de validación: ${filteredComparables.length} propiedades válidas para CP ${propertyInfo.codigo_postal}`);
    
    // Sort by price per m2 for consistency and return top 20
    const finalResult = filteredComparables
      .sort((a, b) => a.precio_m2 - b.precio_m2)
      .slice(0, 20);

    console.log(`🏆 RESULTADO DEFINITIVO: ${finalResult.length} propiedades para valoración`);
    
    return finalResult;

  } catch (error) {
    console.error("💥 ERROR CRÍTICO en getRealComparableProperties:", error);
    console.error("💥 Tipo de error:", typeof error);
    console.error("💥 Stack trace:", error instanceof Error ? error.stack : 'No stack available');
    return [];
  }
}
