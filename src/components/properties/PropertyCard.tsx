
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property, PropertyImage, PropertyVideo } from "@/types/property";
import { formatPrice, getFormattedLocation } from "./detail/PropertyFormatters";
import { Pencil, Trash2, Video } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteProperty } from "@/services/propertyService";
import { toast } from "sonner";
import { useState } from "react";

interface PropertyCardProps {
  property: Property & { 
    property_images: PropertyImage[],
    property_videos?: PropertyVideo[] 
  };
  onDelete?: () => void;
}

export function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Encontrar la imagen principal o usar la primera disponible
  const mainImage = property.property_images.find(img => img.is_main) || 
                    property.property_images[0];
                    
  // Comprobar si tiene videos
  const hasVideos = property.property_videos && property.property_videos.length > 0;

  // Determinar si el usuario es propietario del inmueble
  const isOwner = user && property.user_id === user.id;

  const handleCardClick = () => {
    navigate(`/propiedades/${property.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/propiedades/${property.id}/editar`);
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm("¿Estás seguro de que quieres eliminar este inmueble? Esta acción no se puede deshacer.")) {
      try {
        setIsDeleting(true);
        await deleteProperty(property.id);
        toast.success("Inmueble eliminado correctamente");
        if (onDelete) {
          onDelete();
        } else {
          // Si no hay callback de eliminación, actualizar la página
          window.location.reload();
        }
      } catch (error: any) {
        console.error("Error al eliminar el inmueble:", error);
        toast.error(`Error al eliminar el inmueble: ${error.message || "Inténtalo de nuevo."}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer relative group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          {mainImage ? (
            <img
              src={mainImage.image_url}
              alt={property.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 hover:bg-white">
            {property.operation_type === "venta" ? "Venta" : "Alquiler"}
          </Badge>
          
          {hasVideos && (
            <Badge variant="secondary" className="bg-white/90 hover:bg-white">
              <Video className="h-3 w-3 mr-1" />
              Video
            </Badge>
          )}
        </div>

        {isOwner && (
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 bg-white/90 hover:bg-white"
              onClick={handleEditClick}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-8 w-8"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg truncate flex-1">{property.title}</h3>
          <p className="font-bold text-lg whitespace-nowrap text-primary">
            {formatPrice(property.price, property.currency)}
          </p>
        </div>
        
        <p className="text-muted-foreground text-sm truncate">
          {getFormattedLocation(property)}
        </p>
        
        <div className="flex gap-4 mt-3 text-sm">
          {property.area && (
            <div className="flex items-center gap-1">
              <span>{property.area} m²</span>
            </div>
          )}
          
          {property.rooms && (
            <div className="flex items-center gap-1">
              <span>{property.rooms} hab</span>
            </div>
          )}
          
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <span>{property.bathrooms} baños</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleCardClick}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
