
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";
import { PropertyImage } from "@/types/property";

interface ImageCardProps {
  image: PropertyImage;
  onDelete: (imageId: string) => void;
  onSetMainImage: (imageId: string) => void;
}

export function ImageCard({ image, onDelete, onSetMainImage }: ImageCardProps) {
  return (
    <Card key={image.id} className="overflow-hidden group relative">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image.image_url} 
          alt="Imagen del inmueble" 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button 
          variant="destructive" 
          size="icon" 
          onClick={() => onDelete(image.id)}
          title="Eliminar imagen"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button 
          variant={image.is_main ? "default" : "secondary"}
          size="icon" 
          onClick={() => !image.is_main && onSetMainImage(image.id)}
          disabled={image.is_main}
          title={image.is_main ? "Imagen principal" : "Establecer como principal"}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>
      {image.is_main && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Principal
          </span>
        </div>
      )}
    </Card>
  );
}
