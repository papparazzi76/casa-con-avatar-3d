export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  icon: string; 
  path?: string;
  imageSrc?: string;
  avatarSrc?: string;
}

export const services: Service[] = [
  {
    id: "ad-generator",
    title: "Generador de Anuncios",
    description: "Crea anuncios profesionales para tus propiedades.",
    fullDescription: "Nuestro generador de anuncios utiliza IA para crear textos persuasivos y atractivos para promocionar tus propiedades. Simplemente proporciona los detalles básicos de la propiedad y obtendrás un anuncio optimizado para diferentes plataformas.",
    icon: "📝",
    path: "/generador-anuncios",
    imageSrc: "lovable-uploads/e7be3e75-93d7-4fa1-b80f-687790b10386.png"
  },
  {
    id: "image-editor",
    title: "Editor de Imágenes",
    description: "Mejora las fotos de tus propiedades con IA.",
    fullDescription: "Transforma rápidamente imágenes de propiedades con nuestra herramienta de edición potenciada por IA. Mejora la calidad, cambia el estilo de decoración o actualiza espacios como cocinas y baños con un solo clic.",
    icon: "🖼️",
    path: "/editor-imagenes",
    imageSrc: "lovable-uploads/69972362-33bb-4c1d-95a4-3af6bb0c70a2.png"
  },
  {
    id: "expenses-calculator",
    title: "Calculadora de Gastos e Impuestos",
    description: "Calcula todos los costes asociados a una compraventa.",
    fullDescription: "Nuestra calculadora de gastos e impuestos inmobiliarios proporciona un desglose detallado de todos los costes asociados a la compraventa de una vivienda en España, tanto para el comprador como para el vendedor, incluyendo impuestos, gastos notariales, registrales y más.",
    icon: "🧮",
    path: "/calculadora-gastos",
    imageSrc: "lovable-uploads/f14e4265-ded1-48b8-b808-f29510c8dc2c.png"
  },
  {
    id: "market-analysis",
    title: "Análisis de Mercado",
    description: "Obtén información valiosa sobre el mercado inmobiliario.",
    fullDescription: "Accede a análisis detallados del mercado inmobiliario local. Conoce las tendencias de precios, la demanda actual y las mejores oportunidades de inversión en tu área.",
    icon: "📊",
    imageSrc: "lovable-uploads/7999a98e-9d19-4349-b448-9e919938c9a9.png"
  },
  {
    id: "property-valuation",
    title: "Valoración de Propiedades",
    description: "Estima el valor de tu propiedad con precisión.",
    fullDescription: "Utiliza nuestra herramienta de valoración de propiedades para obtener una estimación precisa del valor de tu inmueble. Basada en datos actualizados del mercado y algoritmos avanzados, te proporcionará una valoración confiable.",
    icon: "💰",
    imageSrc: "lovable-uploads/69972362-33bb-4c1d-95a4-3af6bb0c70a2.png"
  },
  {
    id: "legal-advice",
    title: "Asesoramiento Legal",
    description: "Recibe asesoramiento legal experto en temas inmobiliarios.",
    fullDescription: "Conéctate con abogados especializados en derecho inmobiliario para resolver tus dudas legales. Obtén asesoramiento personalizado sobre contratos, herencias, impuestos y cualquier otro tema legal relacionado con tus propiedades.",
    icon: "⚖️",
    imageSrc: "lovable-uploads/e7be3e75-93d7-4fa1-b80f-687790b10386.png"
  },
];
