
import * as z from "zod";

export const formSchema = z.object({
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

export type PropertyFormValues = z.infer<typeof formSchema>;
