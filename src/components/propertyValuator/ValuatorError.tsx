
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ValuatorErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ValuatorError({ message, onRetry }: ValuatorErrorProps) {
  return (
    <Alert variant="destructive" className="mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error en la valoración</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Intentar de nuevo
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
