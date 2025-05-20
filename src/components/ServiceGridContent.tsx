
import { Service } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridContentProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

export function ServiceGridContent({ services, onServiceClick }: ServiceGridContentProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          icon={service.icon}
          delay={index}
          onClick={() => onServiceClick(service)}
          imageSrc={service.imageSrc}
          avatarSrc={service.avatarSrc}
        />
      ))}
    </div>
  );
}
