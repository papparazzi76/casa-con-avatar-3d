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
import { Checkbox } from "@/components/ui/checkbox";

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
      sujeto_financiacion: false,
      gastos_luz: false,
      gastos_agua: false,
      gastos_gas: false,
      gastos_internet: false,
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
    contrato_reserva_inmueble: "Contrato Privado de Reserva de Inmueble",
    arras_penitenciales: "Contrato de arras penitenciales",
    arras_confirmatorias: "Contrato de arras confirmatorias",
    arras_penales: "Contrato de arras penales",
    alquiler_particulares_amueblado: "Contrato de arrendamiento de vivienda amueblada",
    alquiler_particulares_sin_amueblar: "Contrato de arrendamiento de vivienda sin amueblar",
    alquiler_empresa_particular_amueblado: "Arrendamiento empresa-particular amueblado",
    alquiler_empresa_particular_sin_amueblar: "Arrendamiento empresa-particular sin amueblar",
    alquiler_uso_distinto_vivienda_amueblado: "Arrendamiento uso distinto vivienda amueblado",
    alquiler_uso_distinto_vivienda_sin_amueblar: "Arrendamiento uso distinto vivienda sin amueblar"
  };

  const isRentalContract = contractType.includes("alquiler");

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
                  {isRentalContract ? "Arrendador" : "Vendedor"}
                </h3>
                
                <FormField
                  control={form.control}
                  name={isRentalContract ? "arrendador" : "vendedor"}
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
                  name={isRentalContract ? "arrendador_dni" : "vendedor_dni"}
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
                  name={isRentalContract ? "arrendador_domicilio" : "vendedor_domicilio"}
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

                {(contractType === "contrato_reserva_inmueble" || isRentalContract) && (
                  <>
                    <FormField
                      control={form.control}
                      name={isRentalContract ? "arrendador_telefono" : "vendedor_telefono"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="+34 600 000 000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={isRentalContract ? "arrendador_email" : "vendedor_email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">
                  {isRentalContract ? "Arrendatario" : "Comprador"}
                </h3>
                
                <FormField
                  control={form.control}
                  name={isRentalContract ? "arrendatario" : "comprador"}
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
                  name={isRentalContract ? "arrendatario_dni" : "comprador_dni"}
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
                  name={isRentalContract ? "arrendatario_domicilio" : "comprador_domicilio"}
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

                {(contractType === "contrato_reserva_inmueble" || isRentalContract) && (
                  <>
                    <FormField
                      control={form.control}
                      name={isRentalContract ? "arrendatario_telefono" : "comprador_telefono"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="+34 600 111 111" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={isRentalContract ? "arrendatario_email" : "comprador_email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
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

              {(contractType === "contrato_reserva_inmueble" || contractType === "arras_confirmatorias" || contractType === "arras_penales") && (
                <FormField
                  control={form.control}
                  name="informacion_registro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registro de la Propiedad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej.: Registro nº 4, tomo ___, folio ___, finca ___" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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

              {(contractType === "contrato_reserva_inmueble" || contractType === "arras_confirmatorias" || contractType === "arras_penales") && (
                <FormField
                  control={form.control}
                  name="cargas_gravamenes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargas / Gravámenes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hipoteca, servidumbre, etc. Si está libre, escriba 'Libre de cargas'."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isRentalContract && (
                <FormField
                  control={form.control}
                  name="anexos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anexos (garaje, trastero)</FormLabel>
                      <FormControl>
                        <Input placeholder="Plaza garaje nº, trastero nº" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!isRentalContract && (
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
              )}

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
          contractType === "contrato_reserva_inmueble" || 
          contractType === "arras_penitenciales" || 
          contractType === "arras_confirmatorias" ||
          contractType === "arras_penales" ||
          isRentalContract) && (
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

                {/* Campos específicos para Contrato de Reserva de Inmueble */}
                {contractType === "contrato_reserva_inmueble" && (
                  <>
                    <FormField
                      control={form.control}
                      name="importe_arras"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("importe_arras") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Importe de las arras (€)</FormLabel>
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
                      name="porcentaje_arras"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porcentaje de arras sobre el precio (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="3.33"
                              step="0.01"
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
                      name="forma_pago"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de pago</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona forma de pago" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                              <SelectItem value="cheque">Cheque bancario</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fecha_limite_escritura"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fecha_limite_escritura") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha límite para la escritura</FormLabel>
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
                      name="sujeto_financiacion"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              ¿Sujeto a financiación?
                            </FormLabel>
                            <FormDescription>
                              Marcar si la compra depende de obtener financiación hipotecaria
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("sujeto_financiacion") && (
                      <FormField
                        control={form.control}
                        name="fecha_limite_financiacion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha límite para obtener financiación</FormLabel>
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
                    )}

                    <FormField
                      control={form.control}
                      name="muebles_incluidos"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Muebles / Enseres incluidos</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describa los muebles que se incluyen, si procede."
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="honorarios_agencia"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Intermediación / Honorarios de agencia</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ej.: 3% más IVA a cargo del comprador."
                              className="resize-none"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Contratos de Arras Confirmatorias */}
                {contractType === "arras_confirmatorias" && (
                  <>
                    <FormField
                      control={form.control}
                      name="importe_arras"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("importe_arras") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Importe entregado en concepto de arras (€)</FormLabel>
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
                      name="forma_pago"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de pago</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona forma de pago" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                              <SelectItem value="cheque">Cheque bancario</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fecha_limite_escritura"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fecha_limite_escritura") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha límite para otorgar escritura</FormLabel>
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
                      name="clausula_arras_confirmatorias"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Cláusula de arras confirmatorias</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              defaultValue="La cantidad entregada se configura como ARRAS CONFIRMATORIAS según lo dispuesto en el art. 1124 del Código Civil. Dicha suma se imputará al precio final. En caso de incumplimiento, la parte perjudicada podrá optar entre exigir el cumplimiento o la resolución del contrato con indemnización de daños y perjuicios, sin que exista derecho de desistimiento unilateral."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Contratos de Arras Penales */}
                {contractType === "arras_penales" && (
                  <>
                    <FormField
                      control={form.control}
                      name="importe_arras"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("importe_arras") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Importe de arras penales (€)</FormLabel>
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
                      name="forma_pago"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de pago</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona forma de pago" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                              <SelectItem value="cheque">Cheque bancario</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fecha_limite_escritura"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fecha_limite_escritura") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha límite para la escritura</FormLabel>
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
                      name="clausula_arras_penales"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Cláusula de arras penales</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              defaultValue="La cantidad entregada se pacta como ARRAS PENALES, al amparo de los arts. 1152 y 1153 del Código Civil. En caso de incumplimiento imputable al comprador, éste perderá las arras entregadas y responderá de los daños adicionales si los hubiere. En caso de incumplimiento imputable al vendedor, deberá devolver el doble de la cantidad recibida y, en su caso, indemnizar daños. La parte cumplidora podrá optar entre exigir el cumplimiento del contrato o su resolución con la penalización pactada y daños complementarios."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Contratos de Arras Penitenciales */}
                {contractType === "arras_penitenciales" && (
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
                  </>
                )}

                {/* Campos para Contratos de Alquiler */}
                {isRentalContract && (
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
                              placeholder="5"
                              min="1"
                              max="5"
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
                              placeholder="750"
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
                          <FormLabel>Fecha de Inicio</FormLabel>
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
                      name="fecha_fin_posesion"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fecha_fin_posesion") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Fecha de Fin</FormLabel>
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
                      name="fianza"
                      render={({ field }) => (
                        <FormItem className={missingFields?.includes("fianza") ? "border-red-500 border-l-2 pl-2" : ""}>
                          <FormLabel>Mensualidades de fianza</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder={contractType.includes("amueblado") ? "2" : "1"}
                              min="1"
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
                      name="cuenta_pago"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forma de pago</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona forma de pago" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                              <SelectItem value="domiciliacion">Domiciliación SEPA</SelectItem>
                              <SelectItem value="efectivo">Efectivo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="indice_actualizacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Índice actualización</FormLabel>
                          <FormControl>
                            <Input placeholder="IRAV, IPC..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="garantia_adicional"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Garantía adicional</FormLabel>
                          <FormControl>
                            <Input placeholder="Aval bancario, depósito adicional..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Gastos y Suministros */}
                    <div className="md:col-span-2">
                      <FormLabel className="text-base font-medium">Gastos a cargo del arrendatario</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <FormField
                          control={form.control}
                          name="gastos_luz"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Luz</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gastos_agua"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Agua</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gastos_gas"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Gas</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gastos_internet"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">Internet</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="otros_gastos"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Otros gastos (especificar)</FormLabel>
                            <FormControl>
                              <Input placeholder="IBI a cargo arrendador, comunidad..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Inventario para viviendas amuebladas */}
                    {contractType.includes("amueblado") && (
                      <FormField
                        control={form.control}
                        name="inventario_muebles"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Inventario de Mobiliario (Anexo I)</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={6}
                                placeholder="Ej.: 1. Sofá 3 plazas – Ikea – Buen estado&#10;2. TV 42&quot; – LG – Muy buen estado&#10;..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Acta de estado inicial para viviendas sin amueblar */}
                    {contractType.includes("sin_amueblar") && (
                      <div className="md:col-span-2 space-y-4">
                        <FormLabel className="text-base font-medium">ANEXO I – Acta de Estado Inicial</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="obs_pintura"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pintura</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="obs_ventanas"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ventanas</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="obs_suelos"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Suelos</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="obs_electricidad"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Electricidad</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="obs_agua"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Agua y saneamiento</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="obs_otros"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Otros</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    rows={3}
                                    placeholder="Puertas, calefacción, etc."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Cláusulas adicionales */}
                    <FormField
                      control={form.control}
                      name="clausulas_adicionales"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Cláusulas adicionales (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              placeholder="Prohibido fumar, permitir mascotas bajo condiciones, etc."
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
