
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyFormData, PROPERTY_TYPES, OPERATION_TYPES, CURRENCIES } from "@/types/property";
import { createProperty, updateProperty } from "@/services/propertyService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Property } from "@/types/property";

const formSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  property_type: z.string({ required_error: "Selecciona un tipo de inmueble" }),
  operation_type: z.string({ required_error: "Selecciona el tipo de operación" }),
  price: z.coerce.number().positive({ message: "El precio debe ser un número positivo" }),
  currency: z.string().default("EUR"),
  area: z.coerce.number().positive({ message: "La superficie debe ser un número positivo" }),
  rooms: z.coerce.number().int().min(0, { message: "El número de habitaciones no puede ser negativo" }),
  bathrooms: z.coerce.number().int().min(0, { message: "El número de baños no puede ser negativo" }),
  location: z.string().min(3, { message: "La ubicación debe tener al menos 3 caracteres" }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres" }),
  postal_code: z.string().optional(),
  features: z.string().optional().transform(val => 
    val ? val.split(",").map(item => item.trim()) : []
  ),
});

interface PropertyFormProps {
  property?: Property;
  isEditing?: boolean;
  onSuccess?: (property: Property) => void;
}

export function PropertyForm({ property, isEditing = false, onSuccess }: PropertyFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      property_type: property?.property_type || "",
      operation_type: property?.operation_type || "venta",
      price: property?.price || undefined,
      currency: property?.currency || "EUR",
      area: property?.area || undefined,
      rooms: property?.rooms || undefined,
      bathrooms: property?.bathrooms || undefined,
      location: property?.location || "",
      address: property?.address || "",
      postal_code: property?.postal_code || "",
      features: property?.features ? property.features.join(", ") : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      let result;
      if (isEditing && property) {
        result = await updateProperty(property.id, data as PropertyFormData);
        toast.success("Inmueble actualizado correctamente");
      } else {
        result = await createProperty(data as PropertyFormData);
        toast.success("Inmueble publicado correctamente");
      }
      
      if (onSuccess) {
        onSuccess(result);
      } else {
        navigate(`/propiedades/${result.id}`);
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
      toast.error("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del anuncio*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: Magnífico piso en el centro de Madrid" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Un título atractivo y descriptivo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="property_type"
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
                    {PROPERTY_TYPES.map((type) => (
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
            name="operation_type"
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
                    {OPERATION_TYPES.map((type) => (
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moneda</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona moneda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
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
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Superficie (m²)*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitaciones*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
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
                <FormLabel>Baños*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
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
                <Input 
                  placeholder="Ej: Centro, Madrid" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Zona, barrio, ciudad...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: Calle Mayor, 1" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Esta información no se mostrará públicamente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código postal</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 28001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: terraza, piscina, ascensor, garaje" 
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
              <FormLabel>Descripción*</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe el inmueble, sus características, estado, entorno..." 
                  rows={5}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : isEditing ? "Actualizar inmueble" : "Publicar inmueble"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
