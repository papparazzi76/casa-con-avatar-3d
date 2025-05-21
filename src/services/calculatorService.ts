
import { CalculationResult, PropertyFormData, RegionTaxRates } from "@/types/calculatorTypes";

// Tipos impositivos por comunidad autónoma (simplificados para este ejemplo)
const regionTaxRates: RegionTaxRates = {
  "Andalucía": { ITP: 7, AJD: 1.5 },
  "Aragón": { ITP: 8, AJD: 1.5 },
  "Asturias": { ITP: 8, AJD: 1.2 },
  "Baleares": { ITP: 8, AJD: 1.2 },
  "Canarias": { ITP: 6.5, AJD: 1 },
  "Cantabria": { ITP: 10, AJD: 1.5 },
  "Castilla-La Mancha": { ITP: 9, AJD: 1.5 },
  "Castilla y León": { ITP: 8, AJD: 1.5 },
  "Cataluña": { ITP: 10, AJD: 1.5 },
  "Extremadura": { ITP: 8, AJD: 1.5 },
  "Galicia": { ITP: 10, AJD: 1.5 },
  "Madrid": { ITP: 6, AJD: 0.75 },
  "Murcia": { ITP: 8, AJD: 1.5 },
  "La Rioja": { ITP: 7, AJD: 1 },
  "Comunidad Valenciana": { ITP: 10, AJD: 1.5 },
  "País Vasco": { ITP: 7, AJD: 0.5 },
  "Navarra": { ITP: 6, AJD: 0.5 }
};

// Función para calcular gastos de notaría (simplificado)
const calculateNotaryFees = (price: number): number => {
  // Simplificación de los aranceles notariales según RD 1426/1989
  if (price <= 6010) return 90;
  if (price <= 30050) return 180;
  if (price <= 60101) return 270;
  if (price <= 150253) return 350;
  if (price <= 601012) return 450;
  return 500; // Para importes superiores
};

// Función para calcular gastos de registro (simplificado)
const calculateRegistryFees = (price: number): number => {
  // Simplificación de los aranceles registrales según RD 1427/1989
  if (price <= 6010) return 70;
  if (price <= 30050) return 140;
  if (price <= 60101) return 210;
  if (price <= 150253) return 270;
  if (price <= 601012) return 350;
  return 400; // Para importes superiores
};

// Función principal para realizar el cálculo
export const calculateExpenses = (data: PropertyFormData): CalculationResult => {
  const {
    region, 
    price, 
    propertyType, 
    hasLoan,
    loanAmount,
    acquisitionValue,
    acquisitionDate,
    improvements,
    municipalCapitalGainsTax,
    remainingLoan
  } = data;

  // Convertir valores string a number
  const priceNum = Number(price);
  const loanAmountNum = loanAmount ? Number(loanAmount) : 0;
  const acquisitionValueNum = acquisitionValue ? Number(acquisitionValue) : 0;
  const improvementsNum = improvements ? Number(improvements) : 0;
  const municipalCapitalGainsTaxNum = municipalCapitalGainsTax ? Number(municipalCapitalGainsTax) : 0;
  const remainingLoanNum = remainingLoan ? Number(remainingLoan) : 0;

  // Obtener tasas aplicables según la comunidad autónoma
  const rates = regionTaxRates[region] || { ITP: 8, AJD: 1.5 }; // Valores por defecto

  // Cálculo para el comprador
  const buyerDetails: { [key: string]: number } = {};
  
  // IVA o ITP dependiendo de si es nueva o usada
  if (propertyType === 'new') {
    buyerDetails.IVA = priceNum * 0.1; // 10% IVA para vivienda nueva
    buyerDetails.AJD = priceNum * (rates.AJD / 100);
  } else {
    buyerDetails.ITP = priceNum * (rates.ITP / 100);
  }
  
  // Gastos adicionales
  buyerDetails.Notaría = calculateNotaryFees(priceNum);
  buyerDetails.Registro = calculateRegistryFees(priceNum);
  buyerDetails.Gestoría = 350; // Valor genérico
  
  // Gastos de hipoteca si aplica
  if (hasLoan) {
    buyerDetails.Tasación = 300; // Valor genérico
    buyerDetails.Hipoteca_comisión_apertura = loanAmountNum * 0.01; // 1% genérico
    buyerDetails.AJD_hipoteca = loanAmountNum * (rates.AJD / 100);
  }

  // Cálculo para el vendedor
  const sellerDetails: { [key: string]: number } = {};
  
  // IRPF por ganancia patrimonial (simplificado)
  const gain = priceNum - (acquisitionValueNum + improvementsNum);
  if (gain > 0) {
    sellerDetails.IRPF_ganancia_patrimonial = gain * 0.19; // 19% tipo general simplificado
  } else {
    sellerDetails.IRPF_ganancia_patrimonial = 0;
  }
  
  // Plusvalía municipal
  sellerDetails.Plusvalía_municipal_IVTNU = municipalCapitalGainsTaxNum;
  
  // Gastos cancelación hipoteca
  if (remainingLoanNum > 0) {
    sellerDetails.Cancelación_hipoteca = remainingLoanNum * 0.005; // 0.5% comisión genérica
    sellerDetails.Notaría_cancelación = 200; // Valor genérico
    sellerDetails.Registro_cancelación = 100; // Valor genérico
  }
  
  // Cálculo de totales
  const buyerTotal = Object.values(buyerDetails).reduce((sum, value) => sum + value, 0);
  const sellerTotal = Object.values(sellerDetails).reduce((sum, value) => sum + value, 0);

  // Supuestos utilizados
  const assumptions = [
    `Tipo ITP ${region} ${rates.ITP}% / AJD ${rates.AJD}% para el cálculo general.`,
    "Notaría estimada según RD 1426/1989, arancel mínimo aplicado.",
    "Registro calculado por arancel RD 1427/1989.",
    "Gestoría genérica 350 € (puede variar)."
  ];

  // Fecha del cálculo
  const currentDate = new Date().toISOString().split('T')[0];

  return {
    comprador: {
      total: buyerTotal,
      detalle: buyerDetails
    },
    vendedor: {
      total: sellerTotal,
      detalle: sellerDetails
    },
    supuestos: assumptions,
    fecha_cálculo: currentDate
  };
};
