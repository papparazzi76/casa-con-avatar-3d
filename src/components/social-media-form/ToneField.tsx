
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
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
import { FormValues, toneOptions } from "./formSchema";

type ToneFieldProps = {
  form: UseFormReturn<FormValues>;
};

export function ToneField({ form }: ToneFieldProps) {
  return (
    <FormField
      control={form.control}
      name="tono"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tono del contenido</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un tono" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {toneOptions.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Opcional - Define el estilo de comunicación de los posts
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
