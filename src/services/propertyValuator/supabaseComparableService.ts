
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
  // Remove all non-numeric characters except dots and commas
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  // Replace comma with dot for decimal parsing
  const normalizedPrice = cleanPrice.replace(',', '.');
  return parseFloat(normalizedPrice) || 0;
}

// Function to extract surface area from characteristics
function extractSurfaceArea(characteristics: string[]): number {
  for (const char of characteristics) {
    const match = char.match(/(\d+)\s*m²/i);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
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

// Function to get real comparable properties from Supabase
export async function getRealComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  try {
    console.log("Buscando propiedades reales en Supabase para:", propertyInfo);
    
    // Fetch all properties from Idealista Valladolid table
    const { data: properties, error } = await supabase
      .from('Idealista Valladolid')
      .select('*')
      .limit(50); // Limit to avoid too many results

    if (error) {
      console.error("Error fetching properties from Supabase:", error);
      return [];
    }

    if (!properties || properties.length === 0) {
      console.log("No properties found in Supabase table");
      return [];
    }

    console.log(`Found ${properties.length} properties in Supabase`);

    // Convert Supabase data to ComparableProperty format
    const comparables: ComparableProperty[] = properties
      .map((property: IdealistaProperty) => {
        const characteristics = [
          property["Característica_1"] || "",
          property["Característica_2"] || "",
          property["Característica_3"] || ""
        ].filter(char => char.trim() !== "");

        const price = extractPrice(property["Precio"]);
        const surface = extractSurfaceArea(characteristics);
        const rooms = extractRooms(characteristics);

        // Skip properties with invalid data
        if (price === 0 || surface === 0) {
          return null;
        }

        return {
          fuente: "idealista.com",
          url: property["URL"] || property["URL_ingresadas"] || "#",
          codigo_postal: propertyInfo.codigo_postal, // Assume same postal code
          distrito: propertyInfo.distrito,
          superficie_m2: surface,
          habitaciones: rooms || propertyInfo.habitaciones, // Fallback to target property rooms
          precio: price,
          precio_m2: Math.round(price / surface),
          ascensor: hasElevator(characteristics),
          exterior: isExterior(characteristics),
          estado_conservacion: "buen-estado", // Default value
          planta: "intermedia" // Default value
        };
      })
      .filter((comparable): comparable is ComparableProperty => comparable !== null);

    // Filter comparables that are similar to the target property
    const filteredComparables = comparables.filter(comparable => {
      const surfaceDiff = Math.abs(comparable.superficie_m2 - propertyInfo.superficie_m2) / propertyInfo.superficie_m2;
      const roomsDiff = Math.abs(comparable.habitaciones - propertyInfo.habitaciones);
      
      // Include properties with similar surface (±30%) and same or ±1 room
      return surfaceDiff <= 0.3 && roomsDiff <= 1;
    });

    console.log(`Filtered to ${filteredComparables.length} comparable properties`);
    
    // Sort by similarity (surface area difference) and return top 10
    return filteredComparables
      .sort((a, b) => {
        const diffA = Math.abs(a.superficie_m2 - propertyInfo.superficie_m2);
        const diffB = Math.abs(b.superficie_m2 - propertyInfo.superficie_m2);
        return diffA - diffB;
      })
      .slice(0, 10);

  } catch (error) {
    console.error("Error in getRealComparableProperties:", error);
    return [];
  }
}
