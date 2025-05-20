
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type EditMode = "enhancement" | "homestaging" | "mixto";
type DecorStyle = "nórdico" | "moderno" | "rústico" | "contemporáneo" | "minimalista" | "industrial" | "mediterráneo" | "clásico";

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>("enhancement");
  const [decorStyle, setDecorStyle] = useState<DecorStyle>("moderno");
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

    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No hay imagen seleccionada",
        description: "Por favor selecciona una imagen para editar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulación de procesamiento
      // En un caso real, aquí enviaríamos la imagen y parámetros a una API
      // que procesaría la imagen con OpenAI según el system prompt
      
      toast({
        title: "Procesando imagen",
        description: "Esto puede tardar unos momentos...",
      });

      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulamos resultado (en producción se reemplazaría con la respuesta real de la API)
      setEditedImage(imagePreview);
      
      toast({
        title: "¡Imagen procesada con éxito!",
        description: `Modo: ${editMode}${editMode !== "enhancement" ? `, Estilo: ${decorStyle}` : ""}`,
      });
    } catch (error) {
      toast({
        title: "Error al procesar la imagen",
        description: "Ha ocurrido un error. Por favor intenta de nuevo.",
        variant: "destructive",
      });
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Editor de Imágenes & Homestaging</h1>
        <p className="text-gray-500">
          Transforma tus fotografías inmobiliarias con edición profesional y visualiza reformas virtuales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        
        <Card>
          <CardHeader>
            <CardTitle>Opciones de Edición</CardTitle>
            <CardDescription>
              Selecciona el modo de trabajo y opciones de edición
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Modo de trabajo</h3>
                <RadioGroup 
                  value={editMode} 
                  onValueChange={(value) => setEditMode(value as EditMode)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enhancement" id="enhancement" />
                    <Label htmlFor="enhancement">Enhancement (mejora fotográfica)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="homestaging" id="homestaging" />
                    <Label htmlFor="homestaging">Homestaging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mixto" id="mixto" />
                    <Label htmlFor="mixto">Mixto (ambos)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {(editMode === "homestaging" || editMode === "mixto") && (
                <div>
                  <h3 className="text-md font-medium mb-3">Estilo de decoración</h3>
                  <Select value={decorStyle} onValueChange={(value) => setDecorStyle(value as DecorStyle)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nórdico">Nórdico</SelectItem>
                      <SelectItem value="moderno">Moderno</SelectItem>
                      <SelectItem value="rústico">Rústico</SelectItem>
                      <SelectItem value="contemporáneo">Contemporáneo</SelectItem>
                      <SelectItem value="minimalista">Minimalista</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mediterráneo">Mediterráneo</SelectItem>
                      <SelectItem value="clásico">Clásico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
              onClick={handleEditImage}
              disabled={!selectedImage || isProcessing}
            >
              {isProcessing ? "Procesando..." : "Procesar Imagen"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {editedImage && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
            <CardDescription>
              {editMode === "enhancement" 
                ? "Imagen mejorada profesionalmente" 
                : editMode === "homestaging" 
                  ? `Homestaging virtual en estilo ${decorStyle}` 
                  : `Imagen mejorada con homestaging virtual en estilo ${decorStyle}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Tabs defaultValue="after" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="before">Antes</TabsTrigger>
                <TabsTrigger value="after">Después</TabsTrigger>
              </TabsList>
              <TabsContent value="before" className="flex justify-center">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Imagen original" 
                    className="max-h-[500px] object-contain rounded-md"
                  />
                )}
              </TabsContent>
              <TabsContent value="after" className="flex justify-center">
                <img 
                  src={editedImage} 
                  alt="Imagen procesada" 
                  className="max-h-[500px] object-contain rounded-md"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageEditor;
