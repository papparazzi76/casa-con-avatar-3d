
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EditMode, DecorStyle, RoomType } from "./types";

interface ResultDisplayProps {
  editedImage: string;
  originalImage: string;
  editMode: EditMode;
  decorStyle: DecorStyle;
  roomType: RoomType;
  getRoomTypeLabel: (type: RoomType) => string;
}

export const ResultDisplay = ({ 
  editedImage, 
  originalImage, 
  editMode, 
  decorStyle, 
  roomType,
  getRoomTypeLabel 
}: ResultDisplayProps) => {
  const { toast } = useToast();

  const handleDownloadImage = () => {
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
            <img 
              src={originalImage} 
              alt="Imagen original" 
              className="max-h-[500px] object-contain rounded-md"
            />
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
  );
};
