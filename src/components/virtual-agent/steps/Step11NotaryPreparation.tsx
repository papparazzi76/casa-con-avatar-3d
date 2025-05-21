
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Step11NotaryPreparation: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Elección de notario:</span> Libre, coste similar en toda España.</li>
        <li><span className="font-semibold">Documentación previa:</span> Envío con 5 días de antelación de toda la documentación (punto 3) + contrato de arras.</li>
        <li><span className="font-semibold">Verificaciones:</span> Verificación de cargas y certificado de dominio por el notario.</li>
        <li><span className="font-semibold">Videofirma:</span> Opción de videofirma telemática desde el 9-XI-2023 gracias a la Ley 11/2023, a través del Portal Notarial del Ciudadano.</li>
        <li><span className="font-semibold">Comunicación registral:</span> El notario envía minuta al Registro de la Propiedad mediante el sistema SIGNO en menos de 24h.</li>
      </ul>
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Novedad legal</AlertTitle>
        <AlertDescription>
          La videofirma telemática facilita el proceso para partes que no pueden asistir físicamente a la notaría.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step11NotaryPreparation;
