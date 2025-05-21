
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Property, PropertyImage } from "@/types/property";
import { uploadPropertyImage, deletePropertyImage, setMainImage } from "@/services/propertyService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Star, StarOff, Image } from "lucide-react";

interface PropertyImageManagerProps {
  property: Property;
  images: PropertyImage[];
  onImagesChange: () => void;
}

export function PropertyImageManager({ property, images, onImagesChange }: PropertyImageManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => {
        // Comprobar si es la primera imagen (establecerla como principal)
        const isFirst = images.length === 0;
        return uploadPropertyImage(property.id, file, isFirst);
      });

      await Promise.all(uploadPromises);
      onImagesChange();
      toast.success("Imágenes subidas correctamente");
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
      toast.error("Error al subir las imágenes. Inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
      // Resetear el input de archivo
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;

    try {
      await deletePropertyImage(imageId);
      onImagesChange();
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      toast.error("Error al eliminar la imagen. Inténtalo de nuevo.");
    }
  };

  const handleSetMainImage = async (imageId: string) => {
    try {
      await setMainImage(property.id, imageId);
      onImagesChange();
      toast.success("Imagen principal actualizada");
    } catch (error) {
      console.error("Error al establecer la imagen principal:", error);
      toast.error("Error al establecer la imagen principal. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Imágenes del inmueble</h3>
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Subiendo..." : "Subir imágenes"}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No hay imágenes para este inmueble. Agrega algunas para aumentar el interés.
          </p>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            className="mt-4"
          >
            Subir imágenes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
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
                  onClick={() => handleDeleteImage(image.id)}
                  title="Eliminar imagen"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  variant={image.is_main ? "default" : "secondary"}
                  size="icon" 
                  onClick={() => !image.is_main && handleSetMainImage(image.id)}
                  disabled={image.is_main}
                  title={image.is_main ? "Imagen principal" : "Establecer como principal"}
                >
                  {image.is_main ? (
                    <Star className="h-4 w-4" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {image.is_main && (
                <div className="absolute top-2 right-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Principal
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
