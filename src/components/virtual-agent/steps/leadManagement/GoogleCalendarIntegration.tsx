
import React, { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
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

  const loadGoogleScript = () => {
    // Check if script is already loaded
    if (window.gapi) {
      initializeGoogleAPI();
      return;
    }

    // Load Google API script dynamically
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAPI;
    document.body.appendChild(script);
  };

  const initializeGoogleAPI = () => {
    window.gapi.load('client:auth2', () => {
      try {
        // Initialize the Google API client
        window.gapi.client.init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: GOOGLE_DISCOVERY_DOCS,
          scope: GOOGLE_API_SCOPES
        })
        .then(() => {
          // Check if user is already signed in to Google
          if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            onAuthorizationChange(true);
            toast.success("Conectado a Google Calendar");
          }
        })
        .catch(error => {
          console.error("Error initializing Google API", error);
          toast.error("Error al conectar con Google Calendar: " + error.message);
        });
      } catch (error: any) {
        console.error("Error in Google API initialization", error);
        toast.error("Error en la inicialización de Google API: " + error.message);
      }
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

    setIsLoading(true);

    try {
      // Make sure the API is initialized
      if (!window.gapi || !window.gapi.auth2) {
        loadGoogleScript();
        toast.error("El API de Google todavía se está cargando. Por favor, inténtalo de nuevo.");
        setIsLoading(false);
        return;
      }

      // Authorize with Google
      window.gapi.auth2.getAuthInstance()
        .signIn()
        .then(() => {
          onAuthorizationChange(true);
          toast.success("Conectado a Google Calendar correctamente");
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Google auth error", error);
          toast.error("Error al conectar con Google Calendar: " + (error.message || "Error desconocido"));
          setIsLoading(false);
        });
    } catch (error: any) {
      console.error("Error during Google Calendar sync", error);
      toast.error("Error al sincronizar con Google Calendar: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSyncWithGoogle} 
      className="gap-2"
      disabled={!user || isLoading}
    >
      <CalendarRange className="h-4 w-4" /> 
      {isLoading ? "Conectando..." : isAuthorized 
        ? "Conectado a Google Calendar" 
        : "Sincronizar con Google Calendar"}
    </Button>
  );
};

export default GoogleCalendarIntegration;
