
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
}

export function FormActions({ isSubmitting, isEditing }: FormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate(-1)}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar inmueble" : "Publicar inmueble"}
      </Button>
    </div>
  );
}
