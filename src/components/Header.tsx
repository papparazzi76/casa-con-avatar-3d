
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { WaveText } from "./WaveText";

export function Header() {
  return (
    <header className="w-full py-4">
      <div className="container flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading">
              <WaveText text="PropTools" className="gradient-text" />
            </span>
          </Link>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="ghost">Iniciar Sesión</Button>
          <Button className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
            Registrarse
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
