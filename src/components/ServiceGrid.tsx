import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullDescription: string;
  path?: string;
  imageSrc?: string;
  avatarSrc?: string;
}

const services: Service[] = [
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
    imageSrc: "/lovable-uploads/062b1d1c-ade1-443e-805c-6590cbadd48b.png",
    avatarSrc: "/lovable-uploads/69972362-33bb-4c1d-95a4-3af6bb0c70a2.png"
  },
  {
    id: "calculator",
    title: "Calculadora de Gastos e Impuestos",
    description: "Calcula todos los costes asociados a la compraventa de inmuebles.",
    icon: "🧮",
    fullDescription: "Herramienta completa para calcular todos los impuestos y gastos asociados a la compraventa de inmuebles, tanto para compradores como para vendedores: IVA, ITP, AJD, plusvalía municipal, IRPF, gastos notariales y más.",
    imageSrc: "/lovable-uploads/f7175729-678b-4dec-9e4f-9676b21e24ab.png"
  },
  {
    id: "contracts",
    title: "Redacción de Contratos",
    description: "Genera contratos de compraventa o alquiler personalizados.",
    icon: "📄",
    fullDescription: "Crea contratos legalmente válidos de compraventa o alquiler personalizados con todas las cláusulas necesarias según la legislación española vigente.",
    imageSrc: "/lovable-uploads/16fdb570-b6a7-4459-9e65-8e6845fc8b96.png"
  },
  {
    id: "legal",
    title: "Dudas Legislación Inmobiliaria",
    description: "Resuelve tus dudas sobre normativa y legislación vigente.",
    icon: "⚖️",
    fullDescription: "Consulta todas tus dudas sobre la normativa y legislación inmobiliaria española vigente con respuestas precisas y actualizadas.",
    avatarSrc: "/lovable-uploads/e7be3e75-93d7-4fa1-b80f-687790b10386.png"
  },
  {
    id: "valuation",
    title: "Valorador de Inmuebles",
    description: "Obtén una estimación del valor de mercado de tu propiedad.",
    icon: "💰",
    fullDescription: "Calcula el valor estimado de mercado de tu propiedad basado en datos actualizados y comparables de la zona, con un rango de valoración y análisis detallado.",
    avatarSrc: "/lovable-uploads/0a39d5c4-65f6-452b-a42c-ac31b6b7b5ca.png"
  },
  {
    id: "social",
    title: "Creador de Posts para RRSS",
    description: "Diseña publicaciones atractivas para redes sociales.",
    icon: "📱",
    fullDescription: "Genera contenido optimizado para diferentes redes sociales con textos persuasivos e imágenes profesionales que aumentarán la visibilidad de tu propiedad.",
    avatarSrc: "/lovable-uploads/0656bf9c-aa81-4225-ad15-51739465433b.png"
  },
  {
    id: "advisor",
    title: "Asesor Inmobiliario Virtual",
    description: "Guía paso a paso para todo el proceso de venta o alquiler.",
    icon: "🧙‍♂️",
    fullDescription: "Sigue un proceso guiado paso a paso que te ayudará en cada aspecto de la venta o alquiler de tu propiedad, desde la preparación hasta el cierre de la operación."
  }
];

export function ServiceGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    
    // Si el servicio tiene una ruta directa, navegar a ella
    if (service.path) {
      navigate(service.path);
    } else {
      // Si no tiene ruta, mostrar el diálogo
      setIsDialogOpen(true);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Todo lo que necesitas para vender o alquilar tu propiedad como un profesional.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index}
              onClick={() => handleServiceClick(service)}
              imageSrc={service.imageSrc}
              avatarSrc={service.avatarSrc}
            />
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-3xl">{selectedService?.icon}</span>
              {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {selectedService?.fullDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-60 flex items-center justify-center rounded-xl bg-secondary">
            {selectedService?.imageSrc ? (
              <img 
                src={selectedService.imageSrc} 
                alt={selectedService.title}
                className="object-contain h-full w-full rounded-xl"
              />
            ) : (
              <div className="text-6xl">{selectedService?.icon}</div>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Iniciar Servicio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
