
import { supabase } from "@/integrations/supabase/client";
import { Property, PropertyImage } from "@/types/property";

// Obtener las propiedades del usuario actual
export const fetchUserProperties = async () => {
  // Obtener el ID del usuario actual
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("No estás autenticado.");
  }
  
  const { data, error } = await supabase
    .from("properties")
    .select(`
      *,
      property_images(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user properties:", error);
    throw new Error(error.message);
  }

  return data as (Property & { property_images: PropertyImage[] })[];
};
