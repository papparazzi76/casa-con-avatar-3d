
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Step1Valuation: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Métodos habituales:</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Comparativa de mercado (precio medio €/m² de viviendas vendidas recientemente en el barrio).</li>
        <li>Tasación oficial (valor hipotecario; útil si el comprador necesita financiación).</li>
        <li>Valor automático (AVM) basado en big data: rápido para obtener una horquilla.</li>
      </ul>
      
      <h3 className="text-xl font-semibold mt-6">Criterios clave:</h3>
      <p>Superficie útil vs. construida, estado de conservación, planta, orientación, eficiencia energética.</p>
      
      <div className="mt-4">
        <Button 
          asChild
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
        >
          <Link to="/valorador-inmuebles">
            Ir al Valorador de Inmuebles
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Step1Valuation;
