
import { useState } from "react";
import { PropertyValuationOutput } from "@/pages/PropertyValuator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Home, TrendingUp, MapPin } from "lucide-react";

interface PropertyValuationResultProps {
  result: PropertyValuationOutput;
}

export function PropertyValuationResult({ result }: PropertyValuationResultProps) {
  const [showComparables, setShowComparables] = useState(false);
  
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
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Resultado Principal */}
      <Card className="border-2 border-realestate-purple/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white">
          <CardTitle className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            Valoración de tu Propiedad
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-realestate-purple mb-2">
              {formatCurrency(result.estimated_price_eur)}
            </div>
            <div className="text-gray-600">
              Rango: {formatCurrency(result.low_range)} - {formatCurrency(result.high_range)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-semibold">Precio Mínimo</div>
              <div className="text-lg font-bold">{formatCurrency(result.low_range)}</div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-semibold">Precio Estimado</div>
              <div className="text-lg font-bold">{formatCurrency(result.estimated_price_eur)}</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-semibold">Precio Máximo</div>
              <div className="text-lg font-bold">{formatCurrency(result.high_range)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Propiedades Comparables */}
      {result.comps && result.comps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Propiedades Comparables ({result.comps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={() => setShowComparables(!showComparables)}
              className="w-full mb-4"
            >
              {showComparables ? "Ocultar" : "Mostrar"} Comparables
            </Button>
            
            {showComparables && (
              <div className="space-y-3">
                {result.comps.map((comp, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">
                          {formatCurrency(comp.price)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {comp.surface}m² • {comp.bedrooms} hab • {comp.distance}m de distancia
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(Math.round(comp.price / comp.surface))}/m²
                        </div>
                      </div>
                      {comp.url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={comp.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Enlaces Similares */}
      {result.similar_links && result.similar_links.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Propiedades Similares en Idealista
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {result.similar_links.slice(0, 3).map((link, index) => (
                <Button key={index} variant="outline" size="sm" asChild className="w-full justify-start">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver propiedad similar {index + 1}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Aviso Legal */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm">
        <p className="text-amber-700">
          <strong>Importante:</strong> Esta valoración es orientativa y se basa en datos públicos y análisis automatizado. 
          No sustituye una tasación oficial realizada por un profesional cualificado.
        </p>
        <p className="text-amber-600 text-xs mt-1">
          Fecha de cálculo: {new Date().toLocaleDateString('es-ES')}
        </p>
      </div>
    </motion.div>
  );
}
