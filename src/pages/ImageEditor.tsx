
import { SimpleImageUploader } from "@/components/SimpleImageUploader";
import { LoginRequiredAlert } from "@/features/image-editor/LoginRequiredAlert";
import { useAuth } from "@/context/AuthContext";

const ImageEditor = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <LoginRequiredAlert />
        </div>
      ) : (
        <SimpleImageUploader />
      )}
    </div>
  );
};

export default ImageEditor;
