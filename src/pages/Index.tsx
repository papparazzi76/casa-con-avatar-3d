
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8 px-4 bg-gradient-to-r from-realestate-purple/10 to-realestate-turquoise/10 text-center"
        >
          <p className="text-lg md:text-xl italic">
            "Vende o alquila tu inmueble como un profesional, <span className="font-semibold">sin comisiones ni intermediarios</span>"
          </p>
        </motion.div>

        {/* Banner para el Agente Virtual Inmobiliario */}
        <section className="py-12 bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">
                  Agente Virtual Inmobiliario
                </h2>
                <p className="text-muted-foreground mb-6">
                  Consulta nuestra guía completa paso a paso para vender o alquilar tu propiedad 
                  como un profesional. Con consejos prácticos, checklists y herramientas interactivas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                  >
                    <Link to="/agente-virtual-inmobiliario">
                      <FileText className="mr-2 h-4 w-4" />
                      Consultar guía completa
                    </Link>
                  </Button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/f46ff66f-0563-46d3-b58a-a01637195817.png" 
                    alt="Robot agente inmobiliario" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Banner para el escaparate inmobiliario */}
        <section className="py-12 bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter mb-4">
                  Escaparate Inmobiliario
                </h2>
                <p className="text-muted-foreground mb-6">
                  Descubre inmuebles o publica el tuyo totalmente gratis. 
                  Sin comisiones ni intermediarios, conectamos directamente a 
                  propietarios y compradores/inquilinos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                  >
                    <Link to="/propiedades">
                      <Home className="mr-2 h-4 w-4" />
                      Ver inmuebles
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/propiedades/nueva">
                      Publicar mi inmueble
                    </Link>
                  </Button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/ef5a1332-3aa5-45a2-86f9-10daf6f9a3b4.png" 
                    alt="Escaparate inmobiliario" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <span className="text-white text-xl font-semibold">
                      Escaparate Inmobiliario
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ServiceGrid />
        
        <Features />
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">¿Listo para empezar?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg mb-8">
                Descubre cómo nuestras herramientas pueden ayudarte a vender o alquilar tu propiedad de forma más rápida y profesional.
              </p>
              <motion.button
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 text-white py-3 px-8 rounded-lg font-medium text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Comenzar ahora
              </motion.button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
