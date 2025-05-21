
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

interface PropertyFormProps {
  property?: Property;
  isEditing?: boolean;
  onSuccess?: (property: Property) => void;
}

export function PropertyForm({ property, isEditing = false, onSuccess }: PropertyFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      features: property?.features ? property.features.join(", ") : "",
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      setIsSubmitting(true);
      
      let result;
      if (isEditing && property) {
        result = await updateProperty(property.id, data as PropertyFormData);
        toast.success("Inmueble actualizado correctamente");
      } else {
        result = await createProperty(data as PropertyFormData);
        toast.success("Inmueble publicado correctamente");
      }
      
      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate(`/propiedades/${result.id}`);
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
      </form>
    </Form>
  );
}
