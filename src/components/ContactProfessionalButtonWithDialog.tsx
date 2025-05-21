
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { ContactFormDialog } from "./ContactFormDialog";

interface ContactProfessionalButtonWithDialogProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ContactProfessionalButtonWithDialog({
  className = "",
  size = "default",
  variant = "default"
}: ContactProfessionalButtonWithDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        className={className} 
        variant={variant}
        size={size}
      >
        <Phone className="mr-2 h-4 w-4" />
        Contacta a un profesional
      </Button>

      <ContactFormDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
