
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'registration' | 'form_submission' | 'image_upload';
  email?: string;
  formType?: string;
  formData?: Record<string, any>;
  imageType?: string;
  roomType?: string;
  furnitureStyle?: string;
  imageUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();
    let subject = '';
    let htmlContent = '';
    
    console.log("Received notification request:", JSON.stringify(data));
    
    if (data.type === 'registration') {
      subject = 'Nueva Registro en PropTools';
      htmlContent = `
        <h1>Nuevo Usuario Registrado</h1>
        <p>Se ha registrado un nuevo usuario en PropTools.</p>
        <p><strong>Email:</strong> ${data.email || 'No disponible'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
      `;
      console.log("Processing registration notification for:", data.email);
    } else if (data.type === 'image_upload') {
      subject = 'Nueva Imagen Subida en PropTools';
      htmlContent = `
        <h1>Nueva Imagen Subida</h1>
        <p>Se ha subido una nueva imagen en PropTools.</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <p><strong>Email del Usuario:</strong> ${data.email || 'No disponible'}</p>
          <p><strong>Tipo de Procesamiento:</strong> ${data.imageType === 'enhancement' ? 'Edición de mejora' : 'Homestaging virtual'}</p>
          ${data.roomType ? `<p><strong>Tipo de Estancia:</strong> ${data.roomType}</p>` : ''}
          ${data.furnitureStyle ? `<p><strong>Estilo de Mobiliario:</strong> ${data.furnitureStyle}</p>` : ''}
          <p><strong>URL de la Imagen:</strong> <a href="${data.imageUrl}">${data.imageUrl}</a></p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        </div>
      `;
      console.log("Processing image upload notification for:", data.email);
    } else if (data.type === 'form_submission') {
      subject = `Nuevo Formulario: ${data.formType || 'Desconocido'}`;
      
      // Crear contenido HTML específico para valoración detallada
      let formDataHtml = '';
      if (data.formData) {
        if (data.formType === 'Valoración Detallada de Inmueble') {
          formDataHtml = `
            <h2>Datos de la Valoración:</h2>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
              <h3>Información del Cliente:</h3>
              <p><strong>Email:</strong> ${data.formData.email_cliente || 'No disponible'}</p>
              <p><strong>ID de Solicitud:</strong> ${data.formData.solicitud_id || 'No disponible'}</p>
              
              <h3>Datos del Inmueble:</h3>
              <p><strong>Dirección:</strong> ${data.formData.direccion || 'No disponible'}</p>
              <p><strong>Tipo de Vivienda:</strong> ${data.formData.tipo_vivienda || 'No disponible'}</p>
              <p><strong>Superficie:</strong> ${data.formData.superficie_m2 || 'No disponible'} m²</p>
              <p><strong>Habitaciones:</strong> ${data.formData.habitaciones || 'No disponible'}</p>
              <p><strong>Baños:</strong> ${data.formData.banos || 'No disponible'}</p>
              <p><strong>Año de Construcción:</strong> ${data.formData.anno_construccion || 'No disponible'}</p>
            </div>
          `;
        } else {
          // Formato genérico para otros tipos de formulario
          formDataHtml = '<h2>Datos del formulario:</h2><ul>';
          for (const [key, value] of Object.entries(data.formData)) {
            if (typeof value === 'object' && value !== null) {
              formDataHtml += `<li><strong>${key}:</strong> ${JSON.stringify(value)}</li>`;
            } else {
              formDataHtml += `<li><strong>${key}:</strong> ${value}</li>`;
            }
          }
          formDataHtml += '</ul>';
        }
      }
      
      htmlContent = `
        <h1>Nuevo Formulario Completado</h1>
        <p>Se ha completado un formulario en PropTools.</p>
        <p><strong>Tipo de Formulario:</strong> ${data.formType || 'Desconocido'}</p>
        <p><strong>Email del Usuario:</strong> ${data.email || 'No disponible'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        ${formDataHtml}
      `;
      console.log("Processing form submission notification:", data.formType);
    }

    console.log("Sending email to: carlos@arcasl.es");
    console.log("Email subject:", subject);

    const emailResponse = await resend.emails.send({
      from: "PropTools <onboarding@resend.dev>",
      to: ["carlos@arcasl.es"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
