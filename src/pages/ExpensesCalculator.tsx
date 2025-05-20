import { useState } from "react";
import { ExpensesCalculatorForm } from "@/components/ExpensesCalculatorForm";
import { ExpensesCalculatorResult } from "@/components/ExpensesCalculatorResult";
import { CalculatorData, CalculatorResult } from "@/types/calculator";

export default function ExpensesCalculator() {
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleCalculate = (data: CalculatorData) => {
    // Aquí se procesarían los datos para generar el resultado
    // Por ahora, solo guardamos los datos del formulario y mostramos un resultado de ejemplo
    const calculationResult = calculateExpensesAndTaxes(data);
    setResult(calculationResult);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">
        Calculadora de Gastos e Impuestos Inmobiliarios
      </h1>
      <p className="mb-8 text-muted-foreground">
        Calcula todos los gastos e impuestos asociados a la compraventa de una vivienda en España, 
        tanto para el comprador como para el vendedor.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ExpensesCalculatorForm onCalculate={handleCalculate} />
        </div>
        
        <div className="space-y-6">
          <ExpensesCalculatorResult result={result} />
        </div>
      </div>
    </div>
  );
}

// Función para calcular los gastos e impuestos
function calculateExpensesAndTaxes(data: CalculatorData): CalculatorResult {
  // Esta función implementará toda la lógica de cálculo basada en los datos ingresados
  // Por ahora devolvemos un resultado de ejemplo
  const today = new Date();
  
  return {
    comprador: {
      total: calculateBuyerTotal(data),
      detalle: calculateBuyerDetails(data)
    },
    vendedor: {
      total: calculateSellerTotal(data),
      detalle: calculateSellerDetails(data)
    },
    supuestos: generateAssumptions(data),
    fecha_calculo: today.toISOString().split('T')[0]
  };
}

function calculateBuyerTotal(data: CalculatorData): number {
  // Implementar cálculo del total para el comprador
  const details = calculateBuyerDetails(data);
  return Object.values(details).reduce((sum, value) => {
    // Ensure we're only adding numbers, not strings
    const numValue = typeof value === 'number' ? value : 0;
    return sum + numValue;
  }, 0);
}

function calculateBuyerDetails(data: CalculatorData): Record<string, number | string> {
  // Implementar cálculo detallado para el comprador
  const details: Record<string, number | string> = {};
  
  // Determinar si aplica IVA+AJD o ITP
  if (data.tipoVivienda === "nueva") {
    // Para vivienda nueva: IVA (10% general, 4% VPO) + AJD (varía por CCAA)
    const ivaRate = data.regimenFiscal?.includes("VPO") ? 0.04 : 0.1;
    details["IVA"] = Math.round(data.precioCompraventa * ivaRate * 100) / 100;
    
    // AJD varía por CCAA, tomamos un valor medio del 1% como ejemplo
    const ajdRate = getTaxRateByRegion(data.comunidadAutonoma, "AJD");
    details["AJD"] = Math.round(data.precioCompraventa * ajdRate * 100) / 100;
  } else {
    // Para vivienda segunda mano: ITP (varía por CCAA)
    const itpRate = getTaxRateByRegion(data.comunidadAutonoma, "ITP");
    details["ITP"] = Math.round(data.precioCompraventa * itpRate * 100) / 100;
  }
  
  // Notaría (aproximación por aranceles)
  details["Notaría"] = calculateNotaryFees(data.precioCompraventa);
  
  // Registro de la Propiedad (aproximación por aranceles)
  details["Registro"] = calculateRegistryFees(data.precioCompraventa);
  
  // Gestoría
  details["Gestoría"] = 350.00;
  
  // Si hay hipoteca
  if (data.existeHipoteca && data.importeFinanciar && data.banco) {
    // Tasación
    details["Tasación"] = 300.00;
    
    // Comisión de apertura (aproximadamente 1%)
    details["Hipoteca_comisión_apertura"] = Math.round(data.importeFinanciar * 0.01 * 100) / 100;
    
    // AJD sobre hipoteca
    if (data.porcentajeFinanciacion) {
      const ajdHipotecaRate = getTaxRateByRegion(data.comunidadAutonoma, "AJD");
      details["AJD_hipoteca"] = Math.round(data.importeFinanciar * ajdHipotecaRate * 100) / 100;
    }
  }
  
  return details;
}

