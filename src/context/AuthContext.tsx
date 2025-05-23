
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  loading: boolean;
}

interface NotificationContextProps {
  sendFormNotification: (formType: string, email: string | undefined, formData: Record<string, any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const NotificationContext = createContext<NotificationContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      // First check if user already exists
      const { data: existingUsers } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUsers) {
        toast.error("Este correo electrónico ya está registrado. Por favor, inicia sesión.");
        return;
      }

      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error("Este correo electrónico ya está registrado. Por favor, inicia sesión.");
        } else {
          throw error;
        }
      } else {
        toast.success("Registro exitoso. Por favor, verifica tu correo electrónico.");
      }
    } catch (error: any) {
      toast.error(`Error en el registro: ${error.message}`);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast.success("Inicio de sesión exitoso");
    } catch (error: any) {
      toast.error(`Error de inicio de sesión: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Sesión cerrada correctamente");
    } catch (error: any) {
      toast.error(`Error al cerrar sesión: ${error.message}`);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(`Error al iniciar sesión con Google: ${error.message}`);
      throw error;
    }
  };

  // Notification functions
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

  // Create notification context value
  const notificationValue: NotificationContextProps = {
    sendFormNotification
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
        loading
      }}
    >
      <NotificationContext.Provider value={notificationValue}>
        {children}
      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  
  return context;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (context === null) {
    throw new Error("useNotification debe usarse dentro de un AuthProvider");
  }
  
  return context;
};
