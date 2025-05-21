
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

const PropertyValuator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyValuation, setPropertyValuation] = useState<PropertyValuation | null>(null);
  const [missingFields, setMissingFields] = useState<string[] | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (propertyData: PropertyInfo) => {
    setIsLoading(true);
    setMissingFields(undefined);
    
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
      toast.error("Hubo un error al valorar tu propiedad. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
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
          </div>
          
          <div>
            {propertyValuation && propertyValuation.status === "ok" && propertyValuation.valoracion && (
              <PropertyValuatorResult result={propertyValuation} />
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
