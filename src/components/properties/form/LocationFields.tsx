
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

interface LocationFieldsProps {
  control: Control<any>;
}

export function LocationFields({ control }: LocationFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ubicación*</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: Centro, Madrid" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Zona, barrio, ciudad...
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección*</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ej: Calle Mayor, 1" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Esta información no se mostrará públicamente
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="postal_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Código postal</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 28001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
