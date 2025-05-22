
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface FeaturesFieldProps {
  form: UseFormReturn<any>;
}

export function FeaturesField({ form }: FeaturesFieldProps) {
  return (
    <FormField
      control={form.control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Características destacables</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Ej: terraza, piscina, garaje, ascensor, aire acondicionado..." 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Separa las características por comas
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
