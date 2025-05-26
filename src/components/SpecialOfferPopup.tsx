
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

interface SpecialOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const SpecialOfferPopup = ({ isOpen, onClose, onAccept }: SpecialOfferPopupProps) => {
  const [remainingSpots, setRemainingSpots] = useState(100);

  useEffect(() => {
    // Simular registros existentes (en una app real esto vendría del backend)
    const existingRegistrations = localStorage.getItem('special-offer-registrations');
    const currentRegistrations = existingRegistrations ? parseInt(existingRegistrations) : 0;
    
    // Calcular spots restantes
    const spots = Math.max(0, 100 - currentRegistrations);
    setRemainingSpots(spots);

    // Actualizar contador cada 30 segundos (simular nuevos registros)
    const interval = setInterval(() => {
      setRemainingSpots(prev => {
        if (prev > 0) {
          const newValue = Math.max(0, prev - Math.floor(Math.random() * 2)); // Reduce 0-1 spots randomly
          return newValue;
        }
        return 0;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAccept = () => {
    // Incrementar contador de registros
    const existingRegistrations = localStorage.getItem('special-offer-registrations');
    const currentRegistrations = existingRegistrations ? parseInt(existingRegistrations) : 0;
    localStorage.setItem('special-offer-registrations', (currentRegistrations + 1).toString());
    
    onAccept();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative">
                <Gift className="h-12 w-12 text-realestate-purple" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1"
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-realestate-purple to-realestate-turquoise rounded-full"></div>
                </motion.div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gradient bg-gradient-to-r from-realestate-purple to-realestate-turquoise bg-clip-text text-transparent">
                  ¡Oferta Especial!
                </h3>
                <p className="text-lg font-semibold mt-2">
                  Acceso GRATUITO para los primeros 100 registros
                </p>
              </div>
            </motion.div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Contador */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-realestate-purple/10 to-realestate-turquoise/10 rounded-lg p-4 border-2 border-dashed border-realestate-purple/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-realestate-purple" />
                <span className="text-sm font-medium text-muted-foreground">Spots restantes</span>
              </div>
              <motion.div
                key={remainingSpots}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl font-bold text-gradient bg-gradient-to-r from-realestate-purple to-realestate-turquoise bg-clip-text text-transparent"
              >
                {remainingSpots}
              </motion.div>
              <p className="text-xs text-muted-foreground mt-1">de 100 disponibles</p>
            </div>
          </motion.div>

          {/* Beneficios */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-center">Incluye acceso completo a:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-realestate-purple rounded-full"></div>
                <span>Editor de imágenes profesional</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-realestate-turquoise rounded-full"></div>
                <span>Homestaging virtual ilimitado</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-realestate-purple rounded-full"></div>
                <span>Generador de anuncios IA</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-realestate-turquoise rounded-full"></div>
                <span>Todas las herramientas premium</span>
              </li>
            </ul>
          </motion.div>

          {/* Urgencia */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center space-x-2 text-orange-600"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">¡Solo por tiempo limitado!</span>
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col space-y-3"
          >
            <Button
              onClick={handleAccept}
              disabled={remainingSpots === 0}
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 text-lg py-6"
            >
              {remainingSpots === 0 ? "¡Oferta Agotada!" : "¡Quiero mi acceso GRATIS!"}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              Tal vez más tarde
            </Button>
          </motion.div>

          {/* Badge de escasez */}
          {remainingSpots > 0 && remainingSpots <= 20 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center"
            >
              <Badge variant="destructive" className="animate-pulse">
                ¡Últimos {remainingSpots} spots disponibles!
              </Badge>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
