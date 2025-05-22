
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "@/services/propertyService";
import { PropertyCard } from "./PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Property, PropertyImage } from "@/types/property";
import { toast } from "sonner";

interface PropertyGridProps {
  properties?: (Property & { property_images: PropertyImage[] })[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const { data: fetchedProperties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      try {
        console.log("Ejecutando fetchProperties en PropertyGrid");
        const result = await fetchProperties();
        console.log(`Propiedades obtenidas en PropertyGrid: ${result?.length || 0}`);
        return result;
      } catch (err) {
        console.error("Error en PropertyGrid:", err);
        toast.error("Error al cargar las propiedades. Inténtalo de nuevo.");
        throw err;
      }
    },
    // No ejecutar la consulta si se pasaron propiedades como prop
    enabled: !properties
  });
  
  const displayProperties = properties || fetchedProperties;

  if (isLoading && !properties) {
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

  if (error && !properties) {
    console.error("Error en PropertyGrid mostrado al usuario:", error);
    return (
      <div className="py-12 text-center">
        <p className="text-destructive text-lg">
          Error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.
        </p>
      </div>
    );
  }

  if (!displayProperties || displayProperties.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No hay propiedades disponibles</h3>
        <p className="text-muted-foreground">
          Sé el primero en publicar tu inmueble en nuestro escaparate.
        </p>
      </div>
    );
  }

  console.log(`Renderizando ${displayProperties.length} propiedades en PropertyGrid`);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
