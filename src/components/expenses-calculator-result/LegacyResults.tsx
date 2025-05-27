
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationResult } from "@/types/calculatorTypes";
import { formatCurrency } from "./formatters";
import { ResultRow } from "./ResultRow";

interface LegacyResultsProps {
  result: CalculationResult;
}

export function LegacyResults({ result }: LegacyResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Resumen de gastos e impuestos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-2 border-b mb-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(result.total)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Impuestos</h3>
            <div className="border-b border-gray-100">
              {result.taxes.iva > 0 && (
                <ResultRow label="IVA (10%)" amount={result.taxes.iva} />
              )}
              {result.taxes.transferTax > 0 && (
                <ResultRow label="Impuesto de Transmisiones Patrimoniales" amount={result.taxes.transferTax} />
              )}
              {result.taxes.ajdTax > 0 && (
                <ResultRow label="Actos Jurídicos Documentados" amount={result.taxes.ajdTax} />
              )}
              <ResultRow label="Impuesto sobre Bienes Inmuebles (IBI)" amount={result.taxes.ibiTax} />
              <ResultRow label="Plusvalía Municipal" amount={result.taxes.plusvalia} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Gastos</h3>
            <div className="border-b border-gray-100">
              <ResultRow label="Notaría" amount={result.expenses.notary} />
              <ResultRow label="Registro de la Propiedad" amount={result.expenses.registry} />
              {result.expenses.agency > 0 && (
                <ResultRow label="Comisión Agencia Inmobiliaria" amount={result.expenses.agency} />
              )}
              {result.expenses.legalFees > 0 && (
                <ResultRow label="Asesoramiento legal" amount={result.expenses.legalFees} />
              )}
              {result.expenses.appraisal > 0 && (
                <ResultRow label="Tasación" amount={result.expenses.appraisal} />
              )}
            </div>
          </div>

          <div className="mt-6 pt-2 border-t">
            <div className="flex justify-between items-center">
              <span>Total Impuestos</span>
              <span className="font-medium">
                {formatCurrency(
                  result.taxes.iva + 
                  result.taxes.transferTax + 
                  result.taxes.ajdTax + 
                  result.taxes.ibiTax + 
                  result.taxes.plusvalia
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Total Gastos</span>
              <span className="font-medium">
                {formatCurrency(
                  result.expenses.notary + 
                  result.expenses.registry + 
                  result.expenses.agency + 
                  result.expenses.legalFees + 
                  result.expenses.appraisal
                )}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
