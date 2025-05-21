
import { PropertyValuation } from "@/services/propertyValuatorService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps,
  LineChart,
  Line,
  Legend,
  ReferenceLine
} from "recharts";
import { 
  Building, 
  Euro, 
  Maximize2, 
  Share2,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
  
  // Chart data for price range
  const priceRangeData = [
    {
      name: "Precio mínimo",
      valor: result.valoracion.precio_min
    },
    {
      name: "Precio sugerido",
      valor: result.valoracion.precio_sugerido
    },
    {
      name: "Precio máximo",
      valor: result.valoracion.precio_max
    }
  ];
  
  // Chart data for comparables
  const comparablesData = result.comparables_destacados.map(comparable => ({
    name: comparable.fuente,
    precio: comparable.precio,
    precio_m2: comparable.precio_m2,
    superficie: comparable.superficie_m2,
    url: comparable.url
  }));
  
  const copyToClipboard = () => {
    const resultJson = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(resultJson);
    toast.success("Valoración copiada al portapapeles");
  };
  
  const shareValuation = () => {
    const text = `Valoración inmobiliaria: ${result.vivienda_objetivo.tipo} de ${result.vivienda_objetivo.superficie_m2}m² en ${result.vivienda_objetivo.distrito}, ${result.vivienda_objetivo.direccion || ""}. Precio estimado: ${formatCurrency(result.valoracion.precio_sugerido)} (${formatCurrency(result.valoracion.precio_m2_sugerido)}/m²)`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Valoración Inmobiliaria',
        text: text
      }).then(() => {
        console.log('Shared successfully');
      }).catch((error) => {
        console.log('Error sharing:', error);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
    
    function fallbackShare() {
      navigator.clipboard.writeText(text);
      toast.success("Texto de valoración copiado al portapapeles");
    }
  };
  
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-realestate-purple">{formatCurrency(payload[0].value as number)}</p>
        </div>
      );
    }
    return null;
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
        
        <CardContent className="p-4 pt-5">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Rango de precios:</h4>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={150}
                  data={priceRangeData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `${Math.round(value / 1000)}k`} 
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="valor" 
                    fill="url(#colorGradient)" 
                    barSize={60} 
                    radius={[4, 4, 0, 0]} 
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8a2be2" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#20b2aa" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="text-sm border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Precio mínimo estimado:</span>
              <span className="font-medium">{formatCurrency(result.valoracion.precio_min)}</span>
            </div>
            <div className="flex justify-between">
              <span>Precio máximo estimado:</span>
              <span className="font-medium">{formatCurrency(result.valoracion.precio_max)}</span>
            </div>
            <div className="flex justify-between">
              <span>Valoración basada en:</span>
              <span className="font-medium">{result.estadisticas_comparables.n} inmuebles comparables</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Comparables Card */}
      {showDetails && (
        <Card className="border overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Inmuebles comparables destacados</h3>
          </div>
          
          <CardContent className="p-4 pt-5">
            <div className="h-[280px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={comparablesData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => `${value}€/m²`} 
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${Math.round(value / 1000)}k€`} 
                    domain={['auto', 'auto']}
                  />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine 
                    yAxisId="left"
                    y={result.valoracion.precio_m2_sugerido} 
                    stroke="#8a2be2"
                    strokeDasharray="3 3"
                    label={{ value: "Precio sugerido", position: "insideBottomRight", fill: "#8a2be2" }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="precio_m2" 
                    stroke="#20b2aa" 
                    name="Precio/m²"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="precio" 
                    stroke="#8a2be2" 
                    name="Precio total" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 mt-6">
              {result.comparables_destacados.map((comparable, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium capitalize">{comparable.fuente}</p>
                    <p className="text-sm text-gray-600">
                      {comparable.superficie_m2}m² - {formatCurrency(comparable.precio_m2)}/m²
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-3">{formatCurrency(comparable.precio)}</span>
                    <a 
                      href={comparable.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-600 hover:text-realestate-purple rounded-full hover:bg-gray-100"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Statistics and Methodology */}
      {showDetails && (
        <Card className="border">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Estadísticas detalladas</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Media precio/m²:</span>
                <span>{formatCurrency(result.estadisticas_comparables.media_precio_m2)}/m²</span>
              </div>
              <div className="flex justify-between">
                <span>Mediana precio/m²:</span>
                <span>{formatCurrency(result.estadisticas_comparables.mediana_precio_m2)}/m²</span>
              </div>
              <div className="flex justify-between">
                <span>Desviación estándar:</span>
                <span>{formatCurrency(result.estadisticas_comparables.desviacion_estandar_m2)}/m²</span>
              </div>
              <div className="flex justify-between">
                <span>Inmuebles analizados:</span>
                <span>{result.estadisticas_comparables.n}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Metodología:</h4>
              <p className="text-sm text-gray-600">{result.metodologia_breve}</p>
            </div>
          </CardContent>
        </Card>
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
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Maximize2 size={16} />
          Copiar JSON
        </Button>
        
        <Button
          variant="outline"
          onClick={shareValuation}
          className="flex items-center gap-2"
        >
          <Share2 size={16} />
          Compartir
        </Button>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm">
        <p className="text-amber-700">{result.disclaimer}</p>
        <p className="text-amber-600 text-xs mt-1">Fecha de cálculo: {result.fecha_calculo}</p>
      </div>
    </motion.div>
  );
}
