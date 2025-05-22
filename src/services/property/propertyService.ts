
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types/property";

// Obtener todos los inmuebles activos
export const fetchProperties = async () => {
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

  return data as (Property & { property_images: PropertyImage[] })[];
};

// Obtener un inmueble por su ID
export const fetchPropertyById = async (id: string) => {
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

  return data as (Property & { property_images: PropertyImage[] });
};

// Crear un nuevo inmueble
export const createProperty = async (property: Omit<Property, "id" | "created_at" | "updated_at" | "user_id" | "status">) => {
  // Obtener el ID del usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("No estás autenticado.");
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
