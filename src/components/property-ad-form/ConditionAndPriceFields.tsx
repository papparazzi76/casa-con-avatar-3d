
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ConditionAndPriceFieldsProps {
  form: UseFormReturn<any>;
}

export function ConditionAndPriceFields({ form }: ConditionAndPriceFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el estado" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="nuevo">Nuevo / A estrenar</SelectItem>
                <SelectItem value="reformado">Reformado</SelectItem>
                <SelectItem value="buen_estado">Buen estado</SelectItem>
                <SelectItem value="a_reformar">A reformar</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio (€)*</FormLabel>
            <FormControl>
              <Input placeholder="Ej: 250000" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
