
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalAdvisorForm } from "@/components/LegalAdvisorForm";
import { LegalAdvisorResult } from "@/components/LegalAdvisorResult";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { LegalQuestion, LegalAnswer, getLegalAdvice, hasApiKey } from "@/services/legalAdvisorService";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LegalAdvisor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [legalAnswer, setLegalAnswer] = useState<LegalAnswer | null>(null);
  const [missingFields, setMissingFields] = useState<string[] | undefined>(undefined);
  const [showApiKeyConfig, setShowApiKeyConfig] = useState(!hasApiKey());

  useEffect(() => {
    // Check if API key is configured
    if (!hasApiKey()) {
      setShowApiKeyConfig(true);
    }
  }, []);

  const handleSubmit = async (questionData: LegalQuestion) => {
    if (!hasApiKey()) {
      toast.error("Por favor, configura tu API key de OpenAI primero.");
      setShowApiKeyConfig(true);
      return;
    }

    setIsLoading(true);
    setMissingFields(undefined);
    
    try {
      const response = await getLegalAdvice(questionData);
      
      setLegalAnswer(response);
      
      // Check if there are missing fields
      if (response.status === "faltan_datos" && response.faltan_datos) {
        setMissingFields(response.faltan_datos);
        toast.info("Se necesita información adicional para responder a tu consulta.");
      } else if (response.status === "ok") {
        setMissingFields(undefined);
        toast.success("Consulta procesada correctamente.");
      } else {
        toast.error("Hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error processing legal question:", error);
      toast.error("Hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyConfigured = () => {
    setShowApiKeyConfig(false);
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
            Dudas sobre Legislación Inmobiliaria
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Resuelve todas tus consultas sobre normativa y legislación inmobiliaria española vigente.
          </p>
        </motion.div>
        
        {showApiKeyConfig ? (
          <div className="max-w-md mx-auto">
            <ApiKeyConfig onConfigured={handleApiKeyConfigured} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <LegalAdvisorForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                missingFields={missingFields}
              />
            </div>
            
            <div>
              {legalAnswer && legalAnswer.status === "ok" && legalAnswer.answer && (
                <LegalAdvisorResult result={legalAnswer} />
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalAdvisor;
