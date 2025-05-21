
import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  property_type: z.string({ required_error: "Selecciona un tipo de inmueble" }),
  operation_type: z.string({ required_error: "Selecciona una operación" }),
  price: z.coerce.number().min(1, { message: "El precio debe ser mayor que 0" }),
  currency: z.string().default("EUR"),
  area: z.coerce.number().min(1, { message: "El área debe ser mayor que 0" }),
  rooms: z.coerce.number().min(0, { message: "El número de habitaciones no puede ser negativo" }),
  bathrooms: z.coerce.number().min(0, { message: "El número de baños no puede ser negativo" }),
  location: z.string().min(3, { message: "La localidad debe tener al menos 3 caracteres" }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres" }),
  postal_code: z.string().optional(),
  features: z.string().optional().transform(val => 
    val ? val.split(",").map(item => item.trim()) : []
  ),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
