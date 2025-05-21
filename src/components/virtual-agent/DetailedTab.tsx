
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Step } from './steps/StepTypes';

interface DetailedTabProps {
  steps: Step[];
}

const DetailedTab: React.FC<DetailedTabProps> = ({ steps }) => {
  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <Card key={step.id}>
          <CardHeader>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                {step.id}
              </div>
              <div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {step.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetailedTab;
