
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

interface TitleFieldProps {
  control: Control<any>;
}

export function TitleField({ control }: TitleFieldProps) {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Título del anuncio*</FormLabel>
          <FormControl>
            <Input 
              placeholder="Ej: Magnífico piso en el centro de Madrid" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Un título atractivo y descriptivo
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
