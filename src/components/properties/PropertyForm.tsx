
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyFormData } from "@/types/property";
import { createProperty, updateProperty } from "@/services/propertyService";
import { Property } from "@/types/property";
import { Form } from "@/components/ui/form";
import { TitleField } from "./form/TitleField";
import { PropertyTypeField } from "./form/PropertyTypeField";
import { OperationTypeField } from "./form/OperationTypeField";
import { PriceFields } from "./form/PriceFields";
import { RoomFields } from "./form/RoomFields";
import { LocationFields } from "./form/LocationFields";
import { FeaturesField } from "./form/FeaturesField";
import { DescriptionField } from "./form/DescriptionField";
import { FormActions } from "./form/FormActions";
import { propertyFormSchema, PropertyFormValues } from "./form/formSchema";
import { PropertyImagesUploader } from "./PropertyImagesUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyFormProps {
  property?: Property;
  isEditing?: boolean;
  onSuccess?: (property: Property) => void;
}

export function PropertyForm({ property, isEditing = false, onSuccess }: PropertyFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [createdProperty, setCreatedProperty] = useState<Property | null>(null);
  
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      property_type: property?.property_type || "",
      operation_type: property?.operation_type || "venta",
      price: property?.price || undefined,
      currency: property?.currency || "EUR",
      area: property?.area || undefined,
      rooms: property?.rooms || undefined,
      bathrooms: property?.bathrooms || undefined,
      location: property?.location || "",
      address: property?.address || "",
      postal_code: property?.postal_code || "",
      features: property?.features || [],
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      setIsSubmitting(true);
      
      let result;
      if (isEditing && property) {
        result = await updateProperty(property.id, data as PropertyFormData);
        toast.success("Inmueble actualizado correctamente");
        if (onSuccess) {
          onSuccess(result);
        }
      } else {
        result = await createProperty(data as PropertyFormData);
        toast.success("Inmueble publicado correctamente");
        
        // Save the created property and switch to images tab
        setCreatedProperty(result);
        setActiveTab("images");
        
        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if images tab should be available
  const savedProperty = createdProperty || (isEditing ? property : null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="details">Detalles del inmueble</TabsTrigger>
            <TabsTrigger value="images" disabled={!savedProperty}>
              {savedProperty ? "Imágenes" : "Imágenes (disponible después de guardar)"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <TitleField control={form.control} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PropertyTypeField control={form.control} />
              <OperationTypeField control={form.control} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PriceFields control={form.control} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoomFields control={form.control} />
            </div>

            <LocationFields control={form.control} />
            <FeaturesField control={form.control} />
            <DescriptionField control={form.control} />

            <FormActions isSubmitting={isSubmitting} isEditing={isEditing} />
          </TabsContent>
          
          {savedProperty && (
            <TabsContent value="images">
              <PropertyImagesUploader 
                propertyId={savedProperty.id} 
                existingImages={savedProperty.property_images || []}
              />
            </TabsContent>
          )}
        </Tabs>
      </form>
    </Form>
  );
}
