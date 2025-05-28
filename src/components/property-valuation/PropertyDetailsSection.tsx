
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationInput } from "@/pages/PropertyValuator";

interface PropertyDetailsSectionProps {
  form: UseFormReturn<PropertyValuationInput>;
}

const PROPERTY_STATES = [
  { value: "nuevo", label: "Nuevo" },
  { value: "como-nuevo", label: "Como nuevo" },
  { value: "buen-estado", label: "Buen estado" },
  { value: "para-reformar", label: "Para reformar" },
  { value: "reformado", label: "Reformado" },
];

export function PropertyDetailsSection({ form }: PropertyDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Detalles de la propiedad</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="surface_m2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie (m²)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="80" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dormitorios</FormLabel>
              <FormControl>
                <Input type="number" placeholder="3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baños</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="year_built"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año de construcción</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado de conservación</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROPERTY_STATES.map(state => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
