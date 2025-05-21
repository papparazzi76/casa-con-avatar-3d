
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteProperty } from "@/services/propertyService";
import { Property, PropertyImage } from "@/types/property";
import { PropertyStatusBadge } from "./PropertyStatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Home 
} from "lucide-react";

interface PropertiesTableProps {
  properties: (Property & { property_images: PropertyImage[] })[];
  onDelete: () => void;
}

export function PropertiesTable({ properties, onDelete }: PropertiesTableProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este inmueble? Esta acción no se puede deshacer.")) {
      try {
        setIsDeleting(true);
        await deleteProperty(id);
        toast.success("Inmueble eliminado correctamente");
        onDelete();
      } catch (error) {
        console.error("Error al eliminar el inmueble:", error);
        toast.error("Error al eliminar el inmueble. Inténtalo de nuevo.");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Publicado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => {
            // Encontrar la imagen principal o usar la primera disponible
            const mainImage = property.property_images.find(img => img.is_main) || 
                            property.property_images[0];
            
            // Formatear el precio
            const formattedPrice = new Intl.NumberFormat("es-ES").format(property.price);
            const currencySymbol = property.currency === "EUR" ? "€" : 
                                  property.currency === "USD" ? "$" : 
                                  property.currency === "GBP" ? "£" : property.currency;
            
            return (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                      {mainImage ? (
                        <img 
                          src={mainImage.image_url} 
                          alt={property.title} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center">
                          <Home className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="truncate">
                      {property.title}
                      <div className="text-sm text-muted-foreground truncate">
                        {property.location}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {property.operation_type === "venta" ? "Venta" : "Alquiler"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formattedPrice} {currencySymbol}
                </TableCell>
                <TableCell>
                  <PropertyStatusBadge status={property.status} />
                </TableCell>
                <TableCell>
                  {formatDate(property.created_at)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isDeleting}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/propiedades/${property.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/propiedades/${property.id}/editar`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(property.id)}
                        className="text-destructive focus:text-destructive"
                        disabled={isDeleting}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
