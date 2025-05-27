
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface UserRoleFieldProps {
  form: UseFormReturn<FormValues>;
}

export function UserRoleField({ form }: UserRoleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="userRole"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>¿Eres comprador o vendedor?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="buyer" />
                </FormControl>
                <FormLabel className="font-normal">
                  Comprador
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="seller" />
                </FormControl>
                <FormLabel className="font-normal">
                  Vendedor
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="both" />
                </FormControl>
                <FormLabel className="font-normal">
                  Ambos (vista completa)
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Selecciona tu rol para ver los gastos e impuestos específicos
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
