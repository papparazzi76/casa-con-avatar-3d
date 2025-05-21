
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyPropertiesCard() {
  const navigate = useNavigate();
  
  return (
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
  );
}
