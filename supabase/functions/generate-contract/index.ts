
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Método no permitido' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    console.log('🏠 Iniciando generación de contrato...');
    
    const contractData = await req.json();
    console.log('📝 Datos del contrato recibidos:', contractData);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY no está configurada');
    }

    const systemPrompt = `Eres un asistente-redactor jurídico-inmobiliario para España.  
Tu única función es generar, a petición de la aplicación web, contratos tipo totalmente rellenados a partir de los datos que te aporte el usuario.

Debes responder ÚNICAMENTE con un JSON válido en el siguiente formato:
{
  "file_name": "nombre_del_archivo.txt",
  "content": "contenido completo del contrato con todos los datos rellenados"
}

Si faltan datos obligatorios, responde con:
{
  "faltan_datos": ["lista de campos que faltan"]
}

Los contratos deben estar completamente rellenados con los datos proporcionados y seguir la legislación española vigente.`;

    const userQuery = JSON.stringify(contractData, null, 2);

    console.log('🤖 Enviando solicitud a OpenAI...');
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userQuery
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error de OpenAI:', error);
      throw new Error(error.error?.message || "Error generando contrato");
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('✅ Respuesta de OpenAI recibida');
    
    // Intentar parsear la respuesta JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error('❌ Error parseando respuesta de OpenAI:', parseError);
      throw new Error('Error procesando la respuesta de IA');
    }
    
    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('💥 Error en generación de contrato:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
