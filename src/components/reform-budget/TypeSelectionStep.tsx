
import { Button } from "@/components/ui/button";
import { ReformType } from "./types";

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
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">¿Qué tipo de reforma quieres realizar?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant={reformType === "integral" ? "default" : "outline"}
          className={`h-24 ${reformType === "integral" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
          onClick={() => setReformType("integral")}
        >
          <div className="text-center">
            <div className="text-xl mb-1">Obra integral</div>
            <div className="text-sm opacity-80">Reforma completa de la vivienda</div>
          </div>
        </Button>
        
        <Button
          variant={reformType === "partial" ? "default" : "outline"}
          className={`h-24 ${reformType === "partial" ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise" : ""}`}
          onClick={() => setReformType("partial")}
        >
          <div className="text-center">
            <div className="text-xl mb-1">Obra parcial</div>
            <div className="text-sm opacity-80">Reforma de elementos específicos</div>
          </div>
        </Button>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
