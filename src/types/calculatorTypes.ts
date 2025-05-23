
export interface CalculatorRequest {
  propertyType: 'new' | 'used';
  propertyValue: number;
  includeAgencyFees: boolean;
  includeLegalFees: boolean;
  municipality?: string;
  previousPurchaseYear?: number;
  previousPurchasePrice?: number;
}

export interface CalculationResult {
  total: number;
  taxes: {
    iva: number;
    transferTax: number;
    plusvalia: number;
    ajdTax: number;
    ibiTax: number;
  };
  expenses: {
    notary: number;
    registry: number;
    agency: number;
    legalFees: number;
    appraisal: number;
  };
  plusvaliaDetails?: string;
  // Adding buyer and seller properties to align with calculatorService.ts usage
  buyer?: CalculationBreakdown;
  seller?: CalculationBreakdown;
}

// Adding the missing CalculationBreakdown interface
export interface CalculationBreakdown {
  propertyPrice: number;
  taxes: {
    transferTax?: number;
    capitalGainsTax?: number;
    [key: string]: number | undefined;
  };
  fees: {
    notaryFees?: number;
    registerFees?: number;
    agencyFees?: number;
    legalFees?: number;
    [key: string]: number | undefined;
  };
  totalAdditionalCosts: number;
  totalCost: number;
}

// Updated PropertyFormData to include all needed fields
export interface PropertyFormData {
  region: string;
  price: string | number;
  propertyType: 'new' | 'used';
  hasLoan: boolean;
  loanAmount?: string | number;
  acquisitionValue?: string | number;
  acquisitionDate?: string;
  improvements?: string | number;
  municipalCapitalGainsTax?: string | number;
  remainingLoan?: string | number;
  includeAgencyFees: boolean;
  includeLegalFees: boolean;
  agencyFee?: number; // Adding missing field used in calculatorService
}

export interface RegionTaxRates {
  [key: string]: { 
    ITP: number; 
    AJD: number 
  };
}
