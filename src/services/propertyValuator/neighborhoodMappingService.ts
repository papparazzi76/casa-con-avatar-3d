
// Servicio para mapear nombres de barrios/distritos de Valladolid a códigos postales

export interface NeighborhoodMapping {
  barrio: string;
  codigo_postal: string;
  distrito: string;
  variantes: string[]; // Diferentes formas como puede aparecer el nombre
}

// Mapeo completo de barrios de Valladolid a códigos postales
export const NEIGHBORHOOD_MAPPINGS: NeighborhoodMapping[] = [
  // Centro
  { barrio: "Centro", codigo_postal: "47001", distrito: "Centro", variantes: ["centro", "casco histórico", "centro histórico"] },
  { barrio: "Plaza España", codigo_postal: "47002", distrito: "Plaza España", variantes: ["plaza españa", "pl españa", "plaza de españa"] },
  
  // La Antigua - Santa Cruz
  { barrio: "La Antigua", codigo_postal: "47003", distrito: "La Antigua-Santa Cruz", variantes: ["la antigua", "antigua", "santa cruz"] },
  { barrio: "Santa Cruz", codigo_postal: "47003", distrito: "La Antigua-Santa Cruz", variantes: ["santa cruz", "santacruz"] },
  
  // Caño Argales
  { barrio: "Caño Argales", codigo_postal: "47004", distrito: "Caño Argales", variantes: ["caño argales", "argales", "caño de argales"] },
  
  // Circular
  { barrio: "Circular", codigo_postal: "47005", distrito: "Circular", variantes: ["circular", "barrio circular"] },
  
  // Cuatro de Marzo
  { barrio: "Cuatro de Marzo", codigo_postal: "47006", distrito: "Cuatro de Marzo", variantes: ["cuatro de marzo", "4 de marzo", "4 marzo"] },
  
  // Campo Grande
  { barrio: "Campo Grande", codigo_postal: "47007", distrito: "Campo Grande", variantes: ["campo grande", "campogrande"] },
  
  // Las Villas - Valparaíso
  { barrio: "Las Villas", codigo_postal: "47008", distrito: "Las Villas-Valparaíso", variantes: ["las villas", "villas"] },
  { barrio: "Valparaíso", codigo_postal: "47008", distrito: "Las Villas-Valparaíso", variantes: ["valparaíso", "valparaiso"] },
  
  // La Victoria
  { barrio: "La Victoria", codigo_postal: "47009", distrito: "La Victoria", variantes: ["la victoria", "victoria"] },
  
  // Rondilla
  { barrio: "Rondilla", codigo_postal: "47010", distrito: "Rondilla", variantes: ["rondilla", "la rondilla"] },
  
  // Pilarica - Los Santos
  { barrio: "Pilarica", codigo_postal: "47011", distrito: "Pilarica-Los Santos", variantes: ["pilarica", "la pilarica"] },
  { barrio: "Los Santos", codigo_postal: "47011", distrito: "Pilarica-Los Santos", variantes: ["los santos", "santos"] },
  
  // Delicias - Canterac
  { barrio: "Delicias", codigo_postal: "47012", distrito: "Delicias-Canterac", variantes: ["delicias", "las delicias"] },
  { barrio: "Canterac", codigo_postal: "47012", distrito: "Delicias-Canterac", variantes: ["canterac"] },
  
  // Delicias - Arco de Ladrillo
  { barrio: "Arco de Ladrillo", codigo_postal: "47013", distrito: "Delicias-Arco de Ladrillo", variantes: ["arco de ladrillo", "arco ladrillo"] },
  
  // Parquesol
  { barrio: "Parquesol", codigo_postal: "47014", distrito: "Parquesol", variantes: ["parquesol", "parque sol"] },
  
  // Villa del Prado
  { barrio: "Villa del Prado", codigo_postal: "47015", distrito: "Villa del Prado", variantes: ["villa del prado", "villa prado"] },
  
  // Parquesol Sur
  { barrio: "Parquesol Sur", codigo_postal: "47016", distrito: "Parquesol Sur", variantes: ["parquesol sur", "parque sol sur"] },
  
  // Las Flores
  { barrio: "Las Flores", codigo_postal: "47017", distrito: "Las Flores", variantes: ["las flores", "flores"] },
  
  // El Pinar
  { barrio: "El Pinar", codigo_postal: "47153", distrito: "El Pinar", variantes: ["el pinar", "pinar"] }
];

// Función para buscar código postal por nombre de barrio
export function findPostalCodeByNeighborhood(text: string): string | null {
  const normalizedText = text.toLowerCase().trim();
  
  console.log(`🗺️ Buscando barrio en texto: "${normalizedText}"`);
  
  for (const mapping of NEIGHBORHOOD_MAPPINGS) {
    // Buscar el nombre principal del barrio
    if (normalizedText.includes(mapping.barrio.toLowerCase())) {
      console.log(`🗺️ Encontrado barrio principal: ${mapping.barrio} -> CP ${mapping.codigo_postal}`);
      return mapping.codigo_postal;
    }
    
    // Buscar en las variantes
    for (const variante of mapping.variantes) {
      if (normalizedText.includes(variante.toLowerCase())) {
        console.log(`🗺️ Encontrado barrio por variante: ${variante} (${mapping.barrio}) -> CP ${mapping.codigo_postal}`);
        return mapping.codigo_postal;
      }
    }
  }
  
  console.log(`🗺️ No se encontró barrio en: "${normalizedText}"`);
  return null;
}

// Función para obtener información del barrio por código postal
export function getNeighborhoodInfo(codigo_postal: string): NeighborhoodMapping | null {
  return NEIGHBORHOOD_MAPPINGS.find(mapping => mapping.codigo_postal === codigo_postal) || null;
}
