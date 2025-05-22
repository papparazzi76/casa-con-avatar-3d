
import { Button } from "@/components/ui/button";
import { Room, ReformType } from "./types";
import { IntegralRoomsList } from "./IntegralRoomsList";
import { PartialItemsList } from "./PartialItemsList";
import { RoomEditDialog } from "./RoomEditDialog";
import { useState } from "react";

interface RoomsConfigurationStepProps {
  reformType: ReformType;
  rooms: Room[];
  selectedPartialItems: string[];
  onRoomsChange: (rooms: Room[]) => void;
  onSelectedPartialItemsChange: (items: string[]) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function RoomsConfigurationStep({
  reformType,
  rooms,
  selectedPartialItems,
  onRoomsChange,
  onSelectedPartialItemsChange,
  onPrevious,
  onNext,
}: RoomsConfigurationStepProps) {
  const [currentEditingRoom, setCurrentEditingRoom] = useState<Room | null>(null);

  const handleRoomEdit = (room: Room) => {
    setCurrentEditingRoom(room);
  };

  const handleRoomSave = (updatedRoom: Room) => {
    const updatedRooms = rooms.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    onRoomsChange(updatedRooms);
    setCurrentEditingRoom(null);
  };

  const handleRoomDelete = (roomId: string) => {
    // Si es una habitación de obra parcial, actualizar también selectedPartialItems
    if (roomId.startsWith("partial_")) {
      const partialItemId = roomId.replace("partial_", "");
      onSelectedPartialItemsChange(
        selectedPartialItems.filter((id) => id !== partialItemId)
      );
    }

    onRoomsChange(rooms.filter((room) => room.id !== roomId));
    setCurrentEditingRoom(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">
          {reformType === "integral"
            ? "Configura los espacios de tu reforma integral"
            : "Selecciona las partidas a reformar"}
        </h3>
      </div>

      {reformType === "integral" ? (
        <IntegralRoomsList
          rooms={rooms}
          onEditRoom={handleRoomEdit}
          onAddRoom={(name, area, additionalType) => {
            // Los detalles de cómo crear una habitación ahora serían manejados por el 
            // componente principal ReformBudgetDialog, que ya tiene toda la lógica
            // para crear una habitación con sus cálculos
            const roomId = `${additionalType}_${Date.now()}`;
            // Notificar al componente padre que queremos añadir una habitación
            // con estos parámetros
            onRoomsChange([
              ...rooms,
              {
                id: roomId,
                name,
                area,
                workType: "obra_nueva",
                quality: "estandar",
                chapters: [],
                subtotal: 0
              }
            ]);
          }}
        />
      ) : (
        <PartialItemsList
          selectedPartialItems={selectedPartialItems}
          rooms={rooms}
          onItemToggle={(itemId) => {
            // La lógica para añadir o quitar partidas se manejará en el componente principal
            // Aquí solo notificamos el cambio
            if (selectedPartialItems.includes(itemId)) {
              onSelectedPartialItemsChange(
                selectedPartialItems.filter((id) => id !== itemId)
              );
              onRoomsChange(
                rooms.filter((room) => room.id !== `partial_${itemId}`)
              );
            } else {
              onSelectedPartialItemsChange([...selectedPartialItems, itemId]);
              // La creación de la habitación se hará en el componente principal
            }
          }}
          onEditRoom={handleRoomEdit}
        />
      )}

      <RoomEditDialog
        room={currentEditingRoom}
        onSave={handleRoomSave}
        onDelete={handleRoomDelete}
        onCancel={() => setCurrentEditingRoom(null)}
      />

      <div className="flex justify-between pt-4 border-t">
        <Button onClick={onPrevious} variant="outline">
          Anterior
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise"
          disabled={rooms.length === 0}
        >
          Ver resumen
        </Button>
      </div>
    </div>
  );
}