function calculateSellerTotal(data: CalculatorData): number {
  // Implementar cálculo del total para el vendedor
  const details = calculateSellerDetails(data);
  return Object.values(details).reduce((sum, value) => {
    // Ensure we're only adding numbers, not strings
    const numValue = typeof value === 'number' ? value : 0;
    return sum + numValue;
  }, 0);
}

function calculateSellerDetails(data: CalculatorData): Record<string, number | string> {
  // Implementar cálculo detallado para el vendedor
  const details: Record<string, number | string> = {};
  
  // Ganancia patrimonial (IRPF)
  if (data.fechaAdquisicion && data.valorAdquisicion) {
    const gananciaPatrimonial = data.precioCompraventa - data.valorAdquisicion;
    
    if (gananciaPatrimonial > 0) {
      // Calcular IRPF (aproximación, depende de muchos factores)
      // Tipo medio aproximado del 19-23%
      details["IRPF_ganancia_patrimonial"] = Math.round(gananciaPatrimonial * 0.21 * 100) / 100;
    } else {
      details["IRPF_ganancia_patrimonial"] = 0;
    }
  }
  
  // Plusvalía municipal (IVTNU)
  if (data.plusvaliaMunicipal) {
    details["Plusvalía_municipal_IVTNU"] = data.plusvaliaMunicipal;
  } else {
    // Estimación genérica si no se proporciona
    details["Plusvalía_municipal_IVTNU"] = Math.round(data.precioCompraventa * 0.01 * 100) / 100;
  }
  
  // Gastos de cancelación de hipoteca
  if (data.importePendienteHipoteca) {
    details["Cancelación_hipoteca"] = Math.round(data.importePendienteHipoteca * 0.005 * 100) / 100;
    details["Notaría_cancelación"] = 200.00;
    details["Registro_cancelación"] = 150.00;
  }
  
  // Comisión agencia inmobiliaria (si procede, típicamente 3-5%)
  details["Agencia"] = Math.round(data.precioCompraventa * 0.03 * 100) / 100;
  
  return details;
}

function generateAssumptions(data: CalculatorData): string[] {
  // Generar supuestos utilizados en el cálculo
  const assumptions = [
    `Tipo ITP/AJD en ${data.comunidadAutonoma}: ${getTaxRateByRegion(data.comunidadAutonoma, "ITP") * 100}% para ITP, ${getTaxRateByRegion(data.comunidadAutonoma, "AJD") * 100}% para AJD.`,
    "Notaría estimada según RD 1426/1989, arancel mínimo aplicado.",
    "Registro calculado por arancel RD 1427/1989.",
    "Gestoría genérica 350 € (puede variar)."
  ];
  
  return assumptions;
}

