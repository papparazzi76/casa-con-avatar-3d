
import { useState } from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import { toast } from "sonner";

type ExtrasListProps = {
  form: UseFormReturn<FormValues>;
};

export function ExtrasList({ form }: ExtrasListProps) {
  const [extrasArray, setExtrasArray] = useState<string[]>([]);
  const [extraInput, setExtraInput] = useState("");

  const addExtra = () => {
    if (extraInput.trim() && extrasArray.length < 10) {
      const newExtras = [...extrasArray, extraInput.trim()];
      setExtrasArray(newExtras);
      form.setValue("extras", newExtras);
      setExtraInput("");
    } else if (extrasArray.length >= 10) {
      toast.warning("Has alcanzado el máximo de 10 extras");
    }
  };
  
  const removeExtra = (index: number) => {
    const newExtras = [...extrasArray];
    newExtras.splice(index, 1);
    setExtrasArray(newExtras);
    form.setValue("extras", newExtras);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExtra();
    }
  };

  return (
    <FormField
      control={form.control}
      name="extras"
      render={() => (
        <FormItem>
          <FormLabel>Extras</FormLabel>
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-2">
              <FormControl>
                <Input
                  placeholder="Añade un extra (terraza, piscina, garaje...)"
                  value={extraInput}
                  onChange={(e) => setExtraInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </FormControl>
              <Button type="button" onClick={addExtra} className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {extrasArray.map((extra, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1.5">
                  {extra}
                  <button 
                    type="button" 
                    onClick={() => removeExtra(index)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <FormDescription>
            Opcional - Añade características adicionales que destaquen tu propiedad
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
