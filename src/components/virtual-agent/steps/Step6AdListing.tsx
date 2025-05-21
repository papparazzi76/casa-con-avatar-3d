
import React from 'react';

const Step6AdListing: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Titular ≤ 70 caracteres con USP:</span> Por ejemplo "Ático con terraza al sur y garaje en Parquesol".</li>
        <li><span className="font-semibold">Descripción jerarquizada:</span> Párrafos cortos + emojis en portales que lo permitan.</li>
        <li><span className="font-semibold">Ficha técnica:</span> Superficie, año, CEE, gastos comunitarios, IBI, orientación.</li>
        <li><span className="font-semibold">CTA claro:</span> Botón de contacto, WhatsApp Business o formulario.</li>
        <li><span className="font-semibold">Sincronización de datos:</span> Feed XML a varios portales para evitar incongruencias.</li>
      </ul>
    </div>
  );
};

export default Step6AdListing;
