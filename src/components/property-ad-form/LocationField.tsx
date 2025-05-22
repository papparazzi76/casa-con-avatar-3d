
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface LocationFieldProps {
  form: UseFormReturn<any>;
}

export function LocationField({ form }: LocationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ubicación*</FormLabel>
          <FormControl>
            <Input placeholder="Ej: Chamberí, Madrid" {...field} />
          </FormControl>
          <FormDescription>
            Incluye barrio, distrito o zona y ciudad
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
