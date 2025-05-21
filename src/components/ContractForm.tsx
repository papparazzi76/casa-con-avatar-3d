
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ContractFormData, ContractType } from "@/types/contractTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface ContractFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function ContractForm({ onFormSubmit, missingFields }: ContractFormProps) {
  const form = useForm<ContractFormData>({
    defaultValues: {
      tipo_contrato: "contrato_reserva",
      precio_total: undefined,
      fecha_firma: format(new Date(), "yyyy-MM-dd"),
      poblacion_firma: "",
    },
  });

  const [contractType, setContractType] = useState<ContractType>("contrato_reserva");
  const watchContractType = form.watch("tipo_contrato");

  // Effect to update the contractType state when the form field changes
  useEffect(() => {
    if (watchContractType) {
      setContractType(watchContractType);
    }
  }, [watchContractType]);

  function onSubmit(data: ContractFormData) {
    onFormSubmit(data);
  }

  // Define friendly labels for the contract types
  const contractTypeLabels = {
    contrato_reserva: "Contrato de reserva o señal",
    arras_penitenciales: "Contrato de arras penitenciales",
    arras_confirmatorias: "Contrato de arras confirmatorias",
    arras_penales: "Contrato de arras penales",
    contrato_alquiler_vivienda: "Contrato de arrendamiento de vivienda"
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="tipo_contrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Contrato</FormLabel>
                  <Select 
                    onValueChange={(value: ContractType) => {
                      field.onChange(value);
                      setContractType(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de contrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(contractTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona el tipo de contrato que deseas generar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Common Fields */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Datos Comunes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h3 className="font-medium">
                  {contractType.includes("alquiler") ? "Arrendador" : "Vendedor"}
                </h3>
                
                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendador" : "vendedor"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre y apellidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendador_dni" : "vendedor_dni"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>DNI/NIE</FormLabel>
                      <FormControl>
                        <Input placeholder="00000000X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendador_domicilio" : "vendedor_domicilio"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>Domicilio</FormLabel>
                      <FormControl>
                        <Input placeholder="Dirección completa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">
                  {contractType.includes("alquiler") ? "Arrendatario" : "Comprador"}
                </h3>
                
                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendatario" : "comprador"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre y apellidos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendatario_dni" : "comprador_dni"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>DNI/NIE</FormLabel>
                      <FormControl>
                        <Input placeholder="00000000X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={contractType.includes("alquiler") ? "arrendatario_domicilio" : "comprador_domicilio"}
                  render={({ field }) => (
                    <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                      <FormLabel>Domicilio</FormLabel>
                      <FormControl>
                        <Input placeholder="Dirección completa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="inmueble"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Dirección del Inmueble</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Dirección completa del inmueble"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referencia_catastral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referencia Catastral (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="0000000XX0000X0000XX" {...field} />
                    </FormControl>
                    <FormDescription>
                      20 caracteres alfanuméricos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="precio_total"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("precio_total") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Precio Total (€)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fecha_firma"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("fecha_firma") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Fecha de Firma</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", { locale: es })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="poblacion_firma"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("poblacion_firma") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Población de Firma</FormLabel>
                    <FormControl>
                      <Input placeholder="Ciudad donde se firma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contract-specific fields */}
        {(contractType === "contrato_reserva" || 
          contractType === "arras_penitenciales" || 
          contractType === "arras_confirmatorias" ||
          contractType === "arras_penales" ||
          contractType === "contrato_alquiler_vivienda") && (
          <Card className="border-2 shadow">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Datos Específicos - {contractTypeLabels[contractType]}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campos para Contrato de Reserva */}
                {contractType === "contrato_reserva" && (
                  <>
                    <FormField
                      control={form.control}
                      name="importe_reserva"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("importe_reserva") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Importe de la Reserva (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="plazo_firma_escritura"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("plazo_firma_escritura") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Plazo para Firma de Escritura (días)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="30"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Contratos de Arras */}
                {(contractType === "arras_penitenciales" || 
                  contractType === "arras_confirmatorias" || 
                  contractType === "arras_penales") && (
                  <>
                    <FormField
                      control={form.control}
                      name="importe_arras"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("importe_arras") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Importe de las Arras (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vencimiento_arras"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("vencimiento_arras") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha de Vencimiento de las Arras</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP", { locale: es })
                                  ) : (
                                    <span>Selecciona una fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {contractType === "arras_penales" && (
                      <FormField
                        control={form.control}
                        name="penalizacion"
                        render={({ field }) => (
                          <FormItem className={missingFields?.includes("penalizacion") ? "border-red-500 border-l-2 pl-2" : ""}>
                            <FormLabel>Porcentaje de Penalización (%)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}

                {/* Campos para Contrato de Alquiler */}
                {contractType === "contrato_alquiler_vivienda" && (
                  <>
                    <FormField
                      control={form.control}
                      name="duracion"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("duracion") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Duración (años)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="1"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fianza"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fianza") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fianza (meses de renta)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="1"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="renta_mensual"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("renta_mensual") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Renta Mensual (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fecha_inicio_posesion"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fecha_inicio_posesion") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha de Inicio de Posesión</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP", { locale: es })
                                  ) : (
                                    <span>Selecciona una fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cuenta_pago"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("cuenta_pago") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Cuenta Bancaria para Pago (IBAN)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="ES00 0000 0000 0000 0000 0000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {missingFields && missingFields.length > 0 && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
            <h3 className="font-medium mb-2">Completa los campos requeridos:</h3>
            <ul className="list-disc list-inside space-y-1">
              {missingFields.map(field => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          >
            Generar Contrato
          </Button>
        </div>
      </form>
    </Form>
  );
}
