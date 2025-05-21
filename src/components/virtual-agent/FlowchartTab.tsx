
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './steps/StepTypes';

interface FlowchartTabProps {
  steps: Step[];
}

const FlowchartTab: React.FC<FlowchartTabProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([0]); // Initially only show first step

  // Define sphere colors using our realestate theme colors
  const sphereColors = [
    'bg-gradient-to-br from-realestate-purple to-realestate-turquoise',
    'bg-gradient-to-br from-realestate-turquoise to-realestate-purple',
    'bg-gradient-to-br from-realestate-purple-light to-realestate-turquoise',
    'bg-gradient-to-br from-realestate-turquoise to-realestate-purple-light',
    'bg-gradient-to-br from-realestate-purple to-realestate-turquoise-light',
    'bg-gradient-to-br from-realestate-turquoise-light to-realestate-purple',
    'bg-gradient-to-br from-realestate-purple-dark to-realestate-turquoise',
    'bg-gradient-to-br from-realestate-turquoise to-realestate-purple-dark',
    'bg-gradient-to-br from-realestate-purple to-realestate-orange',
    'bg-gradient-to-br from-realestate-orange to-realestate-purple',
    'bg-gradient-to-br from-realestate-turquoise to-realestate-orange',
    'bg-gradient-to-br from-realestate-orange to-realestate-turquoise',
    'bg-gradient-to-br from-realestate-purple-light to-realestate-orange',
  ];

  const handleStepClick = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  // Function to reveal next step in flowchart
  const revealNextStep = (currentIndex: number) => {
    // Check if this is the currently active step in the flow
    if (currentIndex !== Math.max(...visibleSteps)) return;
    
    // Show next step if available
    if (currentIndex < steps.length - 1) {
      const nextIndex = currentIndex + 1;
      setVisibleSteps(prev => [...prev, nextIndex]);
    }
  };

  return (
    <div className="bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
        Proceso de Venta de un Inmueble
      </h2>
      
      {/* Flowchart with spheres */}
      <div className="flex flex-wrap justify-center items-start gap-4 py-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Sphere step */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: visibleSteps.includes(index) ? 1 : 0,
                scale: visibleSteps.includes(index) ? 1 : 0.8,
              }}
              transition={{ duration: 0.5 }}
              className={cn(
                "w-[150px] h-[150px] md:w-[150px] md:h-[150px] rounded-full flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-lg p-3 select-none",
                sphereColors[index % sphereColors.length],
                visibleSteps.includes(index) ? "visible" : "invisible",
                visibleSteps.includes(index) && index !== Math.max(...visibleSteps) ? "opacity-70" : ""
              )}
              onClick={() => {
                revealNextStep(index);
                handleStepClick(step.id);
              }}
              whileHover={index === Math.max(...visibleSteps) ? { 
                translateY: -5, 
                scale: 1.05,
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" 
              } : {}}
            >
              <span className="text-xl font-bold text-white">Paso {index + 1}</span>
              <span className="text-xs text-white mt-1">{step.title}</span>
            </motion.div>
            
            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: visibleSteps.includes(index) && visibleSteps.includes(index + 1) ? 1 : 0 
                }}
                className="text-2xl text-gray-500 flex items-center justify-center"
              >
                <ChevronRight className="h-8 w-8" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Step content panel that shows when a step is clicked */}
      {activeStep !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-6 bg-white rounded-lg shadow-md"
        >
          {steps.find(s => s.id === activeStep)?.content}
        </motion.div>
      )}
      
      {activeStep === null && (
        <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-muted-foreground">
            Haz clic en un paso para ver más detalles. Haz clic en el último paso visible para avanzar en el proceso.
          </p>
        </div>
      )}
    </div>
  );
};

export default FlowchartTab;
