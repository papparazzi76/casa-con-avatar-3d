
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./FormSchema";
import { getAllZones } from "@/services/propertyValuator/zoneMappingService";

interface LocationSectionProps {
  form: UseFormReturn<PropertyFormData>;
}

export function LocationSection({ form }: LocationSectionProps) {
  const availableZones = getAllZones();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ubicación</h3>
      
      <FormField
        control={form.control}
        name="zona_idealista"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zona de Idealista (Valladolid) <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la zona" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableZones.map((zona) => (
                  <SelectItem key={zona} value={zona}>
                    {zona}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Zonas oficiales utilizadas por Idealista en Valladolid
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="localidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidad <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Valladolid" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="distrito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distrito/Barrio <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Ej.: Centro" {...field} />
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
            <FormLabel>Dirección (opcional)</FormLabel>
            <FormControl>
              <Input placeholder="Ej.: Calle Mayor, 21" {...field} />
            </FormControl>
            <FormDescription>
              Ayuda a encontrar inmuebles más cercanos
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
