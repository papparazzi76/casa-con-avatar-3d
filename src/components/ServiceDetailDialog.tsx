
import { Service } from "@/data/services";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ServiceDetailDialogProps {
  service: Service | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDetailDialog({ service, isOpen, onOpenChange }: ServiceDetailDialogProps) {
  const navigate = useNavigate();
  
  if (!service) return null;

  const handleServiceStart = () => {
    if (service.path) {
      navigate(service.path);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <span className="text-3xl">{service.icon}</span>
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {service.fullDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-60 flex items-center justify-center rounded-xl bg-secondary">
          {service.imageSrc ? (
            <img 
              src={service.imageSrc} 
              alt={service.title}
              className="object-contain h-full w-full rounded-xl"
            />
          ) : (
            <div className="text-6xl">{service.icon}</div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleServiceStart}
            className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
          >
            Iniciar Servicio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
