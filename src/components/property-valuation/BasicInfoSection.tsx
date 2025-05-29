
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData, tiposVivienda } from "./schema";
import { Home } from "lucide-react";

interface BasicInfoSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Home className="h-5 w-5" />
        Información Básica
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tipo_vivienda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Vivienda <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tiposVivienda.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="superficie_m2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie (m²) <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="habitaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habitaciones <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="banos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baños <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="anno_construccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año de Construcción <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2000"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
