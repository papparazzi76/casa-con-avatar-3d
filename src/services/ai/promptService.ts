
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { getRoomTypeLabel } from "@/features/image-editor/util";
import { ImageEditResponse } from "./types/image";

/**
 * Creates a prompt for image processing based on the edit mode and other parameters
 */
export function createImagePrompt(
  editMode: EditMode, 
  roomType: RoomType, 
  decorStyle: DecorStyle, 
  editPlan?: ImageEditResponse
): string {
  const roomTypeLabel = getRoomTypeLabel(roomType);
  
  if (editMode === "enhancement") {
    // Aplicar las directrices específicas para corrección de iluminación y color
    return `You are an expert image editing assistant. Correct the general lighting and color of this ${roomTypeLabel} photograph following these strict guidelines:

- Preserve every element, object, and detail of the original photograph exactly as it appears
- Make only the lightest possible adjustments to overall exposure, contrast, brightness, white balance, and color saturation
- Do not add, remove, or alter any objects, textures, or compositional elements
- Ensure skin tones or natural materials remain realistic and consistent
- Apply changes globally and subtly—no localized retouching or creative filters
- Output only the edited image with the adjusted lighting and color corrections

Confirm that no other modifications have been made beyond the global lighting and color balance adjustments.`;
  }
  
  if (editPlan && editPlan.success && editPlan.edit_plan) {
    // Use the edit plan to create a more detailed prompt
    return `${editPlan.edit_plan.expected_result || ''}
    
Aplicar estas mejoras específicas:
${editPlan.edit_plan.steps.map((step, index) => `${index + 1}. ${step.tool}: ${JSON.stringify(step.params)}`).join('\n')}

Tipo de estancia: ${roomTypeLabel}
Estilo de decoración: ${editPlan.edit_plan.staging_style || decorStyle}
`;
  } else {
    // Fallback to original prompts if no edit plan is available
    if (editMode === "homestaging") {
      return `Aplica homestaging virtual a esta fotografía de ${roomTypeLabel} 
              en estilo ${decorStyle}. Añade muebles y decoración apropiados.`;
    } else {
      return `Mejora profesional de esta fotografía de ${roomTypeLabel} 
              y aplica homestaging virtual en estilo ${decorStyle}. 
              Mejora la iluminación y añade muebles y decoración apropiados.`;
    }
  }
}
