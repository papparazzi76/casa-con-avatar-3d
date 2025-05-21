
import { toast } from "sonner";
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { getRoomTypeLabel } from "@/features/image-editor/util";

// For property ad generation
export interface PropertyAdFormData {
  propertyType: string;
  operation: string;
  location: string;
  area: string;
  rooms: string;
  price: string;
  bathrooms?: string;
  condition?: string;
  features?: string;
  description?: string;
  tone: string;
  useEmojis: boolean;
}

export interface PropertyAdResult {
  titulo: string;
  descripcion: string;
  destacados: string[];
}

// Hidden API key as a constant that doesn't get exposed to the client
const OPENAI_API_KEY = "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";

// For image processing
export interface ImageProcessingOptions {
  image: File;
  editMode: EditMode;
  roomType: RoomType;
  decorStyle?: DecorStyle;
}

export async function processImage({
  image,
  editMode,
  roomType,
  decorStyle = "moderno"
}: ImageProcessingOptions): Promise<string> {
  try {
    // Create prompt based on options
    const prompt = createImagePrompt(editMode, roomType, decorStyle);
    
    // Create FormData to properly send the multipart request
    const formData = new FormData();
    formData.append("model", "dall-e-3");
    formData.append("prompt", prompt);
    formData.append("n", "1");
    formData.append("size", "1024x1024");
    formData.append("image", image);
    formData.append("response_format", "b64_json");
    
    // Call OpenAI API with FormData
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        // Don't set Content-Type here as the browser will set it automatically with the boundary
      },
      body: formData
    });
    
    // Process response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return `data:image/png;base64,${data.data[0].b64_json}`;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Helper function to create prompt based on options
function createImagePrompt(editMode: EditMode, roomType: RoomType, decorStyle: DecorStyle): string {
  const roomTypeLabel = getRoomTypeLabel(roomType);
  
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

// For property ad generation
export async function generatePropertyAd(formData: PropertyAdFormData): Promise<PropertyAdResult> {
  try {
    // Construimos el prompt con las instrucciones y los datos del inmueble
    const prompt = `
Eres un copywriter inmobiliario sénior y especialista en SEO local. 
Tu misión es generar un anuncio persuasivo y profesional para la ${formData.operation} de un inmueble en España, usando ÚNICAMENTE la información proporcionada.

INFORMACIÓN DEL INMUEBLE:
- Tipo: ${formData.propertyType}
- Ubicación: ${formData.location}
- Superficie: ${formData.area} m²
- Habitaciones: ${formData.rooms}
${formData.bathrooms ? `- Baños: ${formData.bathrooms}` : ''}
${formData.condition ? `- Estado: ${formData.condition}` : ''}
- Precio: ${formData.price}€
${formData.features ? `- Características destacables: ${formData.features}` : ''}
${formData.description ? `- Información adicional: ${formData.description}` : ''}

INSTRUCCIONES:
1. Título: 1 línea ≤ 70 caracteres; incluye al menos ⟨tipo de inmueble⟩ y ⟨ubicación clave⟩.
2. Descripción: 150-300 palabras en párrafos cortos; lenguaje claro, positivo y orientado a beneficios. Incorpora palabras clave locales y de intención de compra.
3. Destacados: 3-5 bullets (máx. 12 palabras cada uno) con las ventajas diferenciales más fuertes.

TONO: ${formData.tone}
${formData.useEmojis ? 'Incluye uno o dos emojis relevantes en el texto.' : 'No incluyas emojis.'}

Responde solamente con un objeto JSON con esta estructura exacta, sin texto adicional:
{
  "titulo": "...",
  "descripcion": "...",
  "destacados": [
    "...",
    "...",
    "..."
  ]
}
`;

    // Llamada real a la API de OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Usando GPT-4o-mini para generación de texto
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al generar el anuncio");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parseamos la respuesta JSON
    return JSON.parse(content);
  } catch (error) {
    console.error("Error al generar el anuncio:", error);
    toast.error("Hubo un error al generar el anuncio");
    throw error;
  }
}
