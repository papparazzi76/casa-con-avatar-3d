
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { PropertyImageManager } from "@/components/properties/PropertyImageManager";
import { Property } from "@/types/property";

interface PropertyEditTabsProps {
  property: Property;
  onPropertyUpdate: (property: Property) => void;
  onImagesChange: () => void;
}

export function PropertyEditTabs({ property, onPropertyUpdate, onImagesChange }: PropertyEditTabsProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="images">Imágenes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <PropertyForm 
          property={property} 
          isEditing={true}
          onSuccess={onPropertyUpdate}
        />
      </TabsContent>
      
      <TabsContent value="images">
        <PropertyImageManager 
          property={property}
          images={property.property_images}
          onImagesChange={onImagesChange}
        />
      </TabsContent>
    </Tabs>
  );
}
