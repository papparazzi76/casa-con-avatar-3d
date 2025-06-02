
export type ContractType = 
  | 'contrato_reserva'
  | 'contrato_reserva_inmueble'
  | 'arras_penitenciales'
  | 'arras_confirmatorias'
  | 'arras_penales'
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
  vendedor_telefono?: string;
  vendedor_email?: string;
  
  arrendador?: string;
  arrendador_dni?: string;
  arrendador_domicilio?: string;
  arrendador_telefono?: string;
  arrendador_email?: string;
  
  comprador?: string;
  comprador_dni?: string;
  comprador_domicilio?: string;
  comprador_telefono?: string;
  comprador_email?: string;
  
  arrendatario?: string;
  arrendatario_dni?: string;
  arrendatario_domicilio?: string;
  arrendatario_telefono?: string;
  arrendatario_email?: string;
  
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
  
  // New fields for "Contrato de Reserva de Inmueble"
  informacion_registro?: string;
  cargas_gravamenes?: string;
  porcentaje_arras?: number;
  forma_pago?: string;
  fecha_limite_escritura?: string;
  sujeto_financiacion?: boolean;
  fecha_limite_financiacion?: string;
  muebles_incluidos?: string;
  honorarios_agencia?: string;
  
  // New fields for Arras Confirmatorias
  clausula_arras_confirmatorias?: string;
  
  // New fields for Arras Penales
  clausula_arras_penales?: string;
  
  // Rental contract fields
  duracion?: number;
  fianza?: number;
  renta_mensual?: number;
  fecha_inicio_posesion?: string;
  fecha_fin_posesion?: string;
  cuenta_pago?: string;
  indice_actualizacion?: string;
  garantia_adicional?: string;
  anexos?: string;
  
  // Expense checkboxes for rental contracts
  gastos_luz?: boolean;
  gastos_agua?: boolean;
  gastos_gas?: boolean;
  gastos_internet?: boolean;
  otros_gastos?: string;
  
  // Inventory for furnished rentals
  inventario_muebles?: string;
  inventario_electrodomesticos?: string;
  inventario_enseres?: string;
  estado_general?: string;
  
  // State inspection for unfurnished rentals
  obs_pintura?: string;
  obs_ventanas?: string;
  obs_suelos?: string;
  obs_electricidad?: string;
  obs_agua?: string;
  obs_otros?: string;
  
  // Additional clauses
  clausulas_adicionales?: string;
}

export interface ContractResult {
  file_name: string;
  content: string;
}

export interface MissingFieldsResponse {
  faltan_datos: string[];
}
