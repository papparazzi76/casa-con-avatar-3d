
import { ComparableProperty, PropertyInfo } from "./types";
import { isValidZone } from "./zoneMappingService";
import { getRealComparableProperties } from "./supabaseComparableService";

// Function to get comparable properties data using REAL data from Supabase
// Now includes ALL properties from same zone regardless of characteristics
export async function getComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  console.log("Buscando TODAS las propiedades comparables de la misma zona:", propertyInfo);
  
  // Verificar que la zona es válida de Idealista
  if (!isValidZone(propertyInfo.zona_idealista)) {
    console.log(`Zona no válida para Idealista: ${propertyInfo.zona_idealista}`);
    return [];
  }

  console.log(`Zona válida de Idealista: ${propertyInfo.zona_idealista}`);
  
  // Get ALL real comparable properties from Supabase for the same zone
  const realComparables = await getRealComparableProperties(propertyInfo);
  
  if (realComparables.length === 0) {
    console.log(`No se encontraron propiedades en zona ${propertyInfo.zona_idealista}`);
    return [];
  }
  
  console.log(`Encontradas ${realComparables.length} propiedades en zona ${propertyInfo.zona_idealista} (sin filtros por características)`);
  return realComparables;
}
