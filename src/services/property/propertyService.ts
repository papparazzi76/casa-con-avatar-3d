
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";

// Obtener todos los inmuebles activos
export const fetchProperties = async () => {
  try {
    console.log("Iniciando fetchProperties");
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        property_images(*)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching properties:", error);
      throw new Error(error.message);
    }

    console.log(`Propiedades recuperadas: ${data?.length || 0}`);
    return data as (Property & { property_images: PropertyImage[] })[];
  } catch (error) {
    console.error("Error completo al obtener propiedades:", error);
    throw error;
  }
};

// Buscar inmuebles con filtros
export const searchProperties = async (filters: Record<string, string>) => {
  try {
    console.log("Iniciando searchProperties con filtros:", filters);
    let query = supabase
      .from("properties")
      .select(`
        *,
        property_images(*)
      `)
      .eq("status", "active");

    // Aplicar filtros
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters.operation) {
      query = query.eq("operation_type", filters.operation);
    }

    if (filters.type) {
      query = query.eq("property_type", filters.type);
    }

    if (filters.minPrice) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    if (filters.minArea) {
      query = query.gte("area", filters.minArea);
    }

    if (filters.maxArea) {
      query = query.lte("area", filters.maxArea);
    }

    if (filters.minRooms) {
      query = query.gte("rooms", filters.minRooms);
    }

    if (filters.minBathrooms) {
      query = query.gte("bathrooms", filters.minBathrooms);
    }

    if (filters.postalCode) {
      query = query.ilike("postal_code", `%${filters.postalCode}%`);
    }

    if (filters.features) {
      const featuresList = filters.features.split(",");
      query = query.overlaps("features", featuresList);
    }

    // Ordenar por los más recientes
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error searching properties:", error);
      throw new Error(error.message);
    }

    console.log(`Búsqueda completada: ${data?.length || 0} propiedades encontradas`);
    return data as (Property & { property_images: PropertyImage[] })[];
  } catch (error) {
    console.error("Error completo al buscar propiedades:", error);
    throw error;
  }
};

// Obtener un inmueble por su ID
export const fetchPropertyById = async (id: string) => {
  try {
    console.log(`Buscando propiedad con ID: ${id}`);
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        property_images(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching property:", error);
      throw new Error(error.message);
    }

    console.log("Propiedad encontrada:", data?.id);
    return data as (Property & { property_images: PropertyImage[] });
  } catch (error) {
    console.error("Error completo al obtener propiedad por ID:", error);
    throw error;
  }
};

// Verificar si un usuario ya tiene un inmueble activo
export const checkUserHasProperty = async () => {
  try {
    // Obtener el ID del usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No estás autenticado.");
    }
    
    const { data, error, count } = await supabase
      .from("properties")
      .select("id", { count: 'exact' })
      .eq("user_id", user.id)
      .eq("status", "active");

    if (error) {
      console.error("Error checking user properties:", error);
      throw new Error(error.message);
    }

    return { hasProperty: (count && count > 0), property: data?.[0] };
  } catch (error) {
    console.error("Error al verificar propiedades del usuario:", error);
    throw error;
  }
};

// Crear un nuevo inmueble
export const createProperty = async (property: Omit<Property, "id" | "created_at" | "updated_at" | "user_id" | "status">) => {
  // Obtener el ID del usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("No estás autenticado.");
  }
  
  // Verificar si el usuario ya tiene un inmueble
  const { hasProperty } = await checkUserHasProperty();
  
  if (hasProperty) {
    throw new Error("Ya tienes un inmueble publicado. Debes eliminar el existente antes de publicar uno nuevo.");
  }
  
  const { data, error } = await supabase
    .from("properties")
    .insert({
      ...property,
      user_id: user.id,
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating property:", error);
    throw new Error(error.message);
  }

  return data as Property;
};

// Actualizar un inmueble existente
export const updateProperty = async (id: string, property: Partial<Omit<Property, "id" | "created_at" | "updated_at" | "user_id">>) => {
  // Verificar que el usuario sea el propietario del inmueble
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("No estás autenticado.");
  }
  
  // Verificar propiedad
  const { data: propertyData, error: propertyError } = await supabase
    .from("properties")
    .select("user_id")
    .eq("id", id)
    .single();
    
  if (propertyError) {
    throw new Error("No se pudo verificar la propiedad del inmueble.");
  }
    
  if (propertyData.user_id !== user.id) {
    throw new Error("No tienes permiso para editar este inmueble.");
  }

  const { data, error } = await supabase
    .from("properties")
    .update({
      ...property,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating property:", error);
    throw new Error(error.message);
  }

  return data as Property;
};

// Eliminar un inmueble
export const deleteProperty = async (id: string) => {
  // Verificar que el usuario sea el propietario del inmueble
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("No estás autenticado.");
  }
  
  // Verificar propiedad
  const { data: propertyData, error: propertyError } = await supabase
    .from("properties")
    .select("user_id")
    .eq("id", id)
    .single();
    
  if (propertyError) {
    throw new Error("No se pudo verificar la propiedad del inmueble.");
  }
    
  if (propertyData.user_id !== user.id) {
    throw new Error("No tienes permiso para eliminar este inmueble.");
  }

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting property:", error);
    throw new Error(error.message);
  }

  return true;
};

// Re-export types needed by other files
import { PropertyImage } from "@/types/property";
export type { PropertyImage };
