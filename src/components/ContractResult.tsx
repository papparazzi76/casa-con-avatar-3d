
import { ContractResult } from "@/types/contractTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContractResultProps {
  result: ContractResult;
}

export function ContractResult({ result }: ContractResultProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      // Create a blob with the contract content
      const blob = new Blob([result.content], { type: 'text/plain;charset=utf-8' });
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = result.file_name;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: "Contrato descargado",
        description: `El archivo ${result.file_name} ha sido descargado correctamente.`,
      });
    } catch (error) {
      console.error("Error downloading contract:", error);
      toast({
        title: "Error al descargar",
        description: "No se pudo descargar el contrato. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-2 shadow h-full flex flex-col">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contrato Generado</h2>
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Descargar
          </Button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 flex-grow overflow-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {result.content}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
