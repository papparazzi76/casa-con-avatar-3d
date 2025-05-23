
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { getRoomTypeLabel } from "@/features/image-editor/util";
import { convertFileToBase64 } from "./utils";
import { ImageEditPlan, ImageEditResponse, ImageProcessingOptions, ProcessImageResult } from "./types/image";
import { OPENAI_API_KEY, getOpenAIHeaders } from "./config";

// Función para generar un plan de edición de imágenes utilizando GPT-4o-mini
export async function generateImageEditPlan(input: {
  mode: EditMode;
  room_type: RoomType;
  image_url: string;
  notes?: string;
}): Promise<ImageEditResponse> {
  try {
    console.log("Generando plan de edición para una imagen:", input.mode, input.room_type);
    
    // Preparar el sistema y los mensajes de usuario
    const systemPrompt = `Eres un modelo de lenguaje de OpenAI integrado en la aplicación web "Editor de Imágenes & Homestaging".
Tu único cometido es generar instrucciones claras y estructuradas, en español, que el backend enviará al micro-servicio de edición de imágenes o a la IA de generación visual (p. ej. DALL·E).
No escribes texto para el usuario final ni explicaciones de tu lógica interna; solo devuelves la respuesta en el formato JSON especificado.`;

    // Llamar a GPT-4o-mini
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: getOpenAIHeaders(),
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(input) }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de la API de OpenAI:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const responseContent = data.choices[0].message.content;
    
    console.log("Plan de edición generado correctamente");
    
    // Parse the JSON response from GPT
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
  } catch (error: any) {
    console.error("Error generating image edit plan:", error);
    return {
      success: false,
      error_message: `Error al generar el plan de edición: ${error.message}`,
      edit_plan: null
    };
  }
}

// Helper function to create prompt based on options and edit plan
export function createImagePrompt(editMode: EditMode, roomType: RoomType, decorStyle: DecorStyle, editPlan?: ImageEditResponse): string {
  const roomTypeLabel = getRoomTypeLabel(roomType);
  
  if (editPlan && editPlan.success && editPlan.edit_plan) {
    // Use the edit plan to create a more detailed prompt
    return `${editPlan.edit_plan.expected_result}
    
Aplicar estas mejoras específicas:
${editPlan.edit_plan.steps.map((step, index) => `${index + 1}. ${step.tool}: ${JSON.stringify(step.params)}`).join('\n')}

Tipo de estancia: ${roomTypeLabel}
${editMode !== "enhancement" ? `Estilo de decoración: ${editPlan.edit_plan.staging_style || decorStyle}` : ''}
`;
  } else {
    // Fallback to original prompts if no edit plan is available
    if (editMode === "enhancement") {
      return `Mejora profesional de esta fotografía de ${roomTypeLabel}. 
              Ajusta la iluminación, el contraste y corrige la distorsión.`;
    } else if (editMode === "homestaging") {
      return `Aplica homestaging virtual a esta fotografía de ${roomTypeLabel} 
              en estilo ${decorStyle}. Añade muebles y decoración apropiados.`;
    } else {
      return `Mejora profesional de esta fotografía de ${roomTypeLabel} 
              y aplica homestaging virtual en estilo ${decorStyle}. 
              Mejora la iluminación y añade muebles y decoración apropiados.`;
    }
  }
}

// Función principal para procesar imágenes
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
    
    // Primero: Generar el plan de edición con GPT-4o-mini
    const editPlanResponse = await generateImageEditPlan({
      mode: editMode as EditMode,
      room_type: roomType as RoomType,
      image_url: "data:image/jpeg;base64," + base64Image.split(',')[1],
      notes: `Estilo: ${decorStyle}`
    });
    
    let editPlan: ImageEditPlan | null = null;
    if (editPlanResponse.success && editPlanResponse.edit_plan) {
      editPlan = editPlanResponse.edit_plan;
      // Log del plan de edición para depuración
      console.log("Plan de edición generado:", JSON.stringify(editPlan));
    } else {
      console.log("No se pudo generar un plan de edición específico, usando proceso estándar");
    }
    
    // Crear prompt basado en opciones y el plan de edición
    const prompt = createImagePrompt(
      editMode as EditMode, 
      roomType as RoomType, 
      decorStyle as DecorStyle, 
      editPlanResponse
    );
    console.log("Prompt generado:", prompt);
    
    // Llamar a DALL-E API para la edición de imagen
    const requestBody = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard"
    };
    
    console.log("Enviando solicitud a DALL-E 3...");
    
    // Llamar a la API de OpenAI para generar una nueva imagen
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: getOpenAIHeaders(),
      body: JSON.stringify(requestBody)
    });
    
    // Procesar respuesta
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la API de DALL-E:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Respuesta de DALL-E recibida:", data);
    
    // La API de DALL-E-3 devuelve una URL de imagen, no base64
    if (!data.data || !data.data[0] || !data.data[0].url) {
      throw new Error("Respuesta de DALL-E incompleta o incorrecta");
    }
    
    console.log("Imagen procesada correctamente");
    
    // Devolver la URL de la imagen generada
    return {
      imageUrl: data.data[0].url,
      editPlan: editPlan
    };
  } catch (error: any) {
    console.error("Error processing image:", error);
    throw error;
  }
}
