
import { Button } from "@/components/ui/button";

interface ErrorPropertiesStateProps {
  onRetry: () => void;
}

export function ErrorPropertiesState({ onRetry }: ErrorPropertiesStateProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Error</h1>
      <p className="mb-6 text-muted-foreground">
        Ha ocurrido un error al cargar tus propiedades. Por favor, inténtalo de nuevo más tarde.
      </p>
      <Button onClick={onRetry}>
        Intentar de nuevo
      </Button>
    </div>
  );
}
