import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SocialMediaPostFormData } from "@/services/socialMediaService";

// Import form schema and components
import { formSchema, FormValues } from "./social-media-form/formSchema";
import { PlatformSelector } from "./social-media-form/PlatformSelector";
import { LocationSection } from "./social-media-form/LocationSection";
import { PropertyDetailsSection } from "./social-media-form/PropertyDetailsSection";
import { ConservationField } from "./social-media-form/ConservationField";
import { FeaturesList } from "./social-media-form/FeaturesList";
import { ExtrasList } from "./social-media-form/ExtrasList";
import { ContactField } from "./social-media-form/ContactField";
import { PhotoUploader } from "./social-media-form/PhotoUploader";
import { ToneField } from "./social-media-form/ToneField";
import { SubmitButton } from "./social-media-form/SubmitButton";
import { TermsCheckboxField } from "@/components/TermsCheckboxField";

interface SocialMediaPostFormProps {
  onSubmit: (data: SocialMediaPostFormData) => void;
  isGenerating: boolean;
}

export function SocialMediaPostForm({ onSubmit, isGenerating }: SocialMediaPostFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plataforma: "ambas",
      tipo_operacion: "venta",
      caracteristicas_destacadas: [],
      extras: [],
      fotos: [],
      idioma: "ES",
      acceptedTerms: undefined,
    },
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      toast.warning("Solo puedes subir hasta 10 imágenes");
      form.setValue("fotos", files.slice(0, 10));
    } else {
      form.setValue("fotos", files);
    }
  };
  
  const handleSubmit = (data: FormValues) => {
    if (isGenerating) return;
    
    // Convert form data to SocialMediaPostFormData
    // All required fields are already validated by zod
    const formattedData: SocialMediaPostFormData = {
      plataforma: data.plataforma,
      tipo_operacion: data.tipo_operacion,
      tipo_inmueble: data.tipo_inmueble,
      localidad: data.localidad,
      superficie_m2: data.superficie_m2,
      habitaciones: data.habitaciones,
      banos: data.banos,
      precio: data.precio,
      caracteristicas_destacadas: data.caracteristicas_destacadas,
      url_contacto: data.url_contacto,
      fotos: data.fotos,
      estado_conservacion: data.estado_conservacion,
      extras: data.extras || [],
      titulo_anuncio: data.titulo_anuncio,
      idioma: data.idioma,
      tono: data.tono
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pb-10">
        <PlatformSelector form={form} />
        <LocationSection form={form} />
        <PropertyDetailsSection form={form} />
        <ConservationField form={form} />
        <FeaturesList form={form} />
        <ExtrasList form={form} />
        <ContactField form={form} />
        <PhotoUploader form={form} handleFileChange={handleFileChange} />
        <ToneField form={form} />
        <TermsCheckboxField control={form.control} />
        <SubmitButton form={form} onSubmit={handleSubmit} isGenerating={isGenerating} />
      </form>
    </Form>
  );
}
