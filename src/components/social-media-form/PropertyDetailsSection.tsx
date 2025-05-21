
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

type PropertyDetailsSectionProps = {
  form: UseFormReturn<FormValues>;
};

export function PropertyDetailsSection({ form }: PropertyDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormField
        control={form.control}
        name="superficie_m2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Superficie (m²)*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 95" type="number" {...field} />
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
            <FormLabel>Habitaciones*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 3" type="number" {...field} />
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
            <FormLabel>Baños*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 2" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="precio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio (€)*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 250000" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
