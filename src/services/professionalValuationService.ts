
import { PropertyValuation } from "./propertyValuatorService";
import { toast } from "sonner";

export interface ProfessionalValuationRequest {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  comentarios?: string;
  valoracionActual: PropertyValuation | null;
  notifyEmail?: string;
}

// API key constante (permanente)
const API_KEY = "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";

// Function to generate and send PDF report
export async function sendProfessionalValuationRequest(request: ProfessionalValuationRequest): Promise<void> {
  try {
    // 1. Generate the PDF report content using OpenAI
    const reportResponse = await generateValuationReport(request);
    
    // 2. Send notification email to the specified address (carlos@arcasl.es)
    if (request.notifyEmail) {
      await sendNotificationEmail(request);
    }
    
    // 3. Simulate sending email with PDF to the customer
    console.log("Sending professional valuation request:", request);
    console.log("Generated report:", reportResponse);
    
    // 4. Wait for a small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return;
  } catch (error) {
    console.error("Error generating or sending professional valuation report:", error);
    toast.error("Hubo un problema al generar el informe de valoración. Por favor, inténtalo de nuevo más tarde.");
    throw error;
  }
}

// Function to generate a professional valuation report using OpenAI
async function generateValuationReport(request: ProfessionalValuationRequest): Promise<string> {
  try {
    // Create a prompt for OpenAI to generate a valuation report
    const prompt = `
      Genera un informe profesional de valoración inmobiliaria en formato HTML para el siguiente inmueble:
      
      - Dirección: ${request.direccion}
      - Ciudad: ${request.ciudad}
      - Código Postal: ${request.codigoPostal}
      
      El informe debe ser enviado a ${request.nombre} (${request.email}) y debe incluir:
      
      1. Una introducción sobre la metodología de valoración
      2. Análisis del mercado en la zona
      3. Valoración estimada basada en comparables
      4. Factores que pueden afectar al valor
      5. Recomendaciones para maximizar el valor de venta
      
      Información adicional proporcionada por el cliente: "${request.comentarios || 'No se proporcionaron comentarios adicionales'}"
      
      ${request.valoracionActual ? 
        `Valoración automática previa: 
         - Precio sugerido: ${request.valoracionActual.valoracion?.precio_sugerido || 'No disponible'} € 
         - Precio por m²: ${request.valoracionActual.valoracion?.precio_m2_sugerido || 'No disponible'} €/m²` 
        : 'No hay valoración automática previa disponible.'
      }
      
      El informe debe ser detallado, profesional y tener un diseño atractivo que pueda convertirse fácilmente en PDF.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Eres un experto en valoración inmobiliaria profesional. Tu trabajo es crear informes detallados y precisos para valorar propiedades inmobiliarias en España."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Error al generar el informe de valoración");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return content;
  } catch (error) {
    console.error("Error generating valuation report with OpenAI:", error);
    throw new Error("No se pudo generar el informe de valoración");
  }
}

// Function to send notification email to admin
async function sendNotificationEmail(request: ProfessionalValuationRequest): Promise<void> {
  try {
    // In a real application, we would use a backend service to send emails
    // For demonstration purposes, we're logging the notification details
    console.log("Sending notification email to:", request.notifyEmail);
    console.log("Notification details:", {
      subject: "Nueva solicitud de valoración profesional",
      body: `
        Se ha recibido una nueva solicitud de valoración profesional:
        
        Datos del solicitante:
        - Nombre: ${request.nombre}
        - Email: ${request.email}
        - Teléfono: ${request.telefono}
        
        Datos del inmueble:
        - Dirección: ${request.direccion}
        - Ciudad: ${request.ciudad}
        - Código Postal: ${request.codigoPostal}
        
        Comentarios adicionales: 
        ${request.comentarios || 'Ninguno'}
      `
    });
    
    // Simulate API call to send email
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return;
  } catch (error) {
    console.error("Error sending notification email:", error);
    // Don't throw here - we still want the user flow to continue even if admin notification fails
  }
}
