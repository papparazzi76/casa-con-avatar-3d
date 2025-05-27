
import { CalculationResult, CalculatorRequest } from "@/types/calculatorTypes";
import { calculateBuyerCosts } from "./expenses/buyerCostsService";
import { calculateSellerCosts } from "./expenses/sellerCostsService";
import { calculateLegacyExpenses } from "./expenses/legacyCalculationService";

export async function calculateExpenses(request: CalculatorRequest): Promise<CalculationResult> {
  try {
    // Si se especifica un rol, calculamos por separado
    if (request.userRole === 'buyer' || request.userRole === 'seller') {
      return calculateByRole(request);
    }
    
    // Cálculo tradicional para compatibilidad
    return await calculateLegacyExpenses(request);
  } catch (error) {
    console.error("Error calculating expenses:", error);
    throw new Error("Error al calcular los gastos e impuestos");
  }
}

async function calculateByRole(request: CalculatorRequest): Promise<CalculationResult> {
  let result: CalculationResult = {
    total: 0,
    taxes: { iva: 0, transferTax: 0, plusvalia: 0, ajdTax: 0, ibiTax: 0 },
    expenses: { notary: 0, registry: 0, agency: 0, legalFees: 0, appraisal: 0 },
    separateByRole: true
  };

  if (request.userRole === 'buyer') {
    result.buyer = await calculateBuyerCosts(request);
    result.total = result.buyer.totalCost;
  } else if (request.userRole === 'seller') {
    result.seller = await calculateSellerCosts(request);
    result.total = result.seller.totalCost;
  }

  return result;
}
