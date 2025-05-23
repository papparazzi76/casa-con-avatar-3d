
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { PropertyImage } from "@/types/property";
import { uploadPropertyImage, deletePropertyImage, setMainImage } from "@/services/property/imageService";
import { EmptyImagesList } from "./images/EmptyImagesList";
import { ImagesGrid } from "./images/ImagesGrid";
import { UploadHeader } from "./images/UploadHeader";
import { ErrorMessage } from "./images/ErrorMessage";

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
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Verificar el número máximo de imágenes permitidas (10)
    if (images.length + 1 > 10) {
      toast.error(`Solo puedes subir un máximo de 10 imágenes. Ya tienes ${images.length} imágenes.`);
      return;
    }

    // Solo permitir una imagen a la vez
    if (files.length > 1) {
      toast.error("Solo puedes subir una imagen a la vez.");
      return;
    }

    const file = files[0];

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Verificar el tipo de archivo (solo imágenes)
      if (!file.type.startsWith('image/')) {
        toast.error(`El archivo "${file.name}" no es una imagen válida.`);
        return;
      }

      // Verificar el tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`El archivo "${file.name}" es demasiado grande. El tamaño máximo es 5MB.`);
        return;
      }

      console.log(`Subiendo imagen: ${file.name}, tamaño: ${file.size} bytes, tipo: ${file.type}`);
      
      // Determinar si es la primera imagen (se establecerá como principal)
      const isFirst = images.length === 0;
      
      // Simular progreso de carga
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      const uploadedImage = await uploadPropertyImage(propertyId, file, isFirst);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      if (!uploadedImage) {
        throw new Error(`Error al subir la imagen ${file.name}`);
      }
      
      console.log(`Imagen subida exitosamente:`, uploadedImage);
      
      setImages(prev => [...prev, uploadedImage]);
      toast.success("Imagen subida correctamente");
      
      // Limpiar el input de archivos
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      refreshImages();
    } catch (error: any) {
      console.error("Error general en la subida de imágenes:", error);
      toast.error(`Error al subir la imagen: ${error.message || 'Por favor, inténtalo de nuevo.'}`);
      setError(`Ha ocurrido un error al subir las imágenes: ${error.message || 'Por favor, inténtalo de nuevo.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;

    try {
      console.log(`Eliminando imagen con ID: ${imageId}`);
      
      await deletePropertyImage(imageId);
      setImages(images.filter(img => img.id !== imageId));
      toast.success("Imagen eliminada correctamente");
    } catch (error: any) {
      console.error("Error al eliminar la imagen:", error);
      toast.error(`Error al eliminar la imagen: ${error.message || 'Inténtalo de nuevo.'}`);
    }
  };

  const handleSetMainImage = async (imageId: string) => {
    try {
      console.log(`Estableciendo imagen principal con ID: ${imageId}`);
      
      await setMainImage(propertyId, imageId);
      
      // Actualizar el estado local para reflejar el cambio
      setImages(prev => prev.map(img => ({
        ...img,
        is_main: img.id === imageId
      })));
      
      toast.success("Imagen principal actualizada");
    } catch (error: any) {
      console.error("Error al establecer la imagen principal:", error);
      toast.error(`Error al establecer la imagen principal: ${error.message || 'Inténtalo de nuevo.'}`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium">Gestión de imágenes</h3>
        <p className="text-sm text-muted-foreground">
          Puedes subir hasta 10 imágenes por propiedad. Haz clic en la estrella para establecer la imagen principal.
        </p>
        
        {error && <ErrorMessage message={error} />}

        <UploadHeader
          imagesCount={images.length}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onUploadClick={handleUploadClick}
        />
      </div>

      {images.length === 0 ? (
        <EmptyImagesList onClick={handleUploadClick} isUploading={isUploading} />
      ) : (
        <ImagesGrid 
          images={images} 
          onDelete={handleDelete} 
          onSetMainImage={handleSetMainImage}
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        disabled={isUploading || images.length >= 10}
      />
    </div>
  );
}
