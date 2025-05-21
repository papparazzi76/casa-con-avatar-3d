
import React from 'react';

const Step12DeedSigning: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Presencia:</span> Las partes acuden (o se conectan) con DNI/NIE y justificante de pagos.</li>
        <li><span className="font-semibold">Pago:</span> Se liquida precio (cheque bancario, transferencia inmediata o talón conformado).</li>
        <li><span className="font-semibold">Entrega:</span> Entrega de llaves y certificación energética.</li>
        <li><span className="font-semibold">Documentación:</span> Obtención de copia simple electrónica inmediata; copia autorizada en 2-3 días.</li>
      </ul>
    </div>
  );
};

export default Step12DeedSigning;
