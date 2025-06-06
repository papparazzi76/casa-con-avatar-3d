
import React from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ContractFormData } from "@/types/contractTypes";

interface StateInspectionSectionProps {
  control: Control<ContractFormData>;
}

export function StateInspectionSection({ control }: StateInspectionSectionProps) {
  return (
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
  );
}
