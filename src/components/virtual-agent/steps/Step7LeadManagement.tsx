
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarTab from './leadManagement/CalendarTab';
import LeadManagementTips from './leadManagement/LeadManagementTips';

const Step7LeadManagement: React.FC = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendario de Visitas</TabsTrigger>
          <TabsTrigger value="tips">Gestión de Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="pt-4">
          <CalendarTab />
        </TabsContent>
        
        <TabsContent value="tips" className="pt-4">
          <LeadManagementTips />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Step7LeadManagement;
