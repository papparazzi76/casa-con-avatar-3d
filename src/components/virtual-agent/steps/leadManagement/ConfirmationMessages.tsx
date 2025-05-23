
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Check } from "lucide-react";
import { TimeSlot } from './types';

interface ConfirmationMessagesProps {
  isConfirmed: boolean;
  isGoogleCalendarAuthorized: boolean;
  selectedDate?: Date;
  selectedTimeSlot: TimeSlot | null;
  user: any;
}

const ConfirmationMessages: React.FC<ConfirmationMessagesProps> = ({
  isConfirmed,
  isGoogleCalendarAuthorized,
  selectedDate,
  selectedTimeSlot,
  user
}) => {
  return (
    <>
      {!user && (
        <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
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
    </>
  );
};

export default ConfirmationMessages;
