
import { useState, useEffect, useMemo } from "react";
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
import { CalendarIcon, Plus, Minus } from "lucide-react";
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
      gastos_luz: false,
      gastos_agua: false,
      gastos_gas: false,
      gastos_internet: false,
    },
  });

  const [contractType, setContractType] = useState<ContractType>("contrato_reserva");
  const watchContractType = form.watch("tipo_contrato");

  // States for dynamic parties in compraventa contract
  const emptyParty = { name: "", dni: "", address: "", phone: "" };
  const [sellers, setSellers] = useState([{ ...emptyParty }]);
  const [buyers, setBuyers] = useState([{ ...emptyParty }]);
  const [compraventaData, setCompraventaData] = useState({
    propertyLocation: "",
    propertyRegistry: "",
    propertyTomo: "",
    propertyLibro: "",
    propertyFolio: "",
    propertyFinca: "",
    propertyCharges: "Sin cargas",
    arrasAmount: "",
    arrasPercent: "",
    paymentMethod: "Transferencia",
    totalPrice: "",
    escrituraDate: "",
    daysFromMortgage: "",
    mortgageDeadline: "",
    optionalClauses: "",
    place: "",
    signingDay: "",
    signingMonth: "",
    signingYear: "2025",
  });

  // Effect to update the contractType state when the form field changes
  useEffect(() => {
    if (watchContractType) {
      setContractType(watchContractType);
    }
  }, [watchContractType]);

  function onSubmit(data: ContractFormData) {
    // Include dynamic data for compraventa contract
    if (contractType === "contrato_compraventa_arras_penitenciales") {
      data.vendedores = sellers;
      data.compradores = buyers;
      data.property_location = compraventaData.propertyLocation;
      data.property_registry = compraventaData.propertyRegistry;
      data.property_tomo = compraventaData.propertyTomo;
      data.property_libro = compraventaData.propertyLibro;
      data.property_folio = compraventaData.propertyFolio;
      data.property_finca = compraventaData.propertyFinca;
      data.property_charges = compraventaData.propertyCharges;
      data.arras_amount = Number(compraventaData.arrasAmount);
      data.arras_percent = Number(compraventaData.arrasPercent);
      data.payment_method = compraventaData.paymentMethod;
      data.escritura_date = compraventaData.escrituraDate;
      data.days_from_mortgage = Number(compraventaData.daysFromMortgage);
      data.mortgage_deadline = compraventaData.mortgageDeadline;
      data.optional_clauses = compraventaData.optionalClauses;
      data.signing_day = compraventaData.signingDay;
      data.signing_month = compraventaData.signingMonth;
      data.signing_year = compraventaData.signingYear;
    }
    onFormSubmit(data);
  }

  // Define friendly labels for the contract types
  const contractTypeLabels = {
    contrato_reserva: "Contrato de reserva o señal",
    contrato_compraventa_arras_penitenciales: "Contrato de Compraventa de Inmueble con Arras Penitenciales",
    alquiler_particulares_amueblado: "Contrato de arrendamiento de vivienda amueblada",
    alquiler_particulares_sin_amueblar: "Contrato de arrendamiento de vivienda sin amueblar"
  };

  const isRentalContract = contractType.includes("alquiler");

  // Helpers for dynamic parties
  const handlePartyChange = (which: "seller" | "buyer", idx: number, field: string, value: string) => {
    (which === "seller" ? setSellers : setBuyers)((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addParty = (which: "seller" | "buyer") => {
    (which === "seller" ? setSellers : setBuyers)((prev) => [...prev, { ...emptyParty }]);
  };

  const removeParty = (which: "seller" | "buyer", idx: number) => {
    (which === "seller" ? setSellers : setBuyers)((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)
    );
  };

  const handleCompraventaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCompraventaData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Party fields component for compraventa contract
  const PartyFields = ({ which, party, index }: { which: "seller" | "buyer", party: any, index: number }) => {
    const isSeller = which === "seller";
    const parties = isSeller ? sellers : buyers;
    const h = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => handlePartyChange(which, index, field, e.target.value);

    return (
      <div className="space-y-2 border rounded-xl p-4 shadow-inner" key={`${which}-${index}`}>        
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-lg">{isSeller ? "Vendedor/a" : "Comprador/a"} {index + 1}</h3>
          {parties.length > 1 && (
            <Button variant="ghost" size="icon" onClick={() => removeParty(which, index)}>
              <Minus className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label>Nombre</Label>
            <Input value={party.name} onChange={h("name")} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>DNI/NIE</Label>
            <Input value={party.dni} onChange={h("dni")} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Domicilio</Label>
            <Input value={party.address} onChange={h("address")} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Teléfono/Email</Label>
            <Input value={party.phone} onChange={h("phone")} />
          </div>
        </div>
      </div>
    );
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

        {/* Contrato de Compraventa con Arras Penitenciales */}
        {contractType === "contrato_compraventa_arras_penitenciales" && (
          <>
            {/* Vendedores */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Vendedores</h2>
                  <Button type="button" variant="outline" size="sm" onClick={() => addParty("seller")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir vendedor
                  </Button>
                </div>
                <div className="space-y-4">
                  {sellers.map((seller, index) => (
                    <PartyFields key={`seller-${index}`} which="seller" party={seller} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compradores */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Compradores</h2>
                  <Button type="button" variant="outline" size="sm" onClick={() => addParty("buyer")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir comprador
                  </Button>
                </div>
                <div className="space-y-4">
                  {buyers.map((buyer, index) => (
                    <PartyFields key={`buyer-${index}`} which="buyer" party={buyer} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Datos del Inmueble */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Datos del Inmueble</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="propertyLocation">Ubicación del inmueble</Label>
                    <Input 
                      id="propertyLocation" 
                      name="propertyLocation" 
                      value={compraventaData.propertyLocation} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyRegistry">Registro de la Propiedad nº</Label>
                    <Input 
                      id="propertyRegistry" 
                      name="propertyRegistry" 
                      value={compraventaData.propertyRegistry} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyTomo">Tomo</Label>
                    <Input 
                      id="propertyTomo" 
                      name="propertyTomo" 
                      value={compraventaData.propertyTomo} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyLibro">Libro</Label>
                    <Input 
                      id="propertyLibro" 
                      name="propertyLibro" 
                      value={compraventaData.propertyLibro} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyFolio">Folio</Label>
                    <Input 
                      id="propertyFolio" 
                      name="propertyFolio" 
                      value={compraventaData.propertyFolio} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyFinca">Finca nº</Label>
                    <Input 
                      id="propertyFinca" 
                      name="propertyFinca" 
                      value={compraventaData.propertyFinca} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="propertyCharges">Cargas y gravámenes</Label>
                    <Textarea 
                      id="propertyCharges" 
                      name="propertyCharges" 
                      value={compraventaData.propertyCharges} 
                      onChange={handleCompraventaChange}
                      placeholder="Sin cargas"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Condiciones Económicas */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Condiciones Económicas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalPrice">Precio total (€)</Label>
                    <Input 
                      id="totalPrice" 
                      name="totalPrice" 
                      type="number"
                      value={compraventaData.totalPrice} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="arrasAmount">Importe de arras (€)</Label>
                    <Input 
                      id="arrasAmount" 
                      name="arrasAmount" 
                      type="number"
                      value={compraventaData.arrasAmount} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="arrasPercent">Porcentaje de arras (%)</Label>
                    <Input 
                      id="arrasPercent" 
                      name="arrasPercent" 
                      type="number"
                      step="0.01"
                      value={compraventaData.arrasPercent} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Forma de pago</Label>
                    <Input 
                      id="paymentMethod" 
                      name="paymentMethod" 
                      value={compraventaData.paymentMethod} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plazos */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Plazos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="escrituraDate">Fecha límite para escritura</Label>
                    <Input 
                      id="escrituraDate" 
                      name="escrituraDate" 
                      type="date"
                      value={compraventaData.escrituraDate} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="daysFromMortgage">Días desde hipoteca</Label>
                    <Input 
                      id="daysFromMortgage" 
                      name="daysFromMortgage" 
                      type="number"
                      value={compraventaData.daysFromMortgage} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="mortgageDeadline">Fecha límite hipoteca</Label>
                    <Input 
                      id="mortgageDeadline" 
                      name="mortgageDeadline" 
                      type="date"
                      value={compraventaData.mortgageDeadline} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Otros datos */}
            <Card className="border-2 shadow">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Otros datos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="place">Lugar de firma</Label>
                    <Input 
                      id="place" 
                      name="place" 
                      value={compraventaData.place} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="signingDay">Día</Label>
                    <Input 
                      id="signingDay" 
                      name="signingDay" 
                      value={compraventaData.signingDay} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="signingMonth">Mes</Label>
                    <Input 
                      id="signingMonth" 
                      name="signingMonth" 
                      value={compraventaData.signingMonth} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="signingYear">Año</Label>
                    <Input 
                      id="signingYear" 
                      name="signingYear" 
                      value={compraventaData.signingYear} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor="optionalClauses">Cláusulas opcionales</Label>
                    <Textarea 
                      id="optionalClauses" 
                      name="optionalClauses" 
                      rows={4}
                      value={compraventaData.optionalClauses} 
                      onChange={handleCompraventaChange} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Common Fields for other contract types */}
        {contractType !== "contrato_compraventa_arras_penitenciales" && (
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

                  {isRentalContract && (
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

                  {isRentalContract && (
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
        )}

        {/* Contract-specific fields for other types */}
        {(contractType === "contrato_reserva" || isRentalContract) && (
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
