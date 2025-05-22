
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface DescriptionFieldProps {
  form: UseFormReturn<any>;
}

export function DescriptionField({ form }: DescriptionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Descripción adicional</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Añade cualquier información adicional relevante..." 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
