
// Tipos para el generador de anuncios inmobiliarios
export interface PropertyAdFormData {
  propertyType: string;
  operation: string;
  location: string;
  area: string;
  rooms: string;
  price: string;
  bathrooms?: string;
  condition?: string;
  features?: string;
  description?: string;
  tone: string;
  useEmojis: boolean;
}

export interface PropertyAdResult {
  titulo: string;
  descripcion: string;
  destacados: string[];
}
