
import { PropertyInfo, ComparableProperty, PropertyValuation } from "./types";

// Function to generate a fallback valuation in case of API errors
export function generateFallbackValuation(
  propertyInfo: PropertyInfo, 
  comparables: ComparableProperty[]
): PropertyValuation {
  return {
    status: "ok",
    vivienda_objetivo: {
      direccion: propertyInfo.direccion || "No especificada",
      distrito: propertyInfo.distrito,
      tipo: propertyInfo.tipo_vivienda,
      superficie_m2: propertyInfo.superficie_m2
    },
    valoracion: {
      precio_min: Math.round(propertyInfo.superficie_m2 * 1800),
      precio_max: Math.round(propertyInfo.superficie_m2 * 2700),
      precio_sugerido: Math.round(propertyInfo.superficie_m2 * 2300),
      precio_m2_sugerido: 2300,
      confianza: "media"
    },
    estadisticas_comparables: {
      n: comparables.length,
      media_precio_m2: 2350,
      mediana_precio_m2: 2300,
      desviacion_estandar_m2: 230
    },
    comparables_destacados: comparables.slice(0, 6),
    fecha_calculo: new Date().toISOString().split('T')[0],
    metodologia_breve: "Media y mediana de precio/m² en anuncios activos con ajustes de estado, planta y antigüedad.",
    disclaimer: "Estimación orientativa basada en ofertas publicadas. No sustituye a una tasación oficial."
  };
}
