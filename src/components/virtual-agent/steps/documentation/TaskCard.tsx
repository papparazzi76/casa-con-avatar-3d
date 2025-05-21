
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Task } from "./TasksData";
import ExpiryBadge from "./ExpiryBadge";
import { Clock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  targetDate?: Date;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, targetDate }) => {
  const calculateDaysLeft = () => {
    if (!task.expires) return undefined;
    
    let daysLeft: number | undefined = undefined;
    
    if (task.validity_days) {
      daysLeft = task.validity_days;
    } else if (task.validity_years) {
      daysLeft = task.validity_years * 365;
    }
    
    return daysLeft;
  };
  
  const daysLeft = calculateDaysLeft();
  const hasExpired = false; // In a real app, we would calculate this based on upload date
  
  const handleStatusChange = () => {
    const newStatus = task.status === "done" ? "pending" : "done";
    onStatusChange(task.id, newStatus);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <Checkbox 
            checked={task.status === "done"}
            onCheckedChange={handleStatusChange}
            id={`task-${task.id}`}
          />
          <label 
            htmlFor={`task-${task.id}`}
            className={`font-medium ${task.status === "done" ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </label>
          
          {task.mandatory && (
            <Badge variant="outline" className="ml-2 border-red-300 text-red-700">
              Obligatorio
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ExpiryBadge 
            daysLeft={daysLeft} 
            hasExpired={hasExpired}
            isValid={task.expires} 
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        {task.notes && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Info size={16} />
                  <span className="ml-1">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{task.notes}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock size={16} />
            <span className="ml-1">Recordatorio</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
