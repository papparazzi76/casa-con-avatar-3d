
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { PropertyValuationOutput } from "@/pages/PropertyValuator";

interface PropertyValuationResultProps {
  result: PropertyValuationOutput;
}

export function PropertyValuationResult({ result }: PropertyValuationResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Valoración principal */}
      <Card className="border-2 border-realestate-purple/30">
        <CardHeader className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Valoración estimada
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-3xl font-bold text-realestate-purple">
                {formatCurrency(result.estimated_price_eur)}
              </p>
              <p className="text-gray-600">Precio estimado</p>
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <p className="font-semibold">{formatCurrency(result.low_range)}</p>
                <p className="text-sm text-gray-600">Mínimo</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{formatCurrency(result.high_range)}</p>
                <p className="text-sm text-gray-600">Máximo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Propiedades similares */}
      <Card>
        <CardHeader>
          <CardTitle>Propiedades similares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.similar_links.map((link, index) => {
              const comp = result.comps[index];
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    {comp && (
                      <div className="text-sm space-y-1">
                        <p className="font-medium">{formatCurrency(comp.price)}</p>
                        <p className="text-gray-600">
                          {comp.surface}m² • {comp.bedrooms} hab • {comp.distance}m
                        </p>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparables statistics */}
      {result.comps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis del mercado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {result.comps.length}
                </p>
                <p className="text-sm text-gray-600">Comparables analizados</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(result.comps.reduce((sum, comp) => sum + comp.distance, 0) / result.comps.length)}m
                </p>
                <p className="text-sm text-gray-600">Distancia media</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
