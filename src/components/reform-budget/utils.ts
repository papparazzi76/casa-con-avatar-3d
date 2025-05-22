
import { chapters, Room } from "./types";

// Calculate base price per m2 based on work type, quality and chapter
export function calculateBasePrice(area: number, workType: string, quality: string, chapterId: string): number {
  // Precios base por m2 según calidad
  const baseQualityPrices: Record<string, number> = {
    economica: 450,
    estandar: 650,
    alta: 900,
    premium: 1200,
  };

  // Modificadores según tipo de obra
  const workTypeModifiers: Record<string, number> = {
    demolicion: 0.4,
    obra_nueva: 1.0,
    sustitucion: 0.7,
    actualizacion: 0.5,
  };

  // Distribución aproximada por capítulos
  const chapterDistribution: Record<string, number> = {
    albanileria: 0.35,
    electricidad: 0.15,
    fontaneria: 0.15,
    carpinteria: 0.15,
    climatizacion: 0.1,
    pintura: 0.05,
    otros: 0.05,
  };

  // Obtener precio base según calidad
  const basePrice = baseQualityPrices[quality] || baseQualityPrices.estandar;
  
  // Aplicar modificador de tipo de obra
  const modifiedPrice = basePrice * (workTypeModifiers[workType] || 1);
  
  // Aplicar distribución por capítulo
  const chapterPrice = modifiedPrice * (chapterDistribution[chapterId] || 0.05);
  
  // Multiplicar por área y redondear
  return Math.round(chapterPrice * area);
}

// Calculate totals for the budget
export function calculateTotals(
  rooms: Room[], 
  imprevistosPercent: number, 
  honorariosPercent: number, 
  ivaPercent: number
) {
  const subtotal = rooms.reduce((sum, room) => sum + room.subtotal, 0);
  const imprevistos = (subtotal * imprevistosPercent) / 100;
  const honorarios = (subtotal * honorariosPercent) / 100;
  const baseImponible = subtotal + imprevistos + honorarios;
  const iva = (baseImponible * ivaPercent) / 100;
  const total = baseImponible + iva;
  
  return {
    subtotal,
    imprevistos,
    honorarios,
    baseImponible,
    iva,
    total
  };
}

// Create a new room with default values
export function createNewRoom(
  id: string, 
  name: string, 
  area: number, 
  workType: string = "obra_nueva", 
  quality: string = "estandar"
): Room {
  const roomChapters = chapters.map((chapter) => ({
    id: chapter.id,
    name: chapter.name,
    amount: calculateBasePrice(area, workType, quality, chapter.id),
  }));
  
  const subtotal = roomChapters.reduce((sum, chapter) => sum + chapter.amount, 0);
  
  return {
    id,
    name,
    area,
    workType,
    quality,
    chapters: roomChapters,
    subtotal,
  };
}
