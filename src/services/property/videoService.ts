
import { supabase } from "@/integrations/supabase/client";
import type { PropertyVideo } from "@/types/property";

// Subir un video para un inmueble
export const uploadPropertyVideo = async (propertyId: string, file: File, isMain: boolean = false) => {
  console.log(`Iniciando carga de video para propiedad ${propertyId}, isMain: ${isMain}`);
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${propertyId}/${fileName}`;

    console.log(`Preparando carga a storage: bucket=property_videos, path=${filePath}`);
    
    // Verificar si existe el bucket y crearlo si no existe
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'property_videos');
    
    if (!bucketExists) {
      console.log('El bucket property_videos no existe, intentando crearlo...');
      
      try {
        const { data, error: createBucketError } = await supabase.storage.createBucket('property_videos', {
          public: true,
          fileSizeLimit: 52428800, // 50MB para videos
        });
        
        if (createBucketError) {
          console.error("Error creando el bucket:", createBucketError);
          if (createBucketError.message.includes("policy")) {
            console.log("Error de política de seguridad, intentando subir archivo de todas formas...");
          } else {
            throw new Error(`Error al crear el bucket: ${createBucketError.message}`);
          }
        }
      } catch (err) {
        console.log("Error capturado al crear bucket, intentando subir archivo de todas formas...", err);
      }
    }

    // Subir archivo a storage
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("property_videos")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading video:", uploadError);
      throw new Error(`Error al subir el video: ${uploadError.message}`);
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("property_videos")
      .getPublicUrl(filePath);
    
    console.log(`Video subido correctamente. URL pública: ${publicUrlData.publicUrl}`);

    // Guardar referencia en BD
    const { data, error } = await supabase
      .from("property_videos")
      .insert({
        property_id: propertyId,
        video_url: publicUrlData.publicUrl,
        is_main: isMain,
        order_num: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving video reference:", error);
      throw new Error(`Error al guardar referencia de video: ${error.message}`);
    }

    console.log("Referencia de video guardada en BD:", data);
    return data as PropertyVideo;
  } catch (error) {
    console.error("Error completo al subir el video:", error);
    throw error;
  }
};

// Eliminar un video
export const deletePropertyVideo = async (videoId: string) => {
  // Primero obtener el video para saber la ruta
  const { data: video, error: fetchError } = await supabase
    .from("property_videos")
    .select("*")
    .eq("id", videoId)
    .single();

  if (fetchError) {
    console.error("Error fetching video to delete:", fetchError);
    throw new Error(fetchError.message);
  }

  try {
    // Extraer la ruta relativa de la URL
    const videoUrl = new URL(video.video_url);
    const pathParts = videoUrl.pathname.split('/');
    const path = pathParts.slice(pathParts.indexOf('property_videos') + 1).join('/');

    console.log(`Eliminando archivo de storage: ${path}`);
    
    // Eliminar el archivo del storage
    const { error: storageError } = await supabase.storage
      .from("property_videos")
      .remove([path]);

    if (storageError) {
      console.error("Error deleting video from storage:", storageError);
      // Continuamos para eliminar la referencia aunque falle el storage
    }
  } catch (error) {
    console.error("Error al extraer la ruta del archivo:", error);
    // Continuamos para eliminar la referencia
  }

  // Eliminar referencia de la BD
  const { error } = await supabase
    .from("property_videos")
    .delete()
    .eq("id", videoId);

  if (error) {
    console.error("Error deleting video reference:", error);
    throw new Error(error.message);
  }

  return true;
};

// Establecer un video como principal
export const setMainVideo = async (propertyId: string, videoId: string) => {
  // Primero quitamos la marca de principal a todos los videos del inmueble
  const { error: updateError } = await supabase
    .from("property_videos")
    .update({ is_main: false })
    .eq("property_id", propertyId);

  if (updateError) {
    console.error("Error updating videos:", updateError);
    throw new Error(updateError.message);
  }

  // Luego marcamos el video seleccionado como principal
  const { data, error } = await supabase
    .from("property_videos")
    .update({ is_main: true })
    .eq("id", videoId)
    .select()
    .single();

  if (error) {
    console.error("Error setting main video:", error);
    throw new Error(error.message);
  }

  return data as PropertyVideo;
};
