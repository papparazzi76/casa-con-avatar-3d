
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyValuationForm } from "@/components/property-valuation/PropertyValuationForm";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PropertyValuationFormData } from "@/components/property-valuation/schema";

const PropertyValuator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (data: PropertyValuationFormData) => {
    setIsLoading(true);

    try {
      console.log("🏠 Enviando solicitud de valoración:", data);
      
      // Llamar a la edge function para procesar la valoración
      const { data: functionResult, error: functionError } = await supabase.functions.invoke('valuate-detailed', {
        body: data
      });

      if (functionError) {
        console.error("❌ Error en edge function:", functionError);
        throw new Error(functionError.message || "Error en el servidor");
      }

      console.log("✅ Solicitud de valoración enviada:", functionResult);
      setIsSubmitted(true);
      
      toast.success("¡Solicitud enviada! Recibirá su valoración en las próximas 24 horas.");
      
    } catch (err) {
      console.error("❌ Error en valoración:", err);
      let errorMessage = "Error al enviar la solicitud. Por favor, inténtalo de nuevo.";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow container px-4 py-12 mx-auto">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h1 className="text-2xl font-bold text-green-800 mb-4">
                ¡Solicitud Enviada Correctamente!
              </h1>
              <p className="text-green-700 text-lg mb-6">
                Hemos recibido su solicitud de valoración. Nuestro equipo de expertos analizará 
                toda la información proporcionada y le enviará un informe detallado a su email 
                en las próximas <strong>24 horas</strong>.
              </p>
              <div className="bg-white border border-green-200 rounded-lg p-4 text-sm text-green-600">
                <p className="font-medium mb-2">¿Qué incluirá su informe?</p>
                <ul className="text-left space-y-1">
                  <li>• Valoración estimada de su propiedad</li>
                  <li>• Rango de precios basado en comparables del mercado</li>
                  <li>• Análisis detallado de las características de su inmueble</li>
                  <li>• Recomendaciones para maximizar el valor</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container px-4 py-8 mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Valoración Profesional de Inmuebles
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Complete el formulario con todos los detalles de su propiedad y reciba 
            una valoración profesional detallada en 24 horas.
          </p>
        </motion.div>
        
        <PropertyValuationForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyValuator;
