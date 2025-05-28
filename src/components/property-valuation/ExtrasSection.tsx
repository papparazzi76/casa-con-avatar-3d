
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyValuationInput } from "@/pages/PropertyValuator";

interface ExtrasSectionProps {
  form: UseFormReturn<PropertyValuationInput>;
}

const AVAILABLE_EXTRAS = [
  { id: "ascensor", label: "Ascensor" },
  { id: "parking", label: "Plaza de garaje" },
  { id: "trastero", label: "Trastero" },
  { id: "terraza", label: "Terraza" },
  { id: "balcon", label: "Balcón" },
  { id: "piscina", label: "Piscina" },
  { id: "jardin", label: "Jardín" },
  { id: "aire-acondicionado", label: "Aire acondicionado" },
  { id: "calefaccion", label: "Calefacción" },
  { id: "exterior", label: "Exterior" },
];

export function ExtrasSection({ form }: ExtrasSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Extras y características</h3>
      
      <FormField
        control={form.control}
        name="extras"
        render={() => (
          <FormItem>
            <FormLabel>Selecciona las características que tiene tu propiedad:</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
              {AVAILABLE_EXTRAS.map((extra) => (
                <FormField
                  key={extra.id}
                  control={form.control}
                  name="extras"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={extra.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(extra.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, extra.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== extra.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {extra.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
