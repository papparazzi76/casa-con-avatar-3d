
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function PropertyNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Inmueble no encontrado</h1>
          <p className="mb-6 text-muted-foreground">
            El inmueble que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={() => navigate("/propiedades")}>
            Ver todos los inmuebles
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
