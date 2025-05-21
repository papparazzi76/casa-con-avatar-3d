
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailDialog } from "./ServiceDetailDialog";
import { ServiceGridHeader } from "./ServiceGridHeader";
import { ServiceGridContent } from "./ServiceGridContent";
import { motion } from "framer-motion";
import { Service, services } from "@/data/services";
import { useNavigate } from "react-router-dom";
import { ContactProfessionalButton } from "./ContactProfessionalButton";

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

  // Añadimos el servicio de generador de posts para RRSS
  const allServices = [
    ...services,
    {
      id: "social-media-posts",
      title: "Creador de Posts para RRSS",
      description: "Genera contenido optimizado para Instagram y Facebook con tu propiedad",
      fullDescription: "Crea posts atractivos y optimizados para redes sociales que maximizan la visibilidad de tu propiedad en Instagram y Facebook. Incluye textos, hashtags y sugerencias para carruseles de fotos.",
      icon: "📱",
      path: "/generador-posts-rrss"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <ServiceGridHeader />
        <div className="flex justify-center mb-8">
          <ContactProfessionalButton 
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90" 
          />
        </div>
        <ServiceGridContent 
          services={allServices}
          onServiceClick={handleServiceClick}
        />
      </div>

      <ServiceDetailDialog 
        service={selectedService}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
