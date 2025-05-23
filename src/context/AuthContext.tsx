
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

// Define auth context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  loading: boolean;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth functions
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

  const authContextValue: AuthContextType = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export auth context hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  
  return context;
};

// Remove the circular import/export
// Instead of re-exporting from NotificationContext, we'll let App.tsx handle both contexts separately
