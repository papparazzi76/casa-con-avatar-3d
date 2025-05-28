
import { z } from "zod";

export const propertyValuationSchema = z.object({
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  cp: z.string().regex(/^\d{5}$/, "El código postal debe tener 5 dígitos"),
  locality: z.string().min(2, "La localidad es obligatoria"),
  propertyType: z.string().min(1, "Selecciona el tipo de propiedad"),
  surface_m2: z.coerce.number().min(20, "La superficie debe ser al menos 20 m²"),
  bedrooms: z.coerce.number().min(1, "Debe tener al menos 1 dormitorio"),
  bathrooms: z.coerce.number().min(1, "Debe tener al menos 1 baño"),
  year_built: z.coerce.number().min(1900, "Año de construcción no válido").max(new Date().getFullYear(), "El año no puede ser futuro"),
  state: z.string().min(1, "Selecciona el estado de conservación"),
  extras: z.array(z.string()).default([]),
});
