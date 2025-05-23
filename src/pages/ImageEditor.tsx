
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from "@/features/image-editor/ImageUploader";
import { EditorOptions } from "@/features/image-editor/EditorOptions";
import { ResultDisplay } from "@/features/image-editor/ResultDisplay";
import { DecorStyle, EditMode, RoomType } from "@/features/image-editor/types";
import { getRoomTypeLabel } from "@/features/image-editor/util";
import { ImageEditPlan } from "@/utils/openaiService";
import { ContactProfessionalButtonWithDialog } from "@/components/ContactProfessionalButtonWithDialog";
import { EditPlanDisplay } from "@/features/image-editor/EditPlanDisplay";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EditedImage {
  id: string;
  user_id: string;
  image_url: string;
  edit_mode: EditMode;
  room_type?: RoomType;
  decor_style?: DecorStyle;
  created_at: string;
}

const ImageEditor = () => {
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
  const navigate = useNavigate();

  // Fetch user's edited images
  useEffect(() => {
    async function fetchUserImages() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('edited_images')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setEditedImages(data || []);
      } catch (error) {
        console.error("Error fetching user images:", error);
        toast({
          title: "Error al cargar imágenes",
          description: "No se pudieron cargar tus imágenes editadas.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserImages();
  }, [user, toast]);

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

  // Check if a payment is required for this edit
  const checkPaymentRequired = () => {
    // Gratuitas: todas las mejoras y homestaging de salón y dormitorio
    if (editMode === "enhancement") return false;
    
    // Homestaging: solo gratuitas salón y dormitorio
    if (editMode === "homestaging" && (roomType === "salon" || roomType === "dormitorio")) return false;
    
    // De pago: cocina y baño (2,99€ cada imagen)
    return true;
  };

  // Check if user has reached the limit
  const checkUserLimit = () => {
    if (!user) return { canEdit: false, message: "Debes iniciar sesión para editar imágenes." };
    
    // User can edit max 5 images
    if (editedImages.length >= 5) {
      return { 
        canEdit: false, 
        message: "Has alcanzado el límite de 5 imágenes editadas. Contacta con nosotros para más ediciones."
      };
    }
    
    return { canEdit: true, message: "" };
  };

  const handleEditImage = () => {
    if (!selectedImage) {
      toast({
        title: "No hay imagen seleccionada",
        description: "Por favor selecciona una imagen para editar.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has reached the limit
    const userLimit = checkUserLimit();
    if (!userLimit.canEdit) {
      toast({
        title: "Límite alcanzado",
        description: userLimit.message,
        variant: "destructive",
      });
      return;
    }

    // Check if payment is required
    const paymentRequired = checkPaymentRequired();
    setIsPaymentRequired(paymentRequired);
    
    if (paymentRequired) {
      // In a real app, redirect to payment page
      toast({
        title: "Pago requerido",
        description: "Esta edición requiere un pago de 2,99€. Actualmente estamos en modo de demostración.",
      });
      return;
    }

    // Actual processing would happen here
    setIsProcessing(true);
    
    // Simulate the process using a timeout
    setTimeout(() => {
      // Create fake edited image URL (in a real app this would be returned from a service)
      const fakeEditedImageUrl = imagePreview;
      
      // Set fake edited image
      setEditedImage(fakeEditedImageUrl);
      
      // Create fake edit plan
      setEditPlan({
        description: "Imagen mejorada con ajustes de iluminación, contraste y nitidez.",
        steps: [
          "Ajustes de luz y color",
          "Mejora de nitidez",
          "Corrección de perspectiva",
          "Optimización general"
        ]
      });
      
      // Add to user's edited images
      if (user) {
        const newEditedImage = {
          id: Date.now().toString(),
          user_id: user.id,
          image_url: fakeEditedImageUrl || "",
          edit_mode: editMode,
          room_type: editMode === "homestaging" ? roomType : undefined,
          decor_style: editMode === "homestaging" ? decorStyle : undefined,
          created_at: new Date().toISOString()
        };
        
        setEditedImages(prev => [newEditedImage, ...prev]);
      }
      
      toast({
        title: "¡Imagen procesada con éxito!",
        description: `Modo: ${editMode}${editMode !== "enhancement" ? `, Estilo: ${decorStyle}` : ""}, Estancia: ${getRoomTypeLabel(roomType)}`,
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  if (!user) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Acceso restringido</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>
              Debes iniciar sesión para acceder al editor de imágenes.
            </p>
            <Button onClick={() => navigate("/auth")}>
              Iniciar sesión
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Editor de Imágenes & Homestaging</h1>
        <p className="text-gray-500">
          Transforma tus fotografías inmobiliarias con edición profesional y visualiza reformas virtuales.
        </p>
        
        {!isLoading && (
          <div className="mt-4 p-3 bg-muted rounded-md text-sm">
            <p className="flex items-center gap-2">
              <span className="font-medium">Imágenes editadas:</span> 
              <span>{editedImages.length}/5</span>
              {editedImages.length >= 5 && (
                <span className="text-amber-600">(Límite alcanzado)</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <Alert className="bg-yellow-50 border-yellow-200">
          <Coins className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Información de precios</AlertTitle>
          <AlertDescription className="text-yellow-800">
            <p>Ediciones gratuitas:</p>
            <ul className="list-disc pl-5 mt-1 mb-2">
              <li>Todas las ediciones de mejora</li>
              <li>Homestaging de salón y dormitorio</li>
            </ul>
            <p>Ediciones de pago:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Homestaging de cocina: 2,99€ por imagen</li>
              <li>Homestaging de baño: 2,99€ por imagen</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-center mb-6">
        <ContactProfessionalButtonWithDialog 
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90" 
        />
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
          showPaymentIndicator={(editMode === "homestaging" && (roomType === "cocina" || roomType === "bano"))}
          paymentAmount="2,99€"
        />
      </div>

      {/* Plan de edición */}
      {editPlan && (
        <EditPlanDisplay editPlan={editPlan} className="mt-8" />
      )}

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
