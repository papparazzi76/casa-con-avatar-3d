
import { CalculationResult } from "@/types/calculatorTypes";
import { BuyerResults } from "./BuyerResults";
import { SellerResults } from "./SellerResults";
import { LegacyResults } from "./LegacyResults";
import { PlusvaliaDetails } from "./PlusvaliaDetails";

interface ExpensesCalculatorResultProps {
  result: CalculationResult;
}

export function ExpensesCalculatorResult({ result }: ExpensesCalculatorResultProps) {
  // Si hay separación por roles, mostrar el formato específico
  if (result.separateByRole) {
    return (
      <div className="space-y-6">
        {result.buyer && <BuyerResults buyer={result.buyer} />}
        {result.seller && <SellerResults seller={result.seller} />}
        {result.plusvaliaDetails && <PlusvaliaDetails details={result.plusvaliaDetails} />}
      </div>
    );
  }

  // Formato tradicional para compatibilidad
  return (
    <div className="space-y-6">
      <LegacyResults result={result} />
      {result.plusvaliaDetails && <PlusvaliaDetails details={result.plusvaliaDetails} />}
    </div>
  );
}
