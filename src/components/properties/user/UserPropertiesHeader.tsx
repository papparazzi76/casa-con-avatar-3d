
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserPropertiesHeader() {
  const navigate = useNavigate();
  
  return (
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
  );
}
