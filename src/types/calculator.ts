
export interface CalculatorData {
  // Datos generales
  comunidadAutonoma: string;
  municipio: string;
  precioCompraventa: number;
  tipoVivienda: "nueva" | "segunda";
  regimenFiscal?: string[];
  existeHipoteca: boolean;
  importeFinanciar?: number;
  banco?: string;
  fechaEscritura?: string;
  
  // Datos del vendedor
  fechaAdquisicion?: string;
  valorAdquisicion?: number;
  inversionesPosterior?: number;
  coeficienteActualizacion?: number;
  aniosResidencia?: number;
  importePendienteHipoteca?: number;
  plusvaliaMunicipal?: number;
  
  // Datos del comprador
  porcentajeFinanciacion?: number;
}

export interface CalculatorResult {
  comprador: {
    total: number;
    detalle: Record<string, number | string>;
  };
  vendedor: {
    total: number;
    detalle: Record<string, number | string>;
  };
  supuestos: string[];
  fecha_calculo: string;
}
