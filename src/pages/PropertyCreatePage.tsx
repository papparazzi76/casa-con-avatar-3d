
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function PropertyCreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar si el usuario está autenticado
    if (!user) {
      toast.error("Debes iniciar sesión para publicar un inmueble");
      navigate("/auth?redirect=/propiedades/nueva");
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Publicar un inmueble</h1>
          
          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="text-center p-12 border rounded-lg">
                <p className="mb-4">Verificando sesión...</p>
              </div>
            ) : user ? (
              <>
                <Alert className="mb-6 border-realestate-purple">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Subida de imágenes</AlertTitle>
                  <AlertDescription>
                    Podrás subir imágenes de tu propiedad después de guardar los datos básicos.
                  </AlertDescription>
                </Alert>
                <PropertyForm />
              </>
            ) : (
              <div className="text-center p-12 border rounded-lg">
                <p className="mb-4">Redirigiendo a la página de inicio de sesión...</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
