
import { RoomType } from "./types";

export const getRoomTypeLabel = (type: RoomType): string => {
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
