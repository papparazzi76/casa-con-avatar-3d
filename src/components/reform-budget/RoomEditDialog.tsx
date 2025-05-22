
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room, workTypes, qualityTypes } from "./types";
import { calculateBasePrice } from "./utils";

interface RoomEditDialogProps {
  room: Room | null;
  onSave: (room: Room) => void;
  onDelete: (roomId: string) => void;
  onCancel: () => void;
}

export function RoomEditDialog({ 
  room, 
  onSave, 
  onDelete, 
  onCancel 
}: RoomEditDialogProps) {
  if (!room) return null;

  const handleAreaChange = (newArea: number) => {
    if (newArea > 0) {
      // Actualizar area y recalcular importes
      const updatedRoom = {...room, area: newArea};
      updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
        ...chapter,
        amount: calculateBasePrice(newArea, updatedRoom.workType, updatedRoom.quality, chapter.id)
      }));
      updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
      
      return updatedRoom;
    }
    return room;
  };

  const handleWorkTypeChange = (workType: string) => {
    // Actualizar tipo de obra y recalcular importes
    const updatedRoom = {...room, workType};
    updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
      ...chapter,
      amount: calculateBasePrice(updatedRoom.area, workType, updatedRoom.quality, chapter.id)
    }));
    updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
    
    return updatedRoom;
  };

  const handleQualityChange = (quality: string) => {
    // Actualizar calidad y recalcular importes
    const updatedRoom = {...room, quality};
    updatedRoom.chapters = updatedRoom.chapters.map(chapter => ({
      ...chapter,
      amount: calculateBasePrice(updatedRoom.area, updatedRoom.workType, quality, chapter.id)
    }));
    updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
    
    return updatedRoom;
  };

  const handleChapterAmountChange = (chapterId: string, amount: number) => {
    if (amount >= 0) {
      // Actualizar importe del capítulo
      const updatedRoom = {...room};
      updatedRoom.chapters = room.chapters.map(ch => 
        ch.id === chapterId ? {...ch, amount} : ch
      );
      
      // Recalcular subtotal
      updatedRoom.subtotal = updatedRoom.chapters.reduce((sum, ch) => sum + ch.amount, 0);
      
      return updatedRoom;
    }
    return room;
  };

  return (
    <Dialog open={!!room} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {room.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="room-name">Nombre</Label>
            <Input
              id="room-name"
              value={room.name}
              onChange={(e) => onSave({...room, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="room-area">Superficie (m²)</Label>
            <Input
              id="room-area"
              type="number"
              min="1"
              value={room.area}
              onChange={(e) => {
                const newArea = Number(e.target.value);
                onSave(handleAreaChange(newArea));
              }}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tipo de obra</Label>
            <div className="grid grid-cols-2 gap-2">
              {workTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={room.workType === type.id ? "default" : "outline"}
                  className={
                    room.workType === type.id 
                      ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
                      : ""
                  }
                  onClick={() => onSave(handleWorkTypeChange(type.id))}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Calidad de acabados</Label>
            <div className="grid grid-cols-2 gap-2">
              {qualityTypes.map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  variant={room.quality === type.id ? "default" : "outline"}
                  className={
                    room.quality === type.id 
                      ? "bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
                      : ""
                  }
                  onClick={() => onSave(handleQualityChange(type.id))}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Desglose por capítulos</Label>
            <div className="border rounded-md divide-y">
              {room.chapters.map((chapter) => (
                <div key={chapter.id} className="flex justify-between items-center p-2">
                  <span>{chapter.name}</span>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="0"
                      value={chapter.amount}
                      onChange={(e) => {
                        const newAmount = Number(e.target.value);
                        onSave(handleChapterAmountChange(chapter.id, newAmount));
                      }}
                      className="w-24 text-right"
                    />
                    <span className="ml-2">€</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total estancia</span>
              <span>
                {room.chapters.reduce((sum, ch) => sum + ch.amount, 0).toLocaleString('es-ES')} €
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="destructive" 
            onClick={() => onDelete(room.id)}
          >
            Eliminar
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              onClick={() => onSave(room)}
              className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
