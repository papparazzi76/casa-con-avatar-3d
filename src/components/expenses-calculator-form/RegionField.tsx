
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface RegionFieldProps {
  form: UseFormReturn<FormValues>;
}

export function RegionField({ form }: RegionFieldProps) {
  return (
    <FormField
      control={form.control}
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Comunidad Autónoma</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu comunidad autónoma" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="andalucia">Andalucía</SelectItem>
              <SelectItem value="aragon">Aragón</SelectItem>
              <SelectItem value="asturias">Asturias</SelectItem>
              <SelectItem value="baleares">Islas Baleares</SelectItem>
              <SelectItem value="canarias">Canarias</SelectItem>
              <SelectItem value="cantabria">Cantabria</SelectItem>
              <SelectItem value="castilla-la-mancha">Castilla-La Mancha</SelectItem>
              <SelectItem value="castilla-leon">Castilla y León</SelectItem>
              <SelectItem value="cataluna">Cataluña</SelectItem>
              <SelectItem value="extremadura">Extremadura</SelectItem>
              <SelectItem value="galicia">Galicia</SelectItem>
              <SelectItem value="madrid">Comunidad de Madrid</SelectItem>
              <SelectItem value="murcia">Región de Murcia</SelectItem>
              <SelectItem value="navarra">Comunidad Foral de Navarra</SelectItem>
              <SelectItem value="pais-vasco">País Vasco</SelectItem>
              <SelectItem value="rioja">La Rioja</SelectItem>
              <SelectItem value="valencia">Comunidad Valenciana</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Necesario para aplicar las tarifas correctas de ITP según tu región
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
