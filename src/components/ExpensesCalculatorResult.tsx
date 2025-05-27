
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationResult } from "@/types/calculatorTypes";

interface ExpensesCalculatorResultProps {
  result: CalculationResult;
}

export function ExpensesCalculatorResult({ result }: ExpensesCalculatorResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const calculatePercentage = (amount: number, total: number) => {
    if (total <= 0) return "0%";
    return `${((amount / total) * 100).toFixed(1)}%`;
  };

  // Function to render a result row
  const ResultRow = ({ label, amount, total = result.total, explanation }: { 
    label: string; 
    amount: number; 
    total?: number;
    explanation?: string;
  }) => (
    <div className="flex flex-col py-2">
      <div className="flex justify-between">
        <span>{label}</span>
        <div className="flex gap-4">
          <span className="text-gray-500 text-sm min-w-[60px] text-right">
            {calculatePercentage(amount, total)}
          </span>
          <span className="font-medium">{formatCurrency(amount)}</span>
        </div>
      </div>
      {explanation && (
        <div className="text-xs text-gray-600 mt-1 ml-0">
          {explanation}
        </div>
      )}
    </div>
  );

  // Si hay separación por roles, mostrar el formato específico
  if (result.separateByRole) {
    return (
      <div className="space-y-6">
        {result.buyer && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">💰 Gastos del Comprador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-2 border-b mb-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total a pagar</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(result.buyer.totalCost)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Precio inmueble: {formatCurrency(result.buyer.propertyPrice)} + 
                  Gastos adicionales: {formatCurrency(result.buyer.totalAdditionalCosts)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Impuestos a pagar</h3>
                  <div className="border-b border-gray-100">
                    {result.buyer.taxes.iva && result.buyer.taxes.iva > 0 && (
                      <ResultRow label="IVA (10%)" amount={result.buyer.taxes.iva} total={result.buyer.totalAdditionalCosts} />
                    )}
                    {result.buyer.taxes.transferTax && result.buyer.taxes.transferTax > 0 && (
                      <ResultRow 
                        label="Impuesto de Transmisiones Patrimoniales (ITP)" 
                        amount={result.buyer.taxes.transferTax} 
                        total={result.buyer.totalAdditionalCosts}
                        explanation={result.buyer.taxes.itpExplanation}
                      />
                    )}
                    {result.buyer.taxes.ajdTax && result.buyer.taxes.ajdTax > 0 && (
                      <ResultRow label="Actos Jurídicos Documentados (AJD)" amount={result.buyer.taxes.ajdTax} total={result.buyer.totalAdditionalCosts} />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Gastos y gestiones</h3>
                  <div className="border-b border-gray-100">
                    {result.buyer.fees.notaryFees && result.buyer.fees.notaryFees > 0 && (
                      <ResultRow label="Notaría" amount={result.buyer.fees.notaryFees} total={result.buyer.totalAdditionalCosts} />
                    )}
                    {result.buyer.fees.registerFees && result.buyer.fees.registerFees > 0 && (
                      <ResultRow label="Registro de la Propiedad" amount={result.buyer.fees.registerFees} total={result.buyer.totalAdditionalCosts} />
                    )}
                    {result.buyer.fees.agencyFees && result.buyer.fees.agencyFees > 0 && (
                      <ResultRow label="Comisión Agencia Inmobiliaria" amount={result.buyer.fees.agencyFees} total={result.buyer.totalAdditionalCosts} />
                    )}
                    {result.buyer.fees.legalFees && result.buyer.fees.legalFees > 0 && (
                      <ResultRow label="Asesoramiento legal" amount={result.buyer.fees.legalFees} total={result.buyer.totalAdditionalCosts} />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result.seller && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600">📈 Gastos del Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-2 border-b mb-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total a deducir de la venta</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(result.seller.totalCost)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Ingresos netos estimados: {formatCurrency(result.seller.propertyPrice - result.seller.totalCost)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Impuestos a liquidar</h3>
                  <div className="border-b border-gray-100">
                    {result.seller.taxes.plusvalia && result.seller.taxes.plusvalia > 0 && (
                      <ResultRow label="Plusvalía Municipal" amount={result.seller.taxes.plusvalia} total={result.seller.totalCost} />
                    )}
                    {result.seller.taxes.capitalGainsTax && result.seller.taxes.capitalGainsTax > 0 && (
                      <ResultRow label="IRPF (Ganancia Patrimonial)" amount={result.seller.taxes.capitalGainsTax} total={result.seller.totalCost} />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Gastos y comisiones</h3>
                  <div className="border-b border-gray-100">
                    {result.seller.fees.agencyFees && result.seller.fees.agencyFees > 0 && (
                      <ResultRow label="Comisión Agencia Inmobiliaria" amount={result.seller.fees.agencyFees} total={result.seller.totalCost} />
                    )}
                    {result.seller.fees.legalFees && result.seller.fees.legalFees > 0 && (
                      <ResultRow label="Asesoramiento legal" amount={result.seller.fees.legalFees} total={result.seller.totalCost} />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Desglose de la plusvalía si está disponible */}
        {result.plusvaliaDetails && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Desglose de la Plusvalía Municipal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{result.plusvaliaDetails}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Formato tradicional para compatibilidad
  return (
    <div className="space-y-6">
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
                <span>Impuestos ({calculatePercentage(
                  result.taxes.iva + 
                  result.taxes.transferTax + 
                  result.taxes.ajdTax + 
                  result.taxes.ibiTax + 
                  result.taxes.plusvalia,
                  result.total
                )})</span>
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
                <span>Gastos ({calculatePercentage(
                  result.expenses.notary + 
                  result.expenses.registry + 
                  result.expenses.agency + 
                  result.expenses.legalFees + 
                  result.expenses.appraisal,
                  result.total
                )})</span>
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

      {/* Desglose de la plusvalía si está disponible */}
      {result.plusvaliaDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Desglose de la Plusvalía Municipal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{result.plusvaliaDetails}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
