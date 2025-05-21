
import React, { useState, useMemo } from 'react';
import { tasks as initialTasks, Task } from "./TasksData";
import TaskCard from "./TaskCard";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, File } from "lucide-react";

const DocumentationTaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // Default: 90 days from now
  );
  
  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status } : task
      )
    );
  };
  
  const { progress, mandatory, completed } = useMemo(() => {
    const mandatory = tasks.filter(task => task.mandatory);
    const completed = mandatory.filter(task => task.status === "done");
    const progress = (completed.length / mandatory.length) * 100;
    
    return { progress, mandatory: mandatory.length, completed: completed.length };
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Fecha objetivo de firma</h3>
            <p className="text-sm text-gray-500">
              {targetDate ? targetDate.toLocaleDateString() : "No establecida"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar size={16} />
            Cambiar fecha
          </Button>
        </div>
        
        <ProgressBar value={progress} />
        
        <p className="mt-3 text-sm text-center">
          {completed} de {mandatory} documentos obligatorios completados
        </p>
        
        {progress === 100 && (
          <Button className="w-full mt-4 gap-2">
            <File size={16} />
            Generar dossier PDF para notario
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="in_progress">En curso</TabsTrigger>
          <TabsTrigger value="done">Completados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {tasks.filter(task => task.status !== "n_a").map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStatusChange={handleStatusChange}
              targetDate={targetDate}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          {tasks.filter(task => task.status === "pending").map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStatusChange={handleStatusChange}
              targetDate={targetDate}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="in_progress" className="mt-0">
          {tasks.filter(task => task.status === "in_progress").map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStatusChange={handleStatusChange}
              targetDate={targetDate}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="done" className="mt-0">
          {tasks.filter(task => task.status === "done").map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onStatusChange={handleStatusChange}
              targetDate={targetDate}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentationTaskList;
