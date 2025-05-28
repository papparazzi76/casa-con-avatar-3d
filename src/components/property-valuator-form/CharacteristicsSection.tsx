
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./FormSchema";

interface CharacteristicsSectionProps {
  form: UseFormReturn<PropertyFormData>;
}

export function CharacteristicsSection({ form }: CharacteristicsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Características</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tipo_vivienda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de vivienda <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="piso">Piso</SelectItem>
                  <SelectItem value="atico">Ático</SelectItem>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="chalet">Chalet</SelectItem>
                  <SelectItem value="adosado">Adosado</SelectItem>
                  <SelectItem value="duplex">Dúplex</SelectItem>
                  <SelectItem value="estudio">Estudio</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="superficie_m2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Superficie (m²) <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="habitaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habitaciones <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="banos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Baños <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="estado_conservacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado de conservación <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nueva-construccion">Nueva construcción</SelectItem>
                  <SelectItem value="buen-estado">Buen estado</SelectItem>
                  <SelectItem value="a-reformar">A reformar</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="planta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planta <span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar planta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="entreplanta">Entreplanta</SelectItem>
                  <SelectItem value="1">1ª</SelectItem>
                  <SelectItem value="2">2ª</SelectItem>
                  <SelectItem value="3">3ª</SelectItem>
                  <SelectItem value="4">4ª</SelectItem>
                  <SelectItem value="5">5ª</SelectItem>
                  <SelectItem value="6">6ª o superior</SelectItem>
                  <SelectItem value="atico">Ático</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="anno_construccion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año de construcción <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Ej.: 1990" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="ascensor"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Ascensor</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="exterior"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Exterior</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
