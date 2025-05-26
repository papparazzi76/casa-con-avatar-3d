
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface ImageUploadSectionProps {
  title: string;
  description: string;
  maxImages: number;
  isPaid?: boolean;
  pricePerImage?: string;
  freeRooms?: string[];
}

export const ImageUploadSection = ({ 
  title, 
  description, 
  maxImages, 
  isPaid = false, 
  pricePerImage = "2,99€",
  freeRooms = []
}: ImageUploadSectionProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (uploadedImages.length + files.length > maxImages) {
      toast({
        title: "Límite excedido",
        description: `Solo puedes subir hasta ${maxImages} imágenes.`,
        variant: "destructive",
      });
      return;
    }

    files.forEach(file => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Tipo de archivo no válido",
          description: "Solo se permiten archivos de imagen.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 8 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo es 8MB por imagen.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, file]);
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No hay imágenes",
        description: "Sube al menos una imagen para procesar.",
        variant: "destructive",
      });
      return;
    }

    // Here you would implement the actual processing logic
    toast({
      title: "Procesando imágenes",
      description: `Se están procesando ${uploadedImages.length} imagen(es).`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {isPaid && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {pricePerImage} / imagen
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline">
            {uploadedImages.length}/{maxImages} imágenes
          </Badge>
        </div>
        
        {isPaid && freeRooms.length > 0 && (
          <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
            <strong>Gratis para:</strong> {freeRooms.join(" y ")}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Arrastra imágenes aquí o haz clic para seleccionar
          </p>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="cursor-pointer"
            disabled={uploadedImages.length >= maxImages}
          />
        </div>

        {/* Image previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Process button */}
        <Button 
          onClick={handleProcess}
          className="w-full"
          disabled={uploadedImages.length === 0}
        >
          Procesar {uploadedImages.length > 0 && `${uploadedImages.length} imagen(es)`}
          {isPaid && uploadedImages.length > 0 && (
            <span className="ml-2">- Total: {(parseFloat(pricePerImage.replace('€', '').replace(',', '.')) * uploadedImages.length).toFixed(2)}€</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
