
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData, orientacionOptions } from "./schema";
import { Compass } from "lucide-react";

interface PropertyDetailsSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function PropertyDetailsSection({ form }: PropertyDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Compass className="h-5 w-5" />
        Detalles de la Propiedad
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="orientacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orientación <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la orientación" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orientacionOptions.map((orientacion) => (
                    <SelectItem key={orientacion.value} value={orientacion.value}>
                      {orientacion.label}
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
          name="exterior_interior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exterior/Interior <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="exterior">Exterior</SelectItem>
                  <SelectItem value="interior">Interior</SelectItem>
                  <SelectItem value="semi-exterior">Semi-exterior</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="planta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planta <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la planta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="entresuelo">Entresuelo</SelectItem>
                  <SelectItem value="1">1ª Planta</SelectItem>
                  <SelectItem value="2">2ª Planta</SelectItem>
                  <SelectItem value="3">3ª Planta</SelectItem>
                  <SelectItem value="4">4ª Planta</SelectItem>
                  <SelectItem value="5">5ª Planta</SelectItem>
                  <SelectItem value="6">6ª Planta</SelectItem>
                  <SelectItem value="7">7ª Planta</SelectItem>
                  <SelectItem value="8">8ª Planta</SelectItem>
                  <SelectItem value="9">9ª Planta</SelectItem>
                  <SelectItem value="10+">10ª Planta o superior</SelectItem>
                  <SelectItem value="atico">Ático</SelectItem>
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
