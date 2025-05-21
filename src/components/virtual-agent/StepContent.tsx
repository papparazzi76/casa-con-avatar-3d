
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface StepContentProps {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const StepContent: React.FC<StepContentProps> = ({ id, title, description, content }) => {
  return (
    <div className="space-y-4">
      {content}
    </div>
  );
};

export default StepContent;
