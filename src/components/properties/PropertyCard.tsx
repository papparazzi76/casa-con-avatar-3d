
import { useNavigate } from "react-router-dom";
import { Property, PropertyImage } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Maximize, Euro } from "lucide-react";

interface PropertyCardProps {
  property: Property & { property_images: PropertyImage[] };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  
  // Encontrar la imagen principal o usar la primera disponible
  const mainImage = property.property_images.find(img => img.is_main) || 
                   property.property_images[0] || 
                   { image_url: "/placeholder.svg" };
  
  // Formatear el precio con separadores de miles
  const formattedPrice = new Intl.NumberFormat("es-ES").format(property.price);
  
  // Determinar el símbolo de la moneda
  const currencySymbol = property.currency === "EUR" ? "€" : 
                         property.currency === "USD" ? "$" : 
                         property.currency === "GBP" ? "£" : property.currency;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] w-full overflow-hidden relative">
        <img 
          src={mainImage.image_url} 
          alt={property.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
          onClick={() => navigate(`/propiedades/${property.id}`)}
        />
        <Badge className="absolute top-2 right-2 uppercase font-semibold" variant={property.operation_type === "venta" ? "default" : "secondary"}>
          {property.operation_type === "venta" ? "Venta" : "Alquiler"}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate mb-1">{property.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin size={16} />
          <span className="text-sm truncate">{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Bed size={16} />
            <span>{property.rooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Bath size={16} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Maximize size={16} />
            <span>{property.area} m²</span>
          </div>
        </div>
        
        <div className="text-xl font-bold text-primary">
          {formattedPrice} {currencySymbol}
          {property.operation_type === "alquiler" && <span className="text-sm text-muted-foreground">/mes</span>}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="outline" onClick={() => navigate(`/propiedades/${property.id}`)}>
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
