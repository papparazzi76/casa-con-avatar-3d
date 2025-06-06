
import React from "react";
import { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ContractFormData } from "@/types/contractTypes";

interface ExpensesSectionProps {
  control: Control<ContractFormData>;
}

export function ExpensesSection({ control }: ExpensesSectionProps) {
  return (
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
  );
}
