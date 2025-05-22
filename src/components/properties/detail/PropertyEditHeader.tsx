
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PropertyEditHeaderProps {
  id: string;
}

export function PropertyEditHeader({ id }: PropertyEditHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button variant="outline" onClick={() => navigate(`/propiedades/${id}`)} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver al inmueble
      </Button>
      <h1 className="text-3xl font-bold tracking-tight">Editar inmueble</h1>
      <p className="text-muted-foreground mt-2">
        Actualiza la información o imágenes de tu inmueble
      </p>
    </div>
  );
}
