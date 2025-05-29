
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData } from "./schema";
import { Trees } from "lucide-react";

interface ExteriorAreasSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function ExteriorAreasSection({ form }: ExteriorAreasSectionProps) {
  const tieneTerraza = form.watch("tiene_terraza");
  const tieneJardin = form.watch("tiene_jardin");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Trees className="h-5 w-5" />
        Áreas Exteriores
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="tiene_terraza"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Terraza</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          {tieneTerraza && (
            <FormField
              control={form.control}
              name="superficie_terraza"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Superficie terraza (m²)</FormLabel>
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
          )}
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="tiene_jardin"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Jardín</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          {tieneJardin && (
            <FormField
              control={form.control}
              name="superficie_jardin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Superficie jardín (m²)</FormLabel>
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
          )}
        </div>
        
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="tiene_piscina"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Piscina</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
