
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import CalendarScheduler from './CalendarScheduler';
import { useAuth } from "@/context/AuthContext";

const CalendarTab: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-4">
      <CalendarScheduler />
      
      {!user && (
        <Alert className="mt-4">
          <Info className="h-4 w-4" />
          <AlertTitle>Maximiza tu experiencia</AlertTitle>
          <AlertDescription>
            Inicia sesión con tu cuenta de Google para sincronizar las visitas directamente con tu calendario.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CalendarTab;
