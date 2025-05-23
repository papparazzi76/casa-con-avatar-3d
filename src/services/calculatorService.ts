
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

  // Initialize the result with default values
  const result: CalculationResult = {
    total: 0,
    taxes: {
      iva: 0,
      transferTax: 0,
      plusvalia: municipalCapitalGainsTaxNum,
      ajdTax: 0,
      ibiTax: 250 // Default value for IBI
    },
    expenses: {
      notary: calculateNotaryFees(priceNum),
      registry: calculateRegistryFees(priceNum),
      agency: 0,
      legalFees: 0,
      appraisal: 0
    }
  };

  // Calculate taxes based on property type
  if (propertyType === 'new') {
    result.taxes.iva = priceNum * 0.1; // 10% IVA for new properties
    result.taxes.ajdTax = priceNum * (rates.AJD / 100);
  } else {
    result.taxes.transferTax = priceNum * (rates.ITP / 100);
  }

  // Agency fees if applicable (typically 3-5%)
  if (data.includeAgencyFees) {
    result.expenses.agency = priceNum * 0.03;
  }

  // Legal fees if applicable
  if (data.includeLegalFees) {
    result.expenses.legalFees = 1000; // Fixed value for simplicity
  }

  // Appraisal for loans
  if (hasLoan) {
    result.expenses.appraisal = 300;
  }

  // Calculate the total
  result.total = 
    result.taxes.iva + 
    result.taxes.transferTax + 
    result.taxes.plusvalia + 
    result.taxes.ajdTax + 
    result.taxes.ibiTax +
    result.expenses.notary +
    result.expenses.registry +
    result.expenses.agency +
    result.expenses.legalFees +
    result.expenses.appraisal;

  return result;
};
