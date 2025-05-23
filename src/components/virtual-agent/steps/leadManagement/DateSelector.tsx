
import React from 'react';
import { CalendarRange } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateSelect }) => {
  return (
    <div className="flex-1">
      <div className="mb-4 flex items-center gap-2">
        <CalendarRange className="h-5 w-5 text-realestate-purple" />
        <h3 className="text-lg font-medium">Selecciona una fecha</h3>
      </div>
      <div className="rounded-md border">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          className="rounded-md border"
          disabled={(date) => {
            // Disable past dates and weekends
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const day = date.getDay();
            return date < now || day === 0 || day === 6;
          }}
        />
      </div>
    </div>
  );
};

export default DateSelector;
