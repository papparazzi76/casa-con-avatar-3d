
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TimeSlot, VisitorDetails } from './types';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | undefined;
  selectedTimeSlot: TimeSlot | null;
  visitorDetails: VisitorDetails;
  onVisitorDetailsChange: (details: VisitorDetails) => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedDate,
  selectedTimeSlot,
  visitorDetails,
  onVisitorDetailsChange,
  onConfirm
}) => {
  if (!selectedDate || !selectedTimeSlot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar visita</DialogTitle>
          <DialogDescription>
            Completa tus datos para agendar la visita el{" "}
            {selectedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            a las {selectedTimeSlot?.time}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={visitorDetails.name}
              onChange={(e) =>
                onVisitorDetailsChange({
                  ...visitorDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={visitorDetails.email}
              onChange={(e) =>
                onVisitorDetailsChange({
                  ...visitorDetails,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              value={visitorDetails.phone}
              onChange={(e) =>
                onVisitorDetailsChange({
                  ...visitorDetails,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar visita</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
