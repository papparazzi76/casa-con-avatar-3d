
import React from 'react';
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeSlot } from './types';

interface TimeSlotSelectorProps {
  selectedDate: Date | undefined;
  selectedTimeSlot: TimeSlot | null;
  availableTimes: TimeSlot[];
  onTimeSelect: (timeSlot: TimeSlot) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  selectedTimeSlot,
  availableTimes,
  onTimeSelect
}) => {
  return (
    <div className="flex-1">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-realestate-purple" />
        <h3 className="text-lg font-medium">Selecciona una hora</h3>
      </div>
      {selectedDate ? (
        <div className="grid grid-cols-2 gap-2">
          {availableTimes.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
              disabled={!slot.available}
              onClick={() => onTimeSelect(slot)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">
            Selecciona una fecha primero
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
