
import React from 'react';

const Step8Visits: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Guion de recorrido:</span> Zona día → zona noche → extras.</li>
        <li><span className="font-semibold">Dossier impreso/digital:</span> Con plano y desglose de gastos.</li>
        <li><span className="font-semibold">Registro de asistencia:</span> RGPD y encuesta post-visita rápida QR.</li>
        <li><span className="font-semibold">Reunión de recap:</span> 24h después para recoger feedback y ajustar precio si procede.</li>
      </ul>
    </div>
  );
};

export default Step8Visits;
