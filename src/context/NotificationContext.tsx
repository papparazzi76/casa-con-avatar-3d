
import React, { createContext, useContext } from "react";
import { toast } from "sonner";

// Define notification context type
interface NotificationContextType {
  sendFormNotification: (formType: string, email: string | undefined, formData: Record<string, any>) => Promise<void>;
}

// Create notification context
const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  // Notification function
  const sendFormNotification = async (formType: string, email: string | undefined, formData: Record<string, any>) => {
    try {
      // In a real implementation, you would send this data to your backend
      console.log(`Notification for ${formType} from ${email}:`, formData);
      
      // For demo purposes just log it
      toast.success("Notificación enviada correctamente");
      return Promise.resolve();
    } catch (error: any) {
      console.error("Error sending notification:", error);
      toast.error("Error al enviar la notificación");
      return Promise.reject(error);
    }
  };

  const notificationContextValue: NotificationContextType = {
    sendFormNotification
  };

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  
  if (context === null) {
    throw new Error("useNotification debe usarse dentro de un NotificationProvider");
  }
  
  return context;
};
