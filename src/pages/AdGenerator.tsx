
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PropertyAdForm } from "@/components/PropertyAdForm";
import { PropertyAdResult } from "@/components/PropertyAdResult";
import { generatePropertyAd } from "@/utils/openaiService";
import type { PropertyAdFormData, PropertyAdResult as PropertyAdResultType } from "@/utils/openaiService";

const AdGenerator = () => {
  const [adResult, setAdResult] = useState<PropertyAdResultType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container py-10">
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="mb-6"
      >
        ← Volver
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Generador de Anuncios Inmobiliarios</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del Inmueble</CardTitle>
              <CardDescription>
                Introduce todos los datos de tu propiedad para generar un anuncio optimizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyAdForm 
                onSubmit={async (data) => {
                  setIsGenerating(true);
                  try {
                    const result = await generatePropertyAd(data);
                    setAdResult(result);
                  } catch (error) {
                    console.error("Error al generar el anuncio:", error);
                  } finally {
                    setIsGenerating(false);
                  }
                }}
                isGenerating={isGenerating}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          {adResult ? (
            <PropertyAdResult result={adResult} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-10">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium mb-2">Tu anuncio aparecerá aquí</h3>
                <p className="text-muted-foreground">
                  Completa el formulario y pulsa en "Generar Anuncio" para crear tu anuncio optimizado.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdGenerator;
