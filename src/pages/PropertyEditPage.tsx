
import { useEffect, useState } from "react";
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

export default function PropertyEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("details");
  
  const { data: property, isLoading, error, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id!),
    enabled: !!id
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar si el usuario está autenticado
    if (!user) {
      toast.error("Debes iniciar sesión para editar un inmueble");
      navigate("/auth");
      return;
    }
  }, [user, navigate]);
  
  useEffect(() => {
    // Verificar si el usuario es propietario del inmueble
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
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6 text-center">
            <p>Cargando información del inmueble...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Inmueble no encontrado</h1>
            <p className="mb-6 text-muted-foreground">
              El inmueble que intentas editar no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate("/propiedades")}>
              Ver todos los inmuebles
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => navigate(`/propiedades/${id}`)} className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver al inmueble
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Editar inmueble</h1>
            <p className="text-muted-foreground mt-2">
              Actualiza la información o imágenes de tu inmueble
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="images">Imágenes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <PropertyForm 
                  property={property} 
                  isEditing={true}
                  onSuccess={handlePropertyUpdate}
                />
              </TabsContent>
              
              <TabsContent value="images">
                <PropertyImageManager 
                  property={property}
                  images={property.property_images}
                  onImagesChange={refetch}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
