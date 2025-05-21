
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
          services={services}
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
