
// Property valuation related interfaces

// Interface for property info input from user
export interface PropertyInfo {
  localidad: string;
  distrito: string;
  codigo_postal: string;
  direccion?: string;
  tipo_vivienda: string;
  superficie_m2: number;
  habitaciones: number;
  banos: number;
  estado_conservacion: string;
  planta: string;
  ascensor: boolean;
  exterior: boolean;
  anno_construccion: number;
}

// Interface for a comparable property
export interface ComparableProperty {
  fuente: string;
  url: string;
  codigo_postal: string;
  distrito: string;
  distancia_m?: number;
  superficie_m2: number;
  habitaciones: number;
  precio: number;
  precio_m2: number;
  ascensor: boolean;
  exterior: boolean;
  estado_conservacion: string;
  planta: string;
}

// Interface for property valuation response
export interface PropertyValuation {
  status: "ok" | "faltan_datos";
  vivienda_objetivo?: {
    direccion: string;
    distrito: string;
    codigo_postal: string;
    tipo: string;
    superficie_m2: number;
  };
  valoracion?: {
    precio_min: number;
    precio_max: number;
    precio_sugerido: number;
    precio_m2_sugerido: number;
    confianza: "alta" | "media" | "baja";
  };
  estadisticas_comparables?: {
    n: number;
    media_precio_m2: number;
    mediana_precio_m2: number;
    desviacion_estandar_m2: number;
  };
  comparables_destacados?: ComparableProperty[];
  fecha_calculo?: string;
  metodologia_breve?: string;
  disclaimer?: string;
  faltan_datos?: string[];
  sin_comparables?: string;
}
