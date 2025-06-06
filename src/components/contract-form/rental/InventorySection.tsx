
import React from "react";
import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ContractFormData } from "@/types/contractTypes";

interface InventorySectionProps {
  control: Control<ContractFormData>;
}

export function InventorySection({ control }: InventorySectionProps) {
  return (
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
  );
}
