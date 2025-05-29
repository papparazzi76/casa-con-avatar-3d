
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData } from "./schema";
import { Mail, MapPin } from "lucide-react";

interface ContactSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function ContactSection({ form }: ContactSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Mail className="h-5 w-5" />
        Datos de Contacto
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="su.email@ejemplo.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="direccion_completa"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Dirección Completa <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Calle, número, piso, puerta, código postal, ciudad"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones adicionales (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cualquier información adicional que considere relevante..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
