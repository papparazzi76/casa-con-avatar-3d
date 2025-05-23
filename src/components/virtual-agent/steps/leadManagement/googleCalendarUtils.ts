
import { TimeSlot, VisitorDetails } from './types';

export const addEventToGoogleCalendar = async (
  selectedDate: Date,
  selectedTimeSlot: TimeSlot,
  visitorDetails: VisitorDetails
): Promise<void> => {
  // Create start and end times for the event
  const startTime = new Date(selectedDate);
  const [hours, minutes] = selectedTimeSlot.time.split(":").map(Number);
  startTime.setHours(hours, minutes, 0, 0);
  
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1); // 1 hour appointment
  
  const event = {
    'summary': `Visita inmueble - ${visitorDetails.name}`,
    'description': `Visita programada con ${visitorDetails.name}. Teléfono: ${visitorDetails.phone}, Email: ${visitorDetails.email}`,
    'start': {
      'dateTime': startTime.toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'end': {
      'dateTime': endTime.toISOString(),
      'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    'attendees': [
      {'email': visitorDetails.email}
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 30}
      ]
    }
  };
  
  try {
    await window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
  } catch (error) {
    console.error("Error creating Google Calendar event", error);
    throw error;
  }
};
