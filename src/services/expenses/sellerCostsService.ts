
import { CalculatorRequest, CalculationBreakdown } from "@/types/calculatorTypes";
import { calculatePlusvalia } from "./plusvaliaService";

export async function calculateSellerCosts(request: CalculatorRequest): Promise<CalculationBreakdown> {
  const propertyPrice = request.propertyValue || 0;
  
  let breakdown: CalculationBreakdown = {
    propertyPrice,
    taxes: {},
    fees: {},
    totalAdditionalCosts: 0,
    totalCost: 0 // Para vendedores, esto representará los costos a deducir
  };

  // Plusvalía municipal solo para vivienda usada
  if (request.propertyType === 'used' && request.municipality) {
    const plusvaliaResponse = await calculatePlusvalia(
      request.municipality, 
      propertyPrice, 
      request.previousPurchaseYear || new Date().getFullYear() - 5,
      request.previousPurchasePrice || Math.round(propertyPrice * 0.7)
    );
    breakdown.taxes.plusvalia = plusvaliaResponse.amount;
  }

  // Ganancia patrimonial (IRPF) - aproximación
  if (request.previousPurchasePrice && request.previousPurchaseYear) {
    const currentPrice = Number(propertyPrice);
    const previousPrice = Number(request.previousPurchasePrice);
    const capitalGain = currentPrice - previousPrice;
    
    if (capitalGain > 0) {
      // Aplicar coeficientes de actualización si aplica
      const yearsHeld = new Date().getFullYear() - request.previousPurchaseYear;
      let taxableGain = capitalGain;
      
      // Reducción por años de tenencia (si fue adquirida antes de 2015)
      if (request.previousPurchaseYear < 2015 && yearsHeld > 1) {
        const reductionPercentage = Math.min(yearsHeld * 0.11, 0.60); // 11% por año, máximo 60%
        taxableGain = capitalGain * (1 - reductionPercentage);
      }
      
      // Impuesto sobre ganancia patrimonial (aproximado 19-23%)
      breakdown.taxes.capitalGainsTax = taxableGain * 0.19;
    }
  }

  // Gastos del vendedor
  if (request.includeAgencyFees) {
    breakdown.fees.agencyFees = propertyPrice * 0.03;
  }
  
  if (request.includeLegalFees) {
    breakdown.fees.legalFees = 1000;
  }

  // Calcular totales - ensure all values are numbers and filter out string explanations
  const totalTaxes = Object.entries(breakdown.taxes).reduce((sum, [key, value]) => {
    // Only add numeric values, skip explanation strings
    if (typeof value === 'number') {
      return sum + value;
    }
    return sum;
  }, 0);
  
  const totalFees = Object.values(breakdown.fees).reduce((sum, fee) => sum + (Number(fee) || 0), 0);
  
  breakdown.totalAdditionalCosts = totalTaxes + totalFees;
  breakdown.totalCost = breakdown.totalAdditionalCosts; // Costos que debe pagar el vendedor

  return breakdown;
}
