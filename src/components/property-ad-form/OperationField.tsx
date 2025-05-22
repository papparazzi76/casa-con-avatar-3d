
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface OperationFieldProps {
  form: UseFormReturn<any>;
}

export function OperationField({ form }: OperationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="operation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Operación*</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de operación" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="venta">Venta</SelectItem>
              <SelectItem value="alquiler">Alquiler</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
