
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideo, X, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadPropertyVideo, setMainVideo, deletePropertyVideo } from "@/services/property";
import { PropertyVideo } from "@/types/property";

interface PropertyVideoUploaderProps {
  propertyId: string;
  onVideoUploaded?: (video: PropertyVideo) => void;
  maxSizeMB?: number;
}

export function PropertyVideoUploader({ 
  propertyId, 
  onVideoUploaded,
  maxSizeMB = 50 // Por defecto, 50MB max
}: PropertyVideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tamaño de archivo
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`El video es demasiado grande. El tamaño máximo es de ${maxSizeMB}MB.`);
      return;
    }
    
    // Validar formato
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato no válido. Por favor, sube un archivo MP4, MOV, AVI o WMV.');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      // Simulamos progreso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
      
      const video = await uploadPropertyVideo(propertyId, file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast.success('Video subido correctamente');
      
      if (onVideoUploaded) {
        onVideoUploaded(video);
      }
      
    } catch (error: any) {
      console.error('Error al subir el video:', error);
      toast.error(`Error al subir el video: ${error.message || 'Inténtalo de nuevo.'}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Limpiar el input
      e.target.value = '';
    }
  };
  
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <FileVideo className="h-5 w-5" />
        <h3 className="text-sm font-medium">Añadir Video</h3>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-gray-600">Subiendo video... {uploadProgress}%</p>
            <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <FileVideo className="h-16 w-16 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2 text-center">
              Arrastra y suelta tu video aquí, o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-500 text-center">
              MP4, MOV (Max. {maxSizeMB}MB)
            </p>
            <input 
              type="file" 
              className="hidden" 
              accept="video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv"
              onChange={handleFileChange}
              disabled={isUploading} 
              id="video-upload"
            />
            <label htmlFor="video-upload" className="mt-4">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                disabled={isUploading}
              >
                Seleccionar Video
              </Button>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
