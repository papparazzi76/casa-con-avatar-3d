
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchPropertyById, deleteProperty } from "@/services/propertyService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { PropertyDetailHeader } from "@/components/properties/detail/PropertyDetailHeader";
import { PropertyGallery } from "@/components/properties/detail/PropertyGallery";
import { PropertyDetails } from "@/components/properties/detail/PropertyDetails";
import { PropertyLoading } from "@/components/properties/detail/PropertyLoading";
import { PropertyNotFound } from "@/components/properties/detail/PropertyNotFound";
import { formatPropertyType, formatOperationType, formatPrice, formatDate } from "@/components/properties/detail/PropertyFormatters";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id!),
    enabled: !!id
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleDelete = async () => {
    if (!property) return;
    
    if (window.confirm("¿Estás seguro de que quieres eliminar este inmueble? Esta acción no se puede deshacer.")) {
      try {
        await deleteProperty(property.id);
        toast.success("Inmueble eliminado correctamente");
        navigate("/propiedades");
      } catch (error) {
        console.error("Error al eliminar el inmueble:", error);
        toast.error("Error al eliminar el inmueble. Inténtalo de nuevo.");
      }
    }
  };
  
  if (isLoading) {
    return <PropertyLoading />;
  }
  
  if (error || !property) {
    return <PropertyNotFound />;
  }
  
  const isOwner = user && user.id === property.user_id;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <PropertyDetailHeader 
            property={property}
            isOwner={isOwner}
            onDelete={handleDelete}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PropertyGallery 
              images={property.property_images || []}
              videos={property.property_videos || []}
              title={property.title}
              operationType={property.operation_type}
              formatOperationType={formatOperationType}
            />
            
            <PropertyDetails 
              property={property}
              formatPropertyType={formatPropertyType}
              formatPrice={formatPrice}
              formatDate={formatDate}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
