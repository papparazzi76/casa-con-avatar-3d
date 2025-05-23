
import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Política de Cookies</h3>
            <p className="text-sm text-gray-600">
              Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias. 
              Si continúa navegando, consideramos que acepta su uso. Puede obtener más información en nuestra{" "}
              <Link to="/cookies" className="text-realestate-purple underline">
                Política de Cookies
              </Link> y{" "}
              <Link to="/privacidad" className="text-realestate-purple underline">
                Política de Privacidad
              </Link>.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDecline}
            >
              Rechazar
            </Button>
            <Button 
              className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
              size="sm" 
              onClick={handleAccept}
            >
              Aceptar
            </Button>
          </div>
          <button 
            onClick={handleDecline} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
