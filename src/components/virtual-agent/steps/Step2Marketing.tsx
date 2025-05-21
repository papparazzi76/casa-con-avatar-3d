
import React from 'react';
import Quiz from "../PropertySaleQuiz/Quiz";

const Step2Marketing: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modalidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventajas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inconvenientes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coste típico</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">FSBO (venta por propietario)</td>
              <td className="px-6 py-4">Máximo control y ahorro de honorarios</td>
              <td className="px-6 py-4">Inversión personal de tiempo, curva de aprendizaje legal y de marketing</td>
              <td className="px-6 py-4">0 € honorarios</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Inmobiliaria en exclusiva</td>
              <td className="px-6 py-4">Difusión multicanal, filtro de compradores, acompañamiento jurídico</td>
              <td className="px-6 py-4">Pago de honorarios al éxito (3%–5% + IVA)</td>
              <td className="px-6 py-4">3%–5%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Multimandato</td>
              <td className="px-6 py-4">Mayor alcance inicial</td>
              <td className="px-6 py-4">Riesgo de sobreexposición y "quemar" el inmueble</td>
              <td className="px-6 py-4">3%–6%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">Cuestionario interactivo "¿Quién debe vender mi vivienda?"</h3>
        <Quiz />
      </div>
    </div>
  );
};

export default Step2Marketing;
