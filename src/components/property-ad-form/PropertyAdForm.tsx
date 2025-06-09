
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PropertyTypeField } from "./PropertyTypeField";
import { OperationField } from "./OperationField";
import { LocationField } from "./LocationField";
import { MeasurementsFields } from "./MeasurementsFields";
import { ConditionAndPriceFields } from "./ConditionAndPriceFields";
import { FeaturesField } from "./FeaturesField";
import { DescriptionField } from "./DescriptionField";
import { ToneAndEmojiFields } from "./ToneAndEmojiFields";
import { SubmitButton } from "./SubmitButton";
import { formSchema, FormData } from "./formSchema";
import { PropertyAdFormData } from "@/utils/openaiService";
import { TermsCheckboxField } from "@/components/TermsCheckboxField";

interface PropertyAdFormProps {
  onSubmit: (data: PropertyAdFormData) => void;
  isGenerating: boolean;
}

export function PropertyAdForm({ onSubmit, isGenerating }: PropertyAdFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operation: "venta",
      tone: "profesional",
      useEmojis: false,
      acceptedTerms: undefined,
    },
  });

  const handleSubmit = (data: FormData) => {
    if (isGenerating) return;
    
    // Ensure all required fields are provided as non-optional
    const formattedData: PropertyAdFormData = {
      propertyType: data.propertyType,
      operation: data.operation,
      location: data.location,
      area: data.area,
      rooms: data.rooms,
      price: data.price,
      tone: data.tone,
      useEmojis: data.useEmojis,
      bathrooms: data.bathrooms,
      condition: data.condition,
      features: data.features,
      description: data.description,
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PropertyTypeField form={form} />
          <OperationField form={form} />
        </div>

        <LocationField form={form} />
        <MeasurementsFields form={form} />
        <ConditionAndPriceFields form={form} />
        <FeaturesField form={form} />
        <DescriptionField form={form} />
        <ToneAndEmojiFields form={form} />
        <TermsCheckboxField control={form.control} />
        <SubmitButton isGenerating={isGenerating} />
      </form>
    </Form>
  );
}
