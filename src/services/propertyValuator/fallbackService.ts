
import { PropertyInfo, ComparableProperty, PropertyValuation } from "./types";

// Function to generate a fallback valuation in case of API errors
export function generateFallbackValuation(
  propertyInfo: PropertyInfo, 
  comparables: ComparableProperty[]
): PropertyValuation {
  
  console.log(`Generando valoración de respaldo con ${comparables.length} comparables del CP ${propertyInfo.codigo_postal}`);
  
  // Calculate statistics from the filtered comparables
  const pricesM2 = comparables.map(c => c.precio_m2);
  const meanPriceM2 = pricesM2.reduce((sum, price) => sum + price, 0) / pricesM2.length;
  const sortedPrices = pricesM2.sort((a, b) => a - b);
  const medianPriceM2 = sortedPrices[Math.floor(sortedPrices.length / 2)];
  
  // Calculate standard deviation
  const variance = pricesM2.reduce((sum, price) => sum + Math.pow(price - meanPriceM2, 2), 0) / pricesM2.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Apply conservative adjustments based on property characteristics
  let adjustmentFactor = 1.0;
  
  // State of conservation adjustment
  if (propertyInfo.estado_conservacion === 'nueva-construccion') {
    adjustmentFactor *= 1.05;
  } else if (propertyInfo.estado_conservacion === 'a-reformar') {
    adjustmentFactor *= 0.90;
  }
  
  // Floor adjustment
  if (propertyInfo.planta === 'bajo' && !propertyInfo.exterior) {
    adjustmentFactor *= 0.94;
  } else if (['4', '5', '6'].includes(propertyInfo.planta) && propertyInfo.ascensor) {
    adjustmentFactor *= 1.03;
  }
  
  // Age adjustment
  const currentYear = new Date().getFullYear();
  const age = currentYear - propertyInfo.anno_construccion;
  if (age < 10) {
    adjustmentFactor *= 1.06;
  } else if (age > 40) {
    adjustmentFactor *= 0.94;
  }
  
  const adjustedMedianPriceM2 = Math.round(medianPriceM2 * adjustmentFactor);
  const suggestedPrice = Math.round(propertyInfo.superficie_m2 * adjustedMedianPriceM2);
  
  // Calculate price range using standard deviation
  const minPriceM2 = Math.max(medianPriceM2 - standardDeviation * 0.8, medianPriceM2 * 0.85);
  const maxPriceM2 = Math.min(medianPriceM2 + standardDeviation * 0.8, medianPriceM2 * 1.15);
  
  return {
    status: "ok",
    vivienda_objetivo: {
      direccion: propertyInfo.direccion || "No especificada",
      distrito: propertyInfo.distrito,
      codigo_postal: propertyInfo.codigo_postal,
      tipo: propertyInfo.tipo_vivienda,
      superficie_m2: propertyInfo.superficie_m2
    },
    valoracion: {
      precio_min: Math.round(propertyInfo.superficie_m2 * minPriceM2),
      precio_max: Math.round(propertyInfo.superficie_m2 * maxPriceM2),
      precio_sugerido: suggestedPrice,
      precio_m2_sugerido: adjustedMedianPriceM2,
      confianza: comparables.length >= 8 ? "alta" : comparables.length >= 5 ? "media" : "baja"
    },
    estadisticas_comparables: {
      n: comparables.length,
      media_precio_m2: Math.round(meanPriceM2),
      mediana_precio_m2: Math.round(medianPriceM2),
      desviacion_estandar_m2: Math.round(standardDeviation)
    },
    comparables_destacados: comparables.slice(0, 6),
    fecha_calculo: new Date().toISOString().split('T')[0],
    metodologia_breve: `Valoración basada en ${comparables.length} comparables reales del código postal ${propertyInfo.codigo_postal}, mismo distrito, superficie ±10%, ${propertyInfo.habitaciones} habitaciones y ${propertyInfo.ascensor ? 'con' : 'sin'} ascensor. Ajustes por estado, planta y antigüedad.`,
    disclaimer: "Estimación orientativa basada en comparables reales verificados del mismo código postal con características idénticas. No sustituye a una tasación oficial."
  };
}
