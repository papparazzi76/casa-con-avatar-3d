
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PropertyImage, PropertyVideo } from "@/types/property";
import { useState } from "react";

interface PropertyGalleryProps {
  images: PropertyImage[];
  videos?: PropertyVideo[];
  title: string;
  operationType: string;
  formatOperationType: (type: string) => string;
}

export function PropertyGallery({ images, videos = [], title, operationType, formatOperationType }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentType, setCurrentType] = useState<'image' | 'video'>('image');
  const [showVideo, setShowVideo] = useState(false);
  
  const hasVideos = videos && videos.length > 0;
  
  const nextImage = () => {
    if (currentType === 'image') {
      if (!images.length) return;
      if (currentImageIndex === images.length - 1 && hasVideos) {
        setCurrentType('video');
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    } else {
      if (!videos.length) return;
      if (currentImageIndex === videos.length - 1 && images.length) {
        setCurrentType('image');
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex((prev) => (prev + 1) % videos.length);
      }
    }
  };
  
  const prevImage = () => {
    if (currentType === 'image') {
      if (!images.length) return;
      if (currentImageIndex === 0 && hasVideos) {
        setCurrentType('video');
        setCurrentImageIndex(videos.length - 1);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    } else {
      if (!videos.length) return;
      if (currentImageIndex === 0 && images.length) {
        setCurrentType('image');
        setCurrentImageIndex(images.length - 1);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + videos.length) % videos.length);
      }
    }
  };
  
  const currentMedia = currentType === 'image' 
    ? images[currentImageIndex] 
    : videos[currentImageIndex];
  
  const handleThumbnailClick = (index: number, type: 'image' | 'video') => {
    setCurrentImageIndex(index);
    setCurrentType(type);
    if (type === 'video') {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
  };
  
  return (
    <div className="lg:col-span-2">
      <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
        {currentType === 'image' ? (
          <img 
            src={currentMedia?.image_url || "/placeholder.svg"} 
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full relative">
            {showVideo ? (
              <video 
                controls 
                autoPlay
                className="w-full h-full object-cover"
              >
                <source src={currentMedia?.video_url} type="video/mp4" />
                Su navegador no soporta videos HTML5.
              </video>
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center bg-black relative cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <img 
                  src={videos[currentImageIndex]?.video_url.replace('.mp4', '-thumbnail.jpg') || "/placeholder.svg"}
                  alt={`Video thumbnail ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/80 p-4 text-realestate-purple">
                    <Play className="h-10 w-10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {(images.length > 1 || hasVideos) && (
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
      
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={`aspect-square cursor-pointer rounded-md overflow-hidden ${
              currentType === 'image' && currentImageIndex === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleThumbnailClick(index, 'image')}
          >
            <img 
              src={image.image_url} 
              alt={`Imagen ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        {videos.map((video, index) => (
          <div 
            key={video.id} 
            className={`aspect-square cursor-pointer rounded-md overflow-hidden relative ${
              currentType === 'video' && currentImageIndex === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleThumbnailClick(index, 'video')}
          >
            <img 
              src={video.video_url.replace('.mp4', '-thumbnail.jpg') || "/placeholder.svg"}
              alt={`Video ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
