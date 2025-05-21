
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FeaturesFieldProps {
  control: Control<any>;
}

export function FeaturesField({ control }: FeaturesFieldProps) {
  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Características</FormLabel>
          <FormControl>
            <Input 
              placeholder="Ej: terraza, piscina, ascensor, garaje" 
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
