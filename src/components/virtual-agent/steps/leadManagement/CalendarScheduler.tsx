
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CalendarRange, CalendarClock, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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

// Google Calendar API configuration
const GOOGLE_API_SCOPES = 'https://www.googleapis.com/auth/calendar';
const GOOGLE_CLIENT_ID = '433488038248-mvrgna13b9ac88k3dr2ton9ht5lkt0a2.apps.googleusercontent.com';
const GOOGLE_DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

const CalendarScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGoogleCalendarAuthorized, setIsGoogleCalendarAuthorized] = useState(false);
  const [visitorDetails, setVisitorDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    // Load Google API script dynamically
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAPI;
      document.body.appendChild(script);
    };

    // Only load Google API if user is logged in
    if (user) {
      loadGoogleScript();
    }

    // Clean up
    return () => {
      const scriptTag = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [user]);

  const initializeGoogleAPI = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: GOOGLE_DISCOVERY_DOCS,
        scope: GOOGLE_API_SCOPES
      }).then(() => {
        // Check if user is already signed in to Google
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          setIsGoogleCalendarAuthorized(true);
          toast.success("Conectado a Google Calendar");
        }
      }).catch(error => {
        console.error("Error initializing Google API", error);
      });
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsDialogOpen(false);
    
    try {
      if (isGoogleCalendarAuthorized && selectedDate && selectedTimeSlot) {
        // Create a Google Calendar event
        await addEventToGoogleCalendar();
      }
      
      // Always show confirmation, even if not using Google Calendar
      setIsConfirmed(true);
      toast.success("Visita programada correctamente");
    } catch (error) {
      console.error("Error al programar la visita", error);
      toast.error("Hubo un error al programar la visita");
    }
  };

  const addEventToGoogleCalendar = async () => {
    if (!selectedDate || !selectedTimeSlot) return;
    
    // Create start and end times for the event
    const startTime = new Date(selectedDate);
    const [hours, minutes] = selectedTimeSlot.time.split(":").map(Number);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // 1 hour appointment
    
    const event = {
      'summary': `Visita inmueble - ${visitorDetails.name}`,
      'description': `Visita programada con ${visitorDetails.name}. Teléfono: ${visitorDetails.phone}, Email: ${visitorDetails.email}`,
      'start': {
        'dateTime': startTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': endTime.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'attendees': [
        {'email': visitorDetails.email}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 30}
        ]
      }
    };
    
    try {
      await window.gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
    } catch (error) {
      console.error("Error creating Google Calendar event", error);
      throw error;
    }
  };

  const handleSyncWithGoogle = () => {
    if (!user) {
      toast.error("Debes iniciar sesión primero");
      return;
    }
    
    if (isGoogleCalendarAuthorized) {
      toast.success("Ya estás conectado a Google Calendar");
      return;
    }

    // Authorize with Google
    window.gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsGoogleCalendarAuthorized(true);
      toast.success("Conectado a Google Calendar correctamente");
    }).catch(error => {
      console.error("Google auth error", error);
      toast.error("Error al conectar con Google Calendar");
    });
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
        <Button 
          onClick={handleSyncWithGoogle} 
          className="gap-2"
          disabled={!user}
        >
          <CalendarRange className="h-4 w-4" /> 
          {isGoogleCalendarAuthorized 
            ? "Conectado a Google Calendar" 
            : "Sincronizar con Google Calendar"}
        </Button>
      </div>

      {!user && (
        <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Inicio de sesión requerido</AlertTitle>
          <AlertDescription>
            Para sincronizar con Google Calendar necesitas iniciar sesión primero.
          </AlertDescription>
        </Alert>
      )}

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
            a las {selectedTimeSlot?.time}. 
            {isGoogleCalendarAuthorized && " Se ha añadido a tu Google Calendar."}
            {!isGoogleCalendarAuthorized && " Recibirás un email de confirmación."}
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
