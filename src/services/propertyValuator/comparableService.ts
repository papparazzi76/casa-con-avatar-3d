
import { ComparableProperty, PropertyInfo } from "./types";

// Function to get comparable properties data (mock for now)
// In a real implementation, this would connect with an API or scraper
export async function getComparableProperties(propertyInfo: PropertyInfo): Promise<ComparableProperty[]> {
  // This is a mock function that generates example properties
  // In a real version, it would connect with a scraper or API
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate realistic comparable properties based on strict criteria
  const basePrice = calculateBasePriceByLocation(propertyInfo.localidad, propertyInfo.distrito);
  const basePriceM2 = basePrice;
  
  const sources = ["idealista", "fotocasa", "pisos"];
  const comparables: ComparableProperty[] = [];
  
  // Generate between 8-15 comparables that meet strict criteria
  const numComparables = 8 + Math.floor(Math.random() * 8);
  
  for (let i = 0; i < numComparables; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    // Apply strict filtering criteria
    const comparable = generateQualityComparable(propertyInfo, basePriceM2, source, i);
    
    // Only add if it meets all quality criteria
    if (comparable && isValidComparable(comparable, propertyInfo)) {
      comparables.push(comparable);
    }
  }
  
  // Ensure we have at least 5 quality comparables
  if (comparables.length < 5) {
    // Generate additional comparables with slightly relaxed criteria if needed
    const additionalCount = 5 - comparables.length;
    for (let i = 0; i < additionalCount; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const comparable = generateQualityComparable(propertyInfo, basePriceM2, source, i + 100, true);
      if (comparable) {
        comparables.push(comparable);
      }
    }
  }
  
  return comparables.slice(0, 15); // Max 15 comparables
}

function calculateBasePriceByLocation(localidad: string, distrito: string): number {
  // Realistic price ranges based on Spanish cities and districts
  const cityPrices: Record<string, number> = {
    'madrid': 4500,
    'barcelona': 4200,
    'valencia': 2100,
    'sevilla': 1800,
    'zaragoza': 1600,
    'málaga': 2800,
    'murcia': 1400,
    'palma': 3200,
    'las palmas': 2000,
    'bilbao': 3800,
    'alicante': 2200,
    'córdoba': 1300,
    'valladolid': 1500,
    'vigo': 1700,
    'gijón': 1900,
    'hospitalet': 3200,
    'vitoria': 2800,
    'granada': 1600,
    'oviedo': 2100,
    'badalona': 2900
  };
  
  const normalizedCity = localidad.toLowerCase();
  let basePrice = cityPrices[normalizedCity] || 2000; // Default price
  
  // District modifiers (premium districts get higher prices)
  const premiumDistricts = ['centro', 'salamanca', 'retiro', 'chamberí', 'chamberi', 'eixample', 'sant gervasi', 'pedralbes'];
  const budgetDistricts = ['vallecas', 'carabanchel', 'usera', 'villaverde', 'nou barris', 'sant andreu'];
  
  const normalizedDistrict = distrito.toLowerCase();
  
  if (premiumDistricts.some(premium => normalizedDistrict.includes(premium))) {
    basePrice *= 1.4; // 40% increase for premium districts
  } else if (budgetDistricts.some(budget => normalizedDistrict.includes(budget))) {
    basePrice *= 0.7; // 30% decrease for budget districts
  }
  
  return basePrice;
}

