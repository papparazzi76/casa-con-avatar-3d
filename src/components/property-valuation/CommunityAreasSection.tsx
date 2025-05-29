
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationFormData, zonasComunes } from "./schema";
import { Users } from "lucide-react";

interface CommunityAreasSectionProps {
  form: UseFormReturn<PropertyValuationFormData>;
}

export function CommunityAreasSection({ form }: CommunityAreasSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Users className="h-5 w-5" />
        Zonas Comunitarias
      </h3>
      
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="zonas_comunes"
          render={() => (
            <FormItem>
              <FormLabel>Servicios comunitarios disponibles</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {zonasComunes.map((zona) => (
                  <FormField
                    key={zona.value}
                    control={form.control}
                    name="zonas_comunes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={zona.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(zona.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, zona.value])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== zona.value
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {zona.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <FormField
            control={form.control}
            name="zona_deportiva"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Zona deportiva</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="zona_juegos_infantiles"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Zona de juegos infantiles</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
