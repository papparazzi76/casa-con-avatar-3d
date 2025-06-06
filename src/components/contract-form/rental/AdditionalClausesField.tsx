
import React from "react";
import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ContractFormData } from "@/types/contractTypes";

interface AdditionalClausesFieldProps {
  control: Control<ContractFormData>;
}

export function AdditionalClausesField({ control }: AdditionalClausesFieldProps) {
  return (
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
  );
}
