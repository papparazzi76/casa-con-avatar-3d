
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { toast } from "sonner";

interface ContactProfessionalButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ContactProfessionalButton({
  className = "",
  size = "default",
  variant = "default"
}: ContactProfessionalButtonProps) {
  const handleContactClick = () => {
    toast.success("Solicitud enviada. Un profesional se pondrá en contacto contigo pronto.");
  };

  return (
    <Button 
      onClick={handleContactClick} 
      className={className} 
      variant={variant}
      size={size}
    >
      <Phone className="mr-2 h-4 w-4" />
      Contacta a un profesional
    </Button>
  );
}
