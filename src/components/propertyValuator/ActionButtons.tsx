
import { Button } from "@/components/ui/button";
import { Maximize2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { PropertyValuation } from "@/services/propertyValuator";

interface ActionButtonsProps {
  result: PropertyValuation;
  formatCurrency: (amount: number) => string;
}

export function ActionButtons({ result, formatCurrency }: ActionButtonsProps) {
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
  
  return (
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
  );
}
