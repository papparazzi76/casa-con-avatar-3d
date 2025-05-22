
import { Button } from "@/components/ui/button";
import { Room, ReformType } from "./types";
import { IntegralRoomsList } from "./IntegralRoomsList";
import { PartialItemsList } from "./PartialItemsList";
import { RoomEditDialog } from "./RoomEditDialog";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-4"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium">
          {reformType === "integral"
            ? "Configura los espacios de tu reforma integral"
            : "Selecciona las partidas a reformar"}
        </h3>
      </motion.div>

      <motion.div variants={itemVariants}>
        {reformType === "integral" ? (
          <IntegralRoomsList
            rooms={rooms}
            onEditRoom={handleRoomEdit}
            onAddRoom={(name, area, additionalType) => {
              const roomId = `${additionalType}_${Date.now()}`;
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
              if (selectedPartialItems.includes(itemId)) {
                onSelectedPartialItemsChange(
                  selectedPartialItems.filter((id) => id !== itemId)
                );
                onRoomsChange(
                  rooms.filter((room) => room.id !== `partial_${itemId}`)
                );
              } else {
                onSelectedPartialItemsChange([...selectedPartialItems, itemId]);
              }
            }}
            onEditRoom={handleRoomEdit}
          />
        )}
      </motion.div>

      <RoomEditDialog
        room={currentEditingRoom}
        onSave={handleRoomSave}
        onDelete={handleRoomDelete}
        onCancel={() => setCurrentEditingRoom(null)}
      />

      <motion.div 
        className="flex justify-between pt-4 border-t"
        variants={itemVariants}
      >
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
      </motion.div>
    </motion.div>
  );
}
