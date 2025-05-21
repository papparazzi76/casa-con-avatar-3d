
export interface PropertyFormData {
  region: string;
  municipality: string;
  price: number;
  propertyType: 'new' | 'used';
  specialRegime: string;
  hasLoan: boolean;
  loanAmount: number | '';
  bank: string;
  deedDate: string;
  // Seller specific data
  acquisitionDate: string;
  acquisitionValue: number | '';
  improvements: number | '';
  adjustmentCoefficient: number | '';
  yearsOfResidence: number | '';
  remainingLoan: number | '';
  municipalCapitalGainsTax: number | '';
  // Buyer specific data
  financingPercentage: number | '';
}

export interface BuyerDetails {
  total: number;
  detalle: {
    [key: string]: number;
  };
}

export interface SellerDetails {
  total: number;
  detalle: {
    [key: string]: number;
  };
}

export interface CalculationResult {
  comprador: BuyerDetails;
  vendedor: SellerDetails;
  supuestos: string[];
  fecha_cálculo: string;
}

export interface RegionTaxRates {
  [region: string]: {
    ITP: number;
    AJD: number;
  };
}
