
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
