
import { z } from "zod";

export const formSchema = z.object({
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

export type FormData = z.infer<typeof formSchema>;
