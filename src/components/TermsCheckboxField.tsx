import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface TermsCheckboxFieldProps {
  control: Control<any>;
}

export function TermsCheckboxField({ control }: TermsCheckboxFieldProps) {
  return (
    <FormField
      control={control}
      name="acceptedTerms"
      rules={{ required: "Debes aceptar los Términos y la Política de Privacidad" }}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              He leído y acepto los {""}
              <Link to="/terminos" className="underline text-realestate-purple">
                Términos y Condiciones
              </Link>{" "}
              y la {""}
              <Link to="/privacidad" className="underline text-realestate-purple">
                Política de Privacidad
              </Link>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
