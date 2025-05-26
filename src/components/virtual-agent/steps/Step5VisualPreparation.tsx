
import React from 'react';

const Step5VisualPreparation: React.FC = () => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-2">
        <li><span className="font-semibold">Home staging:</span> orden, neutralidad cromática, reparaciones menores.</li>
        <li><span className="font-semibold">Fotografía profesional:</span> lente gran angular (16–18 mm APS-C), bracketing HDR, trípode.</li>
        <li><span className="font-semibold">Corrección automática de iluminación:</span> ajustes sutiles de exposición, contraste y balance de color preservando todos los elementos originales.</li>
        <li><span className="font-semibold">Video storytelling:</span> plano secuencia que muestre distribución (menos de 90 segundos).</li>
        <li><span className="font-semibold">Recorrido 360°/gemelo digital:</span> Matterport o iPhone LiDAR → visita autoguiada.</li>
        <li><span className="font-semibold">Planos 2D y 3D:</span> generados desde la captura 360° o CAD.</li>
        <li><span className="font-semibold">IA de mejora:</span> corrección profesional de iluminación y color, virtual staging para estancias vacías (indicar "imagen virtual").</li>
      </ul>
    </div>
  );
};

export default Step5VisualPreparation;
