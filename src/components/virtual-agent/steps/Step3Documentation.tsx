
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Step3Documentation: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Checklist descargable con semáforo de validez:</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quién lo expide</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validez</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Obligatorio</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">DNI/NIE vigente</td>
              <td className="px-6 py-4">Propietario</td>
              <td className="px-6 py-4">—</td>
              <td className="px-6 py-4 text-green-600">✓</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Título de propiedad (escritura)</td>
              <td className="px-6 py-4">Notaría original</td>
              <td className="px-6 py-4">Permanente</td>
              <td className="px-6 py-4 text-green-600">✓</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Nota simple registral {'<'} 90 d</td>
              <td className="px-6 py-4">Registro de la Propiedad</td>
              <td className="px-6 py-4">3 m</td>
              <td className="px-6 py-4 text-green-600">✓</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Herramienta útil</AlertTitle>
        <AlertDescription>
          Generador de lista de tareas con alertas de caducidad.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step3Documentation;
