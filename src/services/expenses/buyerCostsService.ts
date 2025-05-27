
import { CalculatorRequest, CalculationBreakdown } from "@/types/calculatorTypes";
import { calculateRegionalITP, REGIONAL_TAX_RATES } from "../regionalTaxService";

export async function calculateBuyerCosts(request: CalculatorRequest): Promise<CalculationBreakdown> {
  const propertyPrice = request.propertyValue || 0;
  
  let breakdown: CalculationBreakdown = {
    propertyPrice,
    taxes: {},
    fees: {},
    totalAdditionalCosts: 0,
    totalCost: propertyPrice
  };

  // Impuestos para compradores
  if (request.propertyType === 'new') {
    // Vivienda nueva: IVA + AJD
    breakdown.taxes.iva = propertyPrice * 0.10; // 10% IVA
    
    // AJD regional rate
    const ajdRate = request.region && REGIONAL_TAX_RATES[request.region] 
      ? REGIONAL_TAX_RATES[request.region].ajdRate 
      : 0.015;
    breakdown.taxes.ajdTax = propertyPrice * ajdRate;
  } else {
    // Vivienda usada: ITP with regional and age considerations
    if (request.region) {
      const itpCalculation = calculateRegionalITP(propertyPrice, request.region, request.buyerAge);
      breakdown.taxes.transferTax = itpCalculation.amount;
      breakdown.taxes.itpExplanation = itpCalculation.explanation;
    } else {
      // Fallback to default 8% if no region specified
      breakdown.taxes.transferTax = propertyPrice * 0.08;
      breakdown.taxes.itpExplanation = "Tarifa estándar del 8% (región no especificada)";
    }
  }

  // Gastos del comprador
  breakdown.fees.notaryFees = Math.min(900, 500 + (propertyPrice * 0.0004));
  breakdown.fees.registerFees = Math.min(800, 400 + (propertyPrice * 0.0004));
  
  if (request.includeAgencyFees) {
    breakdown.fees.agencyFees = propertyPrice * 0.03;
  }
  
  if (request.includeLegalFees) {
    breakdown.fees.legalFees = 1000 + (propertyPrice * 0.005);
  }

  // Calcular totales - ensure all values are numbers and filter out string explanations
  const totalTaxes = Object.entries(breakdown.taxes).reduce((sum, [key, value]) => {
    // Only add numeric values, skip explanation strings
    if (typeof value === 'number') {
      return sum + value;
    }
    return sum;
  }, 0);
  
  const totalFees = Object.values(breakdown.fees).reduce((sum, fee) => {
    return sum + (typeof fee === 'number' ? fee : 0);
  }, 0);
  
  breakdown.totalAdditionalCosts = totalTaxes + totalFees;
  breakdown.totalCost = propertyPrice + breakdown.totalAdditionalCosts;

  return breakdown;
}
