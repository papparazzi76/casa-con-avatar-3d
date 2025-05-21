
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CostReachMatrix from './marketingStrategy/CostReachMatrix';

const Step4MarketingStrategy: React.FC = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="matriz">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="matriz">Matriz Interactiva</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumen" className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold">Buyer persona:</h3>
          <p>Perfil socio-demográfico del comprador objetivo.</p>
          
          <h3 className="text-xl font-semibold mt-4">Canales gratuitos:</h3>
          <p>Idealista Particular, Fotocasa, Milanuncios, Wallapop, Facebook Marketplace.</p>
          
          <h3 className="text-xl font-semibold mt-4">Canales de pago/pro:</h3>
          <p>Idealista Pro, portales MLS, Google Ads Local Services.</p>
          
          <h3 className="text-xl font-semibold mt-4">Redes Sociales:</h3>
          <p>Reels en Instagram, Shorts en YouTube, campañas segmentadas en Meta Ads.</p>
          
          <h3 className="text-xl font-semibold mt-4">Marketing local:</h3>
          <p>Cartelería QR en fachada, buzoneo con enlaces rastreables.</p>
        </TabsContent>
        
        <TabsContent value="matriz" className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Matriz interactiva "Coste vs. Alcance"</h3>
              <p className="text-muted-foreground">Compara las diferentes opciones de marketing inmobiliario según su coste y alcance potencial.</p>
            </div>
            
            <CostReachMatrix />
            
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Recomendación</AlertTitle>
              <AlertDescription>
                Combina al menos un canal de cada cuadrante para maximizar la exposición de tu propiedad a diferentes audiencias.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Step4MarketingStrategy;
