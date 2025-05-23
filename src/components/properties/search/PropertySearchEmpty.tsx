
import { Search } from "lucide-react";

export function PropertySearchEmpty() {
  return (
    <div className="py-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-muted">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2">No se encontraron propiedades con estos criterios</h3>
      <p className="text-muted-foreground">
        Prueba con otros filtros o amplía tus criterios de búsqueda.
      </p>
    </div>
  );
}
