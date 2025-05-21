
export interface Property {
  id: string;
  user_id: string;
  title: string;
  description: string;
  property_type: string;
  operation_type: string;
  price: number;
  currency: string;
  area: number;
  rooms: number;
  bathrooms: number;
  location: string;
  address: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  features?: string[];
  created_at: string;
  updated_at: string;
  status: string;
  property_images?: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_main: boolean;
  order_num: number;
  created_at: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  property_type: string;
  operation_type: string;
  price: number;
  currency: string;
  area: number;
  rooms: number;
  bathrooms: number;
  location: string;
  address: string;
  postal_code?: string;
  features?: string[];
}

export const PROPERTY_TYPES = [
  { value: "piso", label: "Piso" },
  { value: "casa", label: "Casa / Chalet" },
  { value: "atico", label: "Ático" },
  { value: "duplex", label: "Dúplex" },
  { value: "estudio", label: "Estudio" },
  { value: "apartamento", label: "Apartamento" },
  { value: "local", label: "Local comercial" },
  { value: "oficina", label: "Oficina" },
  { value: "terreno", label: "Terreno" },
  { value: "garaje", label: "Garaje" },
  { value: "trastero", label: "Trastero" },
  { value: "edificio", label: "Edificio" },
  { value: "nave", label: "Nave industrial" },
];

export const OPERATION_TYPES = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

export const CURRENCIES = [
  { value: "EUR", label: "€ (EUR)" },
  { value: "USD", label: "$ (USD)" },
  { value: "GBP", label: "£ (GBP)" },
];
