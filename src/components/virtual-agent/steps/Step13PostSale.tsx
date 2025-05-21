
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Step13PostSale: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Impuestos a liquidar:</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impuesto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quién paga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plazo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cómo se calcula en 2025</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">Plusvalía Municipal (IIVTNU)</td>
              <td className="px-6 py-4">Vendedor (salvo pacto)</td>
              <td className="px-6 py-4">30 d hábiles desde firma</td>
              <td className="px-6 py-4">Opción &apos;objetiva&apos; → valor catastral × coeficiente anual; <br />Opción &apos;real&apos; → plusvalía efectivamente obtenida</td>
            </tr>
            <tr>
              <td className="px-6 py-4">IRPF (ganancia patrimonial)</td>
              <td className="px-6 py-4">Vendedor</td>
              <td className="px-6 py-4">Declaración anual</td>
              <td className="px-6 py-4">Diferencia valor escriturado compra-venta + coeficiente abatimiento si {'>'}1994</td>
            </tr>
            <tr>
              <td className="px-6 py-4">AJD / ITP</td>
              <td className="px-6 py-4">Comprador</td>
              <td className="px-6 py-4">30 d hábiles</td>
              <td className="px-6 py-4">Tipo 0,5%–1,5% (AJD obra nueva) / 6%–10% (ITP)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Nota fiscal 2025</AlertTitle>
        <AlertDescription>
          El Gobierno anuló la subida prevista de coeficientes para 2025, manteniendo los de 2024.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step13PostSale;
