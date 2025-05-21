
import { useState } from "react";
import { PropertyValuation } from "@/services/propertyValuator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ValuationHeader } from "./propertyValuator/ValuationHeader";
import { ValuationSummary } from "./propertyValuator/ValuationSummary";
import { ComparablesCard } from "./propertyValuator/ComparablesCard";
import { StatisticsCard } from "./propertyValuator/StatisticsCard";
import { ActionButtons } from "./propertyValuator/ActionButtons";

interface PropertyValuatorResultProps {
  result: PropertyValuation;
}

export function PropertyValuatorResult({ result }: PropertyValuatorResultProps) {
  const [showDetails, setShowDetails] = useState(true);
  
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
      {/* Main Valuation Card */}
      <Card className="border-2 border-realestate-purple/30 overflow-hidden">
        <ValuationHeader result={result} formatCurrency={formatCurrency} />
        
        <ValuationSummary 
          priceMin={result.valoracion.precio_min}
          priceMax={result.valoracion.precio_max}
          priceSuggested={result.valoracion.precio_sugerido}
          numComparables={result.estadisticas_comparables.n}
          formatCurrency={formatCurrency}
        />
      </Card>
      
      {/* Comparables Card */}
      {showDetails && (
        <ComparablesCard 
          comparables={result.comparables_destacados}
          suggestedPricePerM2={result.valoracion.precio_m2_sugerido}
          formatCurrency={formatCurrency}
        />
      )}
      
      {/* Statistics and Methodology */}
      {showDetails && (
        <StatisticsCard 
          mediaPrice={result.estadisticas_comparables.media_precio_m2}
          medianaPrice={result.estadisticas_comparables.mediana_precio_m2}
          desviacionEstandar={result.estadisticas_comparables.desviacion_estandar_m2}
          numComparables={result.estadisticas_comparables.n}
          metodologia={result.metodologia_breve}
          formatCurrency={formatCurrency}
        />
      )}
      
      {/* Toggle Details Button */}
      <Button 
        variant="outline" 
        onClick={() => setShowDetails(!showDetails)} 
        className="w-full"
      >
        {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
      </Button>
      
      {/* Action Buttons */}
      <ActionButtons result={result} formatCurrency={formatCurrency} />
      
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm">
        <p className="text-amber-700">{result.disclaimer}</p>
        <p className="text-amber-600 text-xs mt-1">Fecha de cálculo: {result.fecha_calculo}</p>
      </div>
    </motion.div>
  );
}
