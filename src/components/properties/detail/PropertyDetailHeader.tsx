
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Property } from "@/types/property";

interface PropertyDetailHeaderProps {
  property: Property;
  isOwner: boolean;
  onDelete: () => void;
}

export function PropertyDetailHeader({ property, isOwner, onDelete }: PropertyDetailHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
      <div>
        <Button variant="outline" onClick={() => navigate("/propiedades")} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <MapPin size={18} />
          <span>{property.location}</span>
        </div>
      </div>
      
      {isOwner && (
        <div className="flex gap-2 self-start">
          <Button variant="outline" onClick={() => navigate(`/propiedades/${property.id}/editar`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      )}
    </div>
  );
}

import { MapPin } from "lucide-react";
