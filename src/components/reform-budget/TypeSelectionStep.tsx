
import { Button } from "@/components/ui/button";
import { ReformType } from "./types";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/AuthContext";

interface TypeSelectionStepProps {
  reformType: ReformType;
  setReformType: (type: ReformType) => void;
  onNext: () => void;
  onCancel: () => void;
}

export function TypeSelectionStep({ 
  reformType, 
  setReformType, 
  onNext, 
  onCancel 
}: TypeSelectionStepProps) {
  const { user } = useAuth();
  const { sendFormNotification } = useNotification();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const handleNext = async () => {
    // Enviar notificación
    await sendFormNotification(
      "Reforma Budget - Tipo Seleccionado",
      user?.email,
      {
        tipo_reforma: reformType
      }
    );
    
    onNext();
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-6"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium">¿Qué tipo de reforma quieres realizar?</h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={itemVariants}>
          <Button
            variant={reformType === "integral" ? "default" : "outline"}
            className={`h-24 w-full ${reformType === "integral" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
            onClick={() => setReformType("integral")}
          >
            <div className="text-center">
              <div className="text-xl mb-1">Obra integral</div>
              <div className="text-sm opacity-80">Reforma completa de la vivienda</div>
            </div>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            variant={reformType === "partial" ? "default" : "outline"}
            className={`h-24 w-full ${reformType === "partial" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
            onClick={() => setReformType("partial")}
          >
            <div className="text-center">
              <div className="text-xl mb-1">Obra parcial</div>
              <div className="text-sm opacity-80">Reforma de elementos específicos</div>
            </div>
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex justify-end space-x-2 pt-4"
        variants={itemVariants}
      >
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
        >
          Continuar
        </Button>
      </motion.div>
    </motion.div>
  );
}
