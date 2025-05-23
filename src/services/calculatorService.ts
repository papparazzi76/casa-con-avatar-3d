
import { CalculationResult, CalculationBreakdown } from '@/types/calculatorTypes';

// Define the missing types
interface PropertyFormData {
  price: number;
  region: string;
  agencyFee: number;
  includeAgencyFees?: boolean;
  legalFees?: number;
  includeLegalFees?: boolean;
  // Add other fields as needed
}

interface RegionTaxRates {
  [key: string]: {
    transferTax: number;
    legalFees: number;
  };
}

// Constants for tax rates by region
const regionTaxRates: RegionTaxRates = {
  'andalucia': { transferTax: 0.07, legalFees: 0.01 },
  'aragon': { transferTax: 0.08, legalFees: 0.01 },
  'asturias': { transferTax: 0.08, legalFees: 0.01 },
  'canarias': { transferTax: 0.065, legalFees: 0.01 },
  'cantabria': { transferTax: 0.08, legalFees: 0.01 },
  'castilla-la-mancha': { transferTax: 0.08, legalFees: 0.01 },
  'castilla-y-leon': { transferTax: 0.08, legalFees: 0.01 },
  'cataluna': { transferTax: 0.10, legalFees: 0.01 },
  'comunidad-valenciana': { transferTax: 0.10, legalFees: 0.01 },
  'extremadura': { transferTax: 0.08, legalFees: 0.01 },
  'galicia': { transferTax: 0.09, legalFees: 0.01 },
  'islas-baleares': { transferTax: 0.08, legalFees: 0.01 },
  'la-rioja': { transferTax: 0.07, legalFees: 0.01 },
  'madrid': { transferTax: 0.06, legalFees: 0.01 },
  'murcia': { transferTax: 0.08, legalFees: 0.01 },
  'navarra': { transferTax: 0.06, legalFees: 0.01 },
  'pais-vasco': { transferTax: 0.04, legalFees: 0.01 }
};

// Helper functions
const calculateTransferTax = (price: number, region: string): number => {
  const taxRate = regionTaxRates[region]?.transferTax || 0.08; // Default to 8% if region not found
  return price * taxRate;
};

const calculateLegalFees = (price: number, region: string, customFees?: number): number => {
  if (customFees !== undefined) {
    return customFees;
  }
  const feeRate = regionTaxRates[region]?.legalFees || 0.01; // Default to 1% if region not found
  return price * feeRate;
};

const calculateNotaryFees = (price: number): number => {
  // Simplified calculation
  return price * 0.005; // Approximately 0.5% of property price
};

const calculateRegisterFees = (price: number): number => {
  // Simplified calculation
  return price * 0.004; // Approximately 0.4% of property price
};

// Main calculation function
export const calculateBuyerCosts = (formData: PropertyFormData): CalculationResult => {
  const { price, region, agencyFee } = formData;
  
  // Calculate taxes and fees
  const transferTax = calculateTransferTax(price, region);
  const notaryFees = calculateNotaryFees(price);
  const registerFees = calculateRegisterFees(price);
  
  // Agency fees (optional)
  let calculatedAgencyFee = 0;
  if (formData.includeAgencyFees) {
    calculatedAgencyFee = agencyFee;
  }
  
  // Legal fees (optional)
  let calculatedLegalFees = 0;
  if (formData.includeLegalFees) {
    calculatedLegalFees = calculateLegalFees(price, region, formData.legalFees);
  }
  
  // Calculate totals
  const totalTaxes = transferTax;
  const totalFees = notaryFees + registerFees + calculatedAgencyFee + calculatedLegalFees;
  const totalCost = price + totalTaxes + totalFees;
  
  // Create the breakdown
  const buyerBreakdown: CalculationBreakdown = {
    propertyPrice: price,
    taxes: {
      transferTax
    },
    fees: {
      notaryFees,
      registerFees,
      agencyFees: calculatedAgencyFee,
      legalFees: calculatedLegalFees
    },
    totalAdditionalCosts: totalTaxes + totalFees,
    totalCost
  };

  const sellerBreakdown = calculateSellerCosts(formData);
  
  // Return a correctly typed CalculationResult
  return {
    total: totalCost,
    taxes: {
      iva: 0,
      transferTax,
      plusvalia: 0,
      ajdTax: 0,
      ibiTax: 0
    },
    expenses: {
      notary: notaryFees,
      registry: registerFees,
      agency: calculatedAgencyFee,
      legalFees: calculatedLegalFees,
      appraisal: 0
    },
    buyer: buyerBreakdown,
    seller: sellerBreakdown
  };
};

// Calculate seller costs
const calculateSellerCosts = (formData: PropertyFormData): CalculationBreakdown => {
  const { price, agencyFee } = formData;
  
  // Capital gains tax (simplified)
  const capitalGainsTax = price * 0.19; // 19% of property price as a simplification
  
  // Agency fees (optional)
  let calculatedAgencyFee = 0;
  if (formData.includeAgencyFees) {
    calculatedAgencyFee = agencyFee;
  }
  
  // Calculate totals
  const totalTaxes = capitalGainsTax;
  const totalFees = calculatedAgencyFee;
  const totalCost = price - totalTaxes - totalFees;
  
  // Create the breakdown
  const breakdown: CalculationBreakdown = {
    propertyPrice: price,
    taxes: {
      capitalGainsTax
    },
    fees: {
      agencyFees: calculatedAgencyFee
    },
    totalAdditionalCosts: totalTaxes + totalFees,
    totalCost
  };
  
  return breakdown;
};
