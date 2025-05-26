
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { getRoomTypeLabel } from "@/features/image-editor/util";
import { convertFileToBase64 } from "./utils";
import { 
  ImageEditPlan, 
  ImageEditResponse, 
  ImageProcessingOptions, 
  ProcessImageResult 
} from "./types/image";
import { OPENAI_API_KEY, getOpenAIHeaders } from "./config";

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

/**
 * Helper function to call OpenAI API
 */
async function callOpenAIAPI(model: string, systemPrompt: string, userContent: any) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: getOpenAIHeaders(),
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(userContent) }
      ],
      temperature: 0.7
    })
  });
}

/**
 * Parses the JSON response from GPT
 */
function parseGptResponse(responseContent: string): ImageEditResponse {
  try {
    return JSON.parse(responseContent);
  } catch (parseError) {
    console.error("Error parsing JSON response:", parseError);
    return {
      success: false,
      error_message: "Error al procesar el plan de edición. Formato incorrecto.",
      edit_plan: null
    };
  }
}

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

/**
 * Processes an image with DALL-E API
 */
async function processDallEImage(
  prompt: string
): Promise<{ url: string }> {
  console.log("Enviando solicitud a DALL-E 3...");
  
  const requestBody = {
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard"
  };
  
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: getOpenAIHeaders(),
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error en la API de DALL-E:", errorData);
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  console.log("Respuesta de DALL-E recibida:", data);
  
  if (!data.data || !data.data[0] || !data.data[0].url) {
    throw new Error("Respuesta de DALL-E incompleta o incorrecta");
  }
  
  return { url: data.data[0].url };
}

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
