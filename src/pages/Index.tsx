
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

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
