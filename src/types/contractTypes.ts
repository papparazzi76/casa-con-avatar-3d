
export type ContractType = 
  | 'contrato_compraventa_arras_penitenciales'
  | 'alquiler_particulares_amueblado'
  | 'alquiler_particulares_sin_amueblar'
  | 'contrato_senal_reserva'
  | 'alquiler_comercial';

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
  
  // New fields for "Contrato de Compraventa de Inmueble con Arras Penitenciales"
  vendedores?: Array<{
    name: string;
    dni: string;
    address: string;
    phone: string;
  }>;
  compradores?: Array<{
    name: string;
    dni: string;
    address: string;
    phone: string;
  }>;
  
  // New fields for rental contracts with multiple parties
  arrendadores?: Array<{
    name: string;
    dni: string;
    address: string;
    phone: string;
    email?: string;
  }>;
  arrendatarios?: Array<{
    name: string;
    dni: string;
    address: string;
    phone: string;
    email?: string;
  }>;
  
  property_location?: string;
  property_registry?: string;
  property_tomo?: string;
  property_libro?: string;
  property_folio?: string;
  property_finca?: string;
  property_charges?: string;
  arras_amount?: number;
  arras_percent?: number;
  payment_method?: string;
  escritura_date?: string;
  days_from_mortgage?: number;
  mortgage_deadline?: string;
  optional_clauses?: string;
  signing_day?: string;
  signing_month?: string;
  signing_year?: string;
  
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
  
  // Reservation contract fields
  signal_amount?: number;
  proposed_price?: number;
  deadline_date?: string;
  deadline_time?: string;

  // Commercial lease fields
  property_use?: string;
  term_years?: number;
  term_months?: number;
  payment_day?: number;
  expenses?: string;
  tax_clause?: string;
}

export interface ContractResult {
  file_name: string;
  content: string;
}

export interface MissingFieldsResponse {
  faltan_datos: string[];
}
