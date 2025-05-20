
import { toast } from "sonner";

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

    // Esta es una implementación simulada para fines de demostración
    // En un entorno real, esta función haría una llamada a la API de OpenAI
    
    console.log("Prompt enviado a OpenAI:", prompt);
    
    // Simulamos una respuesta para no depender de la API en este momento
    // En la implementación real, aquí harías la llamada a la API de OpenAI
    
    // Ejemplo de respuesta simulada
    return new Promise((resolve) => {
      setTimeout(() => {
        // Datos de ejemplo basados en la entrada
        const result: PropertyAdResult = {
          titulo: `Espectacular ${formData.propertyType} en ${formData.location}`,
          descripcion: `Descubre este maravilloso ${formData.propertyType} de ${formData.area} m² situado en una de las mejores zonas de ${formData.location}. Con una distribución ideal, cuenta con ${formData.rooms} habitaciones${formData.bathrooms ? ` y ${formData.bathrooms} baños` : ''}, proporcionando el espacio perfecto para disfrutar de la vida cotidiana.\n\nLa vivienda destaca por su luminosidad y amplitud en todas sus estancias. El salón-comedor es espacioso y conecta perfectamente con una cocina totalmente equipada con electrodomésticos de primera calidad.\n\n${formData.features ? `Entre sus características destacan: ${formData.features}.` : ''} La ubicación es inmejorable, con todos los servicios necesarios a pocos pasos: supermercados, restaurantes, transporte público y zonas verdes.`,
          destacados: [
            `${formData.condition === 'reformado' ? 'Completamente reformado' : `${formData.rooms} dormitorios espaciosos`} con excelentes acabados`,
            `Ubicación privilegiada en ${formData.location} con todos los servicios`,
            "Excelente luminosidad y distribución eficiente",
            `${formData.features?.includes('terraza') ? 'Amplia terraza ideal para disfrutar del exterior' : 'Zona tranquila y bien comunicada'}`
          ]
        };
        
        resolve(result);
      }, 2000);
    });
  } catch (error) {
    console.error("Error al generar el anuncio:", error);
    toast.error("Hubo un error al generar el anuncio");
    throw error;
  }
}
