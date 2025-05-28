
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PropertyValuationInput {
  address: string;
  cp: string;
  locality: string;
  propertyType: string;
  surface_m2: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  state: string;
  extras: string[];
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Comparable {
  price: number;
  surface: number;
  bedrooms: number;
  distance: number;
  url: string;
  lat?: number;
  lng?: number;
}

// Geocodificar dirección usando Mapbox
async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const mapboxToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
  if (!mapboxToken) {
    console.error('MAPBOX_ACCESS_TOKEN no configurado');
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(`${address}, España`);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}&country=ES`
    );
    
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return { latitude, longitude };
    }
    
    return null;
  } catch (error) {
    console.error('Error en geocodificación:', error);
    return null;
  }
}

// Obtener token de Idealista (preparado para cuando tengas credenciales)
async function getIdealistaToken(): Promise<string | null> {
  const clientId = Deno.env.get('IDEALISTA_CLIENT_ID');
  const secret = Deno.env.get('IDEALISTA_SECRET');
  
  if (!clientId || !secret) {
    console.log('Credenciales de Idealista no configuradas, usando datos mock');
    return null;
  }

  try {
    const credentials = btoa(`${clientId}:${secret}`);
    const response = await fetch('https://api.idealista.com/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=read'
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error obteniendo token de Idealista:', error);
    return null;
  }
}

// Buscar comparables en Idealista (con fallback a datos mock)
async function searchComparables(
  coords: Coordinates,
  propertyType: string,
  surface: number
): Promise<Comparable[]> {
  const token = await getIdealistaToken();
  
  if (!token) {
    // Datos mock para desarrollo
    console.log('Usando datos mock para comparables');
    return [
      {
        price: 280000,
        surface: 85,
        bedrooms: 3,
        distance: 150,
        url: "https://www.idealista.com/inmueble/mock1",
        lat: coords.latitude + 0.001,
        lng: coords.longitude + 0.001
      },
      {
        price: 295000,
        surface: 90,
        bedrooms: 3,
        distance: 200,
        url: "https://www.idealista.com/inmueble/mock2",
        lat: coords.latitude - 0.001,
        lng: coords.longitude - 0.001
      },
      {
        price: 265000,
        surface: 80,
        bedrooms: 2,
        distance: 300,
        url: "https://www.idealista.com/inmueble/mock3",
        lat: coords.latitude + 0.002,
        lng: coords.longitude - 0.002
      },
      {
        price: 285000,
        surface: 88,
        bedrooms: 3,
        distance: 250,
        url: "https://www.idealista.com/inmueble/mock4",
        lat: coords.latitude - 0.0015,
        lng: coords.longitude + 0.0015
      },
      {
        price: 270000,
        surface: 82,
        bedrooms: 3,
        distance: 180,
        url: "https://www.idealista.com/inmueble/mock5",
        lat: coords.latitude + 0.0005,
        lng: coords.longitude - 0.0005
      }
    ];
  }

  try {
    // Búsqueda real en Idealista cuando tengas credenciales
    const center = `${coords.latitude},${coords.longitude}`;
    const distance = 1000; // 1km radius
    
    const searchParams = new URLSearchParams({
      center,
      distance: distance.toString(),
      propertyType: propertyType === 'piso' ? 'homes' : 'homes',
      operation: 'sale',
      maxItems: '50'
    });

    const response = await fetch(`https://api.idealista.com/3.5/es/search?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    return data.elementList?.map((property: any) => ({
      price: property.price,
      surface: property.size,
      bedrooms: property.rooms,
      distance: property.distance,
      url: property.url,
      lat: property.latitude,
      lng: property.longitude
    })) || [];
    
  } catch (error) {
    console.error('Error buscando en Idealista:', error);
    return [];
  }
}

