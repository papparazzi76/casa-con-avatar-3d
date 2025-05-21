
import React from 'react';
import { QuizQuestion } from './quizData';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface QuizStepProps {
  question: QuizQuestion;
  selectedValue?: number;
  onAnswer: (value: number) => void;
}

const tooltips: Record<string, Record<number, string>> = {
  q3: {
    0: "Sin presupuesto para marketing visual profesional",
    1: "Presupuesto mínimo para fotos básicas",
    2: "Presupuesto medio para fotos profesionales y video básico",
    3: "Presupuesto completo para pack visual profesional"
  },
  q7: {
    0: "Dispuesto a pagar comisiones estándar o superiores",
    1: "Acepta comisiones hasta 5%",
    2: "Prefiere comisiones bajas, menos del 3%",
    3: "No quiere pagar comisiones"
  }
};

export const QuizStep: React.FC<QuizStepProps> = ({ question, selectedValue, onAnswer }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-4">{question.text}</h4>
      
      <RadioGroup 
        value={selectedValue?.toString()} 
        onValueChange={(value) => onAnswer(parseInt(value))}
        className="space-y-4"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value.toString()} id={`${question.id}-option-${index}`} />
            <Label 
              htmlFor={`${question.id}-option-${index}`}
              className="flex items-center cursor-pointer"
            >
              {option.label}
              
              {tooltips[question.id] && tooltips[question.id][option.value] && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 text-gray-400">
                        <Info className="h-4 w-4" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltips[question.id][option.value]}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
