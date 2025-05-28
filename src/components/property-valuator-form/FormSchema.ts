
import { z } from "zod";

export const propertySchema = z.object({
  localidad: z.string().min(2, {
    message: "La localidad es obligatoria.",
  }),
  distrito: z.string().min(1, {
    message: "El distrito o barrio es obligatorio.",
  }),
  zona_idealista: z.string({
    required_error: "Selecciona una zona de Idealista.",
  }),
  direccion: z.string().optional(),
  tipo_vivienda: z.string({
    required_error: "Selecciona el tipo de vivienda.",
  }),
  superficie_m2: z.coerce.number().min(15, {
    message: "La superficie debe ser al menos 15 m².",
  }),
  habitaciones: z.coerce.number().min(1, {
    message: "Indica al menos 1 habitación.",
  }),
  banos: z.coerce.number().min(1, {
    message: "Indica al menos 1 baño.",
  }),
  estado_conservacion: z.string({
    required_error: "Selecciona el estado de conservación.",
  }),
  planta: z.string({
    required_error: "Indica la planta.",
  }),
  ascensor: z.boolean().default(false),
  exterior: z.boolean().default(false),
  anno_construccion: z.coerce.number().min(1900, {
    message: "El año debe ser posterior a 1900",
  }).max(new Date().getFullYear(), {
    message: "El año no puede ser futuro",
  }),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
