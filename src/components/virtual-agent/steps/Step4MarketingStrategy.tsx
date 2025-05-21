
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Step4MarketingStrategy: React.FC = () => {
  return (
    <div className="space-y-4">
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
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Widget sugerido</AlertTitle>
        <AlertDescription>
          Matriz interactiva "coste vs. alcance" para portales y redes.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step4MarketingStrategy;
