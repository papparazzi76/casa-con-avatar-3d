
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from "@/features/image-editor/ImageUploader";
import { EditorOptions } from "@/features/image-editor/EditorOptions";
import { ResultDisplay } from "@/features/image-editor/ResultDisplay";
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>("enhancement");
  const [decorStyle, setDecorStyle] = useState<DecorStyle>("moderno");
  const [roomType, setRoomType] = useState<RoomType>("salon");
  const { toast } = useToast();

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No hay imagen seleccionada",
        description: "Por favor selecciona una imagen para editar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // En un caso real, aquí enviaríamos la imagen a la API de OpenAI
      // con un prompt específico basado en las opciones seleccionadas
      
      toast({
        title: "Procesando imagen",
        description: "Esto puede tardar unos momentos...",
      });

      // Construimos el prompt para OpenAI basado en las opciones seleccionadas
      let prompt = "";
      
      if (editMode === "enhancement") {
        prompt = `Mejora profesional de esta fotografía de ${getRoomTypeLabel(roomType)}. 
                  Ajusta la iluminación, el contraste y corrige la distorsión.`;
      } else if (editMode === "homestaging") {
        prompt = `Aplica homestaging virtual a esta fotografía de ${getRoomTypeLabel(roomType)} 
                  en estilo ${decorStyle}. Añade muebles y decoración apropiados.`;
      } else {
        prompt = `Mejora profesional de esta fotografía de ${getRoomTypeLabel(roomType)} 
                  y aplica homestaging virtual en estilo ${decorStyle}. 
                  Mejora la iluminación y añade muebles y decoración apropiados.`;
      }

      console.log("Prompt para OpenAI:", prompt);
      
      // Simulación de procesamiento con OpenAI (en producción, se reemplazaría con la llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // En un entorno real, aquí obtendríamos la imagen procesada desde la API de OpenAI
      // Por ahora, simplemente usamos la imagen original como simulación
      setEditedImage(imagePreview);
      
      toast({
        title: "¡Imagen procesada con éxito!",
        description: `Modo: ${editMode}${editMode !== "enhancement" ? `, Estilo: ${decorStyle}` : ""}, Estancia: ${getRoomTypeLabel(roomType)}`,
      });
    } catch (error) {
      toast({
        title: "Error al procesar la imagen",
        description: "Ha ocurrido un error. Por favor intenta de nuevo.",
        variant: "destructive",
      });
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getRoomTypeLabel = (type: RoomType): string => {
    const labels: Record<RoomType, string> = {
      cocina: "cocina",
      baño: "baño",
      salon: "salón",
      dormitorio: "dormitorio",
      oficina: "oficina",
      exterior: "espacio exterior",
      otra: "otra estancia"
    };
    return labels[type];
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Editor de Imágenes & Homestaging</h1>
        <p className="text-gray-500">
          Transforma tus fotografías inmobiliarias con edición profesional y visualiza reformas virtuales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageUploader 
          imagePreview={imagePreview} 
          onImageChange={handleImageChange} 
        />
        
        <EditorOptions
          editMode={editMode}
          onEditModeChange={setEditMode}
          roomType={roomType}
          onRoomTypeChange={setRoomType}
          decorStyle={decorStyle}
          onDecorStyleChange={setDecorStyle}
          onProcessImage={handleEditImage}
          isProcessing={isProcessing}
          hasImage={!!selectedImage}
        />
      </div>

      {editedImage && imagePreview && (
        <ResultDisplay
          editedImage={editedImage}
          originalImage={imagePreview}
          editMode={editMode}
          decorStyle={decorStyle}
          roomType={roomType}
          getRoomTypeLabel={getRoomTypeLabel}
        />
      )}
    </div>
  );
};

export default ImageEditor;
