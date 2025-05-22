
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PropertyGrid } from "./PropertyGrid";
import { searchProperties } from "@/services/property";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function PropertySearchResults() {
  const [searchParams] = useSearchParams();
  
  // Construir los parámetros de búsqueda para la consulta
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  
  // Realizar la búsqueda usando el servicio
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties", queryParams],
    queryFn: () => searchProperties(queryParams),
  });
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-28 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>
          Error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.
        </AlertDescription>
      </Alert>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No se encontraron propiedades con estos criterios</h3>
        <p className="text-muted-foreground">
          Prueba con otros filtros o amplía tus criterios de búsqueda.
        </p>
      </div>
    );
  }

  return <PropertyGrid properties={properties} />;
}
