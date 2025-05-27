
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface BuyerAgeFieldProps {
  form: UseFormReturn<FormValues>;
}

export function BuyerAgeField({ form }: BuyerAgeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="buyerAge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Edad del comprador (años)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Ej: 25"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? parseInt(value) : undefined);
              }}
            />
          </FormControl>
          <FormDescription>
            Algunas comunidades autónomas ofrecen reducciones en el ITP para compradores jóvenes
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
