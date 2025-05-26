
import { ImageLightbox } from "./components/ImageLightbox";
import { ImageUploadSection } from "./components/ImageUploadSection";

export const ImageEditorMain = () => {
  // Sample images for the lightboxes
  const editingImages = [
    "/lovable-uploads/0656bf9c-aa81-4225-ad15-51739465433b.png",
    "/lovable-uploads/1be00a47-bae5-4c4e-954d-bbb23c7bfe7d.png"
  ];

  const homestagingImages = [
    "/lovable-uploads/3133eb1d-3d8b-421e-a490-af2b246054f1.png",
    "/lovable-uploads/50954e18-038d-4a17-95e6-f620345997bd.png"
  ];

  return (
    <div className="space-y-8">
      {/* Lightboxes row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <ImageLightbox
            title="Edición de Imágenes"
            description="Mejora profesional de fotografías inmobiliarias"
            images={editingImages}
            labels={["Antes", "Después"]}
          />
          
          <ImageUploadSection
            title="Subir para Edición"
            description="Sube hasta 7 imágenes para mejorar profesionalmente"
            maxImages={7}
          />
        </div>

        <div className="space-y-4">
          <ImageLightbox
            title="Homestaging Virtual"
            description="Transformación virtual de espacios"
            images={homestagingImages}
            labels={["Antes", "Después"]}
          />
          
          <ImageUploadSection
            title="Subir para Homestaging"
            description="Sube hasta 5 imágenes para homestaging virtual"
            maxImages={5}
            isPaid={true}
            pricePerImage="2,99€"
            freeRooms={["salón", "dormitorio"]}
          />
        </div>
      </div>
    </div>
  );
};
