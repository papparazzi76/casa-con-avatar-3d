
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Kitchen, Bath, Sofa } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type EditMode = "enhancement" | "homestaging" | "mixto";
type DecorStyle = "nórdico" | "moderno" | "rústico" | "contemporáneo" | "minimalista" | "industrial" | "mediterráneo" | "clásico";
type RoomType = "cocina" | "baño" | "salon" | "dormitorio" | "oficina" | "exterior" | "otra";

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>("enhancement");
  const [decorStyle, setDecorStyle] = useState<DecorStyle>("moderno");
  const [roomType, setRoomType] = useState<RoomType>("salon");
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
      // En un caso real, aquí enviaríamos la imagen a la API de OpenAI
      // con un prompt específico basado en las opciones seleccionadas
      
      toast({
        title: "Procesando imagen",
        description: "Esto puede tardar unos momentos...",
      });

      // Construimos el prompt para OpenAI basado en las opciones seleccionadas
      let prompt = "";
      
      if (editMode === "enhancement") {
        prompt = `Mejora profesional de esta fotografía de ${getRoomTypeLabel(roomType)}. 
                  Ajusta la iluminación, el contraste y corrige la distorsión.`;
      } else if (editMode === "homestaging") {
        prompt = `Aplica homestaging virtual a esta fotografía de ${getRoomTypeLabel(roomType)} 
                  en estilo ${decorStyle}. Añade muebles y decoración apropiados.`;
      } else {
        prompt = `Mejora profesional de esta fotografía de ${getRoomTypeLabel(roomType)} 
                  y aplica homestaging virtual en estilo ${decorStyle}. 
                  Mejora la iluminación y añade muebles y decoración apropiados.`;
      }

      console.log("Prompt para OpenAI:", prompt);
      
      // Simulación de procesamiento con OpenAI (en producción, se reemplazaría con la llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // En un entorno real, aquí obtendríamos la imagen procesada desde la API de OpenAI
      // Por ahora, simplemente usamos la imagen original como simulación
      setEditedImage(imagePreview);
      
      toast({
        title: "¡Imagen procesada con éxito!",
        description: `Modo: ${editMode}${editMode !== "enhancement" ? `, Estilo: ${decorStyle}` : ""}, Estancia: ${getRoomTypeLabel(roomType)}`,
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
  
  const getRoomTypeLabel = (type: RoomType): string => {
    const labels: Record<RoomType, string> = {
      cocina: "cocina",
      baño: "baño",
      salon: "salón",
      dormitorio: "dormitorio",
      oficina: "oficina",
      exterior: "espacio exterior",
      otra: "otra estancia"
    };
    return labels[type];
  };
  
  const getRoomTypeIcon = (type: RoomType) => {
    switch (type) {
      case "cocina": return <Kitchen className="h-4 w-4 mr-2" />;
      case "baño": return <Bath className="h-4 w-4 mr-2" />;
      case "salon": 
      case "dormitorio":
      case "oficina": 
      case "exterior":
      case "otra":
      default: return <Sofa className="h-4 w-4 mr-2" />;
    }
  };

  const handleDownloadImage = () => {
    if (!editedImage) return;
    
    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `imagen_editada_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Descarga iniciada",
      description: "La imagen editada se está descargando.",
    });
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
              
              <div>
                <h3 className="text-md font-medium mb-3">Tipo de estancia</h3>
                <Select value={roomType} onValueChange={(value) => setRoomType(value as RoomType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el tipo de estancia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cocina">
                      <div className="flex items-center">
                        <Kitchen className="h-4 w-4 mr-2" />
                        <span>Cocina</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="baño">
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-2" />
                        <span>Baño</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="salon">
                      <div className="flex items-center">
                        <Sofa className="h-4 w-4 mr-2" />
                        <span>Salón</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dormitorio">Dormitorio</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                    <SelectItem value="exterior">Espacio exterior</SelectItem>
                    <SelectItem value="otra">Otra estancia</SelectItem>
                  </SelectContent>
                </Select>
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
                ? `Imagen mejorada profesionalmente (${getRoomTypeLabel(roomType)})` 
                : editMode === "homestaging" 
                  ? `Homestaging virtual en estilo ${decorStyle} (${getRoomTypeLabel(roomType)})` 
                  : `Imagen mejorada con homestaging virtual en estilo ${decorStyle} (${getRoomTypeLabel(roomType)})`}
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
          <CardFooter className="flex justify-center">
            <Button 
              onClick={handleDownloadImage}
              className="bg-realestate-turquoise hover:bg-realestate-turquoise/90"
            >
              <Download className="mr-2 h-4 w-4" /> Descargar imagen
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ImageEditor;
