
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
                Todos los servicios de una agencia inmobiliaria, sin coste alguno. Potenciados por IA y diseñados para particulares.
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
              <Button size="lg" variant="outline" className="text-lg py-6 px-8">
                Saber más
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
                <div className="text-2xl font-bold font-heading gradient-text">PropTools</div>
              </div>
              <div className="h-full w-full rounded-b-xl bg-white dark:bg-gray-950 flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/e97eadbf-d056-4bb2-a4f6-1330520fcb27.png" 
                  alt="PropTools equipo" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
