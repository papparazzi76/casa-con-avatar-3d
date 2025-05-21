
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <p>Progreso</p>
        <p>{Math.round(value)}%</p>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

export default ProgressBar;
