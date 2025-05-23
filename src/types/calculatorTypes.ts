
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
}

// Add missing types for calculatorService
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
}

export interface RegionTaxRates {
  [key: string]: { 
    ITP: number; 
    AJD: number 
  };
}
