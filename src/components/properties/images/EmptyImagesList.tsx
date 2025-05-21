
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyImagesListProps {
  onClick: () => void;
  isUploading: boolean;
}

export function EmptyImagesList({ onClick, isUploading }: EmptyImagesListProps) {
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-lg">
      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">
        No hay imágenes para este inmueble. Agrega algunas para aumentar el interés.
      </p>
      <Button 
        variant="outline" 
        onClick={onClick} 
        className="mt-4"
        disabled={isUploading}
      >
        Subir imágenes
      </Button>
    </div>
  );
}
