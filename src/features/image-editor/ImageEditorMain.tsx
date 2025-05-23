
import { ImageUploader } from "./ImageUploader";
import { EditorOptions } from "./EditorOptions";
import { EditPlanDisplay } from "./EditPlanDisplay";
import { ResultDisplay } from "./ResultDisplay";
import { getRoomTypeLabel } from "./util";
import { useImageEditor } from "./ImageEditorProvider";

export const ImageEditorMain = () => {
  const { 
    imagePreview, 
    handleImageChange,
    editMode, 
    setEditMode, 
    roomType, 
    setRoomType, 
    decorStyle, 
    setDecorStyle, 
    handleEditImage, 
    isProcessing, 
    selectedImage, 
    editPlan, 
    editedImage,
  } = useImageEditor();

  const showPaymentIndicator = (editMode === "homestaging" && (roomType === "cocina" || roomType === "bano"));
  
  return (
    <>
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
          showPaymentIndicator={showPaymentIndicator}
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
    </>
  );
};
