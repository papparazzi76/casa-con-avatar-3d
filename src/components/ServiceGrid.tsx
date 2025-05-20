
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailDialog } from "./ServiceDetailDialog";
import { motion } from "framer-motion";
import { Service, services } from "@/data/services";
import { useNavigate } from "react-router-dom";

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

      <ServiceDetailDialog 
        service={selectedService}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
