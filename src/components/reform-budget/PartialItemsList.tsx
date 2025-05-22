
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Room, partialItems } from "./types";

interface PartialItemsListProps {
  selectedPartialItems: string[];
  rooms: Room[];
  onItemToggle: (itemId: string) => void;
  onEditRoom: (room: Room) => void;
}

export function PartialItemsList({
  selectedPartialItems,
  rooms,
  onItemToggle,
  onEditRoom,
}: PartialItemsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {partialItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-2 border rounded-md p-2">
          <Checkbox 
            id={item.id}
            checked={selectedPartialItems.includes(item.id)}
            onCheckedChange={() => onItemToggle(item.id)}
          />
          <Label htmlFor={item.id} className="flex-grow cursor-pointer">
            {item.name}
          </Label>
          
          {selectedPartialItems.includes(item.id) && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                const room = rooms.find(r => r.id === `partial_${item.id}`);
                if (room) onEditRoom(room);
              }}
            >
              Detalles
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
