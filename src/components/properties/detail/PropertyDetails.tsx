
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize, Calendar, Tag } from "lucide-react";
import { Property } from "@/types/property";
import { toast } from "sonner";

interface PropertyDetailsProps {
  property: Property;
  formatPropertyType: (type: string) => string;
  formatPrice: (price: number, currency: string) => string;
  formatDate: (dateString: string) => string;
}

export function PropertyDetails({ 
  property,
  formatPropertyType,
  formatPrice,
  formatDate
}: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary">
          {formatPrice(property.price, property.currency)}
          {property.operation_type === "alquiler" && <span className="text-sm text-muted-foreground ml-1">/mes</span>}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{formatPropertyType(property.property_type)}</Badge>
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(property.created_at)}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Bed className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-1 text-sm font-medium">Hab.</div>
          <div className="text-lg font-bold">{property.rooms}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Bath className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-1 text-sm font-medium">Baños</div>
          <div className="text-lg font-bold">{property.bathrooms}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Maximize className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-1 text-sm font-medium">Área</div>
          <div className="text-lg font-bold">{property.area} m²</div>
        </div>
      </div>
      
      {property.features && property.features.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Características</h3>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-3">Descripción</h3>
        <div className="text-muted-foreground whitespace-pre-line">
          {property.description}
        </div>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        onClick={() => {
          toast.info("Esta funcionalidad estará disponible próximamente");
        }}
      >
        Contactar con el propietario
      </Button>
    </div>
  );
}
