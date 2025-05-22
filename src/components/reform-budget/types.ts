
// Common types used across reform budget components
export interface Room {
  id: string;
  name: string;
  area: number;
  workType: string;
  quality: string;
  chapters: {
    id: string;
    name: string;
    amount: number;
  }[];
  subtotal: number;
}

export type ReformType = "integral" | "partial";

export interface ReformBudgetTotals {
  subtotal: number;
  imprevistos: number;
  honorarios: number;
  baseImponible: number;
  iva: number;
  total: number;
}

export interface ReformBudgetData {
  reformType: ReformType;
  rooms: Room[];
  selectedPartialItems: string[];
  imprevistosPercent: number;
  honorariosPercent: number;
  ivaPercent: number;
}

// Reference data
export const integralRooms = [
  { id: "salon", name: "Salón / comedor", area: 20 },
  { id: "dormitorio1", name: "Dormitorio principal", area: 12 },
  { id: "dormitorio2", name: "Dormitorio 2", area: 10 },
  { id: "dormitorio3", name: "Dormitorio 3", area: 8 },
  { id: "bano", name: "Baño completo", area: 5 },
  { id: "cocina", name: "Cocina", area: 8 },
  { id: "pasillo", name: "Pasillo", area: 6 },
  { id: "recibidor", name: "Recibidor / hall", area: 4 },
];

export const additionalRoomTypes = [
  { id: "dormitorio", name: "Dormitorio extra" },
  { id: "bano_completo", name: "Baño completo extra" },
  { id: "aseo", name: "Aseo (sin ducha/bañera)" },
  { id: "terraza", name: "Terraza o balcón" },
  { id: "lavadero", name: "Lavadero / cuarto de lavado" },
  { id: "vestidor", name: "Vestidor" },
  { id: "despacho", name: "Despacho / estudio" },
  { id: "trastero", name: "Trastero" },
  { id: "garaje", name: "Garaje" },
  { id: "patio", name: "Patio interior" },
  { id: "otras", name: "Otras" },
];

export const partialItems = [
  { id: "cocina", name: "Cocina" },
  { id: "banos", name: "Baño(s)" },
  { id: "salon", name: "Salón / comedor" },
  { id: "dormitorios", name: "Dormitorio(s)" },
  { id: "electricidad", name: "Instalación eléctrica" },
  { id: "fontaneria", name: "Fontanería" },
  { id: "carpinteria_interior", name: "Carpintería interior" },
  { id: "carpinteria_exterior", name: "Carpintería exterior (ventanas / balconeras)" },
  { id: "pintura", name: "Pintura general" },
  { id: "suelos", name: "Suelos / pavimentos" },
  { id: "climatizacion", name: "Climatización" },
  { id: "fachada", name: "Fachada / envolvente" },
  { id: "cubierta", name: "Cubierta / tejado" },
  { id: "otra", name: "Otra" },
];

export const workTypes = [
  { id: "demolicion", name: "Demolición" },
  { id: "obra_nueva", name: "Obra nueva" },
  { id: "sustitucion", name: "Sustitución" },
  { id: "actualizacion", name: "Actualización ligera" },
];

export const qualityTypes = [
  { id: "economica", name: "Económica" },
  { id: "estandar", name: "Estándar" },
  { id: "alta", name: "Alta" },
  { id: "premium", name: "Premium" },
];

export const chapters = [
  { id: "albanileria", name: "Albañilería" },
  { id: "electricidad", name: "Electricidad" },
  { id: "fontaneria", name: "Fontanería" },
  { id: "carpinteria", name: "Carpintería" },
  { id: "climatizacion", name: "Climatización" },
  { id: "pintura", name: "Pintura" },
  { id: "otros", name: "Otros" },
];