// Funciones auxiliares para los cálculos
function getTaxRateByRegion(region: string, taxType: string): number {
  // Implementación simplificada, se deberían usar datos reales y actualizados
  const taxRates: Record<string, Record<string, number>> = {
    "Andalucía": { "ITP": 0.07, "AJD": 0.015 },
    "Aragón": { "ITP": 0.08, "AJD": 0.01 },
    "Asturias": { "ITP": 0.08, "AJD": 0.011 },
    "Baleares": { "ITP": 0.08, "AJD": 0.01 },
    "Canarias": { "ITP": 0.065, "AJD": 0.01 },
    "Cantabria": { "ITP": 0.08, "AJD": 0.01 },
    "Castilla-La Mancha": { "ITP": 0.08, "AJD": 0.01 },
    "Castilla y León": { "ITP": 0.08, "AJD": 0.015 },
    "Cataluña": { "ITP": 0.10, "AJD": 0.015 },
    "Extremadura": { "ITP": 0.08, "AJD": 0.01 },
    "Galicia": { "ITP": 0.10, "AJD": 0.015 },
    "Madrid": { "ITP": 0.06, "AJD": 0.01 },
    "Murcia": { "ITP": 0.08, "AJD": 0.015 },
    "Navarra": { "ITP": 0.06, "AJD": 0.005 },
    "País Vasco": { "ITP": 0.07, "AJD": 0.005 },
    "La Rioja": { "ITP": 0.07, "AJD": 0.01 },
    "Comunidad Valenciana": { "ITP": 0.10, "AJD": 0.015 }
  };
  
  // Si la región existe, devolver la tasa correspondiente, de lo contrario usar un valor predeterminado
  return (region in taxRates) ? taxRates[region][taxType] : (taxType === "ITP" ? 0.08 : 0.01);
}

function calculateNotaryFees(amount: number): number {
  // Cálculo simplificado basado en los aranceles notariales
  // RD 1426/1989
  let fee = 0;
  
  if (amount <= 6010.12) {
    fee = 90.15;
  } else if (amount <= 30050.61) {
    fee = 90.15 + (amount - 6010.12) * 0.004521;
  } else if (amount <= 60101.21) {
    fee = 90.15 + (30050.61 - 6010.12) * 0.004521 + (amount - 30050.61) * 0.001502;
  } else if (amount <= 150253.03) {
    fee = 90.15 + (30050.61 - 6010.12) * 0.004521 + (60101.21 - 30050.61) * 0.001502 + (amount - 60101.21) * 0.001;
  } else if (amount <= 601012.10) {
    fee = 90.15 + (30050.61 - 6010.12) * 0.004521 + (60101.21 - 30050.61) * 0.001502 + (150253.03 - 60101.21) * 0.001 + (amount - 150253.03) * 0.0005;
  } else {
    fee = 90.15 + (30050.61 - 6010.12) * 0.004521 + (60101.21 - 30050.61) * 0.001502 + (150253.03 - 60101.21) * 0.001 + (601012.10 - 150253.03) * 0.0005 + (amount - 601012.10) * 0.0003;
  }
  
  // Aplicar reducciones, IVA, etc.
  fee = fee * 1.21; // IVA 21%
  
  return Math.round(fee * 100) / 100;
}

function calculateRegistryFees(amount: number): number {
  // Cálculo simplificado basado en los aranceles registrales
  // RD 1427/1989
  let fee = 0;
  
  if (amount <= 6010.12) {
    fee = 24.04;
  } else if (amount <= 30050.61) {
    fee = 24.04 + (amount - 6010.12) * 0.00175;
  } else if (amount <= 60101.21) {
    fee = 24.04 + (30050.61 - 6010.12) * 0.00175 + (amount - 30050.61) * 0.00125;
  } else if (amount <= 150253.03) {
    fee = 24.04 + (30050.61 - 6010.12) * 0.00175 + (60101.21 - 30050.61) * 0.00125 + (amount - 60101.21) * 0.000875;
  } else if (amount <= 601012.10) {
    fee = 24.04 + (30050.61 - 6010.12) * 0.00175 + (60101.21 - 30050.61) * 0.00125 + (150253.03 - 60101.21) * 0.000875 + (amount - 150253.03) * 0.0005;
  } else {
    fee = 24.04 + (30050.61 - 6010.12) * 0.00175 + (60101.21 - 30050.61) * 0.00125 + (150253.03 - 60101.21) * 0.000875 + (601012.10 - 150253.03) * 0.0005 + (amount - 601012.10) * 0.00025;
  }
  
  // Aplicar reducciones, IVA, etc.
  fee = fee * 1.21; // IVA 21%
  
  return Math.round(fee * 100) / 100;
}
