
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface SellerFieldsSectionProps {
  form: UseFormReturn<FormValues>;
}

export function SellerFieldsSection({ form }: SellerFieldsSectionProps) {
  const municipality = form.watch("municipality");
  const userRole = form.watch("userRole");
  const propertyType = form.watch("propertyType");

  const shouldShowPlusvaliaFields = municipality && (userRole === 'seller' || userRole === 'both') && propertyType === 'used';

  return (
    <div>
      <FormField
        control={form.control}
        name="municipality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Municipio 
              {propertyType === 'used' && (userRole === 'seller' || userRole === 'both') && ' (para cálculo de plusvalía)'}
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Ej: Madrid"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {propertyType === 'used' && (userRole === 'seller' || userRole === 'both')
                ? "Introduce el municipio para calcular el impuesto de plusvalía municipal (solo para vendedores de vivienda usada)"
                : "Introduce el municipio donde se encuentra la propiedad"
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {shouldShowPlusvaliaFields && (
        <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-sm">Datos para el cálculo de plusvalía municipal e IRPF</h3>
          
          <FormField
            control={form.control}
            name="previousPurchaseYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año de compra anterior</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ej: 2015"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? parseInt(value) : undefined);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="previousPurchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de compra anterior (€)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ej: 150000"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? parseInt(value) : undefined);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Necesario para calcular la ganancia patrimonial (IRPF) y la plusvalía municipal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
