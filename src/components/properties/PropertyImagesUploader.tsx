
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { uploadPropertyImage, deletePropertyImage, setMainImage } from "@/services/propertyService";
import { PropertyImage } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, Star, Image, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PropertyImagesUploaderProps {
  propertyId: string;
  existingImages: PropertyImage[];
}

export function PropertyImagesUploader({ propertyId, existingImages = [] }: PropertyImagesUploaderProps) {
  const [images, setImages] = useState<PropertyImage[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshImages = useCallback(async () => {
    try {
      // En una aplicación real, aquí podríamos hacer una consulta para obtener las imágenes actualizadas
      // Pero para simplificar, en este ejemplo simplemente actualizamos el estado local
      setError(null);
    } catch (error) {
      console.error("Error al actualizar las imágenes:", error);
      setError("No se pudieron cargar las imágenes más recientes.");
    }
  }, [propertyId]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Verificar el número máximo de imágenes permitidas (10)
    if (images.length + files.length > 10) {
      toast.error(`Solo puedes subir un máximo de 10 imágenes. Ya tienes ${images.length} imágenes.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Convertir FileList a Array para poder iterarlo
      const fileArray = Array.from(files);
      let completedUploads = 0;

      for (const file of fileArray) {
        // Verificar el tipo de archivo (solo imágenes)
        if (!file.type.startsWith('image/')) {
          toast.error(`El archivo "${file.name}" no es una imagen válida.`);
          continue;
        }

        // Verificar el tamaño del archivo (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`El archivo "${file.name}" es demasiado grande. El tamaño máximo es 5MB.`);
          continue;
        }

        try {
          // Determinar si es la primera imagen (se establecerá como principal)
          const isFirst = images.length === 0;
          const uploadedImage = await uploadPropertyImage(propertyId, file, isFirst);
          
          setImages(prev => [...prev, uploadedImage]);
          completedUploads++;
          setUploadProgress(Math.round((completedUploads / fileArray.length) * 100));
        } catch (error) {
          console.error(`Error al subir la imagen ${file.name}:`, error);
          toast.error(`Error al subir la imagen "${file.name}".`);
        }
      }

      // Limpiar el input de archivos
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(`${completedUploads} imagen(es) subidas correctamente`);
      refreshImages();
    } catch (error) {
      console.error("Error general en la subida de imágenes:", error);
      setError("Ha ocurrido un error al subir las imágenes. Por favor, inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;

    try {
      await deletePropertyImage(imageId);
      setImages(images.filter(img => img.id !== imageId));
      toast.success("Imagen eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      toast.error("Error al eliminar la imagen. Inténtalo de nuevo.");
    }
  };

  const handleSetMainImage = async (imageId: string) => {
    try {
      await setMainImage(propertyId, imageId);
      
      // Actualizar el estado local para reflejar el cambio
      setImages(prev => prev.map(img => ({
        ...img,
        is_main: img.id === imageId
      })));
      
      toast.success("Imagen principal actualizada");
    } catch (error) {
      console.error("Error al establecer la imagen principal:", error);
      toast.error("Error al establecer la imagen principal. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Gestión de imágenes</h3>
        <p className="text-sm text-muted-foreground">
          Puedes subir hasta 10 imágenes por propiedad. Haz clic en la estrella para establecer la imagen principal.
        </p>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm font-medium mb-1">
              {images.length}/10 imágenes
            </p>
            {images.length < 10 && (
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Subiendo..." : "Subir imágenes"}
              </Button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*"
              className="hidden"
              disabled={isUploading || images.length >= 10}
            />
          </div>
          
          {isUploading && (
            <div className="w-full sm:w-1/2">
              <p className="text-sm mb-1">Subiendo imágenes: {uploadProgress}%</p>
              <Progress value={uploadProgress} className="h-2 w-full" />
            </div>
          )}
        </div>
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
            disabled={isUploading}
          >
            Subir imágenes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                  onClick={() => handleDelete(image.id)}
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
          ))}
        </div>
      )}
    </div>
  );
}
