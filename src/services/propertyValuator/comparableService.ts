
import { ComparableProperty, PropertyInfo } from "./types";

// Function to get comparable properties data (mock for now)
// In a real implementation, this would connect with an API or scraper
export async function getComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  // This is a mock function that generates example properties
  // In a real version, it would connect with a scraper or API
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate some random comparable properties based on input data
  const basePrice = 2000 + Math.random() * 1000;
  const basePriceM2 = basePrice;
  const numComparables = 5 + Math.floor(Math.random() * 10); // Between 5 and 14 comparables
  
  const sources = ["idealista", "fotocasa", "pisos"];
  
  const comparables: ComparableProperty[] = [];
  
  for (let i = 0; i < numComparables; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const surfaceVariation = propertyInfo.superficie_m2 * (0.8 + Math.random() * 0.4); // ±20%
    const priceM2Variation = basePriceM2 * (0.8 + Math.random() * 0.4); // ±20%
    const totalPrice = Math.round(surfaceVariation * priceM2Variation);
    
    comparables.push({
      fuente: source,
      url: `https://www.${source}.com/inmueble/${i}`,
      superficie_m2: Math.round(surfaceVariation),
      precio: totalPrice,
      precio_m2: Math.round(totalPrice / surfaceVariation),
      distancia_m: propertyInfo.direccion ? Math.round(Math.random() * 1000) : undefined
    });
  }
  
  return comparables;
}
