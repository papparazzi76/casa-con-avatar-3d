
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PropertyValuation } from "@/services/propertyValuator";
import { toast } from "sonner";
import { sendProfessionalValuationRequest } from "@/services/professionalValuationService";
import { TermsAcceptanceField } from "./TermsAcceptanceField";

const professionalValuationSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(1, "El teléfono es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  codigoPostal: z.string().min(1, "El código postal es obligatorio"),
  comentarios: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Debe aceptar los términos y condiciones"
  })
});

type ProfessionalValuationFormData = z.infer<typeof professionalValuationSchema>;

interface ProfessionalValuationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  propertyValuation: PropertyValuation | null;
}

export function ProfessionalValuationDialog({
  isOpen,
  onClose,
  propertyValuation
}: ProfessionalValuationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfessionalValuationFormData>({
    resolver: zodResolver(professionalValuationSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      codigoPostal: "",
      comentarios: "",
      acceptTerms: false
    }
  });

  const handleSubmit = async (data: ProfessionalValuationFormData) => {
    setIsSubmitting(true);

    try {
      const { acceptTerms, ...requestData } = data;
      
      // Send the request
      await sendProfessionalValuationRequest({
        ...requestData,
        valoracionActual: propertyValuation,
        notifyEmail: "carlos@arcasl.es"
      });

      toast.success("¡Solicitud enviada correctamente! Un experto se pondrá en contacto contigo en breve.");
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error sending professional valuation request:", error);
      toast.error("Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Solicitar valoración profesional gratuita</DialogTitle>
          <DialogDescription>
            Un experto inmobiliario se pondrá en contacto con usted para concertar una visita de valoración.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre y apellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input placeholder="600 000 000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codigoPostal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal *</FormLabel>
                    <FormControl>
                      <Input placeholder="28001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección completa del inmueble *</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle, número, planta, puerta..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad *</FormLabel>
                  <FormControl>
                    <Input placeholder="Madrid, Barcelona, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comentarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentarios adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Información adicional sobre el inmueble que consideres relevante..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TermsAcceptanceField 
              control={form.control} 
              name="acceptTerms" 
            />

            <div className="text-sm text-gray-500">
              * Campos obligatorios
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar valoración"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
