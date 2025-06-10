
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Herramientas profesionales para vender tu <span className="gradient-text">inmueble</span>
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Todos los servicios de una agencia inmobiliaria, potenciados por IA y diseñados para particulares. Vende tu casa sin intermediarios, TOTALMENTE GRATIS! (por tiempo limitado)
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button 
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 text-lg py-6 px-8" 
                size="lg"
                onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
              >
                Explorar servicios
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-[400px] w-full max-w-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-realestate-purple to-realestate-turquoise p-1 shadow-lg flex flex-col">
              <div className="flex justify-center items-center bg-white dark:bg-gray-950 p-2 rounded-t-xl">
                <img src="/lovable-uploads/0fbc7fae-31c8-4f70-9344-89ce8f6cecee.png" alt="PropTools Logo" className="h-12" />
              </div>
              <div className="h-full w-full rounded-b-xl bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/f40a8f73-21e1-48d0-9be1-d8e4eace89a5.png" 
                  alt="PropTools - Servicios inmobiliarios profesionales" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
