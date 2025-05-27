
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateExpenses } from "@/services/expensesCalculatorService";
import { CalculatorRequest } from "@/types/calculatorTypes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ExpensesCalculatorFormProps {
  onCalculationComplete: (result: any) => void;
}

const formSchema = z.object({
  propertyType: z.enum(["new", "used"]),
  propertyValue: z.number().min(1, "El valor debe ser mayor que 0"),
  userRole: z.enum(["buyer", "seller", "both"]),
  municipality: z.string().optional(),
  previousPurchaseYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
  previousPurchasePrice: z.number().min(1, "El valor debe ser mayor que 0").optional(),
  includeAgencyFees: z.boolean().default(false),
  includeLegalFees: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function ExpensesCalculatorForm({
  onCalculationComplete,
}: ExpensesCalculatorFormProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPlusvaliaFields, setShowPlusvaliaFields] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "used",
      userRole: "buyer",
      propertyValue: undefined,
      municipality: "",
      previousPurchaseYear: new Date().getFullYear() - 5,
      previousPurchasePrice: undefined,
      includeAgencyFees: false,
      includeLegalFees: false,
    },
  });

  const propertyType = form.watch("propertyType");
  const userRole = form.watch("userRole");
  const municipality = form.watch("municipality");

  const onSubmit = async (data: FormValues) => {
    try {
      setIsCalculating(true);
      
      // Prepare the request data
      const request: CalculatorRequest = {
        propertyType: data.propertyType,
        propertyValue: data.propertyValue,
        userRole: data.userRole,
        includeAgencyFees: data.includeAgencyFees,
        includeLegalFees: data.includeLegalFees,
      };
      
      // Only add plusvalía fields if they're filled and relevant
      if (data.municipality && (data.userRole === 'seller' || data.userRole === 'both') && data.propertyType === 'used') {
        request.municipality = data.municipality;
        
        if (data.previousPurchaseYear && data.previousPurchasePrice) {
          request.previousPurchaseYear = data.previousPurchaseYear;
          request.previousPurchasePrice = data.previousPurchasePrice;
        }
      }
      
      const result = await calculateExpenses(request);
      onCalculationComplete(result);
    } catch (error: any) {
      console.error("Error en el cálculo:", error);
      toast.error(error.message || "Ha ocurrido un error al realizar el cálculo");
    } finally {
      setIsCalculating(false);
    }
  };

  // Show plusvalia fields only for sellers with used properties
  const shouldShowPlusvaliaFields = municipality && userRole !== 'buyer' && propertyType === 'used';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userRole"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Eres comprador o vendedor?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="buyer" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Comprador
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="seller" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Vendedor
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Ambos (vista completa)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Selecciona tu rol para ver los gastos e impuestos específicos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="propertyValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio del inmueble (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ej: 200000"
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
        
        <Separator />

        {/* Campos de plusvalía solo para vendedores y vivienda usada */}
        {userRole !== 'buyer' && (
          <div>
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Municipio 
                    {propertyType === 'used' && userRole !== 'buyer' && ' (para cálculo de plusvalía)'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Madrid"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setShowPlusvaliaFields(!!e.target.value && propertyType === 'used');
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {propertyType === 'used' && userRole !== 'buyer' 
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
        )}

        <Separator />

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

        <Button type="submit" className="w-full" disabled={isCalculating}>
          {isCalculating ? "Calculando..." : "Calcular gastos e impuestos"}
        </Button>
      </form>
    </Form>
  );
}
