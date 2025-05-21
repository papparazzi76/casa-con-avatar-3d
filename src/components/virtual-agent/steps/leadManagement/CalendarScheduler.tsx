
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CalendarRange, CalendarClock, Check } from "lucide-react";

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

const AVAILABLE_TIMES: TimeSlot[] = [
  { id: "1", time: "10:00", available: true },
  { id: "2", time: "11:00", available: true },
  { id: "3", time: "12:00", available: true },
  { id: "4", time: "16:00", available: true },
  { id: "5", time: "17:00", available: true },
  { id: "6", time: "18:00", available: true },
];

const CalendarScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [visitorDetails, setVisitorDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    // Here you would integrate with Google Calendar API
    setIsDialogOpen(false);
    setIsConfirmed(true);
  };

  const handleSyncWithGoogle = () => {
    // Redirect to Google OAuth flow
    alert("Esta función conectaría con la API de Google Calendar");
    // In a real implementation, redirect to Google OAuth
    // window.location.href = `/api/auth/google?redirect=/agente-virtual-inmobiliario`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-realestate-purple" />
            <h3 className="text-lg font-medium">Selecciona una fecha</h3>
          </div>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => {
                // Disable past dates and weekends
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const day = date.getDay();
                return date < now || day === 0 || day === 6;
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-realestate-purple" />
            <h3 className="text-lg font-medium">Selecciona una hora</h3>
          </div>
          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TIMES.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                  disabled={!slot.available}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-gray-300">
              <p className="text-sm text-gray-500">
                Selecciona una fecha primero
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={handleSyncWithGoogle} className="gap-2">
          <CalendarRange className="h-4 w-4" /> Sincronizar con Google Calendar
        </Button>
      </div>

      {isConfirmed && (
        <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>¡Visita confirmada!</AlertTitle>
          <AlertDescription>
            Tu visita ha sido agendada para el{" "}
            {selectedDate?.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            a las {selectedTimeSlot?.time}. Recibirás un email de confirmación.
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  setVisitorDetails({ ...visitorDetails, name: e.target.value })
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
                  setVisitorDetails({ ...visitorDetails, email: e.target.value })
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
                  setVisitorDetails({ ...visitorDetails, phone: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar visita</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarScheduler;
