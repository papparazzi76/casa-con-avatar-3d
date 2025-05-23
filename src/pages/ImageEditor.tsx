
import { useEffect } from "react";
import { ImageEditorProvider } from "@/features/image-editor/ImageEditorProvider";
import { ImageEditorHeader } from "@/features/image-editor/ImageEditorHeader";
import { ImageEditorMain } from "@/features/image-editor/ImageEditorMain";
import { LoginRequiredAlert } from "@/features/image-editor/LoginRequiredAlert";
import { useAuth } from "@/context/AuthContext";
import { useImageEditor } from "@/features/image-editor/ImageEditorProvider";

const ImageEditorContent = () => {
  const { setEditedImages, setIsLoading } = useImageEditor();
  const { user } = useAuth();

  // Mock edited images since we don't have an actual table for them in Supabase
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // In a real app, we would fetch from Supabase
      // Since we don't have an 'edited_images' table, we'll use mock data
      const mockEditedImages = [];
      
      setEditedImages(mockEditedImages);
    } catch (error) {
      console.error("Error loading user images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, setEditedImages, setIsLoading]);

  return (
    <>
      <ImageEditorHeader />
      <ImageEditorMain />
    </>
  );
};

const ImageEditor = () => {
  const { user } = useAuth();

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {!user ? (
        <LoginRequiredAlert />
      ) : (
        <ImageEditorProvider>
          <ImageEditorContent />
        </ImageEditorProvider>
      )}
    </div>
  );
};

export default ImageEditor;
