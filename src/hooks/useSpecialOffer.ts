
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
    // No mostrar más el popup automáticamente
    // const hasSeenOffer = sessionStorage.getItem('special-offer-seen');
    
    // if (!hasSeenOffer) {
    //   const timer = setTimeout(() => {
    //     setShowOffer(true);
    //   }, 2000);

    //   return () => clearTimeout(timer);
    // }
  }, []);

  useEffect(() => {
    // Fetch initial count but don't set up realtime subscription
    fetchRemainingSpots();
  }, []);

  const closeOffer = () => {
    setShowOffer(false);
    sessionStorage.setItem('special-offer-seen', 'true');
  };

  const acceptOffer = async () => {
    if (!user) {
      window.location.href = '/auth?special-offer=true';
      return;
    }

    try {
      const { error } = await supabase
        .from('special_offer_registrations')
        .insert({
          user_id: user.id,
          email: user.email || ''
        });

      if (error) {
        console.error('Error registering for special offer:', error);
      }

      setShowOffer(false);
      sessionStorage.setItem('special-offer-seen', 'true');
      
      fetchRemainingSpots();
      
    } catch (error) {
      console.error('Error in acceptOffer:', error);
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
