
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step } from './steps/StepTypes';
import { Button } from '@/components/ui/button';

interface FlowchartTabProps {
  steps: Step[];
}

const FlowchartTab: React.FC<FlowchartTabProps> = ({ steps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
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

  // Function to navigate to the next step
  const goToNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      const nextIndex = activeStepIndex + 1;
      setActiveStepIndex(nextIndex);
      
      // If this step hasn't been revealed yet, add it to visible steps
      if (!visibleSteps.includes(nextIndex)) {
        setVisibleSteps(prev => [...prev, nextIndex]);
      }
    }
  };

  // Function to navigate to the previous step
  const goToPreviousStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  // Get the active step
  const activeStep = steps[activeStepIndex];
  
  return (
    <div className="bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
        Proceso de Venta de un Inmueble
      </h2>
      
      <div className="flex flex-col items-center mb-8 relative">
        {/* Navigation arrows */}
        <div className="w-full flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={goToPreviousStep}
            disabled={activeStepIndex === 0}
            className={cn(
              "flex items-center gap-2",
              activeStepIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-realestate-purple/10"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden md:inline">Anterior</span>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Paso {activeStepIndex + 1} de {steps.length}
          </div>
          
          <Button
            variant="ghost"
            onClick={goToNextStep}
            disabled={activeStepIndex === steps.length - 1}
            className={cn(
              "flex items-center gap-2",
              activeStepIndex === steps.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-realestate-purple/10"
            )}
          >
            <span className="hidden md:inline">Siguiente</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Active step sphere */}
        <motion.div
          key={`sphere-${activeStep.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center shadow-lg p-3 select-none",
            sphereColors[activeStepIndex % sphereColors.length]
          )}
        >
          <span className="text-xl font-bold text-white">Paso {activeStepIndex + 1}</span>
          <span className="text-sm text-white mt-1 px-2">{activeStep.title}</span>
        </motion.div>
      </div>
      
      {/* Active step content */}
      <motion.div
        key={`content-${activeStep.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-md p-6 mt-4"
      >
        {activeStep.content}
      </motion.div>
      
      {/* Bottom navigation - especially useful on mobile */}
      <div className="mt-8 flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={activeStepIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        
        <Button
          variant="default"
          onClick={goToNextStep}
          disabled={activeStepIndex === steps.length - 1}
          className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90 flex items-center gap-2"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlowchartTab;
