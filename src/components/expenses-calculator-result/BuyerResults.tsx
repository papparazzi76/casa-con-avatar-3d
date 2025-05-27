
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationBreakdown } from "@/types/calculatorTypes";
import { formatCurrency } from "./formatters";
import { ResultRow } from "./ResultRow";

interface BuyerResultsProps {
  buyer: CalculationBreakdown;
}

export function BuyerResults({ buyer }: BuyerResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">💰 Gastos del Comprador</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2 border-b mb-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total a pagar</span>
            <span className="text-lg font-bold text-blue-600">
              {formatCurrency(buyer.totalCost)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Precio inmueble: {formatCurrency(buyer.propertyPrice)} + 
            Gastos adicionales: {formatCurrency(buyer.totalAdditionalCosts)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Impuestos a pagar</h3>
            <div className="border-b border-gray-100">
              {buyer.taxes.iva && buyer.taxes.iva > 0 && (
                <ResultRow label="IVA (10%)" amount={buyer.taxes.iva} />
              )}
              {buyer.taxes.transferTax && buyer.taxes.transferTax > 0 && (
                <ResultRow 
                  label="Impuesto de Transmisiones Patrimoniales (ITP)" 
                  amount={buyer.taxes.transferTax} 
                  explanation={buyer.taxes.itpExplanation}
                />
              )}
              {buyer.taxes.ajdTax && buyer.taxes.ajdTax > 0 && (
                <ResultRow label="Actos Jurídicos Documentados (AJD)" amount={buyer.taxes.ajdTax} />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Gastos y gestiones</h3>
            <div className="border-b border-gray-100">
              {buyer.fees.notaryFees && buyer.fees.notaryFees > 0 && (
                <ResultRow label="Notaría" amount={buyer.fees.notaryFees} />
              )}
              {buyer.fees.registerFees && buyer.fees.registerFees > 0 && (
                <ResultRow label="Registro de la Propiedad" amount={buyer.fees.registerFees} />
              )}
              {buyer.fees.agencyFees && buyer.fees.agencyFees > 0 && (
                <ResultRow label="Comisión Agencia Inmobiliaria" amount={buyer.fees.agencyFees} />
              )}
              {buyer.fees.legalFees && buyer.fees.legalFees > 0 && (
                <ResultRow label="Asesoramiento legal" amount={buyer.fees.legalFees} />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
