
import { Card, CardContent } from "@/components/ui/card";

interface StatisticsCardProps {
  mediaPrice: number;
  medianaPrice: number;
  desviacionEstandar: number;
  numComparables: number;
  metodologia: string;
  formatCurrency: (amount: number) => string;
}

export function StatisticsCard({ 
  mediaPrice, 
  medianaPrice, 
  desviacionEstandar, 
  numComparables, 
  metodologia, 
  formatCurrency 
}: StatisticsCardProps) {
  return (
    <Card className="border">
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Estadísticas detalladas</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Media precio/m²:</span>
            <span>{formatCurrency(mediaPrice)}/m²</span>
          </div>
          <div className="flex justify-between">
            <span>Mediana precio/m²:</span>
            <span>{formatCurrency(medianaPrice)}/m²</span>
          </div>
          <div className="flex justify-between">
            <span>Desviación estándar:</span>
            <span>{formatCurrency(desviacionEstandar)}/m²</span>
          </div>
          <div className="flex justify-between">
            <span>Inmuebles analizados:</span>
            <span>{numComparables}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Metodología:</h4>
          <p className="text-sm text-gray-600">{metodologia}</p>
        </div>
      </CardContent>
    </Card>
  );
}
