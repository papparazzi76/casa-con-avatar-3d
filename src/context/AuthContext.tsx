
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Función para enviar notificación
  const sendNotification = async (type: 'registration' | 'form_submission', email?: string, formType?: string, formData?: Record<string, any>) => {
    try {
      console.log(`Sending ${type} notification for ${email || 'unknown email'}`);
      
      const response = await fetch("https://axkfeoivkpsvjmewqndu.supabase.co/functions/v1/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          email,
          formType,
          formData
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error sending notification:", errorText);
        throw new Error(`Error sending notification: ${errorText}`);
      } else {
        console.log("Notification sent successfully");
        const result = await response.json();
        console.log("Response:", result);
      }
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  async function signUp(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Registro exitoso, enviando notificación para:", email);
      
      // Enviar notificación de registro
      await sendNotification('registration', email);

      toast({
        title: "Registro exitoso",
        description: "Por favor verifica tu correo electrónico para confirmar tu cuenta.",
      });
    } catch (error: any) {
      console.error("Error en el registro:", error);
      toast({
        title: "Error en el registro",
        description: error.message || "Ocurrió un error durante el registro.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo a PropTools.",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión con Google",
        description: error.message || "Ocurrió un error al intentar iniciar sesión con Google.",
        variant: "destructive",
      });
      throw error;
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión.",
        variant: "destructive",
      });
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Exportar la función sendNotification para usarla en otros componentes
export const useNotification = () => {
  const sendFormNotification = async (formType: string, email?: string, formData?: Record<string, any>) => {
    try {
      console.log(`Sending form notification: ${formType} for ${email || 'unknown user'}`);
      
      const response = await fetch("https://axkfeoivkpsvjmewqndu.supabase.co/functions/v1/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: 'form_submission',
          email,
          formType,
          formData
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error sending form notification:", errorText);
        throw new Error(`Error sending form notification: ${errorText}`);
      } else {
        console.log("Form notification sent successfully");
        const result = await response.json();
        console.log("Response:", result);
      }
    } catch (error) {
      console.error("Failed to send form notification:", error);
    }
  };

  return { sendFormNotification };
};
