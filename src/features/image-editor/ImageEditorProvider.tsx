
import { useState, createContext, useContext, ReactNode } from "react";
import { EditedImage, EditMode, DecorStyle, RoomType } from "./types";
import { ImageEditPlan } from "@/services/ai/types/image";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { checkPaymentRequired, checkUserLimit } from "./checkUserLimits";
import { getRoomTypeLabel } from "./util";
import { processImage } from "@/services/ai";

interface ImageEditorContextType {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  editedImages: EditedImage[];
  setEditedImages: (images: EditedImage[]) => void;
  editedImage: string | null;
  setEditedImage: (image: string | null) => void;
  editMode: EditMode;
  setEditMode: (mode: EditMode) => void;
  decorStyle: DecorStyle;
  setDecorStyle: (style: DecorStyle) => void;
  roomType: RoomType;
  setRoomType: (type: RoomType) => void;
  editPlan: ImageEditPlan | null;
  setEditPlan: (plan: ImageEditPlan | null) => void;
  isPaymentRequired: boolean;
  setIsPaymentRequired: (required: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleImageChange: (file: File) => void;
  handleEditImage: () => void;
}

const ImageEditorContext = createContext<ImageEditorContextType | null>(null);

export const ImageEditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImages, setEditedImages] = useState<EditedImage[]>([]);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<EditMode>("enhancement");
  const [decorStyle, setDecorStyle] = useState<DecorStyle>("moderno");
  const [roomType, setRoomType] = useState<RoomType>("salon");
  const [editPlan, setEditPlan] = useState<ImageEditPlan | null>(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageChange = (file: File) => {
    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset any previous edits
    setEditedImage(null);
    setEditPlan(null);
    setIsPaymentRequired(false);
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

    // Check if user has reached the limit
    const userLimit = checkUserLimit(user, editedImages);
    if (!userLimit.canEdit) {
      toast({
        title: "Límite alcanzado",
        description: userLimit.message,
        variant: "destructive",
      });
      return;
    }

    // Check if payment is required
    const paymentRequired = checkPaymentRequired(editMode, roomType);
    setIsPaymentRequired(paymentRequired);
    
    if (paymentRequired) {
      // In a real app, redirect to payment page
      toast({
        title: "Pago requerido",
        description: "Esta edición requiere un pago de 2,99€. Actualmente estamos en modo de demostración.",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Use the real AI service instead of simulation
      const result = await processImage({
        image: selectedImage,
        editMode: editMode,
        roomType: roomType,
        decorStyle: decorStyle
      });
      
      // Set the processed image
      setEditedImage(result.imageUrl);
      
      // Set the edit plan if available
      if (result.editPlan) {
        setEditPlan(result.editPlan);
      }
      
      // Add to user's edited images
      if (user) {
        const newEditedImage: EditedImage = {
          id: Date.now().toString(),
          user_id: user.id,
          image_url: result.imageUrl,
          edit_mode: editMode,
          room_type: roomType,
          decor_style: decorStyle,
          created_at: new Date().toISOString()
        };
        
        setEditedImages(prev => [newEditedImage, ...prev]);
      }
      
      toast({
        title: "¡Imagen procesada con éxito!",
        description: `Modo: ${editMode}${editMode !== "enhancement" ? `, Estilo: ${decorStyle}` : ""}, Estancia: ${getRoomTypeLabel(roomType)}`,
      });
      
    } catch (error: any) {
      console.error("Error processing image:", error);
      toast({
        title: "Error al procesar la imagen",
        description: error.message || "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const value = {
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    isProcessing,
    setIsProcessing,
    editedImages,
    setEditedImages,
    editedImage,
    setEditedImage,
    editMode,
    setEditMode,
    decorStyle,
    setDecorStyle,
    roomType,
    setRoomType,
    editPlan,
    setEditPlan,
    isPaymentRequired,
    setIsPaymentRequired,
    isLoading,
    setIsLoading,
    handleImageChange,
    handleEditImage
  };

  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
};

export const useImageEditor = () => {
  const context = useContext(ImageEditorContext);
  
  if (context === null) {
    throw new Error("useImageEditor debe usarse dentro de un ImageEditorProvider");
  }
  
  return context;
};
