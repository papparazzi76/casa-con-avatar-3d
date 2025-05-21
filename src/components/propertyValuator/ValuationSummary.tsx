
import { Card, CardContent } from "@/components/ui/card";
import { PriceRangeChart } from "./PriceRangeChart";

interface ValuationSummaryProps {
  priceMin: number;
  priceMax: number;
  priceSuggested: number;
  numComparables: number;
  formatCurrency: (amount: number) => string;
}

export function ValuationSummary({
  priceMin,
  priceMax,
  priceSuggested,
  numComparables,
  formatCurrency
}: ValuationSummaryProps) {
  return (
    <CardContent className="p-4 pt-5">
      <div className="mb-4">
        <h4 className="font-medium mb-2">Rango de precios:</h4>
        <PriceRangeChart 
          priceMin={priceMin}
          priceSuggested={priceSuggested}
          priceMax={priceMax}
          formatCurrency={formatCurrency}
        />
      </div>
      
      <div className="text-sm border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Precio mínimo estimado:</span>
          <span className="font-medium">{formatCurrency(priceMin)}</span>
        </div>
        <div className="flex justify-between">
          <span>Precio máximo estimado:</span>
          <span className="font-medium">{formatCurrency(priceMax)}</span>
        </div>
        <div className="flex justify-between">
          <span>Valoración basada en:</span>
          <span className="font-medium">{numComparables} inmuebles comparables</span>
        </div>
      </div>
    </CardContent>
  );
}
