
import React from "react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ContractFormData } from "@/types/contractTypes";

interface RentalPropertyFieldsProps {
  control: Control<ContractFormData>;
  missingFields: string[] | null;
}

export function RentalPropertyFields({ control, missingFields }: RentalPropertyFieldsProps) {
  return (
    <Card className="border-2 shadow">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Datos de la vivienda</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            control={control} 
            name="inmueble" 
            render={({ field }) => (
              <FormItem className={missingFields?.includes(field.name) ? "border-red-500 border-l-2 pl-2" : ""}>
                <FormLabel>Dirección del Inmueble</FormLabel>
                <FormControl>
                  <Textarea placeholder="Dirección completa del inmueble" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="referencia_catastral" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referencia Catastral (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="0000000XX0000X0000XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
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

          <FormField 
            control={control} 
            name="fecha_firma" 
            render={({ field }) => (
              <FormItem className={missingFields?.includes("fecha_firma") ? "border-red-500 border-l-2 pl-2" : ""}>
                <FormLabel>Fecha de Firma</FormLabel>
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
  );
}
