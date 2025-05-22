
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
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { toneOptions } from "./constants";

interface ToneAndEmojiFieldsProps {
  form: UseFormReturn<any>;
}

export function ToneAndEmojiFields({ form }: ToneAndEmojiFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="tone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tono del anuncio</FormLabel>
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
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="useEmojis"
        render={({ field }) => (
          <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Incluir emojis</FormLabel>
              <FormDescription>
                Añadir emojis relevantes al anuncio
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
