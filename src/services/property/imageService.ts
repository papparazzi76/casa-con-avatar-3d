
import { supabase } from "@/integrations/supabase/client";
import type { PropertyImage } from "@/types/property";

// Subir una imagen para un inmueble
export const uploadPropertyImage = async (propertyId: string, file: File, isMain: boolean = false) => {
  console.log(`Iniciando carga de imagen para propiedad ${propertyId}, isMain: ${isMain}`);
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${propertyId}/${fileName}`;

    console.log(`Preparando carga a storage: bucket=property_images, path=${filePath}`);
    
    // Verificar si existe el bucket y crearlo si no existe
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'property_images');
    
    if (!bucketExists) {
      console.log('El bucket property_images no existe, intentando crearlo...');
      
      // Intentar crear bucket pero manejar el caso en que no tenga permisos
      try {
        const { data, error: createBucketError } = await supabase.storage.createBucket('property_images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
        });
        
        if (createBucketError) {
          console.error("Error creando el bucket:", createBucketError);
          if (createBucketError.message.includes("policy")) {
            console.log("Error de política de seguridad, intentando subir archivo de todas formas...");
            // Continuamos aunque no podamos crear el bucket, ya que puede que ya exista
            // pero el usuario actual no tenga permisos para verlo o crearlo
          } else {
            throw new Error(`Error al crear el bucket: ${createBucketError.message}`);
          }
        }
      } catch (err) {
        console.log("Error capturado al crear bucket, intentando subir archivo de todas formas...", err);
        // Continuamos aunque no podamos crear el bucket
      }
    }

    // Subir archivo a storage
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("property_images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw new Error(`Error al subir la imagen: ${uploadError.message}`);
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("property_images")
      .getPublicUrl(filePath);
    
    console.log(`Imagen subida correctamente. URL pública: ${publicUrlData.publicUrl}`);

    // Guardar referencia en BD
    const { data, error } = await supabase
      .from("property_images")
      .insert({
        property_id: propertyId,
        image_url: publicUrlData.publicUrl,
        is_main: isMain,
        order_num: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving image reference:", error);
      throw new Error(`Error al guardar referencia de imagen: ${error.message}`);
    }

    console.log("Referencia de imagen guardada en BD:", data);
    return data as PropertyImage;
  } catch (error) {
    console.error("Error completo al subir la imagen:", error);
    throw error;
  }
};

// Eliminar una imagen
export const deletePropertyImage = async (imageId: string) => {
  // Primero obtener la imagen para saber la ruta
  const { data: image, error: fetchError } = await supabase
    .from("property_images")
    .select("*")
    .eq("id", imageId)
    .single();

  if (fetchError) {
    console.error("Error fetching image to delete:", fetchError);
    throw new Error(fetchError.message);
  }

  try {
    // Extraer la ruta relativa de la URL
    const imageUrl = new URL(image.image_url);
    const pathParts = imageUrl.pathname.split('/');
    const path = pathParts.slice(pathParts.indexOf('property_images') + 1).join('/');

    console.log(`Eliminando archivo de storage: ${path}`);
    
    // Eliminar el archivo del storage
    const { error: storageError } = await supabase.storage
      .from("property_images")
      .remove([path]);

    if (storageError) {
      console.error("Error deleting image from storage:", storageError);
      // Continuamos para eliminar la referencia aunque falle el storage
    }
  } catch (error) {
    console.error("Error al extraer la ruta del archivo:", error);
    // Continuamos para eliminar la referencia
  }

  // Eliminar referencia de la BD
  const { error } = await supabase
    .from("property_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    console.error("Error deleting image reference:", error);
    throw new Error(error.message);
  }

  return true;
};

// Establecer una imagen como principal
export const setMainImage = async (propertyId: string, imageId: string) => {
  // Primero quitamos la marca de principal a todas las imágenes del inmueble
  const { error: updateError } = await supabase
    .from("property_images")
    .update({ is_main: false })
    .eq("property_id", propertyId);

  if (updateError) {
    console.error("Error updating images:", updateError);
    throw new Error(updateError.message);
  }

  // Luego marcamos la imagen seleccionada como principal
  const { data, error } = await supabase
    .from("property_images")
    .update({ is_main: true })
    .eq("id", imageId)
    .select()
    .single();

  if (error) {
    console.error("Error setting main image:", error);
    throw new Error(error.message);
  }

  return data as PropertyImage;
};
