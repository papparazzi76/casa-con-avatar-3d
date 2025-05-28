
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyValuationForm } from "@/components/property-valuation/PropertyValuationForm";
import { PropertyValuationResult } from "@/components/property-valuation/PropertyValuationResult";
import { motion } from "framer-motion";

export interface PropertyValuationInput {
  address: string;
  cp: string;
  locality: string;
  propertyType: string;
  surface_m2: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  state: string;
  extras: string[];
}

export interface PropertyValuationOutput {
  estimated_price_eur: number;
  low_range: number;
  high_range: number;
  similar_links: string[];
  comps: Array<{
    price: number;
    surface: number;
    bedrooms: number;
    distance: number;
    url: string;
    lat?: number;
    lng?: number;
  }>;
}

const PropertyValuator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PropertyValuationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PropertyValuationInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log("🏠 Iniciando valoración con datos:", data);
      
      // TODO: Implementar llamada al edge function
      const mockResult: PropertyValuationOutput = {
        estimated_price_eur: 280000,
        low_range: 260000,
        high_range: 300000,
        similar_links: [
          "https://www.idealista.com/inmueble/123456",
          "https://www.idealista.com/inmueble/789012",
          "https://www.idealista.com/inmueble/345678",
          "https://www.idealista.com/inmueble/901234",
          "https://www.idealista.com/inmueble/567890"
        ],
        comps: [
          { price: 275000, surface: 85, bedrooms: 3, distance: 150, url: "https://www.idealista.com/inmueble/123456" },
          { price: 290000, surface: 90, bedrooms: 3, distance: 200, url: "https://www.idealista.com/inmueble/789012" },
          { price: 265000, surface: 80, bedrooms: 2, distance: 300, url: "https://www.idealista.com/inmueble/345678" },
          { price: 285000, surface: 88, bedrooms: 3, distance: 250, url: "https://www.idealista.com/inmueble/901234" },
          { price: 270000, surface: 82, bedrooms: 3, distance: 180, url: "https://www.idealista.com/inmueble/567890" }
        ]
      };
      
      setResult(mockResult);
    } catch (err) {
      console.error("❌ Error en valoración:", err);
      setError("Error al realizar la valoración. Por favor, inténtalo de nuevo.");
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
            Valorador Inmobiliario Inteligente
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Obtén una valoración precisa de tu propiedad basada en datos reales del mercado y análisis con IA.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PropertyValuationForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
          
          <div>
            {result && (
              <PropertyValuationResult result={result} />
            )}
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>* Estimación orientativa. No sustituye una tasación oficial.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyValuator;