function generateQualityComparable(
  propertyInfo: PropertyInfo, 
  basePriceM2: number, 
  source: string, 
  index: number,
  relaxed: boolean = false
): ComparableProperty | null {
  
  // Surface area criteria: ±10% (or ±15% if relaxed)
  const surfaceVariation = relaxed ? 0.15 : 0.10;
  const minSurface = propertyInfo.superficie_m2 * (1 - surfaceVariation);
  const maxSurface = propertyInfo.superficie_m2 * (1 + surfaceVariation);
  const surfaceM2 = Math.round(minSurface + Math.random() * (maxSurface - minSurface));
  
  // Room count must match exactly (or ±1 if relaxed)
  let rooms = propertyInfo.habitaciones;
  if (relaxed && Math.random() > 0.7) {
    rooms += Math.random() > 0.5 ? 1 : -1;
    rooms = Math.max(1, rooms); // Minimum 1 room
  }
  
  // Price variation based on condition, floor, etc.
  let priceM2Variation = 1.0;
  
  // Condition adjustments
  const conditions = ['muy_bueno', 'bueno', 'para_reformar'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  if (condition === 'muy_bueno' && propertyInfo.estado_conservacion !== 'muy_bueno') {
    priceM2Variation *= 1.05;
  } else if (condition === 'para_reformar' && propertyInfo.estado_conservacion !== 'para_reformar') {
    priceM2Variation *= 0.90;
  }
  
  // Floor adjustments
  const hasElevator = propertyInfo.ascensor;
  let floor = propertyInfo.planta;
  
  // If property has elevator, comparable should also have elevator
  if (hasElevator) {
    // Generate floors between 1-8 for buildings with elevator
    const floors = ['1', '2', '3', '4', '5', '6', '7', '8'];
    floor = floors[Math.floor(Math.random() * floors.length)];
  } else {
    // For properties without elevator, limit to lower floors
    const floors = ['bajo', '1', '2', '3'];
    floor = floors[Math.floor(Math.random() * floors.length)];
    
    if (parseInt(floor) > 2) {
      priceM2Variation *= 0.95; // Slight discount for higher floors without elevator
    }
  }
  
  // Exterior/interior adjustment
  if (propertyInfo.exterior && Math.random() > 0.3) {
    priceM2Variation *= 1.03; // Slight premium for exterior
  }
  
  // Year of construction adjustment
  const yearDiff = Math.abs(new Date().getFullYear() - propertyInfo.anno_construccion);
  if (yearDiff < 10) {
    priceM2Variation *= 1.08; // New construction premium
  } else if (yearDiff > 50) {
    priceM2Variation *= 0.92; // Old construction discount
  }
  
  // Apply market variation (±8%)
  priceM2Variation *= (0.92 + Math.random() * 0.16);
  
  const finalPriceM2 = Math.round(basePriceM2 * priceM2Variation);
  const totalPrice = Math.round(surfaceM2 * finalPriceM2);
  
  // Generate realistic URLs
  const propertyId = Math.floor(10000000 + Math.random() * 90000000);
  const urls = {
    'idealista': `https://www.idealista.com/inmueble/${propertyId}/`,
    'fotocasa': `https://www.fotocasa.es/es/comprar/vivienda/${propertyInfo.localidad}/${propertyInfo.distrito}/inmueble-${propertyId}`,
    'pisos': `https://www.pisos.com/vivienda/piso-${propertyInfo.distrito}-${propertyId}/`
  };
  
  return {
    fuente: source,
    url: urls[source as keyof typeof urls],
    superficie_m2: surfaceM2,
    precio: totalPrice,
    precio_m2: finalPriceM2,
    distancia_m: propertyInfo.direccion ? Math.round(50 + Math.random() * 800) : undefined // 50m to 850m distance
  };
}

function isValidComparable(comparable: ComparableProperty, propertyInfo: PropertyInfo): boolean {
  // Surface area validation: ±10%
  const surfaceVariation = 0.10;
  const minSurface = propertyInfo.superficie_m2 * (1 - surfaceVariation);
  const maxSurface = propertyInfo.superficie_m2 * (1 + surfaceVariation);
  
  if (comparable.superficie_m2 < minSurface || comparable.superficie_m2 > maxSurface) {
    return false;
  }
  
  // Price validation: reasonable price per m2 (not too extreme)
  if (comparable.precio_m2 < 800 || comparable.precio_m2 > 12000) {
    return false;
  }
  
  // Distance validation: must be within reasonable distance if location provided
  if (comparable.distancia_m && comparable.distancia_m > 1000) {
    return false;
  }
  
  return true;
}
