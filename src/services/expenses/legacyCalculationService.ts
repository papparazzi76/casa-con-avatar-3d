
import { CalculatorRequest, CalculationResult } from "@/types/calculatorTypes";
import { calculatePlusvalia } from "./plusvaliaService";

export async function calculateLegacyExpenses(request: CalculatorRequest): Promise<CalculationResult> {
  const propertyPrice = request.propertyValue || 0;
  
  let result: CalculationResult = {
    total: 0,
    taxes: {
      iva: 0,
      transferTax: 0,
      plusvalia: 0,
      ajdTax: 0,
      ibiTax: 0
    },
    expenses: {
      notary: 0,
      registry: 0,
      agency: 0,
      legalFees: 0,
      appraisal: 0
    }
  };
  
  // Base calculation logic for new or used homes
  if (request.propertyType === 'new') {
    // IVA (10%)
    result.taxes.iva = propertyPrice * 0.10;
    
    // Actos Jurídicos Documentados (AJD) (1% - 1.5% typically)
    result.taxes.ajdTax = propertyPrice * 0.015; // We'll use 1.5%
    
    // No transfer tax for new homes
    result.taxes.transferTax = 0;
    
    // No plusvalía para vivienda nueva
    result.taxes.plusvalia = 0;
    
  } else {
    // Used property - Impuesto de Transmisiones Patrimoniales (ITP)
    // Typically 6-10% depending on the region
    result.taxes.transferTax = propertyPrice * 0.08; // Using 8% as an average
    
    // No VAT for used homes
    result.taxes.iva = 0;
    
    // No AJD for used homes (generally)
    result.taxes.ajdTax = 0;
    
    // Plusvalía solo para vivienda usada si hay municipio
    if (request.municipality) {
      const plusvaliaResponse = await calculatePlusvalia(
        request.municipality, 
        propertyPrice, 
        request.previousPurchaseYear || new Date().getFullYear() - 5,
        request.previousPurchasePrice || Math.round(propertyPrice * 0.7)
      );
      
      result.taxes.plusvalia = plusvaliaResponse.amount;
      result.plusvaliaDetails = plusvaliaResponse.explanation;
    }
  }
  
  // Notary fees - approximate
  result.expenses.notary = Math.min(900, 500 + (propertyPrice * 0.0004));
  
  // Registry fees - approximate
  result.expenses.registry = Math.min(800, 400 + (propertyPrice * 0.0004));
  
  // Agency fees if applicable
  if (request.includeAgencyFees) {
    result.expenses.agency = propertyPrice * 0.03; // Typically 3-5%
  }
  
  // Legal assistance fees if applicable
  if (request.includeLegalFees) {
    result.expenses.legalFees = 1000 + (propertyPrice * 0.005); // Base fee + percentage
  }
  
  // IBI Tax - rough approximation
  result.taxes.ibiTax = propertyPrice * 0.005; // Usually 0.4% - 1.1% of cadastral value

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
}
