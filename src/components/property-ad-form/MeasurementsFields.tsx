
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface MeasurementsFieldsProps {
  form: UseFormReturn<any>;
}

export function MeasurementsFields({ form }: MeasurementsFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="area"
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
        name="rooms"
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
        name="bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Baños</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 2" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
