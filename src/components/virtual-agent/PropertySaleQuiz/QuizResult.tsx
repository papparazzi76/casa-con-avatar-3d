
import React from 'react';
import { NextStep } from './quizData';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface QuizResultProps {
  result: string;
  score: number;
  highlights: string[];
  nextSteps: NextStep[];
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, score, highlights, nextSteps, onRestart }) => {
  const getResultColor = () => {
    switch (result) {
      case "FSBO (Venta por propietario)":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "Inmobiliaria en exclusiva":
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-orange-100 border-orange-300 text-orange-800";
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">Tu resultado</h3>
        
        <div className={`p-4 rounded-lg border mb-6 ${getResultColor()}`}>
          <h4 className="text-xl font-semibold">{result}</h4>
          <p className="mt-1">Puntuación total: {score}/24</p>
        </div>
        
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-2">Lo que destaca de tu perfil:</h5>
          <ul className="list-disc pl-5 space-y-1">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-8">
          <h5 className="text-lg font-semibold mb-2">Próximos pasos recomendados:</h5>
          <div className="flex flex-col space-y-3">
            {nextSteps.map((step, index) => (
              <Button 
                key={index} 
                asChild
                variant="outline"
                className="justify-start"
              >
                <Link to={step.url}>
                  {step.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={onRestart}
            variant="outline"
          >
            Reiniciar cuestionario
          </Button>
          
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
    </div>
  );
};
