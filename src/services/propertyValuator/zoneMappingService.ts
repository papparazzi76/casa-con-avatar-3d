
// Servicio para mapear zonas de Idealista de Valladolid

export interface IdealistaZone {
  zona: string;
  variantes: string[]; // Diferentes formas como puede aparecer el nombre
}

// Mapeo completo de zonas de Idealista en Valladolid
export const IDEALISTA_ZONES: IdealistaZone[] = [
  { zona: "Fuente Berrocal", variantes: ["fuente berrocal", "berrocal"] },
  { zona: "El Cabildo", variantes: ["el cabildo", "cabildo"] },
  { zona: "La Overuela", variantes: ["la overuela", "overuela"] },
  { zona: "La Victoria", variantes: ["la victoria", "victoria"] },
  { zona: "Rondilla-Santa Clara", variantes: ["rondilla-santa clara", "rondilla santa clara", "rondilla", "santa clara"] },
  { zona: "Belén-Barrio España", variantes: ["belén-barrio españa", "belen barrio españa", "belén", "belen", "barrio españa", "barrio españa"] },
  { zona: "Girón-Villa del Prado", variantes: ["girón-villa del prado", "giron villa del prado", "girón", "giron", "villa del prado", "villa prado"] },
  { zona: "Huerta del Rey", variantes: ["huerta del rey", "huerta rey"] },
  { zona: "Centro", variantes: ["centro", "casco histórico", "centro histórico"] },
  { zona: "Hospital", variantes: ["hospital"] },
  { zona: "San Juan", variantes: ["san juan"] },
  { zona: "Circular", variantes: ["circular", "barrio circular"] },
  { zona: "Pilarica", variantes: ["pilarica", "la pilarica"] },
  { zona: "San Isidro", variantes: ["san isidro"] },
  { zona: "Pajarillos", variantes: ["pajarillos", "los pajarillos"] },
  { zona: "Las Flores", variantes: ["las flores", "flores"] },
  { zona: "Campo Grande", variantes: ["campo grande", "campogrande"] },
  { zona: "Parquesol", variantes: ["parquesol", "parque sol"] },
  { zona: "Arturo Eyres", variantes: ["arturo eyres", "eyres"] },
  { zona: "Plaza de Toros", variantes: ["plaza de toros", "plaza toros"] },
  { zona: "Cuatro de Marzo", variantes: ["cuatro de marzo", "4 de marzo", "4 marzo"] },
  { zona: "Arco Ladrillo", variantes: ["arco ladrillo", "arco de ladrillo"] },
  { zona: "Delicias", variantes: ["delicias", "las delicias"] },
  { zona: "Hospital nuevo", variantes: ["hospital nuevo", "hospital universitario"] },
  { zona: "Valparaíso-Las Villas-Santa Ana", variantes: ["valparaíso-las villas-santa ana", "valparaiso las villas santa ana", "valparaíso", "valparaiso", "las villas", "villas", "santa ana"] },
  { zona: "Covaresa", variantes: ["covaresa"] },
  { zona: "La Rubia", variantes: ["la rubia", "rubia"] },
  { zona: "Arcas Reales-Pinar de Jalón", variantes: ["arcas reales-pinar de jalón", "arcas reales pinar de jalon", "arcas reales", "pinar de jalón", "pinar de jalon"] },
  { zona: "Pinarillo-Los Doctrinos", variantes: ["pinarillo-los doctrinos", "pinarillo los doctrinos", "pinarillo", "los doctrinos", "doctrinos"] }
];

// Función para buscar zona por nombre en texto
export function findZoneByName(text: string): string | null {
  const normalizedText = text.toLowerCase().trim();
  
  console.log(`🏙️ Buscando zona en texto: "${normalizedText}"`);
  
  for (const mapping of IDEALISTA_ZONES) {
    // Buscar el nombre principal de la zona
    if (normalizedText.includes(mapping.zona.toLowerCase())) {
      console.log(`🏙️ Encontrada zona principal: ${mapping.zona}`);
      return mapping.zona;
    }
    
    // Buscar en las variantes
    for (const variante of mapping.variantes) {
      if (normalizedText.includes(variante.toLowerCase())) {
        console.log(`🏙️ Encontrada zona por variante: ${variante} (${mapping.zona})`);
        return mapping.zona;
      }
    }
  }
  
  console.log(`🏙️ No se encontró zona en: "${normalizedText}"`);
  return null;
}

// Función para obtener todas las zonas disponibles
export function getAllZones(): string[] {
  return IDEALISTA_ZONES.map(zone => zone.zona).sort();
}

// Función para validar si una zona es válida
export function isValidZone(zona: string): boolean {
  return IDEALISTA_ZONES.some(z => z.zona === zona);
}
