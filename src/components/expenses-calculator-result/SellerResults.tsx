
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationBreakdown } from "@/types/calculatorTypes";
import { formatCurrency } from "./formatters";
import { ResultRow } from "./ResultRow";

interface SellerResultsProps {
  seller: CalculationBreakdown;
}

export function SellerResults({ seller }: SellerResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-600">📈 Gastos del Vendedor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2 border-b mb-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total a deducir de la venta</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(seller.totalCost)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Ingresos netos estimados: {formatCurrency(seller.propertyPrice - seller.totalCost)}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Impuestos a liquidar</h3>
            <div className="border-b border-gray-100">
              {seller.taxes.plusvalia && seller.taxes.plusvalia > 0 && (
                <ResultRow label="Plusvalía Municipal" amount={seller.taxes.plusvalia} />
              )}
              {seller.taxes.capitalGainsTax && seller.taxes.capitalGainsTax > 0 && (
                <ResultRow label="IRPF (Ganancia Patrimonial)" amount={seller.taxes.capitalGainsTax} />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Gastos y comisiones</h3>
            <div className="border-b border-gray-100">
              {seller.fees.agencyFees && seller.fees.agencyFees > 0 && (
                <ResultRow label="Comisión Agencia Inmobiliaria" amount={seller.fees.agencyFees} />
              )}
              {seller.fees.legalFees && seller.fees.legalFees > 0 && (
                <ResultRow label="Asesoramiento legal" amount={seller.fees.legalFees} />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
