
export type ContractType = 
  | 'contrato_reserva'
  | 'arras_penitenciales'
  | 'arras_confirmatorias'
  | 'arras_penales'
  | 'contrato_alquiler_vivienda';

export interface ContractFormData {
  // Contract type
  tipo_contrato: ContractType;
  
  // Common data for all contracts
  vendedor?: string;
  vendedor_dni?: string;
  vendedor_domicilio?: string;
  
  arrendador?: string;
  arrendador_dni?: string;
  arrendador_domicilio?: string;
  
  comprador?: string;
  comprador_dni?: string;
  comprador_domicilio?: string;
  
  arrendatario?: string;
  arrendatario_dni?: string;
  arrendatario_domicilio?: string;
  
  inmueble?: string;
  referencia_catastral?: string;
  precio_total?: number;
  fecha_firma?: string;
  poblacion_firma?: string;
  
  // Specific data for different contract types
  importe_reserva?: number;
  plazo_firma_escritura?: number;
  
  importe_arras?: number;
  vencimiento_arras?: string;
  penalizacion?: number;
  
  duracion?: number;
  fianza?: number;
  renta_mensual?: number;
  fecha_inicio_posesion?: string;
  cuenta_pago?: string;
}

export interface ContractResult {
  file_name: string;
  content: string;
}

export interface MissingFieldsResponse {
  faltan_datos: string[];
}
