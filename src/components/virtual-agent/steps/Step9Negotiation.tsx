
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Step9Negotiation: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Documento:</span> Hoja de encargo/contrato de reserva (señal) con depósito (1%–2%).</li>
        <li><span className="font-semibold">Puntos mínimos:</span> Datos partes, precio, plazo para firma de arras, condiciones suspensivas (préstamo, tasación).</li>
        <li><span className="font-semibold">Depósito:</span> Retenido por el agente o ingresado en cuenta escrow.</li>
      </ul>
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Consejo legal</AlertTitle>
        <AlertDescription>
          Es recomendable contar con un abogado para revisar los términos del contrato de reserva.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step9Negotiation;
