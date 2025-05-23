
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { DecorStyle, EditMode, RoomType } from "./types";
import { Wand2, Home, Coins } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface EditorOptionsProps {
  editMode: EditMode;
  onEditModeChange: (mode: EditMode) => void;
  roomType: RoomType;
  onRoomTypeChange: (type: RoomType) => void;
  decorStyle: DecorStyle;
  onDecorStyleChange: (style: DecorStyle) => void;
  isProcessing: boolean;
  onProcessImage: () => void;
  hasImage: boolean;
  showPaymentIndicator?: boolean;
  paymentAmount?: string;
}

export const EditorOptions = ({ 
  editMode, 
  onEditModeChange,
  roomType,
  onRoomTypeChange,
  decorStyle,
  onDecorStyleChange,
  isProcessing,
  onProcessImage,
  hasImage,
  showPaymentIndicator = false,
  paymentAmount = "2,99€" 
}: EditorOptionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opciones de Edición</CardTitle>
        <CardDescription>
          Personaliza la edición según tus necesidades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Tipo de edición</Label>
          
          <RadioGroup value={editMode} onValueChange={(value) => onEditModeChange(value as EditMode)} className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="enhancement" id="enhancement" />
              <Label htmlFor="enhancement" className="flex items-center cursor-pointer">
                <Wand2 className="w-4 h-4 mr-2" />
                Mejora de imagen
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Gratis</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="homestaging" id="homestaging" />
              <Label htmlFor="homestaging" className="flex items-center cursor-pointer">
                <Home className="w-4 h-4 mr-2" />
                Homestaging virtual
                {roomType === "salon" || roomType === "dormitorio" ? (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Gratis</span>
                ) : (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{paymentAmount}</span>
                )}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {editMode === "homestaging" && (
          <>
            <div className="space-y-3">
              <Label>Tipo de estancia</Label>
              <Select value={roomType} onValueChange={(value) => onRoomTypeChange(value as RoomType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estancias</SelectLabel>
                    <SelectItem value="salon">Salón <span className="ml-2 text-xs text-green-600">(Gratis)</span></SelectItem>
                    <SelectItem value="dormitorio">Dormitorio <span className="ml-2 text-xs text-green-600">(Gratis)</span></SelectItem>
                    <SelectItem value="cocina">Cocina <span className="ml-2 text-xs text-amber-600">({paymentAmount})</span></SelectItem>
                    <SelectItem value="bano">Baño <span className="ml-2 text-xs text-amber-600">({paymentAmount})</span></SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Estilo decorativo</Label>
              <Select value={decorStyle} onValueChange={(value) => onDecorStyleChange(value as DecorStyle)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estilos</SelectLabel>
                    <SelectItem value="moderno">Moderno</SelectItem>
                    <SelectItem value="escandinavo">Escandinavo</SelectItem>
                    <SelectItem value="minimalista">Minimalista</SelectItem>
                    <SelectItem value="clasico">Clásico</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Button 
          onClick={onProcessImage} 
          disabled={isProcessing || !hasImage}
          className="w-full"
        >
          {isProcessing ? "Procesando..." : (
            showPaymentIndicator ? (
              <span className="flex items-center">
                <Coins className="mr-2 h-4 w-4" />
                Procesar ({paymentAmount})
              </span>
            ) : (
              "Procesar imagen"
            )
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
