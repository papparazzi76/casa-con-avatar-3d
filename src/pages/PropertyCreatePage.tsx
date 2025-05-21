
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PropertyCreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar si el usuario está autenticado
    if (!user) {
      toast.error("Debes iniciar sesión para publicar un inmueble");
      navigate("/auth?redirect=/propiedades/nueva");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Publicar un inmueble</h1>
          
          <div className="max-w-3xl mx-auto">
            <PropertyForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
