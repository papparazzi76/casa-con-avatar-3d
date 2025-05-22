
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'registration' | 'form_submission';
  email?: string;
  formType?: string;
  formData?: Record<string, any>;
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
    
    if (data.type === 'registration') {
      subject = 'Nueva Registro en PropTools';
      htmlContent = `
        <h1>Nuevo Usuario Registrado</h1>
        <p>Se ha registrado un nuevo usuario en PropTools.</p>
        <p><strong>Email:</strong> ${data.email || 'No disponible'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
      `;
    } else if (data.type === 'form_submission') {
      subject = `Nuevo Formulario: ${data.formType || 'Desconocido'}`;
      
      // Crear contenido HTML para los datos del formulario
      let formDataHtml = '';
      if (data.formData) {
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
      
      htmlContent = `
        <h1>Nuevo Formulario Completado</h1>
        <p>Se ha completado un formulario en PropTools.</p>
        <p><strong>Tipo de Formulario:</strong> ${data.formType || 'Desconocido'}</p>
        <p><strong>Email del Usuario:</strong> ${data.email || 'No disponible'}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        ${formDataHtml}
      `;
    }

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
