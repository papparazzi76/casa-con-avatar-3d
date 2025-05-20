
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PropertyAdResultProps {
  result: {
    titulo: string;
    descripcion: string;
    destacados: string[];
  };
}

export function PropertyAdResult({ result }: PropertyAdResultProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
    
    toast.success("Copiado al portapapeles");
  };

  // Función para copiar todo el anuncio
  const copyAll = () => {
    const fullText = `${result.titulo}\n\n${result.descripcion}\n\nDESTACADOS:\n${result.destacados.map(item => `• ${item}`).join('\n')}`;
    navigator.clipboard.writeText(fullText);
    toast.success("Anuncio completo copiado al portapapeles");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tu anuncio optimizado</span>
          <Button variant="outline" onClick={copyAll}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar todo
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">TÍTULO</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(result.titulo, 'titulo')}
              className="h-8"
            >
              {copied === 'titulo' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <h2 className="text-lg font-semibold">{result.titulo}</h2>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">DESCRIPCIÓN</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(result.descripcion, 'descripcion')}
              className="h-8"
            >
              {copied === 'descripcion' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="bg-muted p-3 rounded-md">
            {result.descripcion.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">DESTACADOS</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(result.destacados.join('\n'), 'destacados')}
              className="h-8"
            >
              {copied === 'destacados' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <ul className="space-y-2">
              {result.destacados.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-realestate-purple mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
