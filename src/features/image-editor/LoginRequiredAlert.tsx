
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const LoginRequiredAlert = () => {
  const navigate = useNavigate();
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Acceso restringido</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>
          Debes iniciar sesión para acceder al editor de imágenes.
        </p>
        <Button onClick={() => navigate("/auth")}>
          Iniciar sesión
        </Button>
      </AlertDescription>
    </Alert>
  );
};
