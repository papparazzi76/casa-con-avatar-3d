
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

type LocationSectionProps = {
  form: UseFormReturn<FormValues>;
};

export function LocationSection({ form }: LocationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="localidad"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Localidad*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Chamberí, Madrid" {...field} />
            </FormControl>
            <FormDescription>
              Barrio, distrito o zona y ciudad
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="titulo_anuncio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título del anuncio</FormLabel>
            <FormControl>
              <Input placeholder="Ej: Espectacular ático con vistas al mar" {...field} />
            </FormControl>
            <FormDescription>
              Opcional - título principal para tus anuncios
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
