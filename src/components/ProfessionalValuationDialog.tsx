
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PropertyValuation } from "@/services/propertyValuator";
import { toast } from "sonner";
import { sendProfessionalValuationRequest } from "@/services/professionalValuationService";

interface ProfessionalValuationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  propertyValuation: PropertyValuation | null;
}

export function ProfessionalValuationDialog({
  isOpen,
  onClose,
  propertyValuation
}: ProfessionalValuationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    comentarios: ""
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion || !formData.ciudad || !formData.codigoPostal) {
        toast.error("Por favor, completa todos los campos obligatorios");
        setIsSubmitting(false);
        return;
      }

      // Send the request
      await sendProfessionalValuationRequest({
        ...formData,
        valoracionActual: propertyValuation,
        notifyEmail: "carlos@arcasl.es"
      });

      toast.success("¡Solicitud enviada correctamente! Un experto se pondrá en contacto contigo en breve.");
      onClose();
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        comentarios: ""
      });
    } catch (error) {
      console.error("Error sending professional valuation request:", error);
      toast.error("Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Solicitar valoración profesional gratuita</DialogTitle>
          <DialogDescription>
            Un experto inmobiliario se pondrá en contacto con usted para concertar una visita de valoración.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo *</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Tu nombre y apellidos"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                name="telefono"
                placeholder="600 000 000"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoPostal">Código Postal *</Label>
              <Input
                id="codigoPostal"
                name="codigoPostal"
                placeholder="28001"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección completa del inmueble *</Label>
            <Input
              id="direccion"
              name="direccion"
              placeholder="Calle, número, planta, puerta..."
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ciudad">Ciudad *</Label>
            <Input
              id="ciudad"
              name="ciudad"
              placeholder="Madrid, Barcelona, etc."
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios adicionales</Label>
            <Textarea
              id="comentarios"
              name="comentarios"
              placeholder="Información adicional sobre el inmueble que consideres relevante..."
              value={formData.comentarios}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="text-sm text-gray-500">
            * Campos obligatorios
          </div>

          <div className="flex items-start space-x-2 border p-4 rounded-md">
            <input
              type="checkbox"
              id="professional-terms"
              className="mt-1"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="professional-terms" className="text-sm">
              He leído y acepto los <a href="/terminos" className="underline">Términos y Condiciones</a> y la{' '}
              <a href="/privacidad" className="underline">Política de Privacidad</a>
            </label>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !acceptedTerms}>
              {isSubmitting ? "Enviando..." : "Solicitar valoración"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
