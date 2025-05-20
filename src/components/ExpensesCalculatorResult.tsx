
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorResult } from "@/types/calculator";
import { CopyIcon, DownloadIcon, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpensesCalculatorResultProps {
  result: CalculatorResult | null;
}

export function ExpensesCalculatorResult({ result }: ExpensesCalculatorResultProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("comprador");
  
  if (!result) {
    return (
      <Card className="shadow-sm h-full flex items-center justify-center min-h-[400px]">
        <CardContent className="p-8 text-center">
          <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">Resultado del cálculo</h3>
          <p className="text-muted-foreground">
            Completa el formulario y haz clic en "Calcular" para ver el desglose de gastos e impuestos.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    toast({
      title: "Copiado al portapapeles",
      description: "Los datos han sido copiados en formato JSON."
    });
  };
  
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "calculadora-gastos-inmobiliarios.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resultado del cálculo</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
            <CopyIcon className="h-4 w-4 mr-2" />
            Copiar JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Descargar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border p-2 rounded-md bg-muted mb-4">
          <p className="text-xs text-muted-foreground">Fecha de cálculo: {result.fecha_calculo}</p>
        </div>
        
        <Tabs defaultValue="comprador" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="comprador">Comprador</TabsTrigger>
            <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
          </TabsList>
          <TabsContent value="comprador" className="p-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <h3 className="text-lg font-semibold">Total gastos comprador:</h3>
                <span className="text-xl font-bold">{result.comprador.total.toLocaleString('es-ES')} €</span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(result.comprador.detalle).map(([concepto, importe]) => (
                  <div key={concepto} className="flex justify-between items-center">
                    <span className="text-sm">{formatConceptName(concepto)}</span>
                    <span className="font-medium">{typeof importe === 'number' ? importe.toLocaleString('es-ES') : importe} {typeof importe === 'number' ? '€' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="vendedor" className="p-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <h3 className="text-lg font-semibold">Total gastos vendedor:</h3>
                <span className="text-xl font-bold">{result.vendedor.total.toLocaleString('es-ES')} €</span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(result.vendedor.detalle).map(([concepto, importe]) => (
                  <div key={concepto} className="flex justify-between items-center">
                    <span className="text-sm">{formatConceptName(concepto)}</span>
                    <span className="font-medium">{typeof importe === 'number' ? importe.toLocaleString('es-ES') : importe} {typeof importe === 'number' ? '€' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="rounded-md border p-4 space-y-2">
          <h3 className="font-medium">Supuestos de cálculo:</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {result.supuestos.map((supuesto, index) => (
              <li key={index}>{supuesto}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground bg-muted p-3 rounded-md">
          <p className="mb-1 font-medium">Aviso importante:</p>
          <p>Los importes son estimativos y deben ser verificados con un profesional o la administración competente antes de firmar cualquier documento. Las normativas fiscales pueden variar.</p>
        </div>
        
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium mb-2">Datos en formato JSON:</h3>
          <pre className="bg-muted p-3 rounded-md overflow-auto text-xs max-h-[200px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

// Función auxiliar para formatear los nombres de los conceptos
function formatConceptName(concepto: string): string {
  return concepto
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
