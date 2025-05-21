
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
  SelectValue 
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues, conservationOptions } from "./formSchema";

type ConservationFieldProps = {
  form: UseFormReturn<FormValues>;
};

export function ConservationField({ form }: ConservationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="estado_conservacion"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Estado de conservación</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el estado" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {conservationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
