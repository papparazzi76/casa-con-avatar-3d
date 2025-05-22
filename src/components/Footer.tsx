
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <motion.div 
        className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <img 
            src="/lovable-uploads/85a8b51f-c876-4980-ac9f-c27ef2ecb43a.png" 
            alt="Iadomus Logo" 
            className="h-12 md:h-10" 
          />
        </div>
        
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/69972362-33bb-4c1d-95a4-3af6bb0c70a2.png" 
            alt="PropTools Logo" 
            className="h-10 md:h-8" 
          />
        </div>
        
        <div className="flex gap-4">
          <Link to="/terminos" className="text-sm text-muted-foreground underline underline-offset-4">
            Términos de Servicio
          </Link>
          <Link to="/privacidad" className="text-sm text-muted-foreground underline underline-offset-4">
            Política de Privacidad
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
