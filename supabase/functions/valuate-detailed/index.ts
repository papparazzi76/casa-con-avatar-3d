
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DetailedPropertyValuationInput {
  email: string;
  direccion_completa: string;
  tipo_vivienda: string;
  superficie_m2: number;
  habitaciones: number;
  banos: number;
  anno_construccion: number;
  estado_puertas: string;
  estado_ventanas: string;
  estado_banos: string;
  estado_cocina: string;
  estado_fontaneria: string;
  estado_electricidad: string;
  orientacion: string;
  exterior_interior: string;
  planta: string;
  tiene_garaje: boolean;
  tiene_trastero: boolean;
  tiene_ascensor: boolean;
  tiene_calefaccion: boolean;
  tiene_aire_acondicionado: boolean;
  tiene_terraza: boolean;
  superficie_terraza?: number;
  tiene_jardin: boolean;
  superficie_jardin?: number;
  tiene_piscina: boolean;
  zonas_comunes: string[];
  zona_deportiva: boolean;
  zona_juegos_infantiles: boolean;
  observaciones?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🏠 Iniciando procesamiento de valoración detallada...');
    
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Método no permitido' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const propertyData: DetailedPropertyValuationInput = await req.json();
    console.log('📝 Datos recibidos:', propertyData);

    // Validar datos obligatorios
    if (!propertyData.email || !propertyData.direccion_completa) {
      return new Response(
        JSON.stringify({ error: 'Email y dirección completa son obligatorios' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Inicializar cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obtener userId si está autenticado
    const authHeader = req.headers.get('authorization');
    let userId = null;
    if (authHeader) {
      try {
        const supabaseClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
          global: { headers: { Authorization: authHeader } }
        });
        const { data: { user } } = await supabaseClient.auth.getUser();
        userId = user?.id;
        console.log('👤 Usuario autenticado:', userId);
      } catch (error) {
        console.log('👤 Usuario anónimo');
      }
    }

    // Guardar solicitud en la base de datos
    const { data: savedValuation, error: saveError } = await supabase
      .from('detailed_property_valuations')
      .insert({
        user_id: userId,
        email: propertyData.email,
        direccion_completa: propertyData.direccion_completa,
        tipo_vivienda: propertyData.tipo_vivienda,
        superficie_m2: propertyData.superficie_m2,
        habitaciones: propertyData.habitaciones,
        banos: propertyData.banos,
        anno_construccion: propertyData.anno_construccion,
        estado_puertas: propertyData.estado_puertas,
        estado_ventanas: propertyData.estado_ventanas,
        estado_banos: propertyData.estado_banos,
        estado_cocina: propertyData.estado_cocina,
        estado_fontaneria: propertyData.estado_fontaneria,
        estado_electricidad: propertyData.estado_electricidad,
        orientacion: propertyData.orientacion,
        exterior_interior: propertyData.exterior_interior,
        planta: propertyData.planta,
        tiene_garaje: propertyData.tiene_garaje,
        tiene_trastero: propertyData.tiene_trastero,
        tiene_ascensor: propertyData.tiene_ascensor,
        tiene_calefaccion: propertyData.tiene_calefaccion,
        tiene_aire_acondicionado: propertyData.tiene_aire_acondicionado,
        tiene_terraza: propertyData.tiene_terraza,
        superficie_terraza: propertyData.superficie_terraza,
        tiene_jardin: propertyData.tiene_jardin,
        superficie_jardin: propertyData.superficie_jardin,
        tiene_piscina: propertyData.tiene_piscina,
        zonas_comunes: propertyData.zonas_comunes,
        zona_deportiva: propertyData.zona_deportiva,
        zona_juegos_infantiles: propertyData.zona_juegos_infantiles,
        observaciones: propertyData.observaciones,
        procesado: false
      })
      .select()
      .single();

    if (saveError) {
      console.error('❌ Error guardando valoración:', saveError);
      throw new Error('Error al guardar la solicitud de valoración');
    }

    console.log('✅ Solicitud guardada con ID:', savedValuation.id);

    // Enviar notificación por email
    try {
      console.log('📧 Enviando notificación por email...');
      const { error: emailError } = await supabase.functions.invoke('send-notification', {
        body: {
          type: 'form_submission',
          formType: 'Valoración Detallada de Inmueble',
          email: propertyData.email,
          formData: {
            direccion: propertyData.direccion_completa,
            tipo_vivienda: propertyData.tipo_vivienda,
            superficie_m2: propertyData.superficie_m2,
            habitaciones: propertyData.habitaciones,
            banos: propertyData.banos,
            anno_construccion: propertyData.anno_construccion,
            email_cliente: propertyData.email,
            user_id: userId,
            solicitud_id: savedValuation.id
          }
        }
      });

      if (emailError) {
        console.error('⚠️ Error enviando notificación:', emailError);
        // No lanzamos error aquí para no fallar todo el proceso
      } else {
        console.log('✅ Notificación enviada correctamente');
      }
    } catch (notificationError) {
      console.error('⚠️ Error en notificación:', notificationError);
      // No lanzamos error aquí para no fallar todo el proceso
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Solicitud de valoración guardada correctamente',
        id: savedValuation.id,
        email: propertyData.email
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('💥 Error en valoración detallada:', error);
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
