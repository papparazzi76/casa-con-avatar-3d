
import { toast } from "sonner";
import { PropertyAdFormData, PropertyAdResult } from "./types/property";
import { OPENAI_API_KEY } from "./config";

// Servicio para generación de anuncios inmobiliarios
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
