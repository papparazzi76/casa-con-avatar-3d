import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Step } from './steps/StepTypes';

interface StepContentProps extends Step {}

export const StepContent: React.FC<StepContentProps> = ({ id, title, description, content }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
          {id}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default StepContent;
