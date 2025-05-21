
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyValuatorForm } from "@/components/PropertyValuatorForm";
import { PropertyValuatorResult } from "@/components/PropertyValuatorResult";
import { PropertyInfo, PropertyValuation, getPropertyValuation } from "@/services/propertyValuator";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfessionalValuationDialog } from "@/components/ProfessionalValuationDialog";
import { FileTextIcon } from "lucide-react";
import { ValuatorLoading } from "@/components/propertyValuator/ValuatorLoading";
import { ValuatorError } from "@/components/propertyValuator/ValuatorError";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const PropertyValuator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyValuation, setPropertyValuation] = useState<PropertyValuation | null>(null);
  const [missingFields, setMissingFields] = useState<string[] | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (propertyData: PropertyInfo) => {
    setIsLoading(true);
    setMissingFields(undefined);
    setError(null);
    
    try {
      const response = await getPropertyValuation(propertyData);
      
      setPropertyValuation(response);
      
      // Check if there are missing fields
      if (response.status === "faltan_datos" && response.faltan_datos) {
        setMissingFields(response.faltan_datos);
        toast.info("Se necesita información adicional para valorar tu propiedad.");
      } else if (response.status === "ok") {
        setMissingFields(undefined);
        toast.success("Valoración realizada correctamente.");
      } else if (response.sin_comparables) {
        toast.warning("No se encontraron viviendas similares para comparar.");
      } else {
        toast.error("Hubo un error al valorar tu propiedad. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error processing property valuation:", error);
      setError("Hubo un error al procesar la valoración. Por favor, inténtalo de nuevo más tarde.");
      toast.error("Hubo un error al valorar tu propiedad. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    // User will need to submit the form again
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container px-4 py-12 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Valorador de Inmuebles
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Obtén una valoración estimada de tu propiedad basada en inmuebles similares del mercado.
          </p>
          
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="mt-6 bg-realestate-purple hover:bg-realestate-purple/90"
          >
            <FileTextIcon className="mr-2 h-4 w-4" />
            Solicitar valoración profesional gratuita
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PropertyValuatorForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              missingFields={missingFields}
            />

            {error && (
              <ValuatorError message={error} onRetry={handleRetry} />
            )}

            {missingFields && missingFields.length > 0 && (
              <Alert className="mt-6 border-amber-200 bg-amber-50">
                <InfoIcon className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-700">Datos adicionales requeridos</AlertTitle>
                <AlertDescription className="text-amber-700">
                  <p>Para obtener una valoración más precisa, por favor completa los siguientes campos:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {missingFields.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div>
            {isLoading && <ValuatorLoading />}
            
            {!isLoading && propertyValuation && propertyValuation.status === "ok" && propertyValuation.valoracion && (
              <PropertyValuatorResult result={propertyValuation} />
            )}
            
            {!isLoading && propertyValuation && propertyValuation.sin_comparables && (
              <Alert className="border-amber-200 bg-amber-50">
                <InfoIcon className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-700">No se encontraron comparables</AlertTitle>
                <AlertDescription className="text-amber-700">
                  No hemos podido encontrar propiedades similares en nuestra base de datos para realizar una 
                  valoración precisa. Por favor, modifica algunos de los criterios e inténtalo de nuevo, 
                  o solicita una valoración profesional personalizada.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
      
      <ProfessionalValuationDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        propertyValuation={propertyValuation}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyValuator;
