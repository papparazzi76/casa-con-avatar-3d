
import { ComparableProperty, PropertyInfo } from "./types";

export function isStrictlyValid(comparable: ComparableProperty, propertyInfo: PropertyInfo): boolean {
  // VALIDACIÓN ESTRICTA: Zona Idealista EXACTA
  if (comparable.zona_idealista !== propertyInfo.zona_idealista) {
    return false;
  }
  
  // VALIDACIÓN ESTRICTA: Distrito EXACTO
  if (comparable.distrito !== propertyInfo.distrito) {
    return false;
  }
  
  // VALIDACIÓN ESTRICTA: Superficie ±10% máximo
  const surfaceVariation = 0.10;
  const minSurface = propertyInfo.superficie_m2 * (1 - surfaceVariation);
  const maxSurface = propertyInfo.superficie_m2 * (1 + surfaceVariation);
  
  if (comparable.superficie_m2 < minSurface || comparable.superficie_m2 > maxSurface) {
    return false;
  }
  
  // VALIDACIÓN ESTRICTA: Habitaciones EXACTAS
  if (comparable.habitaciones !== propertyInfo.habitaciones) {
    return false;
  }
  
  // VALIDACIÓN ESTRICTA: Ascensor EXACTO
  if (comparable.ascensor !== propertyInfo.ascensor) {
    return false;
  }
  
  // VALIDACIÓN: Precio razonable
  if (comparable.precio_m2 < 800 || comparable.precio_m2 > 15000) {
    return false;
  }
  
  // VALIDACIÓN: Distancia máxima 500m
  if (comparable.distancia_m && comparable.distancia_m > 500) {
    return false;
  }
  
  return true;
}
