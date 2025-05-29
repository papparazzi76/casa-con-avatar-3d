
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData } from "./schema";
import { Plus } from "lucide-react";

interface ExtrasSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function ExtrasSection({ form }: ExtrasSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Plus className="h-5 w-5" />
        Extras y Servicios
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="tiene_garaje"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Garaje</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tiene_trastero"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Trastero</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tiene_ascensor"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Ascensor</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tiene_calefaccion"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Calefacción</FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tiene_aire_acondicionado"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Aire acondicionado</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
