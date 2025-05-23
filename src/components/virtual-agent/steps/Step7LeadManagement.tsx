
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarScheduler from './leadManagement/CalendarScheduler';
import { useAuth } from "@/context/AuthContext";

const Step7LeadManagement: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendario de Visitas</TabsTrigger>
          <TabsTrigger value="tips">Gestión de Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="pt-4">
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
        </TabsContent>
        
        <TabsContent value="tips" className="pt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">CRM inmobiliario o planilla Kanban:</span> Captado → cualificado → visita → oferta.</li>
            <li><span className="font-semibold">Respuesta rápida:</span> En menos de 1 hora (trigger correo + WhatsApp).</li>
            <li><span className="font-semibold">Pre-filtro:</span> Financiación aprobada, motivo de compra, fecha objetivo.</li>
            <li><span className="font-semibold">Calendario compartido:</span> Franjas inteligentes (máximo 4 visitas seguidas).</li>
          </ul>
          
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Tip profesional</AlertTitle>
            <AlertDescription>
              Usa un CRM específico para inmobiliarias para mantener seguimiento de todas las interacciones.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Step7LeadManagement;
