
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File) => void;
}

export const ImageUploader = ({ imagePreview, onImageChange }: ImageUploaderProps) => {
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file is an image and size is <= 8MB
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Tipo de archivo no soportado",
        description: "Por favor selecciona una imagen (JPG o PNG).",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 8 * 1024 * 1024) {
      toast({
        title: "Imagen demasiado grande",
        description: "El tamaño máximo permitido es 8MB.",
        variant: "destructive",
      });
      return;
    }

    onImageChange(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subir Imagen</CardTitle>
        <CardDescription>
          Sube una fotografía de tu inmueble (JPG/PNG, máx. 8MB)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 mb-4 bg-muted/50">
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Vista previa" 
              className="max-h-[300px] object-contain rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Arrastra una imagen aquí o haz clic para seleccionar</p>
            </div>
          )}
        </div>
        
        <Input 
          id="image-upload" 
          type="file" 
          accept="image/jpeg,image/png" 
          onChange={handleImageChange}
          className="cursor-pointer"
        />
      </CardContent>
    </Card>
  );
};
