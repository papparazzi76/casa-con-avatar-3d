
import { toast } from "sonner";

// For OpenAI API call
const OPENAI_API_KEY = "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";

export interface SocialMediaPostFormData {
  plataforma: "instagram" | "facebook" | "ambas";
  tipo_operacion: "venta" | "alquiler";
  tipo_inmueble: string;
  localidad: string;
  superficie_m2: string;
  habitaciones: string;
  banos: string;
  precio: string;
  caracteristicas_destacadas: string[];
  url_contacto: string;
  fotos: File[];
  estado_conservacion?: string;
  extras?: string[];
  titulo_anuncio?: string;
  idioma?: string;
  tono?: string;
}

export interface SocialMediaPostResult {
  status: string;
  instagram?: {
    caption: string;
    hashtags: string[];
    slides: {
      titulo: string;
      descripcion: string;
      alt: string;
    }[];
  };
  facebook?: {
    post: string;
    hashtags: string[];
  };
  fecha_generacion: string;
  disclaimer: string;
}

export async function generateSocialMediaPosts(formData: SocialMediaPostFormData): Promise<SocialMediaPostResult> {
  try {
    // Convert File objects to their names for demonstration
    // In a real app, you would upload these to storage and get URLs
    const fotoNames = formData.fotos.map(foto => foto.name);
    
    // Construct the prompt for OpenAI
    const prompt = `
Tu misión es generar posts optimizados para ${formData.plataforma === "ambas" ? "Instagram y Facebook" : formData.plataforma} que ayuden a anunciar un inmueble.

DATOS DEL INMUEBLE:
- Plataforma: ${formData.plataforma}
- Tipo de operación: ${formData.tipo_operacion}
- Tipo de inmueble: ${formData.tipo_inmueble}
- Localidad: ${formData.localidad}
- Superficie: ${formData.superficie_m2} m²
- Habitaciones: ${formData.habitaciones}
- Baños: ${formData.banos}
- Precio: ${formData.precio}€
- Características destacadas: ${formData.caracteristicas_destacadas.join(", ")}
- URL/Contacto: ${formData.url_contacto}
- Fotos: ${fotoNames.join(", ")}
${formData.estado_conservacion ? `- Estado de conservación: ${formData.estado_conservacion}` : ""}
${formData.extras ? `- Extras: ${formData.extras.join(", ")}` : ""}
${formData.titulo_anuncio ? `- Título del anuncio: ${formData.titulo_anuncio}` : ""}
${formData.idioma ? `- Idioma: ${formData.idioma}` : ""}
${formData.tono ? `- Tono: ${formData.tono}` : ""}

Por favor, genera el contenido siguiendo estas pautas:

Para Instagram:
- Gancho inicial de máximo 125 caracteres
- Texto principal de 1-3 párrafos breves con emojis relevantes
- Lista de máximo 5 puntos fuertes con checkmarks
- Llamada a la acción con información de contacto
- Hasta 30 hashtags relevantes
- Sugerencia para carrusel de hasta 10 slides con título, descripción y texto alternativo

Para Facebook:
- Titular potente con emojis
- Historia breve de 3-5 líneas
- Detalle del inmueble en párrafo separado
- Lista de ventajas
- Llamada a la acción clara
- Hashtags opcionales (máximo 10)

Responde en formato JSON con esta estructura exacta:
{
  "status": "ok",
  "instagram": {
    "caption": "...",
    "hashtags": ["#", "#", ...],
    "slides": [
      { "titulo": "...", "descripcion": "...", "alt": "..." }
    ]
  },
  "facebook": {
    "post": "...",
    "hashtags": ["#", "#", ...]
  },
  "fecha_generacion": "${new Date().toISOString().split('T')[0]}",
  "disclaimer": "Ejemplo de contenido; adapta a términos y normativa publicitaria vigente."
}

Incluye solo las plataformas solicitadas (instagram y/o facebook). Respeta los límites de caracteres: 2200 para Instagram y 63206 para Facebook.
`;
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un asistente de marketing inmobiliario para redes sociales especializado en generar posts optimizados."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al generar los posts");
    }

    const data = await response.json();
    try {
      // Parse the response content as JSON
      const result = JSON.parse(data.choices[0].message.content);
      return result;
    } catch (e) {
      // If parsing fails, return the raw content with error status
      console.error("Error parsing OpenAI response:", e);
      return {
        status: "error",
        fecha_generacion: new Date().toISOString().split('T')[0],
        disclaimer: "Error al procesar la respuesta del asistente."
      };
    }
  } catch (error) {
    console.error("Error al generar los posts:", error);
    toast.error("Hubo un error al generar los posts para redes sociales");
    throw error;
  }
}
