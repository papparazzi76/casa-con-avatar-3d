
import { ContactProfessionalButtonWithDialog } from "@/components/ContactProfessionalButtonWithDialog";
import { UserImageInfo } from "./UserImageInfo";
import { PriceInfoAlert } from "./PriceInfoAlert";
import { useImageEditor } from "./ImageEditorProvider";

export const ImageEditorHeader = () => {
  const { editedImages, isLoading } = useImageEditor();
  
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Editor de Imágenes & Homestaging</h1>
        <p className="text-gray-500">
          Transforma tus fotografías inmobiliarias con edición profesional y visualiza reformas virtuales.
        </p>
        
        <UserImageInfo editedImages={editedImages} isLoading={isLoading} />
      </div>

      <div className="mb-6">
        <PriceInfoAlert />
      </div>

      <div className="flex justify-center mb-6">
        <ContactProfessionalButtonWithDialog 
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90" 
        />
      </div>
    </>
  );
};
