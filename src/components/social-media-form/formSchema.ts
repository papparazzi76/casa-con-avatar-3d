
import * as z from "zod";

// Form schema with proper type for the form data
export const formSchema = z.object({
  plataforma: z.enum(["instagram", "facebook", "ambas"], { 
    required_error: "Selecciona al menos una plataforma" 
  }),
  tipo_operacion: z.enum(["venta", "alquiler"], { 
    required_error: "Selecciona el tipo de operación" 
  }),
  tipo_inmueble: z.string({ required_error: "Selecciona un tipo de inmueble" }),
  localidad: z.string().min(2, { message: "Indica la localidad (mínimo 2 caracteres)" }),
  superficie_m2: z.string().min(1, { message: "Indica la superficie" }),
  habitaciones: z.string().min(1, { message: "Indica el número de habitaciones" }),
  banos: z.string().min(1, { message: "Indica el número de baños" }),
  precio: z.string().min(1, { message: "Indica el precio" }),
  caracteristicas_destacadas: z.array(z.string()).min(1, { message: "Añade al menos una característica destacada" }),
  url_contacto: z.string().min(3, { message: "Indica un método de contacto válido" }),
  fotos: z.array(z.any()).min(1, { message: "Sube al menos una foto" }),
  estado_conservacion: z.string().optional(),
  extras: z.array(z.string()).optional(),
  titulo_anuncio: z.string().optional(),
  idioma: z.string().default("ES"),
  tono: z.string().optional(),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar los Términos y la Política de Privacidad",
    }),
  }),
});

// Ensure this matches the type from socialMediaService.ts
export type FormValues = z.infer<typeof formSchema>;

export const propertyTypes = [
  { value: "piso", label: "Piso" },
  { value: "chalet", label: "Casa / Chalet" },
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

export const toneOptions = [
  { value: "profesional", label: "Profesional" },
  { value: "premium", label: "Premium / Lujo" },
  { value: "juvenil", label: "Juvenil / Moderno" },
  { value: "familiar", label: "Familiar" },
  { value: "corporativo", label: "Corporativo" },
  { value: "amistoso", label: "Amistoso" },
];

export const conservationOptions = [
  { value: "nuevo", label: "Nuevo / A estrenar" },
  { value: "reformado", label: "Reformado" },
  { value: "buen_estado", label: "Buen estado" },
  { value: "a_reformar", label: "A reformar" },
];
