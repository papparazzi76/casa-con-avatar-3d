
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchUserProperties } from "@/services/propertyService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { UserPropertiesHeader } from "@/components/properties/user/UserPropertiesHeader";
import { EmptyPropertiesCard } from "@/components/properties/user/EmptyPropertiesCard";
import { PropertiesTable } from "@/components/properties/user/PropertiesTable";
import { LoadingPropertiesState } from "@/components/properties/user/LoadingPropertiesState";
import { ErrorPropertiesState } from "@/components/properties/user/ErrorPropertiesState";

export default function UserPropertiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: userProperties, isLoading, error, refetch } = useQuery({
    queryKey: ["userProperties"],
    queryFn: fetchUserProperties,
    enabled: !!user
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar si el usuario está autenticado
    if (!user) {
      toast.error("Debes iniciar sesión para acceder a tus propiedades");
      navigate("/auth?redirect=/mis-propiedades");
    }
  }, [user, navigate]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {!user ? (
            <div className="text-center p-12 border rounded-lg">
              <p className="mb-4">Redirigiendo a la página de inicio de sesión...</p>
            </div>
          ) : isLoading ? (
            <LoadingPropertiesState />
          ) : error ? (
            <ErrorPropertiesState onRetry={refetch} />
          ) : (
            <>
              <UserPropertiesHeader />
              
              {!userProperties || userProperties.length === 0 ? (
                <EmptyPropertiesCard />
              ) : (
                <PropertiesTable 
                  properties={userProperties} 
                  onDelete={refetch} 
                />
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
