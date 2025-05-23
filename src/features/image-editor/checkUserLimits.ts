
import { EditedImage } from "./types";
import { User } from "@supabase/supabase-js";
import { EditMode, RoomType } from "./types";

export const checkUserLimit = (user: User | null, editedImages: EditedImage[]) => {
  if (!user) return { canEdit: false, message: "Debes iniciar sesión para editar imágenes." };
  
  // User can edit max 5 images
  if (editedImages.length >= 5) {
    return { 
      canEdit: false, 
      message: "Has alcanzado el límite de 5 imágenes editadas. Contacta con nosotros para más ediciones."
    };
  }
  
  return { canEdit: true, message: "" };
};

export const checkPaymentRequired = (editMode: EditMode, roomType: RoomType) => {
  // Gratuitas: todas las mejoras y homestaging de salón y dormitorio
  if (editMode === "enhancement") return false;
  
  // Homestaging: solo gratuitas salón y dormitorio
  if (editMode === "homestaging" && (roomType === "salon" || roomType === "dormitorio")) return false;
  
  // De pago: cocina y baño (2,99€ cada imagen)
  return true;
};

export const createMockEditPlan = () => {
  return {
    description: "Imagen mejorada con ajustes de iluminación, contraste y nitidez.",
    steps: [
      {
        tool: "Ajustes de luz",
        params: { intensidad: "media", contraste: "+15%" }
      },
      {
        tool: "Mejora de nitidez",
        params: { cantidad: 30, radio: 1.5 }
      },
      {
        tool: "Corrección de perspectiva",
        params: { vertical: "auto", horizontal: "0" }
      },
      {
        tool: "Optimización general",
        params: { intensidad: "alta" }
      }
    ]
  };
};
