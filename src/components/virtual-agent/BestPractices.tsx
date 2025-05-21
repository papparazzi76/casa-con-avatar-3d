
import React from 'react';
import { CheckCircle2 } from "lucide-react";

const BestPractices: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-realestate-purple/10 to-realestate-turquoise/10 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Buenas prácticas finales</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
          <span>Trazabilidad: conserva correos y justificantes en un drive compartido.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
          <span>RGPD: bases legales de tratamiento de datos de interesados.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
          <span>Transparencia: sube al anuncio la CEE y nota simple para generar confianza.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-5 w-5 text-realestate-turquoise mr-2 flex-shrink-0 mt-0.5" />
          <span>Revisión legal: plantillas de reserva y arras validadas por abogado colegiado.</span>
        </li>
      </ul>
    </div>
  );
};

export default BestPractices;
