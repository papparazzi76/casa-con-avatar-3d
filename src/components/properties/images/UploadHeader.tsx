
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

interface UploadHeaderProps {
  imagesCount: number;
  isUploading: boolean;
  uploadProgress: number;
  onUploadClick: () => void;
}

export function UploadHeader({ 
  imagesCount, 
  isUploading, 
  uploadProgress, 
  onUploadClick 
}: UploadHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
      <div>
        <p className="text-sm font-medium mb-1">
          {imagesCount}/10 imágenes
        </p>
        {imagesCount < 10 && (
          <Button 
            onClick={onUploadClick}
            disabled={isUploading}
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Subiendo..." : "Subir imágenes"}
          </Button>
        )}
      </div>
      
      {isUploading && (
        <div className="w-full sm:w-1/2">
          <p className="text-sm mb-1">Subiendo imágenes: {uploadProgress}%</p>
          <Progress value={uploadProgress} className="h-2 w-full" />
        </div>
      )}
    </div>
  );
}
