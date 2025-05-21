
import { CalculationResult } from "@/types/calculatorTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Euro } from "lucide-react";
import { useState } from "react";

interface ExpensesCalculatorResultProps {
  result: CalculationResult;
}

export function ExpensesCalculatorResult({ result }: ExpensesCalculatorResultProps) {
  const [showDetails, setShowDetails] = useState(true);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // JSON formateado para copiar
  const resultJson = JSON.stringify(result, null, 2);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultJson);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resumen para el comprador */}
        <Card className="border-2 border-realestate-purple/30 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-realestate-purple/15 to-realestate-turquoise/15 p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="text-realestate-purple">
                <Euro size={20} />
              </span>
              Gastos del Comprador
            </h3>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(result.comprador.total)}
            </p>
          </div>
          
          {showDetails && (
            <CardContent className="p-4 pt-5">
              <div className="space-y-2">
                {Object.entries(result.comprador.detalle).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span>{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{formatCurrency(value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Resumen para el vendedor */}
        <Card className="border-2 border-realestate-turquoise/30 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-realestate-turquoise/15 to-realestate-purple/15 p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <span className="text-realestate-turquoise">
                <Euro size={20} />
              </span>
              Gastos del Vendedor
            </h3>
            <p className="text-2xl font-bold mt-1">
              {formatCurrency(result.vendedor.total)}
            </p>
          </div>
          
          {showDetails && (
            <CardContent className="p-4 pt-5">
              <div className="space-y-2">
                {Object.entries(result.vendedor.detalle).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span>{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{formatCurrency(value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
      
      {/* Botón para mostrar/ocultar detalles */}
      <Button 
        variant="outline" 
        onClick={toggleDetails} 
        className="w-full flex items-center justify-center gap-2"
      >
        {showDetails ? (
          <>
            <ArrowUp size={16} />
            <span>Ocultar detalles</span>
          </>
        ) : (
          <>
            <ArrowDown size={16} />
            <span>Mostrar detalles</span>
          </>
        )}
      </Button>
      
      {/* Supuestos */}
      <div className="mt-6">
        <h4 className="font-medium mb-2">Supuestos utilizados:</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          {result.supuestos.map((supuesto, index) => (
            <li key={index} className="text-gray-600">{supuesto}</li>
          ))}
        </ul>
      </div>
      
      {/* Fecha de cálculo */}
      <div className="text-sm text-gray-500">
        Fecha de cálculo: {result.fecha_cálculo}
      </div>
      
      {/* Advertencia */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm mt-6">
        <p className="font-medium text-amber-800">Aviso importante:</p>
        <p className="text-amber-700 mt-1">
          Los importes mostrados son estimativos y deben ser verificados con un profesional o la administración competente antes de firmar cualquier documento.
        </p>
      </div>
      
      {/* Botón para copiar JSON */}
      <div className="mt-4">
        <Button 
          variant="outline" 
          onClick={copyToClipboard} 
          className="w-full"
        >
          Copiar resultados en formato JSON
        </Button>
      </div>
    </div>
  );
}
