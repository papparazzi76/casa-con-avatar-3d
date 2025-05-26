
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { ImageEditResponse } from "./types/image";
import { callOpenAIAPI, parseGptResponse } from "./openaiApiService";

/**
 * Calls the OpenAI API to generate a plan for image editing
 */
export async function generateImageEditPlan(input: {
  mode: EditMode;
  room_type: RoomType;
  image_url: string;
  notes?: string;
}): Promise<ImageEditResponse> {
  try {
    console.log("Generando plan de edición para una imagen:", input.mode, input.room_type);
    
    const systemPrompt = `Eres un modelo de lenguaje de OpenAI integrado en la aplicación web "Editor de Imágenes & Homestaging".
Tu único cometido es generar instrucciones claras y estructuradas, en español, que el backend enviará al micro-servicio de edición de imágenes o a la IA de generación visual (p. ej. DALL·E).
No escribes texto para el usuario final ni explicaciones de tu lógica interna; solo devuelves la respuesta en el formato JSON especificado.

Para el modo "enhancement" (mejora de imagen), SIEMPRE debes seguir estas directrices estrictas:
- Preservar cada elemento, objeto y detalle de la fotografía original exactamente como aparece
- Hacer solo los ajustes más ligeros posibles en exposición general, contraste, brillo, balance de blancos y saturación de color
- No añadir, eliminar o alterar ningún objeto, textura o elemento compositivo
- Asegurar que los tonos de piel o materiales naturales permanezcan realistas y consistentes
- Aplicar cambios globales y sutiles—sin retoque localizado o filtros creativos
- Confirmar que no se han hecho otras modificaciones más allá de los ajustes globales de iluminación y balance de color`;

    const response = await callOpenAIAPI("gpt-4o-mini", systemPrompt, input);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de la API de OpenAI:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0].message.content;
    
    console.log("Plan de edición generado correctamente");
    
    return parseGptResponse(responseContent);
  } catch (error: any) {
    console.error("Error generating image edit plan:", error);
    return {
      success: false,
      error_message: `Error al generar el plan de edición: ${error.message}`,
      edit_plan: null
    };
  }
}
