
export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  path?: string;
  imageSrc?: string;
  avatarSrc?: string;
  systemPrompt?: string;
}

export const services: Service[] = [
  {
    id: "ads",
    title: "Elaboración de Anuncios",
    description: "Crea anuncios profesionales con títulos SEO, descripciones y destacados.",
    icon: "📝",
    fullDescription: "Genera anuncios inmobiliarios profesionales completos con título optimizado para SEO, descripción detallada, 5 puntos destacados y hashtags relevantes para aumentar la visibilidad de tu propiedad.",
    path: "/generador-anuncios",
    imageSrc: "/lovable-uploads/1be00a47-bae5-4c4e-954d-bbb23c7bfe7d.png",
    avatarSrc: "/lovable-uploads/837d994e-df2d-4bff-a7da-0a16e0b146c1.png"
  },
  {
    id: "images",
    title: "Editor de Imágenes & Homestaging",
    description: "Mejora tus fotos y visualiza reformas virtuales.",
    icon: "🖼️",
    fullDescription: "Transforma tus fotografías con nuestro editor profesional y crea impactantes visualizaciones de home staging virtual para mostrar todo el potencial de tu propiedad.",
    path: "/editor-imagenes",
    imageSrc: "/lovable-uploads/062b1d1c-ade1-443e-805c-6590cbadd48b.png",
    avatarSrc: "/lovable-uploads/69972362-33bb-4c1d-95a4-3af6bb0c70a2.png",
    systemPrompt: `Eres un experto retocador fotográfico y diseñador de interiores virtual especializado en inmuebles.
Tu misión es transformar las fotos proporcionadas por el usuario para que luzcan profesionales y, si se solicita, generar una versión de homestaging virtual.

MODELO
- Debes llamar **SIEMPRE** al modelo de edición de imágenes con mejor rendimiento disponible en la API de OpenAI.
  - A la fecha de este prompt, utiliza **\`gpt-4o-vision\`** para análisis/detección y **\`dall-e-3\`** para generación o inpainting.
  - Si OpenAI publica un modelo más avanzado, empléalo automáticamente sin necesidad de cambiar el prompt.

REQUISITOS
1. Al menos 1 foto en JPG/PNG (≤ 8 MB).
2. Modo de trabajo:  
   a) **enhancement** (mejora fotográfica)  
   b) **homestaging**  
   c) **mixto**.
3. Para *homestaging* indicar estilo deseado (nórdico, moderno, rústico, etc.).
Si falta información esencial, pregunta de forma concisa antes de continuar.

INSTRUCCIONES DE PROCESO
- **Enhancement**: ajustar exposición, contraste, balance de blancos y nitidez; corregir distorsión y verticales; eliminación de ruido; resolución final ≥ 3000 px lado mayor.
- **Homestaging**: enmascarar muebles existentes cuando obstaculicen el diseño; generar nueva decoración coherente con el estilo solicitado manteniendo la arquitectura (puertas, ventanas, suelos).
- Sin marcas de agua salvo petición expresa.

FORMATO DE SALIDA (JSON estricto)
{
  "modo": "enhancement" | "homestaging" | "mixto",
  "instrucciones": [
    "Texto breve de la edición paso a paso en español…"
  ],
  "prompt_dalle": "…",          // Instrucción optimizada en inglés para DALL·E (solo si hay homestaging)
  "mascara_inpaint": "on" | "off", // "on" si es necesario enmascarar muebles
  "estilo_homestaging": "…",     // Vacío si no aplica
  "nota_usuario": "Mensaje breve explicativo para mostrar al usuario."
}

Devuelve SIEMPRE **solo** el JSON válido cuando dispongas de todos los datos necesarios.`
  },
  {
    id: "calculator",
    title: "Calculadora de Gastos e Impuestos",
    description: "Calcula todos los costes asociados a la compraventa de inmuebles.",
    icon: "🧮",
    fullDescription: "Herramienta completa para calcular todos los impuestos y gastos asociados a la compraventa de inmuebles, tanto para compradores como para vendedores: IVA, ITP, AJD, plusvalía municipal, IRPF, gastos notariales y más.",
    imageSrc: "/lovable-uploads/f7175729-678b-4dec-9e4f-9676b21e24ab.png",
    path: "/calculadora-gastos"
  },
  {
    id: "contracts",
    title: "Redacción de Contratos",
    description: "Genera contratos de compraventa o alquiler personalizados.",
    icon: "📄",
    fullDescription: "Crea contratos legalmente válidos de compraventa o alquiler personalizados con todas las cláusulas necesarias según la legislación española vigente.",
    imageSrc: "/lovable-uploads/16fdb570-b6a7-4459-9e65-8e6845fc8b96.png",
    path: "/generador-contratos"
  },
  {
    id: "legal",
    title: "Dudas Legislación Inmobiliaria",
    description: "Resuelve tus dudas sobre normativa y legislación vigente.",
    icon: "⚖️",
    fullDescription: "Consulta todas tus dudas sobre la normativa y legislación inmobiliaria española vigente con respuestas precisas y actualizadas.",
    avatarSrc: "/lovable-uploads/e7be3e75-93d7-4fa1-b80f-687790b10386.png",
    path: "/asesor-legal"
  },
  {
    id: "valuation",
    title: "Valorador de Inmuebles",
    description: "Obtén una estimación del valor de mercado de tu propiedad.",
    icon: "💰",
    fullDescription: "Calcula el valor estimado de mercado de tu propiedad basado en datos actualizados y comparables de la zona, con un rango de valoración y análisis detallado.",
    avatarSrc: "/lovable-uploads/0a39d5c4-65f6-452b-a42c-ac31b6b7b5ca.png",
    path: "/valorador-inmuebles"
  },
  {
    id: "social-media-posts",
    title: "Creador de Posts para RRSS",
    description: "Genera contenido optimizado para Instagram y Facebook con tu propiedad",
    icon: "📱",
    fullDescription: "Crea posts atractivos y optimizados para redes sociales que maximizan la visibilidad de tu propiedad en Instagram y Facebook. Incluye textos, hashtags y sugerencias para carruseles de fotos.",
    path: "/generador-posts-rrss",
    imageSrc: "/lovable-uploads/997f4d9a-f63e-46d1-9479-fd0c92c977a7.png"
  },
  {
    id: "virtual-agent",
    title: "Agente Virtual Inmobiliario",
    description: "Guía paso a paso para vender o alquilar tu propiedad como un profesional.",
    fullDescription: "Consulta nuestra guía completa con los 13 pasos para vender o alquilar tu propiedad con éxito. Desde la valoración inicial hasta la liquidación de impuestos, pasando por marketing, gestión de visitas y firma notarial.",
    icon: "📋",
    path: "/agente-virtual-inmobiliario",
    imageSrc: "/lovable-uploads/f14e4265-ded1-48b8-b808-f29510c8dc2c.png"
  },
];
