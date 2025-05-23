
export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export interface VisitorDetails {
  name: string;
  email: string;
  phone: string;
}

// Google Calendar API configuration constants
export const GOOGLE_API_SCOPES = 'https://www.googleapis.com/auth/calendar';
export const GOOGLE_CLIENT_ID = '433488038248-mvrgna13b9ac88k3dr2ton9ht5lkt0a2.apps.googleusercontent.com';
export const GOOGLE_API_KEY = 'AIzaSyDLoLRAiEMPR0vqRSbIgDF80BbeDO-FOW8';
export const GOOGLE_DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
