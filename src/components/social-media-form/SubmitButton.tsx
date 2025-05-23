import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

type SubmitButtonProps = {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  isGenerating?: boolean;  // Added this prop
};

export function SubmitButton({ form, onSubmit, isGenerating = false }: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { sendFormNotification } = useNotification();
  
  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Formulario enviado, enviando notificación para:", user?.email);
      
      // Enviar notificación
      await sendFormNotification(
        "Social Media Post Generator", 
        user?.email, 
        {
          plataforma: data.plataforma,
          tipo_operacion: data.tipo_operacion,
          tipo_inmueble: data.tipo_inmueble,
          localidad: data.localidad,
          precio: data.precio,
          superficie: data.superficie_m2, // Fixed property name
          habitaciones: data.habitaciones,
          banos: data.banos,
          caracteristicas_destacadas: data.caracteristicas_destacadas,
          estado_conservacion: data.estado_conservacion,
          tono: data.tono // Fixed property name
        }
      );
      
      onSubmit(data);
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 mt-6 h-12"
      onClick={form.handleSubmit(handleSubmit)}
      disabled={isSubmitting || form.formState.isSubmitting || isGenerating}
    >
      {isSubmitting || isGenerating ? "Generando..." : "Generar Posts"}
    </Button>
  );
}
