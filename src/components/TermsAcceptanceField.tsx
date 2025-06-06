
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface TermsAcceptanceFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  className?: string;
}

export function TermsAcceptanceField<T extends FieldValues>({ 
  control, 
  name, 
  className = "" 
}: TermsAcceptanceFieldProps<T>) {
  return (
    <FormField 
      control={control} 
      name={name} 
      render={({ field }) => (
        <FormItem className={`flex flex-row items-start space-x-3 space-y-0 ${className}`}>
          <FormControl>
            <Checkbox 
              checked={field.value} 
              onCheckedChange={field.onChange} 
            />
          </FormControl>
          <div className="text-sm leading-relaxed">
            <span>Acepto los </span>
            <Link 
              to="/terminos" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos de Servicio
            </Link>
            <span> y la </span>
            <Link 
              to="/privacidad" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidad
            </Link>
            <span> *</span>
          </div>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
}
