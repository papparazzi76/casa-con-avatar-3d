
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bath, CookingPot, Sofa } from "lucide-react";
import { DecorStyle, EditMode, RoomType } from "./types";

interface EditorOptionsProps {
  editMode: EditMode;
  onEditModeChange: (value: EditMode) => void;
  roomType: RoomType;
  onRoomTypeChange: (value: RoomType) => void;
  decorStyle: DecorStyle;
  onDecorStyleChange: (value: DecorStyle) => void;
  onProcessImage: () => void;
  isProcessing: boolean;
  hasImage: boolean;
}

export const EditorOptions = ({
  editMode,
  onEditModeChange,
  roomType,
  onRoomTypeChange,
  decorStyle,
  onDecorStyleChange,
  onProcessImage,
  isProcessing,
  hasImage,
}: EditorOptionsProps) => {

  const getRoomTypeIcon = (type: RoomType) => {
    switch (type) {
      case "cocina": return <CookingPot className="h-4 w-4 mr-2" />;
      case "baño": return <Bath className="h-4 w-4 mr-2" />;
      case "salon": 
      case "dormitorio":
      case "oficina": 
      case "exterior":
      case "otra":
      default: return <Sofa className="h-4 w-4 mr-2" />;
    }
  };

  return (
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
              onValueChange={(value) => onEditModeChange(value as EditMode)}
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
            <Select value={roomType} onValueChange={(value) => onRoomTypeChange(value as RoomType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el tipo de estancia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cocina">
                  <div className="flex items-center">
                    <CookingPot className="h-4 w-4 mr-2" />
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
              <Select value={decorStyle} onValueChange={(value) => onDecorStyleChange(value as DecorStyle)}>
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
          onClick={onProcessImage}
          disabled={!hasImage || isProcessing}
        >
          {isProcessing ? "Procesando..." : "Procesar Imagen"}
        </Button>
      </CardFooter>
    </Card>
  );
};
