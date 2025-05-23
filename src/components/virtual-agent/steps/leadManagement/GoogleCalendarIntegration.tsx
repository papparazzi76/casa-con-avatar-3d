
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_API_SCOPES, GOOGLE_DISCOVERY_DOCS } from './types';

interface GoogleCalendarIntegrationProps {
  isAuthorized: boolean;
  onAuthorizationChange: (isAuthorized: boolean) => void;
  user: any;
}

const GoogleCalendarIntegration: React.FC<GoogleCalendarIntegrationProps> = ({ 
  isAuthorized, 
  onAuthorizationChange, 
  user 
}) => {
  
  useEffect(() => {
    // Load Google API script dynamically
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleAPI;
      document.body.appendChild(script);
    };

    // Only load Google API if user is logged in
    if (user) {
      loadGoogleScript();
    }

    // Clean up
    return () => {
      const scriptTag = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [user]);

  const initializeGoogleAPI = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: GOOGLE_DISCOVERY_DOCS,
        scope: GOOGLE_API_SCOPES
      } as any).then(() => { // Use type assertion to bypass TypeScript error
        // Check if user is already signed in to Google
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          onAuthorizationChange(true);
          toast.success("Conectado a Google Calendar");
        }
      }).catch(error => {
        console.error("Error initializing Google API", error);
        toast.error("Error al conectar con Google Calendar: " + error.message);
      });
    });
  };

  const handleSyncWithGoogle = () => {
    if (!user) {
      toast.error("Debes iniciar sesión primero");
      return;
    }
    
    if (isAuthorized) {
      toast.success("Ya estás conectado a Google Calendar");
      return;
    }

    // Authorize with Google
    window.gapi.auth2.getAuthInstance().signIn().then(() => {
      onAuthorizationChange(true);
      toast.success("Conectado a Google Calendar correctamente");
    }).catch(error => {
      console.error("Google auth error", error);
      toast.error("Error al conectar con Google Calendar: " + error.message);
    });
  };

  return (
    <Button 
      onClick={handleSyncWithGoogle} 
      className="gap-2"
      disabled={!user}
    >
      <CalendarRange className="h-4 w-4" /> 
      {isAuthorized 
        ? "Conectado a Google Calendar" 
        : "Sincronizar con Google Calendar"}
    </Button>
  );
};

export default GoogleCalendarIntegration;
