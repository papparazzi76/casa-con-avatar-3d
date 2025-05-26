
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export const useSpecialOffer = () => {
  const [showOffer, setShowOffer] = useState(false);
  const [remainingSpots, setRemainingSpots] = useState(100);
  const { user } = useAuth();

  // Fetch remaining spots from Supabase
  const fetchRemainingSpots = async () => {
    try {
      const { data, error } = await supabase.rpc('get_remaining_special_offer_spots');
      
      if (error) {
        console.error('Error fetching remaining spots:', error);
        return;
      }
      
      setRemainingSpots(data || 0);
    } catch (error) {
      console.error('Error fetching remaining spots:', error);
    }
  };

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

  useEffect(() => {
    // Fetch initial count
    fetchRemainingSpots();

    // Set up real-time subscription with proper error handling
    let channel: any = null;
    
    const setupRealtimeSubscription = () => {
      try {
        channel = supabase
          .channel('special-offer-updates')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'special_offer_registrations'
            },
            (payload) => {
              console.log('New registration detected:', payload);
              // Refresh the count when someone registers
              fetchRemainingSpots();
            }
          )
          .subscribe((status) => {
            console.log('Realtime subscription status:', status);
            if (status === 'SUBSCRIBED') {
              console.log('Successfully subscribed to special offer updates');
            }
          });
      } catch (error) {
        console.error('Error setting up realtime subscription:', error);
        // If realtime fails, we can still function with manual refresh
      }
    };

    // Set up the subscription
    setupRealtimeSubscription();

    return () => {
      if (channel) {
        try {
          supabase.removeChannel(channel);
        } catch (error) {
          console.error('Error removing channel:', error);
        }
      }
    };
  }, []);

  const closeOffer = () => {
    setShowOffer(false);
    // Marcar como visto en esta sesión
    sessionStorage.setItem('special-offer-seen', 'true');
  };

  const acceptOffer = async () => {
    if (!user) {
      // Si no hay usuario, redirigir a registro con parámetro especial
      window.location.href = '/auth?special-offer=true';
      return;
    }

    try {
      // Registrar al usuario actual en la oferta especial
      const { error } = await supabase
        .from('special_offer_registrations')
        .insert({
          user_id: user.id,
          email: user.email || ''
        });

      if (error) {
        console.error('Error registering for special offer:', error);
        // Si hay error (ej: usuario ya registrado), continuar con el flujo normal
      }

      setShowOffer(false);
      sessionStorage.setItem('special-offer-seen', 'true');
      
      // Refresh the count after registration
      fetchRemainingSpots();
      
    } catch (error) {
      console.error('Error in acceptOffer:', error);
      // En caso de error, cerrar el popup y continuar
      setShowOffer(false);
      sessionStorage.setItem('special-offer-seen', 'true');
    }
  };

  return {
    showOffer,
    remainingSpots,
    closeOffer,
    acceptOffer
  };
};
