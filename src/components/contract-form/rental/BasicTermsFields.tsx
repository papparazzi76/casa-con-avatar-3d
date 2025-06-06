
import React from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ContractFormData, ContractType } from "@/types/contractTypes";

interface BasicTermsFieldsProps {
  control: Control<ContractFormData>;
  contractType: ContractType;
  missingFields: string[] | null;
}

export function BasicTermsFields({ control, contractType, missingFields }: BasicTermsFieldsProps) {
  return (
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
    </div>
  );
}
