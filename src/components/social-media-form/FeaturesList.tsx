
import { useState } from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import { toast } from "sonner";

type FeaturesListProps = {
  form: UseFormReturn<FormValues>;
};

export function FeaturesList({ form }: FeaturesListProps) {
  const [caracteristicasArray, setCaracteristicasArray] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  const addCaracteristica = () => {
    if (featureInput.trim() && caracteristicasArray.length < 10) {
      const newCaracteristicas = [...caracteristicasArray, featureInput.trim()];
      setCaracteristicasArray(newCaracteristicas);
      form.setValue("caracteristicas_destacadas", newCaracteristicas);
      setFeatureInput("");
    } else if (caracteristicasArray.length >= 10) {
      toast.warning("Has alcanzado el máximo de 10 características destacadas");
    }
  };
  
  const removeCaracteristica = (index: number) => {
    const newCaracteristicas = [...caracteristicasArray];
    newCaracteristicas.splice(index, 1);
    setCaracteristicasArray(newCaracteristicas);
    form.setValue("caracteristicas_destacadas", newCaracteristicas);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCaracteristica();
    }
  };

  return (
    <FormField
      control={form.control}
      name="caracteristicas_destacadas"
      render={() => (
        <FormItem>
          <FormLabel>Características destacadas*</FormLabel>
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-2">
              <FormControl>
                <Input
                  placeholder="Añade una característica destacada"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <Button type="button" onClick={addCaracteristica} className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {caracteristicasArray.map((feature, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1.5">
                  {feature}
                  <button 
                    type="button" 
                    onClick={() => removeCaracteristica(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {form.formState.errors.caracteristicas_destacadas && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.caracteristicas_destacadas.message}
              </p>
            )}
          </div>
          <FormDescription>
            Añade las características más relevantes de tu propiedad
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
