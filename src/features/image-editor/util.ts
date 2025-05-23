
import { RoomType } from "./types";

export const getRoomTypeLabel = (type: RoomType): string => {
  const labels: Record<RoomType, string> = {
    cocina: "cocina",
    bano: "baño", // Notice the spelling difference between the key and the value
    salon: "salón",
    dormitorio: "dormitorio",
    oficina: "oficina",
    exterior: "espacio exterior",
    otra: "otra estancia"
  };
  return labels[type];
};
