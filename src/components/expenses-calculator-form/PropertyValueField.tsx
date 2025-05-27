
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface PropertyValueFieldProps {
  form: UseFormReturn<FormValues>;
}

export function PropertyValueField({ form }: PropertyValueFieldProps) {
  return (
    <FormField
      control={form.control}
      name="propertyValue"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Precio del inmueble (€)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Ej: 200000"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? parseInt(value) : undefined);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
