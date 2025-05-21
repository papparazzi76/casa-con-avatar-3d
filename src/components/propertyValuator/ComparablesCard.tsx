
import { Card, CardContent } from "@/components/ui/card";
import { ComparablesChart } from "./ComparablesChart";
import { ComparablesList } from "./ComparablesList";
import { ComparableProperty } from "@/services/propertyValuator";

interface ComparablesCardProps {
  comparables: ComparableProperty[];
  suggestedPricePerM2: number;
  formatCurrency: (amount: number) => string;
}

export function ComparablesCard({
  comparables,
  suggestedPricePerM2,
  formatCurrency
}: ComparablesCardProps) {
  // Chart data for comparables
  const comparablesData = comparables.map(comparable => ({
    name: comparable.fuente,
    precio: comparable.precio,
    precio_m2: comparable.precio_m2,
    superficie: comparable.superficie_m2,
    url: comparable.url
  }));

  return (
    <Card className="border overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-medium">Inmuebles comparables destacados</h3>
      </div>
      
      <CardContent className="p-4 pt-5">
        <ComparablesChart 
          comparablesData={comparablesData} 
          suggestedPricePerM2={suggestedPricePerM2} 
        />
        
        <ComparablesList 
          comparables={comparables} 
          formatCurrency={formatCurrency} 
        />
      </CardContent>
    </Card>
  );
}
