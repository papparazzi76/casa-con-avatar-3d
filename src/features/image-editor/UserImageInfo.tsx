
import { EditedImage } from "./types";

interface UserImageInfoProps {
  editedImages: EditedImage[];
  isLoading: boolean;
}

export const UserImageInfo = ({ editedImages, isLoading }: UserImageInfoProps) => {
  if (isLoading) return null;
  
  return (
    <div className="mt-4 p-3 bg-muted rounded-md text-sm">
      <p className="flex items-center gap-2">
        <span className="font-medium">Imágenes editadas:</span> 
        <span>{editedImages.length}/5</span>
        {editedImages.length >= 5 && (
          <span className="text-amber-600">(Límite alcanzado)</span>
        )}
      </p>
    </div>
  );
};
