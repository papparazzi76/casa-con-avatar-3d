
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchPropertyById } from "@/services/propertyService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyForm } from "@/components/properties/PropertyForm";
import { PropertyImageManager } from "@/components/properties/PropertyImageManager";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyLoading } from "@/components/properties/detail/PropertyLoading";
import { PropertyNotFound } from "@/components/properties/detail/PropertyNotFound";
import { PropertyEditHeader } from "@/components/properties/detail/PropertyEditHeader";
import { PropertyEditTabs } from "@/components/properties/detail/PropertyEditTabs";

export default function PropertyEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: property, isLoading, error, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id!),
    enabled: !!id
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is authenticated
    if (!user) {
      toast.error("Debes iniciar sesión para editar un inmueble");
      navigate("/auth");
      return;
    }
  }, [user, navigate]);
  
  useEffect(() => {
    // Check if user is the owner of the property
    if (property && user && property.user_id !== user.id) {
      toast.error("No tienes permiso para editar este inmueble");
      navigate(`/propiedades/${id}`);
    }
  }, [property, user, id, navigate]);
  
  const handlePropertyUpdate = (updatedProperty: Property) => {
    toast.success("Inmueble actualizado correctamente");
    refetch();
  };
  
  if (isLoading) {
    return <PropertyLoading />;
  }
  
  if (error || !property) {
    return <PropertyNotFound />;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <PropertyEditHeader id={id!} />
          
          <div className="max-w-3xl mx-auto">
            <PropertyEditTabs 
              property={property}
              onPropertyUpdate={handlePropertyUpdate}
              onImagesChange={refetch}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
