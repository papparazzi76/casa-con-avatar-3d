
import { ComparableProperty, PropertyInfo } from "./types";
import { getPostalCodeInfo, isValidPostalCode } from "./postalCodeService";
import { getBasePriceM2 } from "./pricingDataService";
import { generateStrictComparable } from "./comparableGenerator";
import { isStrictlyValid } from "./comparableValidator";

// Function to get comparable properties data with STRICT real criteria
export async function getComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  console.log("Buscando comparables para:", propertyInfo);
  
  // Verificar que el código postal existe en nuestra base de datos
  if (!isValidPostalCode(propertyInfo.codigo_postal)) {
    console.log(`Código postal no válido: ${propertyInfo.codigo_postal}`);
    return [];
  }

  // Obtener información del código postal
  const postalCodeInfo = getPostalCodeInfo(propertyInfo.codigo_postal);
  if (!postalCodeInfo) {
    console.log(`No hay información para el código postal: ${propertyInfo.codigo_postal}`);
    return [];
  }

  console.log(`Código postal válido: ${propertyInfo.codigo_postal} - ${postalCodeInfo.localidad}, ${postalCodeInfo.distrito || postalCodeInfo.provincia}`);
  
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Get base price for the exact postal code
  const basePriceM2 = getBasePriceM2(propertyInfo.codigo_postal);
  
  if (!basePriceM2) {
    console.log(`No hay datos de precios para el código postal: ${propertyInfo.codigo_postal}`);
    return []; // No comparables if we don't have real data for this postal code
  }
  
  const sources = ["idealista.com", "fotocasa.es", "pisos.com"];
  const comparables: ComparableProperty[] = [];
  
  // Generate between 6-12 highly realistic comparables with EXACT criteria
  const numComparables = 6 + Math.floor(Math.random() * 7);
  
  for (let i = 0; i < numComparables; i++) {
    const comparable = generateStrictComparable(propertyInfo, basePriceM2, sources[i % 3], i, postalCodeInfo);
    
    if (comparable && isStrictlyValid(comparable, propertyInfo)) {
      comparables.push(comparable);
    }
  }
  
  console.log(`Generados ${comparables.length} comparables válidos para CP ${propertyInfo.codigo_postal} en ${postalCodeInfo.localidad}, ${postalCodeInfo.distrito || postalCodeInfo.provincia}`);
  return comparables.slice(0, 10); // Max 10 comparables
}
