
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OPERATION_TYPES } from "@/types/property";
import { Control } from "react-hook-form";

interface OperationTypeFieldProps {
  control: Control<any>;
}

export function OperationTypeField({ control }: OperationTypeFieldProps) {
  return (
    <FormField
      control={control}
      name="operation_type"
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
              {OPERATION_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
