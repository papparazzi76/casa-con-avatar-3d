
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { convertFileToBase64 } from "./utils";
import { 
  ImageEditPlan, 
  ImageEditResponse, 
  ImageProcessingOptions, 
  ProcessImageResult 
} from "./types/image";
import { createImagePrompt } from "./promptService";
import { generateImageEditPlan } from "./editPlanService";
import { processDallEImage } from "./dalleService";

// Re-export the generateImageEditPlan function for backward compatibility
export { generateImageEditPlan } from "./editPlanService";

// Re-export the createImagePrompt function for backward compatibility
export { createImagePrompt } from "./promptService";

/**
 * Main function to process images
 */
export async function processImage({
  image,
  editMode,
  roomType,
  decorStyle = "moderno"
}: ImageProcessingOptions): Promise<ProcessImageResult> {
  try {
    console.log("Procesando imagen...", editMode, roomType, decorStyle);
    
    // Convertir imagen a base64
    const base64Image = await convertFileToBase64(image);
    console.log("Imagen convertida a base64");
    
    // Generar el plan de edición con GPT-4o-mini solo para homestaging y mixto
    let editPlanResponse: ImageEditResponse | null = null;
    if (editMode === "homestaging" || editMode === "mixto") {
      editPlanResponse = await generateImageEditPlan({
        mode: editMode as EditMode,
        room_type: roomType as RoomType,
        image_url: "data:image/jpeg;base64," + base64Image.split(',')[1],
        notes: `Estilo: ${decorStyle}`
      });
    }
    
    let editPlan: ImageEditPlan | null = null;
    if (editPlanResponse && editPlanResponse.success && editPlanResponse.edit_plan) {
      editPlan = editPlanResponse.edit_plan;
      console.log("Plan de edición generado:", JSON.stringify(editPlan));
    } else if (editMode === "homestaging" || editMode === "mixto") {
      console.log("No se pudo generar un plan de edición específico, usando proceso estándar");
    }
    
    // Crear prompt basado en opciones y el plan de edición
    const prompt = createImagePrompt(
      editMode as EditMode, 
      roomType as RoomType, 
      decorStyle as DecorStyle, 
      editPlanResponse || undefined
    );
    console.log("Prompt generado:", prompt);
    
    // Llamar a DALL-E API para la edición de imagen
    const result = await processDallEImage(prompt);
    
    console.log("Imagen procesada correctamente");
    
    // Devolver la URL de la imagen generada
    return {
      imageUrl: result.url,
      editPlan: editPlan
    };
  } catch (error: any) {
    console.error("Error processing image:", error);
    throw error;
  }
}
