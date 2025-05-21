
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
import { FormValues } from "./formSchema";

type ContactFieldProps = {
  form: UseFormReturn<FormValues>;
};

export function ContactField({ form }: ContactFieldProps) {
  return (
    <FormField
      control={form.control}
      name="url_contacto"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contacto*</FormLabel>
          <FormControl>
            <Input placeholder="Teléfono, email o URL" {...field} />
          </FormControl>
          <FormDescription>
            Información de contacto que aparecerá en los posts
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
