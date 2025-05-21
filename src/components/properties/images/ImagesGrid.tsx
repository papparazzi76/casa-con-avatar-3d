
import { PropertyImage } from "@/types/property";
import { ImageCard } from "./ImageCard";

interface ImagesGridProps {
  images: PropertyImage[];
  onDelete: (imageId: string) => void;
  onSetMainImage: (imageId: string) => void;
}

export function ImagesGrid({ images, onDelete, onSetMainImage }: ImagesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image) => (
        <ImageCard 
          key={image.id}
          image={image} 
          onDelete={onDelete}
          onSetMainImage={onSetMainImage}
        />
      ))}
    </div>
  );
}
