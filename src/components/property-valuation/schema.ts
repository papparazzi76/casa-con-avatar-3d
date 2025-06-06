import { z } from "zod";

export const propertyValuationSchema = z.object({
  // Datos básicos obligatorios
  direccion_calle: z.string().min(5, {
    message: "La calle es obligatoria (mínimo 5 caracteres).",
  }),
  direccion_numero: z.string().min(1, {
    message: "El número es obligatorio.",
  }),
  es_unifamiliar: z.boolean().default(false),
  direccion_planta: z.string().optional(),
  direccion_puerta: z.string().optional(),
  direccion_codigo_postal: z.string().min(5, {
    message: "El código postal es obligatorio.",
  }),
  direccion_ciudad: z.string().min(2, {
    message: "La ciudad es obligatoria.",
  }),
  email: z.string().email({
    message: "Email válido es obligatorio para recibir el resultado.",
  }),
  
  // Características básicas
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
  anno_construccion: z.coerce.number().min(1900, {
    message: "El año debe ser posterior a 1900",
  }).max(new Date().getFullYear(), {
    message: "El año no puede ser futuro",
  }),
  
  // Estado de conservación de elementos
  estado_puertas: z.string({
    required_error: "Indica el estado de las puertas.",
  }),
  estado_ventanas: z.string({
    required_error: "Indica el estado de las ventanas.",
  }),
  estado_banos: z.string({
    required_error: "Indica el estado del/los baño/s.",
  }),
  estado_cocina: z.string({
    required_error: "Indica el estado de la cocina.",
  }),
  estado_fontaneria: z.string({
    required_error: "Indica el estado de la fontanería.",
  }),
  estado_electricidad: z.string({
    required_error: "Indica el estado de la instalación eléctrica.",
  }),
  
  // Características de ubicación y orientación
  orientacion: z.string({
    required_error: "Indica la orientación de la vivienda.",
  }),
  exterior_interior: z.string({
    required_error: "Indica si es exterior o interior.",
  }),
  planta: z.string({
    required_error: "Indica la planta.",
  }),
  
  // Extras y zonas adicionales
  tiene_garaje: z.boolean().default(false),
  tiene_trastero: z.boolean().default(false),
  tiene_ascensor: z.boolean().default(false),
  tiene_calefaccion: z.boolean().default(false),
  tiene_aire_acondicionado: z.boolean().default(false),
  
  // Zonas exteriores
  tiene_terraza: z.boolean().default(false),
  superficie_terraza: z.coerce.number().optional(),
  tiene_jardin: z.boolean().default(false),
  superficie_jardin: z.coerce.number().optional(),
  tiene_piscina: z.boolean().default(false),
  
  // Zonas comunes
  zonas_comunes: z.array(z.string()).default([]),
  zona_deportiva: z.boolean().default(false),
  zona_juegos_infantiles: z.boolean().default(false),

  // Observaciones adicionales
  observaciones: z.string().optional(),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar los Términos y la Política de Privacidad",
    }),
  }),
}).refine((data) => {
  // Si no es unifamiliar, planta y puerta son obligatorias
  if (!data.es_unifamiliar) {
    return data.direccion_planta && data.direccion_puerta;
  }
  return true;
}, {
  message: "Para viviendas que no son unifamiliares, la planta y puerta son obligatorias",
  path: ["direccion_planta"],
});

export type PropertyValuationFormData = z.infer<typeof propertyValuationSchema>;

export const estadosConservacion = [
  { value: "excelente", label: "Excelente" },
  { value: "muy-bueno", label: "Muy bueno" },
  { value: "bueno", label: "Bueno" },
  { value: "regular", label: "Regular" },
  { value: "malo", label: "Malo" },
  { value: "muy-malo", label: "Muy malo" },
];

export const orientacionOptions = [
  { value: "norte", label: "Norte" },
  { value: "sur", label: "Sur" },
  { value: "este", label: "Este" },
  { value: "oeste", label: "Oeste" },
  { value: "noreste", label: "Noreste" },
  { value: "noroeste", label: "Noroeste" },
  { value: "sureste", label: "Sureste" },
  { value: "suroeste", label: "Suroeste" },
];

export const tiposVivienda = [
  { value: "piso", label: "Piso" },
  { value: "casa", label: "Casa/Chalet" },
  { value: "atico", label: "Ático" },
  { value: "duplex", label: "Dúplex" },
  { value: "estudio", label: "Estudio" },
  { value: "apartamento", label: "Apartamento" },
  { value: "unifamiliar", label: "Unifamiliar" },
  { value: "pareado", label: "Pareado" },
];

export const zonasComunes = [
  { value: "portero", label: "Portero físico" },
  { value: "videoportero", label: "Videoportero" },
  { value: "conserje", label: "Conserje" },
  { value: "jardin_comunitario", label: "Jardín comunitario" },
  { value: "piscina_comunitaria", label: "Piscina comunitaria" },
  { value: "gimnasio", label: "Gimnasio" },
  { value: "salon_social", label: "Salón social" },
  { value: "parking_comunitario", label: "Parking comunitario" },
];
