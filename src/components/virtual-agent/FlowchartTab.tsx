
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

  // Function to get visible steps in current row
  const getVisibleStepsInRow = () => {
    // We'll show a maximum of 3 steps per row
    const maxStepsPerRow = 3;
    const visibleStepCount = visibleSteps.length;
    
    // Calculate how many complete rows we have
    const completeRows = Math.floor(visibleStepCount / maxStepsPerRow);
    
    // Calculate how many steps are in the last (incomplete) row
    const stepsInLastRow = visibleStepCount % maxStepsPerRow || maxStepsPerRow;
    
    return { maxStepsPerRow, completeRows, stepsInLastRow };
  };
  
  const { maxStepsPerRow } = getVisibleStepsInRow();

  return (
    <div className="bg-gradient-to-r from-realestate-purple/5 to-realestate-turquoise/5 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
        Proceso de Venta de un Inmueble
      </h2>
      
      {/* Flowchart with steps displayed in rows of 3 */}
      <div className="flex flex-col gap-8">
        {Array.from({ length: Math.ceil(visibleSteps.length / maxStepsPerRow) }).map((_, rowIndex) => {
          // Calculate the steps for this row
          const rowStartIndex = rowIndex * maxStepsPerRow;
          const rowEndIndex = Math.min(rowStartIndex + maxStepsPerRow, steps.length);
          const rowSteps = visibleSteps
            .filter(stepIndex => stepIndex >= rowStartIndex && stepIndex < rowEndIndex)
            .map(stepIndex => steps[stepIndex]);
          
          // Skip empty rows
          if (rowSteps.length === 0) return null;
          
          return (
            <div key={`row-${rowIndex}`} className="mb-12">
              {/* Row of spheres */}
              <div className="flex flex-wrap justify-center items-center gap-4">
                {visibleSteps
                  .filter(stepIndex => stepIndex >= rowStartIndex && stepIndex < rowEndIndex)
                  .map(stepIndex => {
                    const step = steps[stepIndex];
                    const isLastVisibleStep = stepIndex === Math.max(...visibleSteps);
                    
                    return (
                      <React.Fragment key={step.id}>
                        {/* Sphere step */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{ duration: 0.5 }}
                          className={cn(
                            "w-[150px] h-[150px] md:w-[150px] md:h-[150px] rounded-full flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-lg p-3 select-none",
                            sphereColors[stepIndex % sphereColors.length],
                            isLastVisibleStep ? "" : "opacity-70"
                          )}
                          onClick={() => {
                            revealNextStep(stepIndex);
                            handleStepClick(step.id);
                          }}
                          whileHover={isLastVisibleStep ? { 
                            translateY: -5, 
                            scale: 1.05,
                            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" 
                          } : {}}
                        >
                          <span className="text-xl font-bold text-white">Paso {stepIndex + 1}</span>
                          <span className="text-xs text-white mt-1">{step.title}</span>
                        </motion.div>
                        
                        {/* Arrow between steps (only within the same row) */}
                        {stepIndex < rowEndIndex - 1 && stepIndex < Math.max(...visibleSteps) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl text-gray-500 flex items-center justify-center"
                          >
                            <ChevronRight className="h-8 w-8" />
                          </motion.div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
              
              {/* Row of step content panels (conditional) */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {visibleSteps
                  .filter(stepIndex => stepIndex >= rowStartIndex && stepIndex < rowEndIndex)
                  .map(stepIndex => {
                    const step = steps[stepIndex];
                    const isActive = activeStep === step.id;
                    
                    return (
                      <motion.div
                        key={`content-${step.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          height: isActive ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "bg-white rounded-lg shadow-md overflow-hidden",
                          isActive ? "p-6" : "p-0"
                        )}
                      >
                        {isActive && step.content}
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      
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
