
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Coins } from "lucide-react";

export const PriceInfoAlert = () => {
  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <Coins className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800">Información de precios</AlertTitle>
      <AlertDescription className="text-yellow-800">
        <p>Ediciones gratuitas:</p>
        <ul className="list-disc pl-5 mt-1 mb-2">
          <li>Todas las ediciones de mejora</li>
          <li>Homestaging de salón y dormitorio</li>
        </ul>
        <p>Ediciones de pago:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Homestaging de cocina: 2,99€ por imagen</li>
          <li>Homestaging de baño: 2,99€ por imagen</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};
