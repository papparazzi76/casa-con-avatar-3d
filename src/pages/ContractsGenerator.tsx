
import { useState } from "react";
import { ContractForm } from "@/components/ContractForm";
import { ContractResult } from "@/components/ContractResult";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContractFormData, ContractResult as ContractResultType, MissingFieldsResponse } from "@/types/contractTypes";
import { generateContract } from "@/services/contractService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const ContractsGenerator = () => {
  const [result, setResult] = useState<ContractResultType | null>(null);
  const [missingFields, setMissingFields] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: ContractFormData) => {
    try {
      setIsLoading(true);
      setMissingFields(null);
      
      const response = await generateContract(data);
      
      // Check if we got a list of missing fields
      if ('faltan_datos' in response) {
        setMissingFields(response.faltan_datos);
        if (response.faltan_datos.length > 0) {
          toast({
            title: "Datos incompletos",
            description: "Por favor, completa todos los campos requeridos.",
            variant: "destructive",
          });
        }
      } else {
        // We got a contract result
        setResult(response);
        setMissingFields(null);
        toast({
          title: "Contrato generado",
          description: "El contrato ha sido generado correctamente.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al generar el contrato. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Generador de Contratos Inmobiliarios
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ContractForm 
              onFormSubmit={handleFormSubmit}
              missingFields={missingFields}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
                <p className="text-gray-500">Generando contrato...</p>
              </div>
            ) : result ? (
              <ContractResult result={result} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Completa el formulario para generar un contrato personalizado según la legislación española vigente.
                </p>
                <p className="text-sm text-gray-400">
                  Los contratos generados son documentos orientativos y no sustituyen el asesoramiento profesional.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractsGenerator;
