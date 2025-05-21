
import { PropertyValuation } from "@/services/propertyValuator";
import { Badge } from "@/components/ui/badge";
import { Building, Euro, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ValuationHeaderProps {
  result: PropertyValuation;
  formatCurrency: (amount: number) => string;
}

export function ValuationHeader({ result, formatCurrency }: ValuationHeaderProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "alta":
        return "bg-green-100 text-green-800";
      case "media":
        return "bg-amber-100 text-amber-800";
      case "baja":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const confidenceLabel = {
    "alta": "Alta",
    "media": "Media",
    "baja": "Baja"
  };

  return (
    <div className="bg-gradient-to-r from-realestate-purple/15 to-realestate-turquoise/15 p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building size={20} className="text-realestate-purple" />
            <h3 className="text-lg font-medium">
              {result.vivienda_objetivo.tipo.charAt(0).toUpperCase() + result.vivienda_objetivo.tipo.slice(1)} en {result.vivienda_objetivo.distrito}
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            {result.vivienda_objetivo.direccion || `${result.vivienda_objetivo.distrito}`}, {result.vivienda_objetivo.superficie_m2}m²
          </p>
        </div>
        <Badge className={`${getConfidenceColor(result.valoracion.confianza)}`}>
          Confianza {confidenceLabel[result.valoracion.confianza as keyof typeof confidenceLabel]}
        </Badge>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Euro size={20} className="text-realestate-purple" />
          <span className="text-gray-600">Valoración estimada:</span>
        </div>
        <h2 className="text-3xl font-bold mt-1">{formatCurrency(result.valoracion.precio_sugerido)}</h2>
        <p className="text-gray-600 text-sm flex items-center mt-1">
          <TrendingUp size={16} className="mr-1 text-realestate-turquoise" />
          {formatCurrency(result.valoracion.precio_m2_sugerido)}/m²
        </p>
      </div>
    </div>
  );
}
