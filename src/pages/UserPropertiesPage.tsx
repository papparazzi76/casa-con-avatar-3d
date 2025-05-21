import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchUserProperties, deleteProperty } from "@/services/propertyService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  PlusCircle, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Home 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
  
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este inmueble? Esta acción no se puede deshacer.")) {
      try {
        await deleteProperty(id);
        toast.success("Inmueble eliminado correctamente");
        refetch();
      } catch (error) {
        console.error("Error al eliminar el inmueble:", error);
        toast.error("Error al eliminar el inmueble. Inténtalo de nuevo.");
      }
    }
  };
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  
  // Obtener el estado del inmueble
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
      case "sold":
        return <Badge variant="destructive">Vendido</Badge>;
      case "rented":
        return <Badge variant="destructive">Alquilado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-1/6" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="mb-6 text-muted-foreground">
              Ha ocurrido un error al cargar tus propiedades. Por favor, inténtalo de nuevo más tarde.
            </p>
            <Button onClick={() => refetch()}>
              Intentar de nuevo
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mis propiedades</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus inmuebles publicados
              </p>
            </div>
            
            <Button 
              onClick={() => navigate("/propiedades/nueva")}
              className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Publicar nuevo inmueble
            </Button>
          </div>
          
          {!userProperties || userProperties.length === 0 ? (
            <Card className="mb-8 text-center py-12">
              <CardContent>
                <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">No has publicado ningún inmueble</h2>
                <p className="text-muted-foreground mb-6">
                  Empieza a publicar tus inmuebles para venderlos o alquilarlos sin intermediarios
                </p>
                <Button 
                  onClick={() => navigate("/propiedades/nueva")}
                  className="bg-gradient-to-r from-realestate-purple to-realestate-turquoise hover:opacity-90"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Publicar mi primer inmueble
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[350px]">Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Publicado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProperties.map((property) => {
                    // Encontrar la imagen principal o usar la primera disponible
                    const mainImage = property.property_images.find(img => img.is_main) || 
                                     property.property_images[0];
                    
                    // Formatear el precio
                    const formattedPrice = new Intl.NumberFormat("es-ES").format(property.price);
                    const currencySymbol = property.currency === "EUR" ? "€" : 
                                          property.currency === "USD" ? "$" : 
                                          property.currency === "GBP" ? "£" : property.currency;
                    
                    return (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                              {mainImage ? (
                                <img 
                                  src={mainImage.image_url} 
                                  alt={property.title} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-muted flex items-center justify-center">
                                  <Home className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="truncate">
                              {property.title}
                              <div className="text-sm text-muted-foreground truncate">
                                {property.location}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {property.operation_type === "venta" ? "Venta" : "Alquiler"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formattedPrice} {currencySymbol}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(property.status)}
                        </TableCell>
                        <TableCell>
                          {formatDate(property.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/propiedades/${property.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/propiedades/${property.id}/editar`)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(property.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
