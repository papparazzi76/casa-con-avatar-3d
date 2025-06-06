
import React from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ContractFormData, ContractType } from "@/types/contractTypes";

interface RentalTermsFieldsProps {
  control: Control<ContractFormData>;
  contractType: ContractType;
  missingFields: string[] | null;
}

export function RentalTermsFields({ control, contractType, missingFields }: RentalTermsFieldsProps) {
  return (
    <Card className="border-2 shadow">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">
          Datos Específicos del Arrendamiento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            control={control} 
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
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="renta_mensual" 
            render={({ field }) => (
              <FormItem className={missingFields?.includes("renta_mensual") ? "border-red-500 border-l-2 pl-2" : ""}>
                <FormLabel>Renta Mensual (€)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="750" 
                    {...field} 
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="fecha_inicio_posesion" 
            render={({ field }) => (
              <FormItem className={missingFields?.includes("fecha_inicio_posesion") ? "border-red-500 border-l-2 pl-2" : ""}>
                <FormLabel>Fecha de Inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button 
                        variant={"outline"} 
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(new Date(field.value), "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                      mode="single" 
                      selected={field.value ? new Date(field.value) : undefined} 
                      onSelect={date => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)} 
                      initialFocus 
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="fecha_fin_posesion" 
            render={({ field }) => (
              <FormItem className={missingFields?.includes("fecha_fin_posesion") ? "border-red-500 border-l-2 pl-2" : ""}>
                <FormLabel>Fecha de Fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button 
                        variant={"outline"} 
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(new Date(field.value), "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                      mode="single" 
                      selected={field.value ? new Date(field.value) : undefined} 
                      onSelect={date => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)} 
                      initialFocus 
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
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
                    onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
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

          {/* Gastos y Suministros */}
          <div className="md:col-span-2">
            <FormLabel className="text-base font-medium">Gastos a cargo del arrendatario</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <FormField 
                control={control} 
                name="gastos_luz" 
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Luz</FormLabel>
                  </FormItem>
                )} 
              />
              <FormField 
                control={control} 
                name="gastos_agua" 
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Agua</FormLabel>
                  </FormItem>
                )} 
              />
              <FormField 
                control={control} 
                name="gastos_gas" 
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Gas</FormLabel>
                  </FormItem>
                )} 
              />
              <FormField 
                control={control} 
                name="gastos_internet" 
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Internet</FormLabel>
                  </FormItem>
                )} 
              />
            </div>
            <FormField 
              control={control} 
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
              control={control} 
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
                  control={control} 
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
                  control={control} 
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
                  control={control} 
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
                  control={control} 
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
                  control={control} 
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
                  control={control} 
                  name="obs_otros" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Otros</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Puertas, calefacción, etc." {...field} />
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
            control={control} 
            name="clausulas_adicionales" 
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Cláusulas adicionales (opcional)</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Prohibido fumar, permitir mascotas bajo condiciones, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
