
import React from 'react';
import DocumentationTaskList from './documentation/DocumentationTaskList';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Step3Documentation: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Lista de tareas - Documentación obligatoria</h3>
      <p className="text-muted-foreground">
        Gestiona los documentos necesarios para la venta de tu propiedad.
        Marca como completados, sube archivos y configura recordatorios.
      </p>
      
      <div className="mb-4">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={() => window.open("https://sede.registradores.org/sede/sede-corpme-web/home", "_blank")}
        >
          Solicitar Nota Simple Registral
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <DocumentationTaskList />
    </div>
  );
};

export default Step3Documentation;
