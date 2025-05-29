
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData } from "./schema";
import { Mail, MapPin, Home } from "lucide-react";

interface ContactSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function ContactSection({ form }: ContactSectionProps) {
  const esUnifamiliar = form.watch("es_unifamiliar");

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
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Dirección Completa <span className="text-red-500">*</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="direccion_calle"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Calle/Avenida <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Calle Mayor, Avenida de la Constitución..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="direccion_numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 25, 14 bis..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="es_unifamiliar"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Es vivienda unifamiliar
                  </FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Marque si es una casa independiente (no necesita planta/puerta)
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>

        {!esUnifamiliar && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="direccion_planta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planta <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 3º, Bajo, Entresuelo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="direccion_puerta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puerta <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: A, B, Izquierda, Derecha..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="direccion_codigo_postal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Postal <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 28001"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="direccion_ciudad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Madrid, Barcelona..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
