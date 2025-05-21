
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchPropertyById, deleteProperty } from "@/services/propertyService";
import { Property, PropertyImage, PROPERTY_TYPES, OPERATION_TYPES } from "@/types/property";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
  
  const nextImage = () => {
    if (!property?.property_images.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.property_images.length);
  };
  
  const prevImage = () => {
    if (!property?.property_images.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + property.property_images.length) % property.property_images.length);
  };
  
  // Formatear propiedades
  const formatPropertyType = (type: string) => {
    const found = PROPERTY_TYPES.find(t => t.value === type);
    return found ? found.label : type;
  };
  
  const formatOperationType = (type: string) => {
    const found = OPERATION_TYPES.find(t => t.value === type);
    return found ? found.label : type;
  };
  
  const formatPrice = (price: number, currency: string) => {
    const formatter = new Intl.NumberFormat("es-ES");
    const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency === "GBP" ? "£" : currency;
    return `${formatter.format(price)} ${symbol}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-1/4" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-[400px] w-full mb-4" />
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square w-full" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-6 w-1/3 mb-6" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
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
              El inmueble que buscas no existe o ha sido eliminado.
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
  
  const isOwner = user && user.id === property.user_id;
  const currentImage = property.property_images[currentImageIndex] || { image_url: "/placeholder.svg" };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <Button variant="outline" onClick={() => navigate("/propiedades")} className="mb-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver al listado
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin size={18} />
                <span>{property.location}</span>
              </div>
            </div>
            
            {isOwner && (
              <div className="flex gap-2 self-start">
                <Button variant="outline" onClick={() => navigate(`/propiedades/${property.id}/editar`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                <img 
                  src={currentImage.image_url} 
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
                
                {property.property_images.length > 1 && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
                
                <Badge className="absolute top-4 right-4 uppercase font-semibold" variant={property.operation_type === "venta" ? "default" : "secondary"}>
                  {formatOperationType(property.operation_type)}
                </Badge>
              </div>
              
              {property.property_images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {property.property_images.map((image, index) => (
                    <div 
                      key={image.id} 
                      className={`aspect-square cursor-pointer rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image.image_url} 
                        alt={`Imagen ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-primary">
                  {formatPrice(property.price, property.currency)}
                  {property.operation_type === "alquiler" && <span className="text-sm text-muted-foreground ml-1">/mes</span>}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{formatPropertyType(property.property_type)}</Badge>
                  <Badge variant="outline">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(property.created_at)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-1 text-sm font-medium">Hab.</div>
                  <div className="text-lg font-bold">{property.rooms}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-1 text-sm font-medium">Baños</div>
                  <div className="text-lg font-bold">{property.bathrooms}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-1 text-sm font-medium">Área</div>
                  <div className="text-lg font-bold">{property.area} m²</div>
                </div>
              </div>
              
              {property.features && property.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="mr-1 h-3 w-3" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium mb-3">Descripción</h3>
                <div className="text-muted-foreground whitespace-pre-line">
                  {property.description}
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                onClick={() => {
                  // Aquí iría la lógica para contactar al propietario
                  toast.info("Esta funcionalidad estará disponible próximamente");
                }}
              >
                Contactar con el propietario
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
