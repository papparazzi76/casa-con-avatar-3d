
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
import { propertyTypes } from "./constants";

interface PropertyTypeFieldProps {
  form: UseFormReturn<any>;
}

export function PropertyTypeField({ form }: PropertyTypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="propertyType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de inmueble*</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {propertyTypes.map((type) => (
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
