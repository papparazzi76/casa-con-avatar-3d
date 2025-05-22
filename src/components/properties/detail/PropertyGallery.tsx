
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyImage } from "@/types/property";
import { useState } from "react";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  operationType: string;
  formatOperationType: (type: string) => string;
}

export function PropertyGallery({ images, title, operationType, formatOperationType }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    if (!images.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const currentImage = images[currentImageIndex] || { image_url: "/placeholder.svg" };
  
  return (
    <div className="lg:col-span-2">
      <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
        <img 
          src={currentImage.image_url} 
          alt={title}
          className="object-cover w-full h-full"
        />
        
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
        
        <Badge className="absolute top-4 right-4 uppercase font-semibold" variant={operationType === "venta" ? "default" : "secondary"}>
          {formatOperationType(operationType)}
        </Badge>
      </div>
      
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className={`aspect-square cursor-pointer rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img 
                src={image.image_url} 
                alt={`Imagen ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
