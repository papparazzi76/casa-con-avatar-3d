
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorData } from "@/types/calculator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, HelpCircle, Info } from "lucide-react";

interface ExpensesCalculatorFormProps {
  onCalculate: (data: CalculatorData) => void;
}

const comunidadesAutonomas = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias",
  "Cantabria", "Castilla-La Mancha", "Castilla y León", "Cataluña",
  "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra",
  "País Vasco", "La Rioja", "Comunidad Valenciana", "Ceuta", "Melilla"
];

const regimenesFiscales = [
  { value: "VPO", label: "VPO/VPP (vivienda protegida)" },
  { value: "menor35", label: "Comprador menor de 35 años" },
  { value: "familia-numerosa", label: "Familia numerosa" },
  { value: "discapacidad", label: "Discapacidad" }
];

export function ExpensesCalculatorForm({ onCalculate }: ExpensesCalculatorFormProps) {
  const [step, setStep] = useState(1);
  const [showVendedorForm, setShowVendedorForm] = useState(false);
  
  const form = useForm<CalculatorData>({
    defaultValues: {
      comunidadAutonoma: "",
      municipio: "",
      precioCompraventa: 0,
      tipoVivienda: "segunda",
      existeHipoteca: false,
      regimenFiscal: []
    }
  });
  
  const { watch } = form;
  const existeHipoteca = watch("existeHipoteca");
  const tipoVivienda = watch("tipoVivienda");
  
  const handleSubmit = (data: CalculatorData) => {
    onCalculate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Datos generales */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Datos de la operación</span>
              <span className="text-sm text-muted-foreground">Paso {step}/3</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="comunidadAutonoma"
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comunidad Autónoma</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una comunidad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {comunidadesAutonomas.map((comunidad) => (
                              <SelectItem key={comunidad} value={comunidad}>
                                {comunidad}
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
                    name="municipio"
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Municipio</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Madrid" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="precioCompraventa"
                  rules={{ 
                    required: "Este campo es obligatorio",
                    min: { value: 1, message: "El precio debe ser mayor que 0" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio de compraventa (€)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="150000" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoVivienda"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de vivienda</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="nueva" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Nueva (primera transmisión)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="segunda" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Segunda mano (ulterior transmisión)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regimenFiscal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Régimen fiscal especial
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                              <HelpCircle className="h-4 w-4" />
                              <span className="sr-only">Más información</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Regímenes fiscales especiales</DialogTitle>
                              <DialogDescription>
                                Selecciona las opciones que apliquen para determinar posibles bonificaciones fiscales.
                                Cada Comunidad Autónoma puede tener beneficios fiscales específicos para estos casos.
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </FormLabel>
                      <FormDescription>
                        Selecciona todas las opciones que correspondan
                      </FormDescription>
                      <FormControl>
                        <div className="space-y-2">
                          {regimenesFiscales.map((regimen) => (
                            <div key={regimen.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={regimen.value}
                                onCheckedChange={(checked) => {
                                  const currentValues = Array.isArray(field.value) ? field.value : [];
                                  if (checked) {
                                    field.onChange([...currentValues, regimen.value]);
                                  } else {
                                    field.onChange(currentValues.filter(value => value !== regimen.value));
                                  }
                                }}
                                checked={Array.isArray(field.value) && field.value.includes(regimen.value)}
                              />
                              <label 
                                htmlFor={regimen.value}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {regimen.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="existeHipoteca"
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
                          ¿Existe hipoteca para esta operación?
                        </FormLabel>
                        <FormDescription>
                          Selecciona esta opción si la compra se realizará con financiación hipotecaria.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {existeHipoteca && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="importeFinanciar"
                      rules={{ required: existeHipoteca ? "Este campo es obligatorio" : false }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Importe a financiar (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="120000"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="banco"
                      rules={{ required: existeHipoteca ? "Este campo es obligatorio" : false }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entidad bancaria</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Banco Santander" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="porcentajeFinanciacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Porcentaje de financiación (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="80"
                              max={100}
                              min={0}
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="fechaEscritura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha prevista de escritura</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Esta fecha es importante para determinar la normativa aplicable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      const generalFieldsFilled = form.getValues("comunidadAutonoma") && 
                                                form.getValues("municipio") && 
                                                form.getValues("precioCompraventa");
                      
                      if (generalFieldsFilled) {
                        setStep(2);
                      } else {
                        form.trigger(["comunidadAutonoma", "municipio", "precioCompraventa"]);
                      }
                    }}
                  >
                    Siguiente: Datos del vendedor
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fechaAdquisicion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de adquisición por el vendedor</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Necesario para calcular la ganancia patrimonial.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="valorAdquisicion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor de adquisición (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="100000"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inversionesPosterior"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inversiones posteriores (€)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            Reformas, mejoras, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="aniosResidencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Años de residencia en la vivienda</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Importante para posibles exenciones fiscales.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="importePendienteHipoteca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Importe pendiente de hipoteca (€)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Para calcular gastos de cancelación.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="plusvaliaMunicipal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Plusvalía municipal (IVTNU) (€)
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Plusvalía Municipal (IVTNU)</DialogTitle>
                                <DialogDescription>
                                  El Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana (IVTNU) 
                                  es un tributo municipal que grava el incremento de valor de los terrenos urbanos.
                                  Si conoces el importe exacto, introdúcelo. De lo contrario, se realizará una estimación.
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Si se conoce el cálculo exacto. De lo contrario, se estimará.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Volver
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                  >
                    Siguiente: Finalizar
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Información importante
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Todos los cálculos son estimativos y deben ser verificados con un profesional 
                      o la administración competente antes de tomar decisiones económicas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Datos de la operación</h3>
                      <ul className="space-y-1 text-sm">
                        <li><span className="font-medium">Comunidad Autónoma:</span> {form.getValues("comunidadAutonoma")}</li>
                        <li><span className="font-medium">Municipio:</span> {form.getValues("municipio")}</li>
                        <li><span className="font-medium">Precio:</span> {form.getValues("precioCompraventa")} €</li>
                        <li><span className="font-medium">Tipo de vivienda:</span> {form.getValues("tipoVivienda") === "nueva" ? "Nueva" : "Segunda mano"}</li>
                        {existeHipoteca && (
                          <>
                            <li><span className="font-medium">Importe financiado:</span> {form.getValues("importeFinanciar")} €</li>
                            <li><span className="font-medium">Banco:</span> {form.getValues("banco")}</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Datos del vendedor</h3>
                      <ul className="space-y-1 text-sm">
                        {form.getValues("valorAdquisicion") ? (
                          <>
                            <li><span className="font-medium">Fecha adquisición:</span> {form.getValues("fechaAdquisicion")}</li>
                            <li><span className="font-medium">Valor adquisición:</span> {form.getValues("valorAdquisicion")} €</li>
                            {form.getValues("importePendienteHipoteca") > 0 && (
                              <li><span className="font-medium">Hipoteca pendiente:</span> {form.getValues("importePendienteHipoteca")} €</li>
                            )}
                          </>
                        ) : (
                          <li className="text-muted-foreground">No se han proporcionado datos completos del vendedor</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Volver
                    </Button>
                    <Button type="submit">
                      Calcular gastos e impuestos
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
