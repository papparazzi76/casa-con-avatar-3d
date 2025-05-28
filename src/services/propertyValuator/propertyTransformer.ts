
import { ComparableProperty } from "./types";
import { extractPrice, extractSurfaceArea, extractRooms, hasElevator, isExterior } from "./dataExtractors";
import { findZoneByName } from "./zoneMappingService";

// Interface for Idealista Valladolid table data
export interface IdealistaProperty {
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

// Function to extract zone from multiple property fields
export function extractZone(property: IdealistaProperty): string | null {
  const textToSearch = [
    property["Descripción"] || "",
    property["Titulo"] || "",
    property["Característica_1"] || "",
    property["Característica_2"] || "",
    property["Característica_3"] || ""
  ].join(" ");
  
  console.log(`🏙️ EXTRACTOR DE ZONA: Analizando propiedad con título: "${property["Titulo"]}"`);
  console.log(`🏙️ Descripción: "${property["Descripción"]?.substring(0, 100)}..."`);
  
  const zone = findZoneByName(textToSearch);
  if (zone) {
    console.log(`🏙️ ✅ ÉXITO - Zona encontrada: ${zone}`);
    return zone;
  }
  
  console.log(`🏙️ ❌ FALLO - No se pudo extraer zona`);
  return null;
}

// Function to transform raw property data to ComparableProperty
export function transformToComparable(
  property: IdealistaProperty, 
  index: number,
  targetZone: string
): ComparableProperty | null {
  console.log(`\n🏠 [${index + 1}] Procesando: "${property["Titulo"]}"`);
  
  const characteristics = [
    property["Característica_1"] || "",
    property["Característica_2"] || "",
    property["Característica_3"] || ""
  ].filter(char => char.trim() !== "");

  const price = extractPrice(property["Precio"]);
  const surface = extractSurfaceArea(characteristics);
  const rooms = extractRooms(characteristics);
  const extractedZone = extractZone(property);

  // Validations
  if (price === 0) {
    console.log(`❌ [${index + 1}] RECHAZADA: precio inválido (${property["Precio"]})`);
    return null;
  }

  if (surface === 0) {
    console.log(`❌ [${index + 1}] RECHAZADA: superficie inválida`);
    return null;
  }

  if (extractedZone !== targetZone) {
    console.log(`❌ [${index + 1}] RECHAZADA: Zona "${extractedZone}" ≠ "${targetZone}"`);
    return null;
  }

  console.log(`✅ [${index + 1}] VALIDADA: Zona ${extractedZone}, €${price}, ${surface}m²`);

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
}
