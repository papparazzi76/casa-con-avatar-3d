
import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSteps } from "@/components/virtual-agent/steps/StepsData";
import FlowchartTab from "@/components/virtual-agent/FlowchartTab";
import DetailedTab from "@/components/virtual-agent/DetailedTab";
import BestPractices from "@/components/virtual-agent/BestPractices";

export default function VirtualRealEstateAgent() {
  // Get steps data from the StepsData file
  const steps = getSteps();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-3">
                  Agente Virtual Inmobiliario
                </h1>
                <p className="text-lg text-muted-foreground">
                  Guía paso a paso para vender o alquilar tu propiedad como un profesional
                </p>
              </div>
              <img 
                src="/lovable-uploads/f46ff66f-0563-46d3-b58a-a01637195817.png" 
                alt="Robot agente inmobiliario" 
                className="w-40 h-40 object-contain"
              />
            </div>
            
            <Tabs defaultValue="flowchart" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flowchart">Diagrama de Flujo</TabsTrigger>
                <TabsTrigger value="detailed">Pasos Detallados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flowchart" className="mt-6">
                <FlowchartTab steps={steps} />
              </TabsContent>
              
              <TabsContent value="detailed" className="mt-6">
                <DetailedTab steps={steps} />
              </TabsContent>
            </Tabs>
            
            <BestPractices />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
