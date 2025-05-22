
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room, additionalRoomTypes } from "./types";
import { useState } from "react";

interface IntegralRoomsListProps {
  rooms: Room[];
  onEditRoom: (room: Room) => void;
  onAddRoom: (name: string, area: number, additionalType: string) => void;
}

export function IntegralRoomsList({ 
  rooms, 
  onEditRoom, 
  onAddRoom 
}: IntegralRoomsListProps) {
  const [additionalRoomType, setAdditionalRoomType] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomArea, setNewRoomArea] = useState(10);

  const handleAddRoom = () => {
    if (!additionalRoomType) return;

    let roomName = "";
    if (additionalRoomType === "otras") {
      roomName = newRoomName || "Espacio personalizado";
    } else {
      const roomType = additionalRoomTypes.find((r) => r.id === additionalRoomType);
      roomName = roomType ? roomType.name : "Nueva estancia";
    }

    onAddRoom(roomName, newRoomArea, additionalRoomType);
    setAdditionalRoomType("");
    setNewRoomName("");
    setNewRoomArea(10);
  };

  return (
    <>
      <div className="space-y-2">
        <h4 className="font-medium">Espacios básicos incluidos:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{room.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {room.area} m² - {room.subtotal.toLocaleString('es-ES')} €
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => onEditRoom(room)}>
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Añadir otros espacios:</h4>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={additionalRoomType}
            onChange={(e) => setAdditionalRoomType(e.target.value)}
          >
            <option value="">Selecciona un tipo de estancia</option>
            {additionalRoomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          {additionalRoomType === "otras" && (
            <Input
              placeholder="Nombre del espacio"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="md:w-1/3"
            />
          )}

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              placeholder="m²"
              value={newRoomArea}
              onChange={(e) => setNewRoomArea(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm">m²</span>
          </div>

          <Button 
            type="button"
            disabled={!additionalRoomType}
            onClick={handleAddRoom}
          >
            Añadir
          </Button>
        </div>
      </div>
    </>
  );
}
