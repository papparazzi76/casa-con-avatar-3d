
import React from 'react';
import DocumentationTaskList from './documentation/DocumentationTaskList';

const Step3Documentation: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Lista de tareas - Documentación obligatoria</h3>
      <p className="text-muted-foreground">
        Gestiona los documentos necesarios para la venta de tu propiedad.
        Marca como completados, sube archivos y configura recordatorios.
      </p>
      
      <DocumentationTaskList />
    </div>
  );
};

export default Step3Documentation;
