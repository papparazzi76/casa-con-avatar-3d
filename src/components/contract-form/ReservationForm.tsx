
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ContractFormData } from "@/types/contractTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { PartyFields } from "./PartyFields";

interface Party {
  name: string;
  dni: string;
  address: string;
  phone: string;
}

interface ReservationFormProps {
  onFormSubmit: (data: ContractFormData) => void;
  missingFields: string[] | null;
}

export function ReservationForm({
  onFormSubmit,
  missingFields
}: ReservationFormProps) {
  const emptyParty: Party = {
    name: "",
    dni: "",
    address: "",
    phone: ""
  };

  const [sellers, setSellers] = useState<Party[]>([{
    ...emptyParty
  }]);
  const [buyers, setBuyers] = useState<Party[]>([{
    ...emptyParty
  }]);

  const form = useForm<ContractFormData>({
    defaultValues: {
      tipo_contrato: "contrato_senal_reserva",
      fecha_firma: format(new Date(), "yyyy-MM-dd"),
      signing_year: "2025"
    }
  });

  const handlePartyChange = (which: "seller" | "buyer", idx: number, field: string, value: string) => {
    (which === "seller" ? setSellers : setBuyers)(prev => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        [field]: value
      };
      return updated;
    });
  };

  const addParty = (which: "seller" | "buyer") => {
    (which === "seller" ? setSellers : setBuyers)(prev => [...prev, {
      ...emptyParty
    }]);
  };

  const removeParty = (which: "seller" | "buyer", idx: number) => {
    (which === "seller" ? setSellers : setBuyers)(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
  };

  function onSubmit(data: ContractFormData) {
    const formData: ContractFormData = {
      ...data,
      vendedores: sellers,
      compradores: buyers
    };
    onFormSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <PartyFields
                  key={`seller-${index}`}
                  which="seller"
                  party={seller}
                  index={index}
                  parties={sellers}
                  onPartyChange={handlePartyChange}
                  onRemoveParty={removeParty}
                />
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
                <PartyFields
                  key={`buyer-${index}`}
                  which="buyer"
                  party={buyer}
                  index={index}
                  parties={buyers}
                  onPartyChange={handlePartyChange}
                  onRemoveParty={removeParty}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Datos del inmueble */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Datos del inmueble</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="property_location"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Ubicación completa</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección completa del inmueble" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_registry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registro nº</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de registro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property_finca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finca nº</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de finca" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Datos de la reserva */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Datos de la reserva</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="signal_amount"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("signal_amount") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Señal de reserva (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3000"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proposed_price"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("proposed_price") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Precio propuesto (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="300000"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline_date"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("deadline_date") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Fecha límite</FormLabel>
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
                name="deadline_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora límite</FormLabel>
                    <FormControl>
                      <Input placeholder="14:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Otros pactos */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Otros pactos</h2>

            <FormField
              control={form.control}
              name="optional_clauses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cláusulas adicionales (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Ejemplo: inclusión de muebles, condicionantes urbanísticos, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Lugar y fecha de firma */}
        <Card className="border-2 shadow">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Lugar y fecha de firma</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="poblacion_firma"
                render={({ field }) => (
                  <FormItem className={missingFields?.includes("poblacion_firma") ? "border-red-500 border-l-2 pl-2" : ""}>
                    <FormLabel>Lugar</FormLabel>
                    <FormControl>
                      <Input placeholder="Madrid" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día</FormLabel>
                    <FormControl>
                      <Input placeholder="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes</FormLabel>
                    <FormControl>
                      <Input placeholder="enero" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signing_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año</FormLabel>
                    <FormControl>
                      <Input placeholder="2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

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
          <Button type="submit" className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90">
            Generar Contrato
          </Button>
        </div>
      </form>
    </Form>
  );
}
