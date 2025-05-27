
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface PropertyTypeFieldProps {
  form: UseFormReturn<FormValues>;
}

export function PropertyTypeField({ form }: PropertyTypeFieldProps) {
  const propertyType = form.watch("propertyType");

  return (
    <FormField
      control={form.control}
      name="propertyType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Tipo de inmueble</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="new" />
                </FormControl>
                <FormLabel className="font-normal">
                  Vivienda nueva (primera transmisión)
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="used" />
                </FormControl>
                <FormLabel className="font-normal">
                  Vivienda de segunda mano
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            {propertyType === "new"
              ? "Las viviendas nuevas están sujetas a IVA (10%) y AJD. No aplica plusvalía municipal."
              : "Las viviendas de segunda mano están sujetas al Impuesto de Transmisiones Patrimoniales (ITP) y plusvalía municipal para vendedores."}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