// Valorar con OpenAI
async function getAIValuation(
  propertyData: PropertyValuationInput,
  comparables: Comparable[]
): Promise<any> {
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY no configurado');
  }

  const prompt = `Actúa como un tasador inmobiliario profesional. Analiza la siguiente propiedad y los comparables para dar una valoración precisa.

PROPIEDAD A VALORAR:
- Dirección: ${propertyData.address}, ${propertyData.cp} ${propertyData.locality}
- Tipo: ${propertyData.propertyType}
- Superficie: ${propertyData.surface_m2} m²
- Dormitorios: ${propertyData.bedrooms}
- Baños: ${propertyData.bathrooms}
- Año construcción: ${propertyData.year_built}
- Estado: ${propertyData.state}
- Extras: ${propertyData.extras.join(', ')}

COMPARABLES ENCONTRADOS:
${comparables.map((comp, index) => 
  `${index + 1}. €${comp.price.toLocaleString()} - ${comp.surface}m² - ${comp.bedrooms} hab - ${comp.distance}m distancia`
).join('\n')}

Proporciona una respuesta en formato JSON con esta estructura exacta:
{
  "estimated_price_eur": number,
  "low_range": number,
  "high_range": number,
  "similar_links": string[],
  "comps": array de los 5 mejores comparables con la estructura original
}

Considera factores como ubicación, estado de conservación, extras, y tendencias de mercado.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Eres un tasador inmobiliario experto en el mercado español. Responde siempre en formato JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      // Fallback con valores calculados
      const avgPrice = comparables.reduce((sum, comp) => sum + comp.price, 0) / comparables.length;
      const avgPricePerM2 = avgPrice / (comparables.reduce((sum, comp) => sum + comp.surface, 0) / comparables.length);
      const estimatedPrice = Math.round(avgPricePerM2 * propertyData.surface_m2);
      
      return {
        estimated_price_eur: estimatedPrice,
        low_range: Math.round(estimatedPrice * 0.9),
        high_range: Math.round(estimatedPrice * 1.1),
        similar_links: comparables.slice(0, 5).map(comp => comp.url),
        comps: comparables.slice(0, 5)
      };
    }
  } catch (error) {
    console.error('Error with OpenAI:', error);
    throw error;
  }
}

// Guardar valoración en base de datos
async function saveValuation(
  propertyData: PropertyValuationInput,
  valuation: any,
  userId?: string
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('property_valuations')
      .insert({
        user_id: userId || null,
        address: propertyData.address,
        postal_code: propertyData.cp,
        locality: propertyData.locality,
        property_type: propertyData.propertyType,
        surface_m2: propertyData.surface_m2,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        year_built: propertyData.year_built,
        state: propertyData.state,
        extras: propertyData.extras,
        estimated_price: valuation.estimated_price_eur,
        low_range: valuation.low_range,
        high_range: valuation.high_range,
        valuation_data: valuation,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error guardando valoración:', error);
    } else {
      console.log('Valoración guardada:', data.id);
    }
  } catch (error) {
    console.error('Error en saveValuation:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const propertyData: PropertyValuationInput = await req.json();
    console.log('Procesando valoración para:', propertyData.address);

    // 1. Geocodificar dirección
    const fullAddress = `${propertyData.address}, ${propertyData.cp} ${propertyData.locality}`;
    const coords = await geocodeAddress(fullAddress);
    
    if (!coords) {
      return new Response(
        JSON.stringify({ error: 'No se pudo geocodificar la dirección' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Coordenadas obtenidas:', coords);

    // 2. Buscar comparables
    const comparables = await searchComparables(
      coords,
      propertyData.propertyType,
      propertyData.surface_m2
    );

    if (comparables.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No se encontraron propiedades comparables' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Encontrados ${comparables.length} comparables`);

    // 3. Obtener valoración de IA
    const valuation = await getAIValuation(propertyData, comparables);
    console.log('Valoración completada:', valuation.estimated_price_eur);

    // 4. Obtener userId si está autenticado
    const authHeader = req.headers.get('authorization');
    let userId = null;
    if (authHeader) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: authHeader } }
        });
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id;
      } catch (error) {
        console.log('Usuario no autenticado');
      }
    }

    // 5. Guardar en base de datos
    await saveValuation(propertyData, valuation, userId);

    // 6. Devolver resultado
    return new Response(
      JSON.stringify(valuation),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error en valoración:', error);
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
