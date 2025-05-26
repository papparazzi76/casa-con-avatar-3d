
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/utils/adminUtils";

export type ImageType = 'enhancement' | 'homestaging';
export type RoomType = 'salon' | 'dormitorio' | 'bano' | 'cocina' | 'terraza' | 'jardin';
export type FurnitureStyle = 'moderno' | 'estandar' | 'industrial' | 'nordico' | 'costero' | 'clasico' | 'luxury';

export interface ImageUploadData {
  imageType: ImageType;
  roomType?: RoomType;
  furnitureStyle?: FurnitureStyle;
}

export interface UploadedImage {
  id: string;
  image_url: string;
  image_type: ImageType;
  room_type?: RoomType;
  furniture_style?: FurnitureStyle;
  processed: boolean;
  created_at: string;
}

export const uploadImage = async (file: File, data: ImageUploadData): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Debes estar autenticado para subir imágenes");
  }

  // Check user limits
  const canUpload = await checkUserUploadLimits(data.imageType);
  if (!canUpload.allowed) {
    throw new Error(canUpload.message);
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('user-images')
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Error al subir la imagen: ${uploadError.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('user-images')
    .getPublicUrl(fileName);

  // Save to database
  const { error: dbError } = await supabase
    .from('user_uploaded_images')
    .insert({
      user_id: user.id,
      image_url: publicUrl,
      image_type: data.imageType,
      room_type: data.roomType,
      furniture_style: data.furnitureStyle
    });

  if (dbError) {
    throw new Error(`Error al guardar en base de datos: ${dbError.message}`);
  }

  return publicUrl;
};

export const checkUserUploadLimits = async (imageType: ImageType) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { allowed: false, message: "Debes estar autenticado" };
  }

  // Admin user has no limits
  if (isAdminUser(user)) {
    return { allowed: true, message: "" };
  }

  const { data, error } = await supabase
    .from('user_uploaded_images')
    .select('id')
    .eq('user_id', user.id)
    .eq('image_type', imageType);

  if (error) {
    throw new Error(`Error al verificar límites: ${error.message}`);
  }

  const currentCount = data?.length || 0;
  const maxAllowed = imageType === 'enhancement' ? 10 : 5;

  if (currentCount >= maxAllowed) {
    return {
      allowed: false,
      message: `Has alcanzado el límite de ${maxAllowed} imágenes de ${imageType === 'enhancement' ? 'mejora' : 'homestaging'}`
    };
  }

  return { allowed: true, message: "" };
};

export const getUserUploadedImages = async (): Promise<UploadedImage[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Debes estar autenticado");
  }

  const { data, error } = await supabase
    .from('user_uploaded_images')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error al obtener imágenes: ${error.message}`);
  }

  return data || [];
};
