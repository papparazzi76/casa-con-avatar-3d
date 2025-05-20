
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <motion.div 
        className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 PropTools. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground underline underline-offset-4">
            Términos de Servicio
          </a>
          <Link to="/privacidad" className="text-sm text-muted-foreground underline underline-offset-4">
            Política de Privacidad
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
