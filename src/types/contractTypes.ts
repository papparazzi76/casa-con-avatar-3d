
export type ContractType = 
  | 'contrato_reserva'
  | 'arras_penitenciales'
  | 'arras_confirmatorias'
  | 'arras_penales'
  | 'contrato_alquiler_vivienda'
  | 'alquiler_particulares_amueblado'
  | 'alquiler_particulares_sin_amueblar'
  | 'alquiler_empresa_particular_amueblado'
  | 'alquiler_empresa_particular_sin_amueblar'
  | 'alquiler_uso_distinto_vivienda_amueblado'
  | 'alquiler_uso_distinto_vivienda_sin_amueblar';

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
  
  // Inventory for furnished rentals
  inventario_muebles?: string;
  inventario_electrodomesticos?: string;
  inventario_enseres?: string;
  estado_general?: string;
}

export interface ContractResult {
  file_name: string;
  content: string;
}

export interface MissingFieldsResponse {
  faltan_datos: string[];
}
