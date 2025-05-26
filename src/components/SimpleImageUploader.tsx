
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { uploadImage, checkUserUploadLimits, ImageType, RoomType, FurnitureStyle } from "@/services/imageUploadService";

export const SimpleImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageType, setImageType] = useState<ImageType>('enhancement');
  const [roomType, setRoomType] = useState<RoomType>('salon');
  const [furnitureStyle, setFurnitureStyle] = useState<FurnitureStyle>('moderno');
  const [isUploading, setIsUploading] = useState(false);
  const [enhancementCount, setEnhancementCount] = useState(0);
  const [homestagingCount, setHomestagingCount] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Archivo no válido",
        description: "Por favor selecciona una imagen válida.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo no puede ser mayor a 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No hay imagen seleccionada",
        description: "Por favor selecciona una imagen primero.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      await uploadImage(selectedFile, {
        imageType,
        roomType: imageType === 'homestaging' ? roomType : undefined,
        furnitureStyle: imageType === 'homestaging' ? furnitureStyle : undefined,
      });

      toast({
        title: "¡Imagen subida correctamente!",
        description: "En 24 horas recibirás tus imágenes procesadas en tu email.",
      });

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      
      // Update counts
      if (imageType === 'enhancement') {
        setEnhancementCount(prev => prev + 1);
      } else {
        setHomestagingCount(prev => prev + 1);
      }

    } catch (error: any) {
      toast({
        title: "Error al subir imagen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const loadUserLimits = async () => {
    try {
      const enhancementLimits = await checkUserUploadLimits('enhancement');
      const homestagingLimits = await checkUserUploadLimits('homestaging');
      
      // This is a simplified approach - in a real app you'd get actual counts
      setEnhancementCount(0);
      setHomestagingCount(0);
    } catch (error) {
      console.error('Error loading limits:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-6 w-6" />
            Editor de Imágenes & Homestaging
          </CardTitle>
          <CardDescription>
            Sube tus imágenes para procesamiento profesional. Recibirás las imágenes procesadas en tu email en 24 horas.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tipo de procesamiento */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Tipo de procesamiento</Label>
            <RadioGroup 
              value={imageType} 
              onValueChange={(value: ImageType) => setImageType(value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enhancement" id="enhancement" />
                <Label htmlFor="enhancement" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Edición de mejora</div>
                    <div className="text-sm text-gray-500">Mejora profesional de la imagen ({enhancementCount}/10)</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homestaging" id="homestaging" />
                <Label htmlFor="homestaging" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Homestaging virtual</div>
                    <div className="text-sm text-gray-500">Amueblado virtual del espacio ({homestagingCount}/5)</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Opciones adicionales para homestaging */}
          {imageType === 'homestaging' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="roomType">Tipo de estancia</Label>
                <Select value={roomType} onValueChange={(value: RoomType) => setRoomType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salon">Salón</SelectItem>
                    <SelectItem value="dormitorio">Dormitorio</SelectItem>
                    <SelectItem value="bano">Baño</SelectItem>
                    <SelectItem value="cocina">Cocina</SelectItem>
                    <SelectItem value="terraza">Terraza</SelectItem>
                    <SelectItem value="jardin">Jardín</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="furnitureStyle">Estilo de mobiliario</Label>
                <Select value={furnitureStyle} onValueChange={(value: FurnitureStyle) => setFurnitureStyle(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moderno">Moderno</SelectItem>
                    <SelectItem value="estandar">Estándar</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="nordico">Nórdico</SelectItem>
                    <SelectItem value="costero">Costero</SelectItem>
                    <SelectItem value="clasico">Clásico</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Subida de imagen */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Seleccionar imagen</Label>
            
            {preview ? (
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Vista previa" 
                  className="w-full max-h-64 object-contain rounded-lg border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  Cambiar
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Botón de subida */}
          <Button 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full"
            size="lg"
          >
            {isUploading ? "Subiendo..." : "Subir imagen"}
          </Button>

          <div className="text-sm text-gray-500 text-center">
            <p>Formatos soportados: JPG, PNG</p>
            <p>Tamaño máximo: 10MB</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
