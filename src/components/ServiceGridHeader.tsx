
import { motion } from "framer-motion";

export function ServiceGridHeader() {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Nuestros Servicios
      </h2>
      <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
        Todo lo que necesitas para vender o alquilar tu propiedad como un profesional.
      </p>
    </motion.div>
  );
}
