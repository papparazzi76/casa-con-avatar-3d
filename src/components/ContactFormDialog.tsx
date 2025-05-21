
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ContactMethod = "phone" | "whatsapp" | "email";
type ContactReason = "sell" | "buy" | "curious";

interface ContactFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormDialog({ isOpen, onOpenChange }: ContactFormDialogProps) {
  const [step, setStep] = useState<"method" | "details" | "reason">("method");
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(null);
  const [contactInfo, setContactInfo] = useState("");
  const [name, setName] = useState("");
  const [contactReason, setContactReason] = useState<ContactReason | null>(null);

  const handleNext = () => {
    if (step === "method" && contactMethod) {
      setStep("details");
    } else if (step === "details" && contactInfo && name) {
      setStep("reason");
    } else if (step === "reason" && contactReason) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Process the contact information
    toast.success("Solicitud enviada. Un profesional se pondrá en contacto contigo pronto.");
    
    // Reset form and close dialog
    setStep("method");
    setContactMethod(null);
    setContactInfo("");
    setName("");
    setContactReason(null);
    onOpenChange(false);
  };

  const getPlaceholder = () => {
    switch (contactMethod) {
      case "phone": return "Ej: 612 345 678";
      case "whatsapp": return "Ej: 612 345 678";
      case "email": return "Ej: tu@email.com";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contacta a un profesional</DialogTitle>
          <DialogDescription>
            Un experto inmobiliario se pondrá en contacto contigo para ayudarte
          </DialogDescription>
        </DialogHeader>

        {step === "method" && (
          <div className="space-y-4">
            <div className="text-center text-lg font-medium">¿Cómo prefieres que te contactemos?</div>
            <RadioGroup value={contactMethod || ""} onValueChange={(value) => setContactMethod(value as ContactMethod)}>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Prefiero que me llamen</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp">Prefiero que me manden un WhatsApp</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Prefiero recibir un correo</Label>
              </div>
            </RadioGroup>
            <Button 
              onClick={handleNext} 
              disabled={!contactMethod} 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Continuar
            </Button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Tu nombre</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Nombre y apellidos" 
                className="mt-1" 
              />
            </div>
            <div>
              <Label htmlFor="contactInfo">
                {contactMethod === "phone" && "Teléfono"}
                {contactMethod === "whatsapp" && "WhatsApp"}
                {contactMethod === "email" && "Correo electrónico"}
              </Label>
              <Input 
                id="contactInfo" 
                value={contactInfo} 
                onChange={(e) => setContactInfo(e.target.value)} 
                placeholder={getPlaceholder()} 
                type={contactMethod === "email" ? "email" : "tel"} 
                className="mt-1" 
              />
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!contactInfo || !name} 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Continuar
            </Button>
          </div>
        )}

        {step === "reason" && (
          <div className="space-y-4">
            <div className="text-center text-lg font-medium">¿Cuál es tu situación?</div>
            <RadioGroup value={contactReason || ""} onValueChange={(value) => setContactReason(value as ContactReason)}>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell">Estoy pensando en vender o poner en alquiler</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Estoy pensando en comprar o alquilar</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="curious" id="curious" />
                <Label htmlFor="curious">Estoy curioseando</Label>
              </div>
            </RadioGroup>
            <Button 
              onClick={handleSubmit} 
              disabled={!contactReason} 
              className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              Enviar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
