
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";

interface FeesSectionProps {
  form: UseFormReturn<FormValues>;
}

export function FeesSection({ form }: FeesSectionProps) {
  const userRole = form.watch("userRole");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="includeAgencyFees"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Incluir honorarios de agencia inmobiliaria
              </FormLabel>
              <FormDescription>
                Aprox. 3% del valor de la propiedad
                {userRole === 'buyer' && ' (pagado por el comprador)'}
                {userRole === 'seller' && ' (pagado por el vendedor)'}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="includeLegalFees"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Incluir asesoramiento legal
              </FormLabel>
              <FormDescription>
                Gestiones y asesoría jurídica para la {userRole === 'buyer' ? 'compra' : 'venta'}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
