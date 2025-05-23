
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertySearch } from "@/components/properties/PropertySearch";
import { PropertySearchResults } from "@/components/properties/search/PropertySearchResults";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function PropertiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Efecto para manejar el scroll al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePublishClick = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para publicar un inmueble");
      navigate("/auth?redirect=/propiedades/nueva");
    } else {
      navigate("/propiedades/nueva");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-realestate-purple/10 to-realestate-turquoise/10 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Escaparate inmobiliario
                </h1>
                <p className="text-muted-foreground md:text-lg max-w-2xl">
                  Descubre las mejores propiedades disponibles o publica la tuya sin comisiones ni intermediarios.
                </p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 md:mt-0"
              >
                <Button 
                  onClick={handlePublishClick}
                  className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Publicar inmueble
                </Button>
              </motion.div>
            </div>
            
            <PropertySearch />
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <PropertySearchResults />
          </div>
        </section>
        
        {!user && (
          <section className="py-12 bg-muted">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-2xl font-bold mb-4">¿Tienes un inmueble para vender o alquilar?</h2>
              <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
                Regístrate gratis y publica tu anuncio en nuestro escaparate inmobiliario sin comisiones ni intermediarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                >
                  Crear cuenta gratuita
                </Button>
                <Button variant="outline" onClick={() => navigate("/auth?mode=login")}>
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
