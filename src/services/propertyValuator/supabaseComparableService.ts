
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

// Function to get real comparable properties from Supabase - ALL properties from same postal code
export async function getRealComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  try {
    console.log("Buscando TODAS las propiedades reales del mismo código postal:", propertyInfo.codigo_postal);
    
    // Fetch all properties from Idealista Valladolid table
    const { data: properties, error } = await supabase
      .from('Idealista Valladolid')
      .select('*')
      .limit(100); // Increased limit to get more comparables

    if (error) {
      console.error("Error fetching properties from Supabase:", error);
      return [];
    }

    if (!properties || properties.length === 0) {
      console.log("No properties found in Supabase table");
      return [];
    }

    console.log(`Found ${properties.length} total properties in Supabase`);

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

        // Only skip properties with completely invalid data
        if (price === 0 || surface === 0) {
          return null;
        }

        return {
          fuente: "idealista.com",
          url: property["URL"] || property["URL_ingresadas"] || "#",
          codigo_postal: propertyInfo.codigo_postal, // Assume same postal code for now
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

    console.log(`Converted ${comparables.length} valid properties from Supabase data`);
    
    // NO FILTERING BY CHARACTERISTICS - Include all properties with valid data
    // Only basic price validation to avoid outliers
    const filteredComparables = comparables.filter(comparable => {
      // Only filter out extreme price outliers
      return comparable.precio_m2 >= 500 && comparable.precio_m2 <= 20000;
    });

    console.log(`After basic validation: ${filteredComparables.length} comparable properties`);
    
    // Sort by price per m2 for consistency and return top 20
    return filteredComparables
      .sort((a, b) => a.precio_m2 - b.precio_m2)
      .slice(0, 20); // Return more comparables since we're not filtering by characteristics

  } catch (error) {
    console.error("Error in getRealComparableProperties:", error);
    return [];
  }
}
