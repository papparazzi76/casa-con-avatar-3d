
import React, { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { TimeSlot, VisitorDetails } from './types';
import DateSelector from './DateSelector';
import TimeSlotSelector from './TimeSlotSelector';
import ConfirmationDialog from './ConfirmationDialog';
import GoogleCalendarIntegration from './GoogleCalendarIntegration';
import ConfirmationMessages from './ConfirmationMessages';
import { addEventToGoogleCalendar } from './googleCalendarUtils';

// Available time slots
const AVAILABLE_TIMES: TimeSlot[] = [
  { id: "1", time: "10:00", available: true },
  { id: "2", time: "11:00", available: true },
  { id: "3", time: "12:00", available: true },
  { id: "4", time: "16:00", available: true },
  { id: "5", time: "17:00", available: true },
  { id: "6", time: "18:00", available: true },
];

const CalendarScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGoogleCalendarAuthorized, setIsGoogleCalendarAuthorized] = useState(false);
  const [visitorDetails, setVisitorDetails] = useState<VisitorDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const { user } = useAuth();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsDialogOpen(false);
    
    try {
      if (isGoogleCalendarAuthorized && selectedDate && selectedTimeSlot) {
        // Create a Google Calendar event
        await addEventToGoogleCalendar(selectedDate, selectedTimeSlot, visitorDetails);
      }
      
      // Always show confirmation, even if not using Google Calendar
      setIsConfirmed(true);
      toast.success("Visita programada correctamente");
    } catch (error) {
      console.error("Error al programar la visita", error);
      toast.error("Hubo un error al programar la visita");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {/* Date selection component */}
        <DateSelector 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* Time slot selection component */}
        <TimeSlotSelector 
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          availableTimes={AVAILABLE_TIMES}
          onTimeSelect={handleTimeSelect}
        />
      </div>

      {/* Google Calendar integration button */}
      <div className="mt-4 flex justify-center">
        <GoogleCalendarIntegration 
          isAuthorized={isGoogleCalendarAuthorized}
          onAuthorizationChange={setIsGoogleCalendarAuthorized}
          user={user}
        />
      </div>

      {/* Alerts and confirmation messages */}
      <ConfirmationMessages 
        isConfirmed={isConfirmed}
        isGoogleCalendarAuthorized={isGoogleCalendarAuthorized}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        user={user}
      />

      {/* Confirmation dialog */}
      <ConfirmationDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        visitorDetails={visitorDetails}
        onVisitorDetailsChange={setVisitorDetails}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default CalendarScheduler;
