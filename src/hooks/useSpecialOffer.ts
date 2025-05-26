
import { useState, useEffect } from "react";

export const useSpecialOffer = () => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya vio la oferta en esta sesión
    const hasSeenOffer = sessionStorage.getItem('special-offer-seen');
    
    if (!hasSeenOffer) {
      // Mostrar popup después de 2 segundos
      const timer = setTimeout(() => {
        setShowOffer(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closeOffer = () => {
    setShowOffer(false);
    // Marcar como visto en esta sesión
    sessionStorage.setItem('special-offer-seen', 'true');
  };

  const acceptOffer = () => {
    setShowOffer(false);
    sessionStorage.setItem('special-offer-seen', 'true');
    // Redirigir a registro con parámetro especial
    window.location.href = '/auth?special-offer=true';
  };

  return {
    showOffer,
    closeOffer,
    acceptOffer
  };
};
