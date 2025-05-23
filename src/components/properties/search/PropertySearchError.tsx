
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PropertySearchErrorProps {
  onRetry: () => void;
}

export function PropertySearchError({ onRetry }: PropertySearchErrorProps) {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertDescription className="flex items-center justify-between">
        <span>
          Error al cargar las propiedades. Por favor, inténtalo de nuevo más tarde.
        </span>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      </AlertDescription>
    </Alert>
  );
}
