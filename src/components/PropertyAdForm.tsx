import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { PropertyAdFormData } from "@/utils/openaiService";

const propertyTypes = [
  { value: "piso", label: "Piso" },
  { value: "casa", label: "Casa / Chalet" },
  { value: "atico", label: "Ático" },
  { value: "duplex", label: "Dúplex" },
  { value: "estudio", label: "Estudio" },
  { value: "apartamento", label: "Apartamento" },
  { value: "local", label: "Local comercial" },
  { value: "oficina", label: "Oficina" },
  { value: "terreno", label: "Terreno" },
  { value: "garaje", label: "Garaje" },
  { value: "trastero", label: "Trastero" },
  { value: "edificio", label: "Edificio" },
  { value: "nave", label: "Nave industrial" },
];

const toneOptions = [
  { value: "profesional", label: "Profesional" },
  { value: "premium", label: "Premium / Lujo" },
  { value: "juvenil", label: "Juvenil / Moderno" },
  { value: "familiar", label: "Familiar" },
  { value: "corporativo", label: "Corporativo" },
];

const formSchema = z.object({
  propertyType: z.string({ required_error: "Selecciona un tipo de inmueble" }),
  operation: z.enum(["venta", "alquiler"], { 
    required_error: "Selecciona el tipo de operación" 
  }),
  location: z.string().min(3, { message: "Indica la ubicación (mínimo 3 caracteres)" }),
  area: z.string().min(1, { message: "Indica la superficie" }),
  rooms: z.string().min(1, { message: "Indica el número de habitaciones" }),
  bathrooms: z.string().optional(),
  condition: z.string().optional(),
  price: z.string().min(1, { message: "Indica el precio" }),
  features: z.string().optional(),
  description: z.string().optional(),
  tone: z.string().default("profesional"),
  useEmojis: z.boolean().default(false),
});

// Make sure the form data type matches the PropertyAdFormData interface
type FormData = z.infer<typeof formSchema>;

interface PropertyAdFormProps {
  onSubmit: (data: PropertyAdFormData) => void;
  isGenerating: boolean;
}

export function PropertyAdForm({ onSubmit, isGenerating }: PropertyAdFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operation: "venta",
      tone: "profesional",
      useEmojis: false,
    },
  });

  const handleSubmit = (data: FormData) => {
    if (isGenerating) return;
    
    // Ensure all required fields are provided as non-optional
    const formattedData: PropertyAdFormData = {
      propertyType: data.propertyType,
      operation: data.operation,
      location: data.location,
      area: data.area,
      rooms: data.rooms,
      price: data.price,
      tone: data.tone,
      useEmojis: data.useEmojis,
      bathrooms: data.bathrooms,
      condition: data.condition,
      features: data.features,
      description: data.description,
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de inmueble*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="operation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operación*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de operación" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación*</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Chamberí, Madrid" {...field} />
              </FormControl>
              <FormDescription>
                Incluye barrio, distrito o zona y ciudad
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Superficie (m²)*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 95" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitaciones*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 3" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baños</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 2" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nuevo">Nuevo / A estrenar</SelectItem>
                    <SelectItem value="reformado">Reformado</SelectItem>
                    <SelectItem value="buen_estado">Buen estado</SelectItem>
                    <SelectItem value="a_reformar">A reformar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (€)*</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 250000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características destacables</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ej: terraza, piscina, garaje, ascensor, aire acondicionado..." 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Separa las características por comas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción adicional</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Añade cualquier información adicional relevante..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tono del anuncio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tono" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="useEmojis"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Incluir emojis</FormLabel>
                  <FormDescription>
                    Añadir emojis relevantes al anuncio
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          disabled={isGenerating}
        >
          {isGenerating ? "Generando anuncio..." : "Generar Anuncio"}
        </Button>
      </form>
    </Form>
  );
}
