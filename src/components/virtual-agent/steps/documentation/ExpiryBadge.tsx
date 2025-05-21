
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar } from "lucide-react";

interface ExpiryBadgeProps {
  daysLeft?: number;
  hasExpired?: boolean;
  isValid?: boolean;
}

const ExpiryBadge: React.FC<ExpiryBadgeProps> = ({ daysLeft, hasExpired, isValid }) => {
  if (!isValid) return null;
  
  let colorClass = "bg-green-500";
  let label = "Válido";
  let description = "Documento válido";
  
  if (hasExpired) {
    colorClass = "bg-red-500";
    label = "Caducado";
    description = "Documento caducado";
  } else if (daysLeft !== undefined) {
    if (daysLeft <= 30) {
      colorClass = "bg-amber-500";
      label = `${daysLeft} días`;
      description = `Caduca en ${daysLeft} días`;
    } else {
      label = `${daysLeft} días`;
      description = `Válido por ${daysLeft} días`;
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${colorClass} flex items-center gap-1`}>
            <Calendar size={12} />
            <span>{label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExpiryBadge;
