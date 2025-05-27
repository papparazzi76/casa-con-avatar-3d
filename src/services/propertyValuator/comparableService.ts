
import { ComparableProperty, PropertyInfo } from "./types";
import { getPostalCodeInfo, isValidPostalCode } from "./postalCodeService";
import { getRealComparableProperties } from "./supabaseComparableService";

// Function to get comparable properties data using REAL data from Supabase
export async function getComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  console.log("Buscando comparables para:", propertyInfo);
  
  // Verificar que el código postal es de Valladolid
  if (!isValidPostalCode(propertyInfo.codigo_postal)) {
    console.log(`Código postal no válido para Valladolid: ${propertyInfo.codigo_postal}`);
    return [];
  }

  // Obtener información del código postal
  const postalCodeInfo = getPostalCodeInfo(propertyInfo.codigo_postal);
  if (!postalCodeInfo) {
    console.log(`No hay información para el código postal: ${propertyInfo.codigo_postal}`);
    return [];
  }

  console.log(`Código postal válido de Valladolid: ${propertyInfo.codigo_postal} - ${postalCodeInfo.distrito}`);
  
  // Get real comparable properties from Supabase
  const realComparables = await getRealComparableProperties(propertyInfo);
  
  if (realComparables.length === 0) {
    console.log(`No se encontraron comparables reales para CP ${propertyInfo.codigo_postal}`);
    return [];
  }
  
  console.log(`Encontrados ${realComparables.length} comparables reales para CP ${propertyInfo.codigo_postal} en ${postalCodeInfo.distrito}`);
  return realComparables;
}
